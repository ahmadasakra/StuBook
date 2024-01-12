const express = require('express');
const multer = require("multer");
const upload = require('../middleware/uploadImage');
const Books = require('../Models/Books');
const BooksImage = require('../Models/BooksImage');
const path = require('path');
const fs = require('fs');

const router = express.Router();


router.get('/sendbooks/:specific', async (req, res) => {
    try {
        var cat = req.params.specific;
        if (cat === 'All') {
            var bookdata = await Books.find({}).sort({ _id: -1 }).limit(10);
            return res.json({ status: 0, bookdata });
        } else {
            var bookdata = await Books.find({ category: cat }).limit(10);
            res.json({ status: 0, bookdata });
        }
    } catch (error) {
        res.json({ status: -2 });
    }
})

router.get('/bookcategory/:specific', async (req, res) => {
    try {
        var cat = req.params.specific;
        // console.log(cat);
        if (cat === 'All') {
            var bookdata = await Books.find({});
            return res.json({ status: 0, bookdata });
        } else {
            var bookdata = await Books.find({ category: cat });
            res.json({ status: 0, bookdata });
        }
    } catch (error) {
        res.json({ status: -2 });
    }
})

router.post('/image', async (req, res) => {
    // console.log(req.body);

    try {
        const image = await BooksImage.findOne({ title: req.body.title, bookId: req.body.bookId });
        if (!image) {
            return res.json({ status: -1 });
        }

        res.json({ status: 0, image: image['img'] });
    } catch (error) {

        res.json({ status: -2 });
    }

})

router.post('/update/image', upload.single('img'), async (req, res) => {
    try {
        // Überprüfen Sie, ob eine Datei hochgeladen wurde
        if (!req.file) {
            return res.status(400).json({ status: -1, message: 'Kein Bild hochgeladen' });
        }

        // Pfad der hochgeladenen Datei
        const filePath = req.file.path;

        // Hier können Sie den Code zum Speichern der Bildinformationen in Ihrer Datenbank hinzufügen
        // Zum Beispiel: Speichern des Bildpfads in der Datenbank
        const newImage = await BooksImage.create({
            bookId: req.body.bookId, // Angenommen, Sie senden die Buch-ID im Body der Anfrage
            imagePath: filePath
        });

        res.json({ status: 0, message: 'Bild erfolgreich hochgeladen', imageId: newImage._id });
    } catch (error) {
        console.error("Fehler beim Hochladen des Bildes:", error);
        res.status(500).json({ status: -2, error: error.message });
    }
});


module.exports = router;
