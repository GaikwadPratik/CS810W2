"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDb = require("mongodb");
const applicationLog = require("../ApplicationLog/ApplicationLog");
class Database {
    constructor() {
        this._dbClient = MongoDb.MongoClient;
        this._dbInstance = null;
        this._collectionName = 'notes';
        this._dbUserName = 'alexaskillsnotes';
        this._dbPassword = 'alexaskillsnotes';
        this._dbUrl = `mongodb://${this._dbUserName}:${this._dbPassword}@ds115583.mlab.com:15583/noteswithalexaskills`;
    }
    Connect() {
        return new Promise((resolve, reject) => {
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
    Insert(noteName, noteText) {
        return new Promise((resolve, reject) => {
            this.Connect()
                .then((result) => {
                if (result) {
                    let _collection = this._dbInstance.collection(this._collectionName);
                    let _note = {
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
    GetNotes() {
        return new Promise((resolve, reject) => {
            this.Connect()
                .then((result) => {
                if (result) {
                    let _collection = this._dbInstance.collection(this._collectionName);
                    _collection
                        .find()
                        .toArray()
                        .then((results) => {
                        let _notes = results.map((x) => {
                            let _note = new Note();
                            _note.name = x.name;
                            _note.text = x.text;
                            return _note;
                        });
                        resolve(_notes);
                    })
                        .catch((err) => {
                        reject();
                    });
                }
            })
                .catch((err) => {
                reject();
            });
        });
    }
}
exports.Database = Database;
class Note {
    constructor() {
        this.name = '';
        this.text = '';
    }
}
//# sourceMappingURL=Database.js.map