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
    /* if (user) {
         db.add(user)
             .then(([user]) => res.status(201).json(user))
             .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
     }*/
});

function convertForm(req, res, next) {
    console.log('REQ.BODY FROM CONVERTER ', req.body);
    xform2json(req.body, function (err, form) {
        console.log('FORM ', form);
        if (form) {
            req.submission = {
                json: form,
                xml: req.body,
            };
            next();
        } else {
            res.status(500).json(err);
        }
    })
}

module.exports = router;