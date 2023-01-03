const {
  saveBook,
  showAllBooks,
  showSpecifiedBook,
  editBook,
  deleteBook,
  filterReading,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: saveBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: showAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: showSpecifiedBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
  // {
  //   method: "GET",
  //   path: "/books?reading={reading}",
  //   handler: filterReading,
  // },
];

module.exports = routes;
