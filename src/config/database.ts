import {Sequelize} from 'sequelize-typescript';
import {Chats} from '../models/chats.model';
import {Meetings} from '../models/meetings.model';

const connection = new Sequelize({
    dialect:'postgres',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_NAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    logging: false,
    models: [Chats,Meetings]
});

export default connection;