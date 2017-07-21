"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationLog = require("../../ApplicationLog/ApplicationLog");
const Database_1 = require("../../Model/Database");
class NotesRoute {
    get Version() {
        return '1.0';
    }
    GetNotes(req, res, next) {
        let _notes = req.body.notes;
        let _database = new Database_1.Database();
        _database
            .GetNotes()
            .then((results) => {
            res.send(results);
        })
            .catch((err) => {
            res.send(null);
        });
    }
    SaveNotes(req, res, next) {
        let _responseObject = {};
        let _self = this;
        let _alexaRequest = req.body.request;
        console.log(_alexaRequest);
        if (_alexaRequest.type === "LaunchRequest") {
            _responseObject = this.BuildResponse({}, "I am ready to take some notes. Please begin giving me data", "You started the Node.js Echo Notes API", false);
            res.json(_responseObject);
        }
        else if (_alexaRequest.type === "SessionEndedRequest") {
            if (req.body.request.reason === "ERROR")
                console.log('Alexa ended due to an error');
        }
        else if ((_alexaRequest.type === "IntentRequest")) {
            let _alexaIntent = _alexaRequest.intent;
            if (_alexaIntent) {
                if (_alexaRequest.type === 'IntentRequest' && _alexaIntent.name === 'TakeNewNotesIntent') {
                    let _alexaSlots = _alexaIntent.slots;
                    let _noteName = _alexaSlots.Subject.value;
                    let _noteText = _alexaSlots.NotesValue.value;
                    let _database = new Database_1.Database();
                    _database.Insert(_noteName, _noteText)
                        .then((result) => {
                        _responseObject = this.BuildResponse({}, "Notes saved successfully", "You started the Node.js Echo Notes API", true);
                        res.json(_responseObject);
                    })
                        .catch((err) => {
                        _responseObject = this.BuildResponse({}, "There was some error in saving the notes", "You started the Node.js Echo Notes API", true);
                        res.json(_responseObject);
                    });
                }
                else if (_alexaIntent.name === 'AMAZON.HelpIntent') {
                    _responseObject = this.BuildResponse({}, "You can ask me to save notes", "You started the Node.js Echo Notes API", true);
                    res.json(_responseObject);
                }
                else if (_alexaIntent.name === 'AMAZON.StopIntent' || _alexaIntent.name === 'AMAZON.CancelIntent') {
                    _responseObject = this.BuildResponse({}, "Good bye!", "You started the Node.js Echo Notes API", true);
                    res.json(_responseObject);
                }
            }
            else {
                ApplicationLog.LogError(new Error(`Intent wasn't found`));
                _responseObject = this.BuildResponse({}, "There was some error in saving the notes", "You started the Node.js Echo Notes API", true);
                res.json(_responseObject);
            }
        }
    }
    BuildResponse(session, speech, card, end) {
        return {
            version: this.Version,
            sessionAttributes: session,
            response: {
                outputSpeech: {
                    type: 'PlainText',
                    text: speech
                },
                card: {
                    type: 'Simple',
                    title: 'Orion Notes',
                    content: card
                },
                shouldEndSession: end
            }
        };
    }
}
exports.NotesRoute = NotesRoute;
//# sourceMappingURL=NotesRoute.js.map