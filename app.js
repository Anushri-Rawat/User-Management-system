//---------------------selectors----------------
const searchTab=document.querySelector(".search_btn")
const table=document.getElementById("records");
let entries=JSON.parse(localStorage.getItem("inputvalues"));
const sortBtn=document.querySelector(".sort");
let tr=table.getElementsByTagName("tr");
let th=document.getElementsByTagName("th");



//-----------------Eventlisteners----------------------

//-----------------sorting functionality---------------------
for(let i=0;i<th.length-1;i++)
{
  th[i].addEventListener("click",function(e){
    let temp=[...entries];
    let column=e.target.innerText.toLowerCase();
    let temp2=temp.sort(function(a,b){
        if(a[column].toLowerCase()<b[column].toLowerCase())
        return -1;
    if(a[column].toLowerCase()>b[column].toLowerCase())
       return 1;
       return 0;
   })
    let index=1;
    table.innerHTML="";
    temp2.forEach(data=>
    {
      table.innerHTML+=`<tr>
  <td>${index++}</td>
  <td>${data.id}</td>
  <td>${data.name}</td>
  <td>${data.email}</td>
  <td>${data.gender}</td>
  <td>${data.status}</td>
  <td>
    <a class="btn border-shadow update"
      ><span class="text-gradient"
        ><i class="fas fa-pencil-alt"></i></span
    ></a>
    <a class="btn border-shadow delete"
      ><span class="text-gradient"
        ><i class="fas fa-times"></i></span
    ></a>
  </td>
</tr>`;
    })
    // sortTable(i);
  })
}


//--------------load event---------------
window.addEventListener('load',()=>{
console.log(entries);
entries.forEach((val,i)=>{insertNewRecord(i,val);})
});
  

//--------------------delete and edit functionality----------------------
table.addEventListener("click",function(e)
    {  const selectedRow=e.target.closest('tr');
    //------------deletion------------------
        if(e.target.classList.contains("fa-times"))
        deleteRow(selectedRow);
    //--------------updation/edit--------------------
    if(e.target.classList.contains("fa-pencil-alt"))
    {
      //------------selected row details-----------------
      let obj=
      { "id":selectedRow.cells[1].innerHTML,
        "name":selectedRow.cells[2].innerHTML,
        "email":selectedRow.cells[3].innerHTML,
        "gender":selectedRow.cells[4].innerHTML,
        "status":selectedRow.cells[5].innerHTML,
    }
    updateUser(obj);
    window.location.href="add-user.html";
  }
 } );


//--------------search bar-------------------------
searchTab.addEventListener("keyup",search)


//-------------------functions-----------------------
//------------inserting rows to the table-----------------
function insertNewRecord(index,data)
{   
     table.innerHTML+=`<tr>
     <td>${index+1}</td>
     <td>${data.id}</td>
     <td>${data.name}</td>
     <td>${data.email}</td>
     <td>${data.gender}</td>
     <td>${data.status}</td>
     <td>
       <a class="btn border-shadow update"
         ><span class="text-gradient"
           ><i class="fas fa-pencil-alt"></i></span
       ></a>
       <a class="btn border-shadow delete"
         ><span class="text-gradient"
           ><i class="fas fa-times"></i></span
       ></a>
     </td>
   </tr>`;
}


//-----------------------delete row function--------------------------
function deleteRow(selectedRow)
{
  let index=selectedRow.cells[0].innerHTML;
  let toDelete=entries[index-1]["id"];
  const temp = entries.filter((val) => val.id != toDelete );
  localStorage.setItem("inputvalues", JSON.stringify(temp));
  selectedRow.remove();
  // window.location.href="index.html";
}

//------------form details local storage----------------------
let info=[];
function updateUser(userinfo)
{
  info = JSON.parse(localStorage.getItem("updateinfo")) || [];
  info.push(userinfo);
  localStorage.setItem("updateinfo", JSON.stringify(info));
}

//-----------------search function---------------------
function search()
{
  let searchVal=searchTab.value.toUpperCase();
   for(let i=0;i<tr.length;i++)
   {
     let td=tr[i].getElementsByTagName("td")[2].textContent;
    if(td.toUpperCase().includes(searchVal))
    {tr[i].style.display=""}
    else
       {tr[i].style.display='none'}
   }
}
//--------------------sort table---------------------
// function sortTable(column) {
//   var switching, i, x, y, shouldSwitch;
//   switching = true;
//   while (switching) {
//     switching = false;
//     for (i =0; i <tr.length-1; i++) {
//       shouldSwitch = false;
//       x = tr[i].getElementsByTagName("td")[column];
//       y = tr[i + 1].getElementsByTagName("td")[column];
//       if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       tr[i].parentNode.insertBefore(tr[i + 1], tr[i]);
//       switching = true;
//     }
//   }
// }