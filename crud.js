let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let category=document.getElementById('category');
let create=document.getElementById('create');
let total=document.getElementById('total');
let search=document.getElementById('search');
let mood='Create';
function getTotal()
{
if(price.value!='')
    {
        let result=+price.value+ +taxes.value+ +ads.value - +discount.value;
    if(result<0)
        result=0;
    total.innerText=result;
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    return result;
    }    
    else{
total.innerText="Disabled"
price.setAttribute("placeholder","please enter the price")
}


}
let data;
if(localStorage.product!=null)
{
    data=JSON.parse(localStorage.product);
}
else{
data=[];}
function Createe()
{
    
    
let object={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:getTotal(),
    category:category.value   
}
if(mood=="Create")
{
if(count.value>1)
{
for(let i=0;i<count.value;i++)
    data.push(object);
}
else 
{
data.push(object);
}
}
else 
{
    data[index]=object;
create.innerText="Create";
mood="Create";
count.style.display="block";
}
localStorage.setItem('product',JSON.stringify(data));
clear();
showData();
}
function clear()
{
    title.value='';
    count.value='';
    category.value='';
    total.innerText='Total';
 
}
function showData()
{
    let table='';
for(let i=0;i<data.length;i++)
{
    table+=`
      <tr>
        <td>${i+1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button class="tbtn" onclick="update(${i})">update</button></td>
        <td><button class="tbtn" onclick="deleteData(${i})">delete</button></td>
        </tr>
    `
}
let tbody=document.getElementById('tbody');
tbody.innerHTML=table;
let btn=document.getElementById('clearbtn');
if(data.length>0)
{
    btn.innerHTML=`
    <button class="btn cusbtn" onclick="deletall()">Clear All (${data.length})</button>
    `
}
else 
btn.innerHTML='';
}
function deleteData(i)
{
data.splice(i,1);
localStorage.product=JSON.stringify(data);
showData();
}
showData();
function deletall()
{
        data.splice(0);
    localStorage.clear();
    showData();
}
var index;
function update(i)
{
    index=i;
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
    category.value=data[i].category;
    create.innerHTML="Update";
    count.style.display="none";
  mood="Update";
}
function Sertitle()
{
    search.placeholder="Search By Title";
    search.focus();
}
function Sercategory()
{
    search.placeholder="Search By Category";
search.focus();
}
function ser(value)
{
    let table='';
for(let i=0;i<data.length;i++)
{
    if(search.placeholder=="Search By Category")
    {
     if(data[i].category.includes(value))
     {
        table+=`
        <tr>
          <td>${i+1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button class="tbtn" onclick="update(${i})">update</button></td>
          <td><button class="tbtn" onclick="deleteData(${i})">delete</button></td>
          </tr>
      `
     }
tbody.innerHTML=table;
    }
    else 
    {
        if(data[i].title.includes(value))
            {
    
               table+=`
               <tr>
                 <td>${i+1}</td>
                 <td>${data[i].title}</td>
                 <td>${data[i].price}</td>
                 <td>${data[i].taxes}</td>
                 <td>${data[i].ads}</td>
                 <td>${data[i].discount}</td>
                 <td>${data[i].total}</td>
                 <td>${data[i].category}</td>
                 <td><button class="tbtn" onclick="update(${i})">update</button></td>
                 <td><button class="tbtn" onclick="deleteData(${i})">delete</button></td>
                 </tr>
             `
            } 
tbody.innerHTML=table;
 
        }
}

}
