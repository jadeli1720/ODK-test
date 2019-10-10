const router = require('express').Router();
const db = require('./usersDB');


router.post('/', (req, res) =>{
    const user = req.body;
    if (user) {
        db.add(user)
            .then(([user]) => res.status(201).json(user))
            .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
    }
});

module.exports = router;