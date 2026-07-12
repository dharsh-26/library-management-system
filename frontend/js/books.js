// js/books.js

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first!");
    window.location.href = "login.html";
}

const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

const bookId = document.getElementById("bookId");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");


// Load all books
async function loadBooks() {

    try {

        const response = await fetch("http://localhost:5000/api/books", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const books = await response.json();

        bookTableBody.innerHTML = "";

        books.forEach((book) => {

            bookTableBody.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.isbn}</td>
                <td>${book.quantity}</td>
                <td>${book.status}</td>

                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editBook('${book._id}')">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteBook('${book._id}')">
                        Delete
                    </button>
                </td>
            </tr>
            `;
        });


    } catch(error) {

        console.log(error);

    }

}



// Add or Update Book
bookForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const bookData = {

        title: document.getElementById("title").value,

        author: document.getElementById("author").value,

        category: document.getElementById("category").value,

        isbn: document.getElementById("isbn").value,

        quantity: document.getElementById("quantity").value,

        status: document.getElementById("status").value

    };


    try {


        let response;


        // Update existing book
        if(bookId.value){

            response = await fetch(
                `http://localhost:5000/api/books/${bookId.value}`,
                {
                    method:"PUT",

                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },

                    body:JSON.stringify(bookData)
                }
            );


        }

        // Add new book
        else{


            response = await fetch(
                "http://localhost:5000/api/books",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },

                    body:JSON.stringify(bookData)
                }
            );

        }



        const data = await response.json();


        alert(data.message);


        bookForm.reset();

        bookId.value="";

        submitBtn.innerText="Add Book";

        cancelBtn.style.display="none";


        loadBooks();



    }
    catch(error){

        console.log(error);

    }


});




// Edit Book

async function editBook(id){


    try{

        const response = await fetch(
            `http://localhost:5000/api/books/${id}`,
            {
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }
        );


        const book = await response.json();



        bookId.value = book._id;

        document.getElementById("title").value = book.title;

        document.getElementById("author").value = book.author;

        document.getElementById("category").value = book.category;

        document.getElementById("isbn").value = book.isbn;

        document.getElementById("quantity").value = book.quantity;

        document.getElementById("status").value = book.status;



        submitBtn.innerText="Update Book";

        cancelBtn.style.display="inline-block";


        window.scrollTo({
            top:0,
            behavior:"smooth"
        });


    }
    catch(error){

        console.log(error);

    }

}



// Cancel Edit

cancelBtn.addEventListener("click",()=>{

    bookForm.reset();

    bookId.value="";

    submitBtn.innerText="Add Book";

    cancelBtn.style.display="none";

});




// Delete Book

async function deleteBook(id){


    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );


    if(!confirmDelete) return;



    try{


        const response = await fetch(
            `http://localhost:5000/api/books/${id}`,
            {
                method:"DELETE",

                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        alert(data.message);


        loadBooks();



    }
    catch(error){

        console.log(error);

    }

}




// Initial load

loadBooks();