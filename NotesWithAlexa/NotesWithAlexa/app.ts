import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as applicationLog from './ServerCode/ApplicationLog/ApplicationLog';
import { Routes } from './ServerCode/Routes/Routes';


export class Server {

    /**
     * private instance of express app
     * @class Server
     * @field
     */
    private expressApp: express.Application = null;

    /**
     * returns instance of express application
     * @class Server
     * @property
     */
    public get ExpressApp() {
        return this.expressApp;
    }

    /**
     * Constructor
     * @class Server
     * @constructor
     */
    constructor() {
        //Initiate instance of express app
        this.expressApp = express();

        //Configure application for the first use.
        this.Config();

        //Add routes
        this.Routes();
    }

    /**
     * To configure application
     * @class Server
     * @method Config
     */
    private Config() {

        //use json form parser middleware
        this.expressApp.use(bodyParser.json({            
            verify: function getRawBody(req, res, buf) {
                //(req as any).rawBody = buf.toString();
                req['rawBody'] = buf.toString();
            }
        }));

        //cookie parsing middleware
        this.expressApp.use(cookieParser());

        //use query string parser middleware
        this.expressApp.use(bodyParser.urlencoded({
            extended: true
        }));

        //forward 404 to error handler
        this.expressApp.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
            applicationLog.LogError(err);
        });
    }

    /**
     * Routes of the  application
     * @class Server
     * @method Routes
     */
    private Routes() {
        let router: express.Router = express.Router();
        new Routes().CreateRoutes(router);
        this.expressApp.use(router);
    }
}

let _expressApp: express.Application = new Server().ExpressApp;

//Set port number
let _httpPort: number = 80;

//set port
_expressApp.set('port', (process.env.PORT || _httpPort));

//Start the server and listen on the port
//TODO:: to convert to HTTPS
let _httpServer = http.createServer(_expressApp);

_expressApp.listen(_expressApp.get('port'), function () {
    applicationLog.LogDebug("We've now got a server to take notes!");
});

//if any errors in the server
_httpServer.on('error', (error: Error) => {
    applicationLog.LogException(error);
});