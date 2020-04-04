const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { init: initCommon } = require('../google-doc-common/index');
initCommon(process.env)

const server = app.listen(config.port, () => {
    logger.info(`Starting server on port ${config.port}`);
    logger.info(`Serer Started.. Listening to port ${config.port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = error => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});