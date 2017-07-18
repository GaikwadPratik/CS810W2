//export * from './AdminRoute/AdminRoute';
//export * from './RegistrationRoute/RegistrationRoute';
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

        router.get('/Notes/SaveNotes', [this.IsAuthenticated, (req: Request, res: Response, next: NextFunction) => {
            new NotesRoute().SaveNotes(req, res, next);
        }]);

        ApplicationLog.LogDebug('[Routes::CreateRoutes] Completed creation of routes');
    }


    /**
     * This function should be called on every alexa request to do certain verifications.
     * @param req {Request} The express request object
     * @param res {Respnse} The express response object
     * @param next {NextFunction} Execute the next method
     */
    private IsAuthenticated(req: Request, res: Response, next: NextFunction): NextFunction | void {
        alexaVerifier(
            req.headers.signaturecertchainurl,
            req.headers.signature,
            req.body,
            function verificationCallBack(err) {
                if (err)
                    res.status(401).json({ message: 'Verification Failure', error: err });
                else
                    next();
            }
        );
        //try {
        //    //if user is authenticated in session, let them proceed with request
        //    if (req.isAuthenticated()) {
        //        res.locals.isAuthenticated = true;
        //        return next();
        //    }
        //    else { //else rediect to login page
        //        delete res.locals;
        //        req.logOut();

        //        if (!req.xhr)
        //            res.redirect(`/Login/`);
        //        else
        //            res.send({ textStatus: null });
        //    }
        //}
        //catch (exception) {
        //    ApplicationLog.LogException(exception);
        //}
    }
}