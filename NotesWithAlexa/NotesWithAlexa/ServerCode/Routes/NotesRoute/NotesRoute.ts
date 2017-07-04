import { NextFunction, Request, Response } from 'express';
import * as Path from 'path';
import * as applicationLog from '../../ApplicationLog/ApplicationLog';
import { Database } from '../../Model/Database';

export class NotesRoute {

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
        let _noteName = req.body.name;
        let _noteText = req.body.text;

        let _database = new Database();
        _database.Insert(_noteName, _noteText)
            .then((result) => {
                res.send(true);
            })
            .catch((err) => {
                res.send(false);
            })
    }
}