let Count = document.getElementById("Count");
let title = document.getElementById("title");
let category = document.getElementById("category");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// getTotle
function getTotle() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#005B41";
  } else {
    total.innerHTML = "";
    total.style.background = "transparent";
  }
}
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    Count: Count.value,
    title: title.value.toLowerCase(),
    category: category.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
  };
  if (mood == "create") {
    if (newPro.Count > 1) {
      for (let i = 0; i < newPro.Count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    Count.style.display = "block";
    submit.innerHTML = "create";
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};
function clearData() {
  Count.value = "";
  title.value = "";
  category.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
}
// read
function showData() {
  getTotle();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
       <tr>
                    <th class="border-end" scope="row">${i + 1}</th>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>
                      <button onclick ="updateData(${i})" id="update"class="btn btn-color text-white btn-outline-success">Update</button>
                    </td>
                    <td>
                      <button id="delete" onclick ="deleteData(${i})" class="btn btn-color text-white btn-outline-success"> Delete</button>
                    </td>
                  </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("btnDeleteAll");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick ="deleteAll()" class="btn  text-white w-25">Delete All (${dataPro.length})</button>
`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();
// Delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
function updateData(i) {
  Count.style.display = "none";
  title.value = dataPro[i].title;
  category.value = dataPro[i].category;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotle();
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
                     <th class="border-end" scope="row">${i + 1}</th>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].category}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>
                       <button onclick ="updateData(${i})" id="update"class="btn btn-color text-white btn-outline-success">Update</button>
                     </td>
                     <td>
                       <button id="delete" onclick ="deleteData(${i})" class="btn btn-color text-white btn-outline-success"> Delete</button>
                     </td>
                   </tr>
     `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
                   <th class="border-end" scope="row">${i + 1}</th>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].category}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                   <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>
                     <button onclick ="updateData(${i})" id="update"class="btn btn-color text-white btn-outline-success">Update</button>
                   </td>
                   <td>
                     <button id="delete" onclick ="deleteData(${i})" class="btn btn-color text-white btn-outline-success"> Delete</button>
                   </td>
                 </tr>
   `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
