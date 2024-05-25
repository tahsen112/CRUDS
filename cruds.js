let title = document.getElementById(`title`);
let price = document.getElementById(`price`);
let taxes = document.getElementById(`taxes`);
let ads = document.getElementById(`ads`);
let discount = document.getElementById(`discount`);
let total = document.getElementById(`total`);
let count = document.getElementById(`count`);
let category = document.getElementById(`category`);
let submit = document.getElementById(`submit`);
let deleteAll = document.getElementById(`deleteAll`);
let search = document.getElementById(`search`);

let mood = `create`;
let searchMood = `title`;
let pass;

// get Total
function getTotal() {
     if (price.value != `` && +price.value > 0) {
          let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
          if (result <= 0) {
               total.innerHTML = result;
               total.style.background = `red`;
          }
          else {
               total.innerHTML = result;
               total.style.background = `green`;
          }

     }
     else {
          total.innerHTML = ``;
          total.style.background = `red`;
     }
}


// create

let datapro;
if (localStorage.product != null) {
     datapro = JSON.parse(localStorage.product);
}
else {
     datapro = [];
}


function create() {
     newpro = {
          title: title.value,
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: total.innerHTML,
          category: category.value,
          count: count.value
     }

     if (title.value != `` && price.value != `` && category.value != ``) {
          if (mood === `create`) {
               if (count.value > 1 && count.value <= 100) {
                    for (let i = 0; i < count.value; ++i) {
                         datapro.push(newpro);
                    }
               }
               else {
                    datapro.push(newpro);
               }

          }
          else {
               datapro[pass] = newpro;

               mood = `create`;
               count.style.display = `block`;
               submit.innerHTML = `Create`;
          }
          // clear input
          clearInput();
     }

     localStorage.setItem(`product`, JSON.stringify(datapro));

     getTotal();
     // show Data
     showData();

}
// show data

function showData() {
     let table = ``;

     for (let i = 0; i < datapro.length; ++i) {
          table += `
                         <tr>
                              <td>${i + 1}</td>
                              <td>${datapro[i].title}</td>
                              <td>${datapro[i].price}</td>
                              <td>${datapro[i].taxes}</td>
                              <td>${datapro[i].ads}</td>
                              <td>${datapro[i].discount}</td>
                              <td>${datapro[i].total}</td>
                              <td>${datapro[i].category}</td>
                              <td><button onclick="updateData(${i})" >update</button></td>
                              <td><button onclick="deleteData(${i})">delete</button></td>
                         </tr>
                         `;
     }

     document.getElementById(`tbody`).innerHTML = table;
     if (datapro.length > 1) {
          deleteAll.style.display = `inline`;
          deleteAll.innerHTML = `Delete All (${datapro.length})`;
     }
     else {
          deleteAll.style.display = `none`;
     }
}

showData();





// clear inputs
function clearInput() {
     title.value = ``;
     price.value = ``;
     taxes.value = ``;
     ads.value = ``;
     discount.value = ``;
     total.value = ``;
     category.value = ``;
     count.value = ``;
}

// read
// update

function updateData(i) {
     pass = i;

     title.value = datapro[i].title;
     price.value = datapro[i].price;
     taxes.value = datapro[i].taxes;
     ads.value = datapro[i].ads;
     discount.value = datapro[i].discount;
     total.innerHTML = datapro[i].total;
     category.value = datapro[i].category;
     getTotal();

     count.style.display = `none`;
     submit.innerHTML = `Update`;
     mood = `update`;

     scroll({ top: 0, behavior: `smooth` });

     showData();
}



// delete
function deleteData(i) {
     datapro.splice(i, 1);
     localStorage.product = JSON.stringify(datapro);

     showData();
}

function deleteAllData() {
     datapro.splice(0);
     localStorage.clear();

     deleteAll.style.display = `none`;
     showData();
}

// search

function getSearchMood(id) {
     if (id === `searchTitle`) {
          searchMood = `title`;
          search.placeholder = `Search By Title`;
          search.focus();
          search.value = ``;
     }
     else {
          searchMood = `category`;
          search.placeholder = `Search By Category`;
          search.focus();
          search.value = ``;
     }

}

function searchData(value) {
     let table = ``;
     let counter = 0;
     if (searchMood === `title`) {
          for (let i = 0; i < datapro.length; ++i) {
               if (datapro[i].title.toLowerCase().includes(value.toLowerCase())) {
                    counter += 1;
                    table += `
                    <tr>
                         <td>${i + 1}</td>
                         <td>${datapro[i].title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].category}</td>
                         <td><button onclick="updateData(${i})" >update</button></td>
                         <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                    `;
               }
          }
     }
     else {
          for (let i = 0; i < datapro.length; ++i) {
               if (datapro[i].category.includes(value)) {
                    counter += 1;
                    table += `
                    <tr>
                         <td>${i + 1}</td>
                         <td>${datapro[i].title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].category}</td>
                         <td><button onclick="updateData(${i})" >update</button></td>
                         <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                    `;
               }
          }
     }

     if (counter === datapro.length) {
          document.getElementById(`searchNumber`).innerHTML = ``;
     }
     else {
          document.getElementById(`searchNumber`).innerHTML = counter;
     }

     document.getElementById(`tbody`).innerHTML = table;
}



// clean data
