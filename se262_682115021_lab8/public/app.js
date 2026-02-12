async function loadBooks() {
const res = await fetch("/books");
const books = await res.json();
const el = document.getElementById("book-list");
el.innerHTML = books.map(b => `<div>${b.bookNo}.
${b.bookName}</div>`).join("");
}
window.addEventListener("DOMContentLoaded", loadBooks);
async function searchBook() {
  const keyword = document.getElementById("searchInput").value;

  const response = await fetch(`/books/search?q=${keyword}`);
  const books = await response.json();

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.bookNo}: ${book.bookName}`;
    bookList.appendChild(li);
  });
}
async function loadBooks() {
  const response = await fetch("/books");
  const books = await response.json();

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${book.bookNo}: ${book.bookName}
      <button onclick="deleteBook(${book.bookNo})">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

async function deleteBook(bookNo) {
  await fetch(`/books/delete/${bookNo}`, {
    method: "POST",
  });

  loadBooks(); // โหลดใหม่หลังลบ
}
