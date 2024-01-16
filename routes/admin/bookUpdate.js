const express = require('express');
const multer = require('multer');
const upload = require('../../middleware/uploadImage');
const Books = require('../../Models/Books');
const BooksImage = require('../../Models/BooksImage');
const path = require('path');
const fs = require('fs');
const jwtaccess = require('../../middleware/authaccess');
const { authenticate } = require('../../middleware/authenticateAdmin');
const { error } = require('console');

const router = express.Router();


router.post('/addbook', jwtaccess, upload.single('img'), async (req, res) => {
    if (!authenticate(req.userid)) {
        return res.status(403).json({ status: -10, message: 'Unauthorized access' });
    }

    if (!req.file) {
        return res.status(400).json({ status: -11, message: 'Image file is required' });
    }

    try {
        const book = new Books({
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            angebot: req.body.angebot,
            publication: req.body.publication,
            preis: req.body.preis,
            category: req.body.category,
            url: req.body.url,
            contactName: req.body.contactName,
            email: req.body.email
        });

        const savedBook = await book.save();

        const imgPath = req.file.path;
        const bookImage = new BooksImage({
            title: req.body.title,
            bookId: savedBook._id,
            img: {
                data: fs.readFileSync(imgPath),
                contentType: req.file.mimetype // Using the uploaded file's mimetype
            }
        });

        await bookImage.save();
        fs.unlinkSync(imgPath); // Delete the file after saving to DB

        res.json({ status: 0, message: 'Book added successfully' });

        console.log(req.file);
        console.log(req.body);

    } catch (error) {
        console.error("Error in /addbook:", error);
        res.status(500).json({ status: -1, error: error.message });
    }
});

router.post('/update/image', jwtaccess, upload.single('img'), async (req, res) => {
    console.log("Buch-ID:", req.headers.id);
    console.log("Empfangenes Bild:", req.file);

    try {
        if (!authenticate(req.userid)) {
            return res.status(400).json({ status: -10 });
        }
        await BooksImage.findOneAndUpdate({ bookId: req.headers.id }, {
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        });
        fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
        res.status(200).json({ status: 0 });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Bildes:", error);
        res.status(500).json({ status: -1, error: error.message });
    }
})

router.post('/update/data', jwtaccess, async (req, res) => {
    try {
        if (!authenticate(req.userid)) {
            return res.status(400).json({ status: -10 });
        }
        await Books.findByIdAndUpdate({ _id: req.headers.id }, {
            language: req.body.language,
            angebot: req.body.angebot,
            publication: req.body.publication,
            category: req.body.category,
            contactName: req.body.contactName,
            email: req.body.email
        });
        res.status(200).json({ status: 0 });
    } catch (error) {
        res.status(500).json({ status: -1 });
    }
})

router.delete('/deletebook/:id', jwtaccess, async (req, res) => {
    if (!authenticate(req.userid)) {
        return res.status(403).json({ status: -10, message: 'Unauthorized access' });
    }

    try {
        const bookId = req.params.id;
        await BooksImage.deleteMany({ bookId: bookId });
        await Books.findByIdAndDelete(bookId);
        res.json({status: 0, message: 'Buch erfolgreich gelöscht!'});
    } catch (error) {
        console.error("Error in /deleteBook", error);
        if (!res.headersSent) {
            res.status(500).json({ status: -1, error: error.message });
        }
    }
});

module.exports = router;
