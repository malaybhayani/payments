var http  = require('http');
var path = require('path');

// const expressOasGenerator = require('express-oas-generator');

var express    = require('express');              //creation of web applications
var debug      = require('debug')('api:server');

var validator  = require('express-validator');
var bodyParser = require('body-parser');
var cors       = require('cors');                 // Connect/Express middleware
var multer =  require('multer');                  // form uploading 

var config          = require('./config');
var utils           = require('./lib');
var authorize       = require('./lib/authorize');
var multipart       = require('./lib/multipart');
var storeMediaFiles = require('./lib/store-media');
var routes          = require('./routes');

var app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJDOC = require("swagger-jsdoc");
swaggerDocument = require("./swagger.json");

var server;

var options = {
  swaggerOptions: {
    validatorUrl: null
  }
};
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Service Settings
app.disable('x-powered-by');
app.set('port', config.PORT);





// PRODUCTION Environment settings
if(config.NODE_ENV === 'production'){
  app.enable('trust proxy', 1);
}

// expressOasGenerator.init(app, {});

/**
 * Set Up File uplaod
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.MEDIA.UPLOADES)
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})
app.use(upload.any());
// Documentation resource
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(express.static('public'));
app.use(express.static('docs'));
//app.use(express.static('uploads'));
app.use('/public/uploads', express.static('uploads'));
app.use(cors(config.CORS_OPTS));
app.use(authorize().unless({ path: routes.OPEN_ENDPOINTS } ));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(multipart({
  limits: {
    files: 1,
    fileSize: config.MEDIA.FILE_SIZE
  },
  immediate: true
}));
//app.use(storeMediaFiles());
app.use(validator());





// Init routes
routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Resource Requested Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (config.ENV === 'development') {
  app.use(function(err, req, res, next) {
    var status = err.status || 500;

    res.status(status).json({
      error: {
        status: status,
        type: err.name,
        message: err.message
      },
      raw: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var status = err.status || 500;

  res.status(status).json({
    error: {
      status: status,
      type: err.name,
      message: err.message
    }
  });
});


/**
 * Create HTTP server.
 */

server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(config.PORT);

server.on('error', utils.onError(config.PORT));
server.on('listening', utils.onListening(server));

module.exports = app;