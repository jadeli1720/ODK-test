const router = require('express').Router();
const db = require('./usersDB');
const xform2json = require('xform-to-json');

router.post('/', (req, res) => {
    const user = req.body;
    console.log('hello heroku ', req.body);
    if (user) {
        db.add(user)
            .then(([user]) => res.status(201).json(user))
            .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
    }
});

router.post('/odk/', convertForm, (req, res) => {
    const user = req.body;

    console.log("req.submission ", req.submission);
    console.log("req.submission.json ", req.submission.json);
    res.status(200).json(req.body);
    /* if (user) {
         db.add(user)
             .then(([user]) => res.status(201).json(user))
             .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
     }*/
});


function convertForm(req, res, next) {
    console.log('REQ.BODY FROM CONVERTER ', req.body);

    const userId = req.query.id;
    const id = req.params.id;
    const meta = {
        id: id,
        userId: userId,
    };
    console.log('QUERT.ID ', userId);
    console.log('ID ', id);

    xform2json(req.body, meta, function (err, form) {
        console.log('FORM ', form);
            req.submission = {
                json: form,
                xml: req.body,
                metaData: meta.userId
            };
            next();
    });
    next();
}

module.exports = router;