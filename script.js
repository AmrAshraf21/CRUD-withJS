let title = document.getElementById('title'),
 price = document.querySelector('#price'),
 ads = document.querySelector('#ads'),
 taxes = document.querySelector('#taxes'),
 discount = document.querySelector('#discount'),
 total = document.querySelector('#total'),
 count = document.querySelector('#count'),
 category = document.querySelector('#category'),
 submit = document.querySelector('#submit'),
 searchTitle = document.getElementById('searchTitle'),
 searchCategory = document.getElementById('searchCategory'),
 search = document.getElementById('search'),

 mood = "Create",
 tmp,
 searchMood = 'title'


 price.onkeyup = getTotal
ads.onkeyup = getTotal
taxes.onkeyup = getTotal
discount.onkeyup = getTotal

 function getTotal(){

    if(price.value !=""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor="#040"
    }else{
        total.style.backgroundColor="#a00d02"

    }
}
let dataPro
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro =[]
}


submit.onclick = function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()


    }
    if(title.value != "" && price.value !=""){

    if(mood==="Create"){

    if(newPro.count >1){
        for(let i =0 ; i<newPro.count;i++){

            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro)
    }
}else{

    dataPro[tmp] = newPro;
    mood="Create";
    submit.innerHTML = "Create";
    count.style.display = "block"

    }
    clearData();

}else{
    alert('Please Enter The Title Of Product And Price')
}
    
    
    localStorage.setItem('product',JSON.stringify(dataPro))

showData()
}


function clearData(){

title.value = "";
price.value = "";
taxes.value = "";
ads.value = "";
discount.value = "";
count.value="";

total.innerHTML = 0
total.style.backgroundColor="#a00d02"
category.value="";
}

function showData(){

    let table =""

    for(let i = 0 ; i<dataPro.length;i++){
        table +=`
        
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;

    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){

        btnDelete.innerHTML=`<button onclick="deleteAll()">delete All(${dataPro.length})</button>`


    }else{
        btnDelete.innerHTML = ""
    }
  
}
showData();


function deleteData(index){

    dataPro.splice(index,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();


}
function deleteAll(){

    localStorage.clear()
    dataPro.splice(0);
    showData()

}

function updateData(i){
   
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "Update";
    mood = "Update"

    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
searchTitle.onclick = getSearchMood
searchCategory.onclick = getSearchMood
function getSearchMood(id){

    if(this.getAttribute('id') ==="searchTitle"){
        searchMood ="title";
         
    }else{
        searchMood = 'category';
        }
        search.placeholder = `Search By ${searchMood}` 
    search.focus();
    search.value = "";
    showData()

}


function searchData(value){

    let table = "";

    for(let i =0 ; i<dataPro.length;i++){

    if(searchMood == "title"){

        if(dataPro[i].title.includes(value.toLowerCase())){
            table +=`
        
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
        }

      

    }else{
       

            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
            
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
    
          
    }
}
    document.getElementById('tbody').innerHTML = table
}