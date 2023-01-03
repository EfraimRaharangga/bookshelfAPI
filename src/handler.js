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
  const insertAt = new Date().toISOString();
  const updateAt = insertAt;

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
    readPage,
    insertAt,
    updateAt,
  };

  datas.push(newData);

  //memberikan respon

  if (name === false || name === undefined) {
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

const showAllBooks = () => ({
  status: "success",
  data: {
    datas,
  },
});

const showSpecifiedBook = (request, h) => {
  const { bookId } = request.params;
  const data = datas.filter((n) => n.id === bookId)[0];

  if (data !== undefined) {
    return {
      status: "success",
      data: {
        data,
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
  const updateAt = new Date().toISOString();

  const index = datas.findIndex((data) => data.id == bookId);

  //responnya
  if (name === false || name === undefined) {
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
      updateAt,
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

const filterReading = (request, h) => {
  const { reading } = request.params;
};

module.exports = {
  saveBook,
  showAllBooks,
  showSpecifiedBook,
  editBook,
  deleteBook,
  filterReading,
};
