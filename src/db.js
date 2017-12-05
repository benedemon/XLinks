import mysql from 'mysql2/promise';

const readPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    database: process.env.DB_NAME,
    timezone: 'ist',
    charset: 'utf8mb4',
});

const writePool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    database: process.env.DB_NAME,
    timezone: 'ist',
    charset: 'utf8mb4',
});

readPool.on('error', (err) => {
    console.error(err);
    throw err;
});


writePool.on('error', (err) => {
    console.error(err);
    throw err;
});


export {
    readPool,
    writePool,
};