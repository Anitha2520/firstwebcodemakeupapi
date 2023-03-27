//create div container
 var divcontainer = document.createElement("div");
 var navbar = document.createElement("nav");
 navbar.classList.add("navbar","text-center","navbar-light");

// //create form
 var form = document.createElement("form");
 form.className="form-inline";

// //create input
 var input = document.createElement("input");
 input.setAttribute("type","search");
 input.setAttribute("id","search");
 input.classList.add("form-control","mr-sm-2");
 input.placeholder="Search by brand";
 input.addEventListener("keyup",searchFunction);

 divcontainer.append(form);
 form.append(input);

//create div element as responsive
var divtableres = document.createElement("div");
divtableres.className = "table-responsive";

//create table 
var table = document.createElement("table");
table.classList.add("table","table-hover");
table.setAttribute("id","filtertable");

//create thead
var thead = document.createElement("thead");

//create tr
var tr = document.createElement("tr");

//create th for all headings
var thsno = th("th","scope","col","#");
var thbrand = th("th","scope","col","Brand");
var thname = th("th","scope","col","Name");
var thprice = th("th","scope","col","Price");
var thimage = th("th","scope","col","Image");
var thplink = th("th","scope","col","Product Link");
var thdes = th("th","scope","col","Description");

//th function for all th to reduce code
function th(tagname,attrname,attrvalue,content){
    var th = document.createElement(tagname);
    th.setAttribute(attrname,attrvalue);
    th.innerHTML = content;
    tr.append(th);
}

//create tbody
var tbody = document.createElement("tbody");
tbody.innerHTML=`<img src="search.gif" class="img-thumbnail"   alt="image not found">`;
table.append(thead,tbody);
thead.append(tr);
divtableres.append(divcontainer,table);
document.body.append(divtableres);

//to get datas from API
async function getMakeupData(){
    
    let url = "https://makeup-api.herokuapp.com/api/v1/products.json";
    let result= await fetch(url);
    let finalresult = await result.json();
    tbody.innerHTML="";
    for(var i=0;i<finalresult.length;i++){
        try {            
            checkIfImageExists(finalresult[i]['image_link'],i+1);
            tbody.innerHTML+=`<tr>
            <th scope="row">${i+1}</th>
            <td>${finalresult[i]['brand']}</td>
            <td>${finalresult[i]['name']}</td>
            <td>${finalresult[i]['price']}</td>
            <td id="img_${i+1}"></td>
            <td><a href="${finalresult[i]['product_link']}" target="_blank">${finalresult[i]['product_link']}</a></td>
            <td>${finalresult[i]['description']}</td>
          </tr>`;                       
        } catch (error) {
            console.log(error);
        } 
   }
}
getMakeupData();

//create function to check image exists or not
function checkIfImageExists(url,id) {
   try {
    const img = new Image();
    img.src = url;
    
    if (img.complete) {
        document.getElementById("img_"+id).innerHTML=`<img src="${url}" class="img-thumbnail"   alt="image not found">`;      
    } else {
      img.onload = () => {
        document.getElementById("img_"+id).innerHTML=`<img src="${url}" class="img-thumbnail"   alt="image not found">`;      
      };      
      img.onerror = () => {
        document.getElementById("img_"+id).innerHTML=`<img src="download.png" class="img-thumbnail"   alt="image not found">`;
  
      };
    }
   } catch (error) {
    console.log(error);
   } 
  } 
  
  
  //function for search filter
  function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    
    filter = input.value.toUpperCase();
    table = document.getElementById("filtertable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          td.style.backgroundColor="yellow";
        } else {
          tr[i].style.display = "none";          
        }
      }       
    }
  }