"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const applicationLog = require("./ServerCode/ApplicationLog/ApplicationLog");
const Routes_1 = require("./ServerCode/Routes/Routes");
class Server {
    constructor() {
        this.expressApp = null;
        this.expressApp = express();
        this.Config();
        this.Routes();
    }
    get ExpressApp() {
        return this.expressApp;
    }
    Config() {
        this.expressApp.use(bodyParser.json({
            verify: function getRawBody(req, res, buf) {
                req['rawBody'] = buf.toString();
            }
        }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(bodyParser.urlencoded({
            extended: true
        }));
        this.expressApp.use((err, req, res, next) => {
            err.status = 404;
            next(err);
            applicationLog.LogError(err);
        });
    }
    Routes() {
        let router = express.Router();
        new Routes_1.Routes().CreateRoutes(router);
        this.expressApp.use(router);
    }
}
exports.Server = Server;
let _expressApp = new Server().ExpressApp;
let _httpPort = 80;
_expressApp.set('port', (process.env.PORT || _httpPort));
let _httpServer = http.createServer(_expressApp);
_expressApp.listen(_expressApp.get('port'), function () {
    console.log("We've now got a server to take notes!");
});
_httpServer.listen(_httpPort, function () {
    let addr = _httpServer.address();
    let listeningPort = typeof (addr) === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    applicationLog.LogInfo(`Listening on port ${listeningPort}`);
});
_httpServer.on('error', (error) => {
    applicationLog.LogException(error);
});
//# sourceMappingURL=app.js.map