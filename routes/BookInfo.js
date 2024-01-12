const express = require('express');
const { UserBookInfoAdd } = require('../middleware/mail');
const Books = require('../Models/Books');
const Userbookinfo = require('../Models/UserBookInfo');
const router = express.Router();
const upload = require('../middleware/uploadImage');

router.post('/addBookinfo', upload.single('img'),async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: -11, message: 'Image file is required' });
    }

    try {    
        var get = await Books.findOne({title: {'$regex': `^${req.body.bookname}$`,$options:'i'}})
        if(get){
            return res.json({status:1,get});
        }

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

        await Userbookinfo.create({
            email: req.body.email,
            name: req.body.name,
            bookname: req.body.bookname,
            bookauthor: req.body.bookauthor
        })
            .then(async () => {
                await UserBookInfoAdd(req.body.email, req.body.name, req.body.bookname, req.body.bookauthor, imgPath)
                res.json({ status: 0 });
            })
            .catch((error) => {
                res.json({ status: -1,error:error });
            })

    } catch (error) {
        res.json({ status: -2 });
    }
})


module.exports = router;
