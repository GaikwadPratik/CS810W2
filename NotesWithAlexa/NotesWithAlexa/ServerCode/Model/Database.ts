import * as MongoDb from 'mongodb';
import * as applicationLog from '../ApplicationLog/ApplicationLog';

export class Database {
    private _dbClient = MongoDb.MongoClient;
    private _dbInstance: MongoDb.Db = null;
    private _collectionName: string = 'notes';
    private _dbUserName: string = 'alexaskillsnotes';
    private _dbPassword: string = 'alexaskillsnotes';
    private _dbUrl = `mongodb://${this._dbUserName}:${this._dbPassword}@ds115583.mlab.com:15583/noteswithalexaskills`;

    /*
     * Create the database instance if not created
    */
    private Connect() {
        return new Promise<boolean>((resolve, reject) => {
            if (!this._dbInstance)
                this._dbClient
                    .connect(this._dbUrl)
                    .then((db) => {
                        this._dbInstance = db;
                        resolve(true);
                    })
                    .catch((err) => {
                        applicationLog.LogError(err);
                        reject(false);
                    });
        });
    }

    public Insert(noteName: string, noteText: string) {
        return new Promise((resolve, reject) => {

            this.Connect()
                .then((result) => {
                    if (result) {
                        let _collection = this._dbInstance.collection(this._collectionName);
                        let _note: Note = {
                            name: noteName,
                            text: noteText
                        };

                        _collection
                            .insertOne(_note)
                            .then((result) => {
                                resolve();
                            })
                            .catch((err) => {
                                reject();
                            });
                    }
                });
        });
    }

    public GetNotes() {
        return new Promise((resolve, reject) => {
            this.Connect()
                .then((result) => {
                    if (result) {
                        let _collection = this._dbInstance.collection(this._collectionName);
                        _collection
                            .find()
                            .toArray()
                            .then((results) => {
                                let _notes: Array<Note> = results.map((x: any) => {
                                    let _note = new Note();
                                    _note.name = x.name;
                                    _note.text = x.text;
                                    return _note;
                                });

                                resolve(_notes);
                            })
                            .catch((err) => {
                                applicationLog.LogError(err);
                                reject();
                            })
                    }
                })
                .catch((err) => {
                    reject();
                })
        });
    }

    public GetNotesBySubject(subjectName: string) {
        return new Promise((resolve, reject) => {
            this.Connect()
                .then((result) => {
                    if (result) {
                        let _collection = this._dbInstance.collection(this._collectionName);
                        _collection
                            .find({ name: subjectName })
                            .toArray()
                            .then((results) => {
                                let _notes: Array<Note> = results.map((x: Note) => {
                                    let _note = new Note();
                                    _note.name = x.name;
                                    _note.text = x.text;
                                    return _note;
                                });

                                resolve(_notes);
                            })
                            .catch((err) => {
                                reject();
                            })
                    }
                })
                .catch((err) => {
                    reject();
                })
        });
    }
}

class Note {
    name: string = '';
    text: string = '';
}