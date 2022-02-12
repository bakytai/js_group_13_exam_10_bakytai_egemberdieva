const express = require('express');
const cors = require('cors');
const db = require('./mysqlDb');
const news = require('./app/news');
const comments = require('./app/comments');
const app = express();
const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', news);
app.use('/comments', comments);

const run = async () => {
    await db.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(e => console.log(e));