# software-aargh

1. Screenshots of Swagger for your APIs in another server that provides the same set of functions accessible via REST APIs.

<img src="./Swagger API.png">

2. Source codes of server that provides the same set of functions accessible and client that makes use of the service via these REST APIs.

Server (Route)
```
var express = require('express');
var router = express.Router();

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
        res.send('');
        return;
    }
  }
  res.send('not found');
});

router.get('/watch', function(req, res, next) {
  // todo
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
Client
```
const axios = require('axios')
var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

const ENDPOINT = 'http://localhost:3000'

const printResponse = response => {
  const { status, data }= response;
  console.log('status:', status);
  console.log('data:', data);
}

const listBooks = async () => {
  const response = await axios.get(ENDPOINT+'/list');
  printResponse(response)
}

const insertBook = async (id, title, author) => {
  const response = await axios.post(ENDPOINT+'/insert', { id, title, author });
  printResponse(response)
}

const getBook = async id => {
  const response = await axios.get(ENDPOINT+`/get?id=${id}`);
  printResponse(response)
}

const deleteBook = async id => {
  const response = await axios.get(ENDPOINT+`/delete?id=${id}`);
  printResponse(response)
}

const watchBooks = () => {
  // TODO
}

if (command == 'list')
    listBooks();
else if (command == 'insert')
    insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
    getBook(process.argv[0]);
else if (command == 'delete')
    deleteBook(process.argv[0]);
else if (command == 'watch')
    watchBooks();
```

3. Compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a Table format as shown below.

| Functions  | gPRC | REST API |
| ------------- | ------------- | ------------- |
| List books | client.list({}, function(error, books) { printResponse(error, books); }); | await axios.get(ENDPOINT+'/list'); |
| Insert books | client.insert(book, function(error, empty) { printResponse(error, empty); }); | axios.post(ENDPOINT+'/insert', { id, title, author }) |
| Get books | client.get({ id: parseInt(id) }, function(error, book) { printResponse(error, book); }); | axios.get(ENDPOINT+`/get?id=${id}`); |
| Delete books | client.delete({ id: parseInt(id) }, function(error, empty) { printResponse(error, empty); }); | axios.get(ENDPOINT+`/delete?id=${id}`); |
| Watch books | call.on('data', function(book) { console.log(book); }); |

4. What are the main differences between REST API and gRPC?

REST API จะส่ง Request ด้วย HTTP Protocol เพื่อให้ server ทำงาน แล้วส่ง Response กลับมา
แต่ gRPC จะเรียกใช้ procedure จาก server ที่ทำงานอยู่โดยตรง

5. What is the benefits of introduce interface in front of the gRPC and REST API of the book services?



6. Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a
Table format as shown below.

| Functions  | gPRC | REST API |
| ------------- | ------------- | ------------- |
| List books | node client.js list | node client.js list |
| Insert books | node client insert 'id' 'title' 'author' | node client insert 'id' 'title' 'author' |
| Get books | node client.js get 'id' | node client.js get 'id' |
| Delete books | node client.js delete 'id' | node client.js delete 'id' | 
| Watch books | node client.js watch | node client.js watch |

7. Draw a component diagram representing the book services with and without interfaces.

