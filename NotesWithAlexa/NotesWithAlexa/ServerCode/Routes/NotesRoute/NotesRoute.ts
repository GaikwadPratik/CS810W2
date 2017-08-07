import { NextFunction, Request, Response } from 'express';
import * as Path from 'path';
import * as ApplicationLog from '../../ApplicationLog/ApplicationLog';
import { Database } from '../../Model/Database';

export class NotesRoute {

    /**
    * returns the version number of the response to Alexa
    */
    private get Version(): string {
        return '1.0';
    }

    /**
     * simplet get route. To be used as JSON api
     * @param req {Request} The express request object
     * @param res {Respnse} The express response object
     * @param next {NextFunction} Execute the next method
     */
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

    /**
     * The route to save the notes using alexa
     * @param req {Request} The express request object
     * @param res {Respnse} The express response object
     * @param next {NextFunction} Execute the next method
     */
    public SaveNotes(req: Request, res: Response, next: NextFunction) {

        let _responseObject = {};
        let _self = this;
        let _alexaRequest = req.body.request;

        //When alexa is started using app key words
        if (_alexaRequest.type === "LaunchRequest") {
            _responseObject = this.BuildResponse({}, "I am ready to take some notes. Please begin giving me data", "You started notes taking application", false);
            res.json(_responseObject);
        }
        //when session of alex ends due to an error
        else if (_alexaRequest.type === "SessionEndedRequest") {
            if (req.body.request.reason === "ERROR")
                ApplicationLog.LogError(new Error('Alexa ended due to an error'));
        }
        // amazon intents in alexa requests
        else if ((_alexaRequest.type === "IntentRequest")) {

            let _alexaIntent = _alexaRequest.intent;
            if (_alexaIntent) {
                //if the request is custom event
                if (_alexaRequest.type === 'IntentRequest' && _alexaIntent.name === 'TakeNewNotesIntent') {
                    let _alexaSlots = _alexaIntent.slots;
                    //extract the slot value from the intent request
                    let _noteName = _alexaSlots.Subject.value;
                    let _noteText = _alexaSlots.NotesValue.value;

                    //save the value in the database
                    let _database = new Database();
                    _database.Insert(_noteName, _noteText)
                        .then((result) => {
                            _responseObject = this.BuildResponse({}, "Your notes were successfully saved in database", "Your notes were successfully saved in database", true);
                            res.json(_responseObject);
                        })
                        .catch((err) => {
                            _responseObject = this.BuildResponse({}, "There was some error in saving the notes", "There was some error in saving the notes", true);
                            res.json(_responseObject);
                        });
                }
                else if (_alexaRequest.type === 'IntentRequest' && _alexaIntent.name === 'RetrieveNotesIntent') {
                    let _alexaSlots = _alexaIntent.slots;
                    //extract the slot value from the intent request
                    let _noteName = _alexaSlots.Subject.value;

                    //save the value in the database
                    let _database = new Database();
                    _database.GetNotesBySubject(_noteName)
                        .then((result) => {
                            
                            if (Array.isArray(result))
                                _responseObject = this.BuildResponse({}, result[0].text, "Your notes were successfully retrieved from database", true);
                            else
                                _responseObject = this.BuildResponse({}, (<any>result).text, "Your notes were successfully retrieved from database", true);
                            res.json(_responseObject);
                        })
                        .catch((err) => {
                            _responseObject = this.BuildResponse({}, "There was some error in getting the notes", "There was some error in getting the notes", true);
                            res.json(_responseObject);
                        });
                }
                //if Help was asked to alexa
                else if (_alexaIntent.name === 'AMAZON.HelpIntent') {
                    _responseObject = this.BuildResponse({}, "You can ask me to save notes", "You started the Node.js Echo Notes API", true);
                    res.json(_responseObject);
                }
                // in case user wants to stop taking notes
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

    /**
     * Function to generate the response to Alexa
     * @param session this is the empty object for now but will need to be proper session object
     * @param speech this is what alexa will speak
     * @param card 
     * @param end to indicate if the session should end with the current response
     */
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
                    title: 'Orion Notes',
                    content: card
                },
                shouldEndSession: end
            }
        };
    }
}