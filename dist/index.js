"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const v4_1 = __importDefault(require("uuid/v4"));
const middleware_1 = require("./middleware");
var Entity_1 = require("./Entity");
exports.Entity = Entity_1.Entity;
var Column_1 = require("./decorators/Column");
exports.Column = Column_1.Column;
var Relation_1 = require("./decorators/Relation");
exports.ManyToOne = Relation_1.ManyToOne;
exports.OneToMany = Relation_1.OneToMany;
exports.OneToOne = Relation_1.OneToOne;
exports.ManyToMany = Relation_1.ManyToMany;
var middleware_2 = require("./middleware");
exports.mockMiddleware = middleware_2.mockMiddleware;
const log_1 = __importDefault(require("./utils/log"));
class Server {
    constructor(option) {
        this.tokens = new Set();
        const config = {
            port: 7001,
            outDir: ['./.mockCache'],
            quite: false
        };
        if (fs_1.default.existsSync(path_1.resolve('.', option.config))) {
            Object.assign(config, JSON.parse(fs_1.default.readFileSync(path_1.resolve('.', option.config), 'utf-8')));
        }
        this.config = Object.assign({}, config, {
            outDir: config.compilerOptions.outDir || config.include,
        });
        this.app = express_1.default();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
        this.app.get('/checkToken', (req, res) => {
            const token = req.get('authorization');
            if (!token || !this.tokens.has(token)) {
                return res.status(401).end();
            }
            return res.status(200).json({ token });
        });
        this.app.post('/signIn', (req, res) => {
            const { username, password } = req.body;
            if (!username ||
                !password ||
                username !== this.config.auth.username ||
                password !== this.config.auth.password) {
                return res.status(422).end();
            }
            const token = v4_1.default();
            this.tokens.add(token);
            return res.status(200).json({ token });
        });
        this.app.post('/signOut', (req, res) => {
            const token = req.get('authorization');
            if (!token) {
                return res.status(400).end();
            }
            this.tokens.delete(token);
            return res.status(200).end();
        });
        this.app.use((req, res, next) => {
            if ([...this.config.auth.whiteList, '/signIn'].indexOf(req.url) >= 0) {
                return next();
            }
            const token = req.get('authorization');
            if (!token || !this.tokens.has(token)) {
                return res.status(401).end();
            }
            next();
        });
        this.app.use(middleware_1.mockMiddleware(this.config));
        this.app.use((err, _, res) => {
            let status = 500;
            if (!Number.isNaN(Number.parseInt(err.message))) {
                status = Number.parseInt(err.message, 10);
            }
            res.status(status).end();
        });
        this.app.set('port', this.config.port);
    }
    run() {
        const server = http.createServer(this.app);
        server.listen(this.config.port, '127.0.0.1');
        const onError = (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = typeof this.config.port === 'string'
                ? 'Pipe ' + this.config.port
                : 'Port ' + this.config.port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    log_1.default.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    log_1.default.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        };
        const onListening = () => {
            const addr = server.address();
            const bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            log_1.default.info('Listening on ' + bind);
        };
        server.on('error', onError);
        server.on('listening', onListening);
    }
}
exports.Server = Server;
//# sourceMappingURL=index.js.map