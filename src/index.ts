import express from 'express';
import 'dotenv/config';
import { Application } from 'express';
import morgan from 'morgan';
import { logStream, logger } from './utils/logger';
import path from 'path';
import routes from './routes/routes';
import "reflect-metadata";
import connection from './config/database';

const port = process.env.PORT as number | undefined;
// Create an Express application
const app: Application = express();

// Set the view engine to Pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../', 'views'))
app.use(express.static(path.join(__dirname, '../', 'public')))

//Middleware fun parses incoming JSON payloads.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use morgan for request logging
app.use(morgan('combined', { stream: logStream }))

// Define a route
app.use('/', routes);

const start = async (): Promise<void> => {
    try {
        //Initialize DB connection and Automatically migrate tables & columns
        await connection.sync({ alter: true });
        
        // Start the server
        app.listen(port, () => {
            logger.info(`server listing http://localhost: ` + port);
        })
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

void start();


