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

const watchBooks = async () => {
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
