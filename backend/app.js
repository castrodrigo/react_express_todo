
let express = require('express');
let app = express();
let router = require('./router');
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('config');

let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
router(app);

app.listen(config.Port);
console.log("Running on " + config.Port);

module.exports = app;
