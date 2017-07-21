"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationLog = require("../ApplicationLog/ApplicationLog");
let alexaVerifier = require('alexa-verifier');
const NotesRoute_1 = require("./NotesRoute/NotesRoute");
class Routes {
    CreateRoutes(router) {
        ApplicationLog.LogDebug('[Routes::CreateRoutes] Starting creation of routes');
        router.get('/Notes/GetNotes', (req, res, next) => {
            new NotesRoute_1.NotesRoute().GetNotes(req, res, next);
        });
        router.post('/Notes/SaveNotes', [this.IsAuthenticated, this.VerifyApplicationRequest, (req, res, next) => {
                new NotesRoute_1.NotesRoute().SaveNotes(req, res, next);
            }]);
        ApplicationLog.LogDebug('[Routes::CreateRoutes] Completed creation of routes');
    }
    IsAuthenticated(req, res, next) {
        alexaVerifier(req.headers.signaturecertchainurl, req.headers.signature, req['rawBody'], function verificationCallBack(err) {
            if (err)
                res.status(401).json({ message: 'Verification Failure', error: err });
            else
                next();
        });
    }
    VerifyApplicationRequest(req, res, next) {
        try {
            let _askId = "amzn1.ask.skill.a5c052af-59af-4caf-82b1-5ec83f258b4e";
            let _expectedIntents = ["TakeNewNotesIntent", "AMAZON.HelpIntent", "AMAZON.StopIntent", "AMAZON.CancelIntent"];
            let _alexaRequest = req.body;
            if (_alexaRequest.session && _alexaRequest.session.application && _alexaRequest.session.application.applicationId === _askId) {
                if (_expectedIntents.some((value) => { return value === _alexaRequest.request.intent.name; }))
                    next();
            }
            ApplicationLog.LogError(new Error(`Application verification for ${_alexaRequest.session.application.applicationId}`));
            res.status(404).json({ message: 'Unknown application request' });
        }
        catch (exception) {
            ApplicationLog.LogException(exception);
        }
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map