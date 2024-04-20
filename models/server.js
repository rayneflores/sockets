const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require("./sockets");
const cors = require('cors');

class Server {
    constructor() {
        // app
        this.app = express();
        this.port = process.env.PORT || 8080;

        // Http Server
        this.server = http.createServer(this.app);

        // Socket
        this.io = socketio(this.server, { /* Configs */});
    }

    middlewares() {
        // Deploy public path
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // Enable CORS
        this.app.use(cors());
    }

    configureSocket() {
        new Sockets(this.io);
    }

    execute() {

        // Initialize Middlewares
        this.middlewares();

        this.configureSocket();

        // Initialize Server
        this.server.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`);
        });
    }
}

module.exports = Server;