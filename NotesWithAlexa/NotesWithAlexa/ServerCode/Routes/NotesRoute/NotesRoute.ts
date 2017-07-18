import { NextFunction, Request, Response } from 'express';
import * as Path from 'path';
import * as applicationLog from '../../ApplicationLog/ApplicationLog';
import { Database } from '../../Model/Database';

export class NotesRoute {

    private get Version(): string {
        return '1.0';
    }

    public GetNotes(req: Request, res: Response, next: NextFunction) {
        let _notes = req.body.notes;
        let _database = new Database();
        _database
            .GetNotes()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                res.send(null);
            });
    }

    public SaveNotes(req: Request, res: Response, next: NextFunction) {

        let _responseObject = {};
        console.log(req.body.request);
        if (req.body.requst.type === "LaunchRequest") {
            _responseObject = this.BuildResponse({}, "I am ready to take some notes. Please begin giving me data", "You started the Node.js Echo API Sample", false);
            return res.send(_responseObject);
        }
        else if (req.body.request.type === "SessionEndedRequest") {
            if (req.body.request.reason === "ERROR")
                console.log('Alexa ended due to an error');
        }
        else if ((req.body.request.type === "IntentRequest") || (req.body.request.intent && req.body.request.intent.name === "TakeNewNotesIntent")) {

            let _noteName = req.body.requst.intent.name;
            let _noteText = req.body.text.intent.body;

            let _database = new Database();
            _database.Insert(_noteName, _noteText)
                .then((result) => {
                    _responseObject = this.BuildResponse({}, "Notes saved successfully", "You started the Node.js Echo API Sample", true);
                    return res.send(_responseObject);
                })
                .catch((err) => {
                    _responseObject = this.BuildResponse({}, "There was some error in saving the notes", "You started the Node.js Echo API Sample", true);
                    return res.send(_responseObject);
                });
        }
    }

    private BuildResponse(session, speech, card, end) {
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
                    title: 'Open Smart Hub',
                    content: card
                },
                shouldEndSession: end
            }
        };
    }
}