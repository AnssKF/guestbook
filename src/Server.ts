import cookieParser from 'cookie-parser';
import { json as JSONBodyParser } from 'body-parser'
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors'

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import mount_db from '@shared/db'


// Init express
const app = express();

// Start DB
mount_db()

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(JSONBodyParser());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use(cors({
    origin: ['http://localhost:3000']
}))

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve static content
 ***********************************************************************************/

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Export express instance
export default app;
