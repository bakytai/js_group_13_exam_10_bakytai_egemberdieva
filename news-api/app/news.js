const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const { nanoid } = require('nanoid');
const db = require('../mysqlDb');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async ( req, res,next) => {
    try {
        let query = 'SELECT * FROM news';

        if (req.query.filter === 'image') {
            query += ' WHERE image IS NOT NULL';
        }

        if (req.query.direction === 'desc') {
            query += ' ORDER BY id DESC';
        }

        let [news] = await db.getConnection().execute(query);
        let arr = [];
        news.forEach(item => {
            arr.push({id: item.id,title: item.title, date: item.date, image: item.image});
            return arr;
        });

        return  res.send(arr);
    } catch (e) {
        next(e)
    }
});

router.get('/:id', async (req, res,next) => {
    try {
        const [news] = await db.getConnection().execute('SELECT * FROM news WHERE id = ?', [req.params.id]);

        const oneNews = news[0];
        if (!oneNews) {
            return  res.status(404).send({message: 'Not found'});
        }
        return  res.send(oneNews);
    } catch (e) {
        next(e);
    }
});

router.post('/', upload.single('image'), async (req, res,next) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).send({message: 'Wrong news'});
        }

        const news = {
            title: req.body.title,
            content: req.body.content,
            date: new Date().toISOString(),
            image: null,
        };

        if (req.file) {
            news.image = req.file.filename;
        }

        let query = 'INSERT INTO news (title,content,date,image) VALUES (?,?,?,?)';

        const [results] = await db.getConnection().execute(query, [
            news.title,
            news.content,
            news.date,
            news.image
        ]);

        const id = results.insertId;

        return  res.send({message: 'Created news', id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res,next) => {
    try {
        await db.getConnection().execute('DELETE FROM news WHERE id = ?', [req.params.id]);

        return  res.send({message: 'deleted this news'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;