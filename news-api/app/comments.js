const express = require('express');
const db = require('../mysqlDb');

const router = express.Router();

router.get('/', async ( req, res,next) => {
    try {
        let query = 'SELECT * FROM comments';

        if (req.query.news_id) {
            query += ` WHERE news_id = ${req.query.news_id}`;
        }

        let [comments] = await db.getConnection().execute(query);

        return  res.send(comments);
    } catch (e) {
        next(e)
    }
});

router.post('/', async (req, res,next) => {
    try {
        const comment = {
            news_id: req.body.news_id,
            author: req.body.author,
            comment: req.body.comment,
        };

        let query = 'INSERT INTO comments (news_id,author,comment) VALUES (?,?,?)';

        const [results] = await db.getConnection().execute(query, [
            comment.news_id,
            comment.author,
            comment.comment
        ]);

        const id = results.insertId;

        return  res.send({message: 'Created new comment', id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res,next) => {
    try {
        await db.getConnection().execute('DELETE FROM comments WHERE id = ?', [req.params.id]);

        return  res.send({message: 'deleted this comment'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;