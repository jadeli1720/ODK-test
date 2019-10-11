const router = require('express').Router();
const db = require('./usersDB');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const multer = require('multer');

const storage = {
    dest: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
};
const upload = multer(storage);

router.post('/', (req, res) => {
    const user = req.body;
    console.log('body ', req.body);
    console.log('hello heroku ', req.body);
    if (user) {
        db.add(user)
            .then(([user]) => res.status(201).json(user))
            .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
    }
});

router.post('/odk/', upload.single('file'), (req, res) => {
    console.log('BODY ', req.body);
    console.log('FILE ', req.file);

    const path = req.file.path;
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
        if (err) throw err;
        console.log('Data XML ', data);
        parser.parseString(data, function (err, result) {
            console.log('FROM XML TO JSON ', result);
            const {'h:html': root} = result;
            const {'h:head': head} = root;
            const headData = head[0];
            const {'model': model} = headData;
            const modelData = model[0];
            const {'instance': instance} = modelData;
            const instanceData = instance[0];
            const {'data': data} = instanceData;
            const {'username': username} = data[0];
            const {'password': password} = data[0];
            const user = {
              username: username,
              password: password,
            };
            console.log('username ', username, 'password ', password);
            if (user) {
                db.add(user)
                    .then(([user]) => res.status(201).json(user))
                    .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
            }
            res.status(200).json(user);
        })
    });
});

module.exports = router;