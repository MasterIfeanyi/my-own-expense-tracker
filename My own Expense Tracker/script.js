const formEl = document.querySelector(".form");
const tbodyEl = document.querySelector(".tbody");
const tableEl = document.querySelector(".table");

const product = document.getElementById("product");
const date = document.getElementById("date");
const amount = document.getElementById("amount");
const addUp = document.getElementById("sumTotal");

const Total = document.getElementById("total");




document.addEventListener("DOMContentLoaded", fetchProducts);

function formSubmit(e) {

    e.preventDefault();

    if (product.value === '' || amount.value === '') {
        alert('Please enter all fields');
    } else {
    
        var theProduct = {
            product: product.value,
            date: date.value,
            amount: amount.value
        }

        //test if bookmark is null or empty
        if (localStorage.getItem('allProducts') === null) {
            //init array
            var products = [];
            //add to array
            products.push(theProduct);
            //set to localstorage
            localStorage.setItem('allProducts', JSON.stringify(products));
        } else {
            //fetch bookmarks from localstorage
            var products = JSON.parse(localStorage.getItem('allProducts'));
            //add bookmark to array
            products.push(theProduct);
            //reset it back to localStorage
            localStorage.setItem('allProducts', JSON.stringify(products));
        }

        product.value = '';
        date.value = '';
        amount.value = '';

        fetchProducts();
        findSum();
    }
}


//fetch products
function fetchProducts() {
    //get products from localStorage
    var products = JSON.parse(localStorage.getItem('allProducts'));

    tbodyEl.innerHTML = '';

    products.forEach(product => {
    tbodyEl.innerHTML += `
        <tr>
            <td>${product.product}</td>
            <td>${product.date}</td>
            <td class="number">${product.amount}</td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>
    `;        
    });
    // Total.innerHTML = `<h4>Total: </h4> ${theTotal}`;
}



function onDeleteBtn(e) {
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    } else {

        const btn = e.target;
        // btn.closest('tr').remove();

        var index;
        index = btn.closest('tr').rowIndex;

        // console.log(btn.parentElement.parentElement.rowIndex);
        // console.log(parseInt(btn.parentElement.parentElement.cells[2].textContent, 10));
        // console.log(index);
        // parseInt(btn.parentElement.parentElement.cells[2].textContent, 10);

        var value = parseInt(btn.parentElement.parentElement.cells[2].textContent, 10);

        var remainder = theTotal - value;

        theTotal = remainder
        
        Total.innerHTML = `<h4>Total: </h4> ${theTotal}`;

        var products = JSON.parse(localStorage.getItem('allProducts'));

        console.log(products);

        products.splice(index - 1, 1);

        console.log(products);

        localStorage.setItem('allProducts', JSON.stringify(products));

        fetchProducts();
    }
}

        // for (var i = 0; i < tbodyEl.rows.length; i++) {
        //     console.log(parseInt(tbodyEl.rows[i].cells[2].innerHTML, 10));
        // }


addUp.addEventListener('click', findSum);

formEl.addEventListener('submit', formSubmit);

tableEl.addEventListener('click', onDeleteBtn);

function findSum() {

    var sumTotal = 0;

    for (var i = 0; i < tbodyEl.rows.length; i++){

        sumTotal = sumTotal + parseInt(tbodyEl.rows[i].cells[2].textContent, 10);

        theTotal = sumTotal;

        Total.innerHTML = `<h4>Total: </h4> ${theTotal}`;

    }
    return sumTotal;
}

var theTotal;


