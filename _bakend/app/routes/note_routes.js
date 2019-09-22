const ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ "error": "Error" })
            } else {
                res.send(item)
            }
        })
    });
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ "error": "Error" })
            } else {
                res.send(`Note ${id} deleted`)
            }
        })
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const text = req.body.body;
        const title = req.body.title;
        if (!text || !title) {
            res.send({ "error": "Both fields are required!" })
        } else {
            const note = { title: req.body.title, text: req.body.body }
            db.collection('notes').update(details, note, (err, item) => {
                if (err) {
                    res.send({ "error": "Error" })
                } else {
                    res.send(note)
                }
            })
        }
    });
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};