import { connect } from 'mongoose'
import logger from '@shared/Logger'

const HOST = process.env.DB_HOST || 'localhost'
const PORT = process.env.DB_PORT || 27017
const NAME = process.env.DB_NAME || 'default'

const mount_db = () => {
    connect(`mongodb://${HOST}:${PORT}/${NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if(err) {
            logger.error(`DataBase Connection Error: ${HOST}:${PORT}/${NAME}`);
            return;
        }

        logger.info(`DataBase Connected: ${HOST}:${PORT}/${NAME}`)
    });
}

export default mount_db