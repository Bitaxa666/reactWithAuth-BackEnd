/**
 * Created by user on 4/24/18.
 */
/*https://www.goodreads.com/api/keys - page with key*/
import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';
import Book from '../models/Book';
import parseErrors from '../utils/parseErrors';


//////////////////////*Mock*///////////////
/*res.json({
 books: [{
 goodreadsId: 1,
 title: "1984",
 authors: "Orwell",
 covers: [
 "https://img.thriftbooks.com/api/images/l/7022ba0055236f828f53368cf430d8938c7af04e.jpg",
 "https://pictures.abebooks.com/isbn/9780307465351-us.jpg"
 ],
 pages: 198
 }, {
 goodreadsId: 2,
 title: "Three Men in a bOAT",
 authors: "Orwell",
 covers: [
 "https://vignette.wikia.nocookie.net/stephenking/images/6/62/The-Green-Mile-by-Stephen-King.jpg/revision/latest?cb=20140421092321",
 "https://images-na.ssl-images-amazon.com/images/I/51X2tJuK0bL.jpg"
 ],
 pages: 256
 }]
 })*/
/////////////*/////////////////////////
const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
    Book.find({ userId: req.currentUser._id }).then(books => {console.log(books); res.json({ books })});

});

router.delete(`/:id`, (req, res) => {
    console.log(req.currentUser._id);
    Book.findByIdAndRemove({_id: req.params.id})
                .then(res.status(200))
                /*.then(Book.find({userId: req.currentUser._id &&})).then(books => res.json({ books }))
                .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
                /!*Book.find({ userId: req.currentUser._id }).then(books => res.json({ books })))*!/*/
});


router.post("/", (req, res) => {
    Book.create({ ...req.body.book, userId: req.currentUser._id })
        .then(book => res.json({ book }))
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.get("/search", (req, res) => {
    request.get(`https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`)
        .then(result => parseString(result, (err, goodreadsResult) =>
            res.json({
                books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
                    work => ({
                        goodreadsId: work.best_book[0].id[0]._,
                        title: work.best_book[0].title[0],
                        authors: work.best_book[0].author[0].name[0],
                        covers: [
                            work.best_book[0].image_url[0]
                ]
            }))
        })
    ));

});

router.get("/fetchPages", (req, res) => {
    const goodreadsId = req.query.goodreadsId;
    request
        .get(`https://www.goodreads.com/book/show.xml?key=${process.env.GOODREADS_KEY}&id=${goodreadsId}`)
        .then(result => parseString(result, (err, goodreadsResult) => {
            const numPages = goodreadsResult.GoodreadsResponse.book[0].num_pages[0];
            const pages = numPages ? parseInt(numPages, 10) : 0;
            res.json({
                pages
            });
        })
        );
});


export default router;