var express = require('express');
var router = express.Router();
var events = require('events');
var bookStream = new events.EventEmitter();

var books = [{
  id: 123,
  title: 'A Tale of Two Cities',
  author: 'Charles Dickens'
}];

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.json(books);
});

router.post('/insert', function(req, res, next) {
  const { id, title, author } = req.body;
  books.push({ id, title, author });
  // bookStream.emit('new_book', books);
  res.send('');
});

router.get('/get', function(req, res, next) {
  // id: parseInt(id)
  const { id } = req.query;
  const book = books.filter(({ id: _id }) => _id == id)
  if(book.length === 0) res.send('not found');
  else res.json(book[0]);
});

router.get('/delete', function(req, res, next) {
  // id: parseInt(id)
  const { id } = req.query;
  for (var i = 0; i < books.length; i++) {
    console.log(books[i].id, id , books[i].id == id)
    if (books[i].id == id) {
        books.splice(i, 1);
        // bookStream.emit('new_book', books);
        res.send('');
        return;
    }
  }
  res.send('not found');
});

router.get('/watch', function(req, res, next) {
  // todo
  // bookStream.on('new_book', (book) => {
  //   console.log('book', book)
  //   res.send(book);
  //   console.log('booksss')
  // });
  res.render('index', { title: 'Express' });
});

module.exports = router;
