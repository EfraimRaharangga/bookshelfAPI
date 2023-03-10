const { nanoid } = require("nanoid");
const datas = require("./datas");

const saveBook = (request, h) => {
  // data yang diambil
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  //data yang dibuat
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }

  // import data ke datas.js
  const newData = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    readPage,
    insertedAt,
    updatedAt,
  };

  //memberikan respon

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else if (datas.filter((data) => data.id === id)) {
    datas.push(newData);
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const showAllBooks = (request, h) => {
  const query = request.query;

  if (query.reading == 1) {
    const book = datas
      .filter((data) => data.reading == true)
      .map((data) => {
        return { id: data.id, name: data.name, publisher: data.publisher };
      });
    const response = {
      status: "success",
      data: {
        books: book,
      },
    };
    return response;
  } else if (query.reading == 0) {
    const book = datas
      .filter((data) => data.reading == false)
      .map((data) => {
        return { id: data.id, name: data.name, publisher: data.publisher };
      });
    const response = {
      status: "success",
      data: {
        books: book,
      },
    };
    return response;
  } else if (query.finished == 0) {
    const book = datas
      .filter((data) => data.finished == false)
      .map((data) => {
        return { id: data.id, name: data.name, publisher: data.publisher };
      });
    const response = {
      status: "success",
      data: {
        books: book,
      },
    };
    return response;
  } else if (query.finished == 1) {
    const book = datas
      .filter((data) => data.finished == true)
      .map((data) => {
        return { id: data.id, name: data.name, publisher: data.publisher };
      });
    const response = {
      status: "success",
      data: {
        books: book,
      },
    };
    return response;
  }
};

const showSpecifiedBook = (request, h) => {
  const { bookId } = request.params;
  const data = datas.filter((n) => n.id === bookId)[0];

  if (data !== undefined) {
    return {
      status: "success",
      data: {
        book: data,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBook = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = datas.findIndex((data) => data.id == bookId);

  //responnya
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  } else if (index !== -1) {
    datas[index] = {
      ...datas[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  index = datas.findIndex((data) => data.id === bookId);

  //responnya
  if (index !== -1) {
    datas.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  saveBook,
  showAllBooks,
  showSpecifiedBook,
  editBook,
  deleteBook,
};
