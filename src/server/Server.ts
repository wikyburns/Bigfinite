import express = require('express');
import bodyParser = require('body-parser');
import router from '../router/router';
import AWS from "aws-sdk";
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    private constructor(port: number) {
        this.port = port;
        this.app = express();

    }

    public static get instance() {
        return this._instance || (this._instance = new this(Number(process.env.SERVER_PORT)));
    }

    private parse() {
        // parse application/json
        this.app.use(bodyParser.json());

        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private router() {
        this.app.use(router);
    }

    private cognito() {
        AWS.config.region = 'eu-central-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'eu-central-1:e156a9a9-3e61-452c-ab38-3e9a2db7e0b7',
        });
    }

    private cors() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ")
            next();
        });
    }

    private AWS() {

        AWS.config.update({
            region: "eu-west-3"
        });
    }

    start() {
        this.parse();
        this.AWS();
        this.cors();
        this.router();
        this.app.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log('Server listen on port', this.port);
            module.exports.handler = serverless(this.app);

        })
    }
}
