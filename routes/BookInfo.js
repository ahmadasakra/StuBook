const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Konfigurieren Sie Multer entsprechend
const { UserBookInfoAdd } = require('../middleware/mail');
const Books = require('../Models/Books');
const Userbookinfo = require('../Models/UserBookInfo');
const router = express.Router();

router.post('/addBookinfo', upload.single('image'), async (req, res) => {
    try {
        var get = await Books.findOne({ title: { '$regex': `^${req.body.bookname}$`, $options: 'i' } });
        if (get) {
            return res.json({ status: 1, get });
        }

        const newBookInfo = {
            email: req.body.email,
            name: req.body.name,
            bookname: req.body.bookname,
            bookauthor: req.body.bookauthor || '', // Optional
            isbn: req.body.isbn || '',           // Hinzugefügt
            language: req.body.language,   // Hinzugefügt
            angebot: req.body.angebot,   // Hinzugefügt
            preis: req.body.preis,
            imagePath: req.file.path       // Hinzugefügt
        };

        await Userbookinfo.create(newBookInfo)
            .then(async () => {
                await UserBookInfoAdd(req.body.email, req.body.name, req.body.bookname, req.body.bookauthor, req.body.isbn, req.body.language, req.body.preis, req.body.angebot, req.file.path); // Pfad des Bildes hinzugefügt
                res.json({ status: 0 });
            })
            .catch((error) => {
                res.json({ status: -1, error: error });
            });

    } catch (error) {
        res.json({ status: -2, error: error });
    }
});

module.exports = router;
