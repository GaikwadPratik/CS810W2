import { NextFunction, Request, Response, Router } from 'express';
import * as ApplicationLog from '../ApplicationLog/ApplicationLog';
let alexaVerifier = require('alexa-verifier');


import { NotesRoute } from './NotesRoute/NotesRoute';

export class Routes {

    /**
     * Create the routes SercNav application.
     * Define all the routes in this method
     * @class Routes
     * @method CreateRoutes
     * @param router
     * @param passport
     */
    public CreateRoutes(router: Router) {
        ApplicationLog.LogDebug('[Routes::CreateRoutes] Starting creation of routes');

        router.get('/Notes/GetNotes', (req: Request, res: Response, next: NextFunction) => {
            new NotesRoute().GetNotes(req, res, next);
        });

        router.post('/Notes/SaveNotes', [this.IsAuthenticated, this.VerifyApplicationRequest, (req: Request, res: Response, next: NextFunction) => {
            new NotesRoute().SaveNotes(req, res, next);
        }]);

        ApplicationLog.LogDebug('[Routes::CreateRoutes] Completed creation of routes');
    }


    /**
     * This function should be called on every alexa request to do certificate verifications.
     * @param req {Request} The express request object
     * @param res {Respnse} The express response object
     * @param next {NextFunction} Execute the next method
     */
    private IsAuthenticated(req: Request, res: Response, next: NextFunction): NextFunction | void {
        //Verify request from alexa based on url, cert
        //TODO:: rewrite using own verifier
        alexaVerifier(
            req.headers.signaturecertchainurl,
            req.headers.signature,
            req['rawBody'],
            function verificationCallBack(err) {
                if (err) {
                    ApplicationLog.LogError(err);
                    res.status(401).json({ message: 'Verification Failure', error: err });
                }
                else
                    //if (req.body.session.application.applicationId === "")
                    next();
            }
        );
    }

    /**
     * This function should be called on every alexa request to do application verifications.
     * @param req {Request} The express request object
     * @param res {Respnse} The express response object
     * @param next {NextFunction} Execute the next method
     */
    private VerifyApplicationRequest(req: Request, res: Response, next: NextFunction): NextFunction | void {
        try {

            let _askId: string = "amzn1.ask.skill.a5c052af-59af-4caf-82b1-5ec83f258b4e";
            let _expectedIntents: Array<string> = ["TakeNewNotesIntent", "AMAZON.HelpIntent", "AMAZON.StopIntent", "AMAZON.CancelIntent"];

            let _alexaRequest = req.body;
            //verify if the app is intended one
            if (_alexaRequest.session && _alexaRequest.session.application && _alexaRequest.session.application.applicationId === _askId) {
                //verify if the intent is from the list
                if (_expectedIntents.indexOf(_alexaRequest.request.intent.name) !== -1)
                    return next();
                else
                    ApplicationLog.LogError(new Error(`Attempted to call unknown intent ${_alexaRequest.request.intent.name}`));
            }

            ApplicationLog.LogError(new Error(`Application verification for ${_alexaRequest.session.application.applicationId}`));
            res.status(404).json({ message: 'Unknown application request' });
        }
        catch (exception) {
            ApplicationLog.LogException(exception);
        }
    }
}