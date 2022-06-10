const express = require('express');
const corsMiddlewares = require('../cors/index');
const { dbConnection } = require('../database/config.db');



class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;
        this.userPath = '/api/user'

        //connect db
        this.databaseConnect();

        //middlewares
        this.middlewares();

        //rutas de la app
        this.routes();
    }

    async databaseConnect(){
        await dbConnection();
    }

    middlewares() {
        //Cors

        this.app.options('*',corsMiddlewares);
        this.app.use(corsMiddlewares);
        

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server enabled in the Port ${this.port}`));
    }
}

module.exports = Server;