//-----------selectors-------------------
const saveBtn=document.querySelector(".btn-save");
const updateBtn=document.querySelector(".btn-update");
const userName=document.getElementById("name");
const userEmail=document.getElementById("email");
const userGender=document.getElementsByName("gender");
const userStatus=document.getElementsByName("status");
const info=JSON.parse(localStorage.getItem("updateinfo"));
const backBtn=document.querySelector(".all-user")

//----------------Event listeners---------------
saveBtn.addEventListener("click",inputValues);
window.addEventListener('load',()=>{
  if(info.length!=0)
  form(info[0])
});
backBtn.addEventListener("click",function(){
  localStorage.setItem("updateinfo", JSON.stringify([]));
})

//-------------------Local storage-------------------
let userDetails=[];
function inputValues(e){
    e.preventDefault();
    let entries=readFromData();
    if(checkInput(entries))
   {userDetails = JSON.parse(localStorage.getItem("inputvalues")) || [];
    userDetails.push(entries);
    localStorage.setItem("inputvalues", JSON.stringify(userDetails));
     userName.value="";
    userEmail.value="";
    userGender.value="";
    userStatus.value="";
    //---------to redirect the page to index.html after pressing save button-----------------------
    setTimeout(function(){window.location.href="index.html"},1000);
    }
    else return;
}

//----------------Functions-------------------
function checkInput(data)
{let validname,validEmail;
  validname=(data.name==="")?setErrorFor(userName):setsuccessFor(userName);
  validEmail=(validateEmail(data.email))?setsuccessFor(userEmail):setErrorFor(userEmail);
    return (validname&&validEmail);
}

//----------------------Function to validate email-------------------
  function validateEmail(emailID) {
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".com");
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
             return false;
    }
    return( true );
 }

//--------------------error in form entries in function---------------------------
function setErrorFor(input)
{
  const formGroup=input.parentElement;
  formGroup.classList.add("error");
  formGroup.classList.remove("success");
  return false;
}
//-----------------------success in form entires in function---------------------------
function setsuccessFor(input)
{
  const formGroup=input.parentElement;
  formGroup.classList.add("success");
  formGroup.classList.remove("error");
  return true;
}

//-------------------function to read data from the form-----------------------------
function readFromData()
{
    var formData={};
    formData["id"]=`${Math.floor(Math.random() * 100000 + 1)}`;
    formData["name"]=userName.value;
    formData["email"]=userEmail.value;
    formData["gender"]=checkRadioValue(userGender);
    formData["status"]=checkRadioValue(userStatus);
  return formData;
}

function editFromData()
{
    var formData={};
    formData["id"]=info[0]["id"];
    formData["name"]=userName.value;
    formData["email"]=userEmail.value;
    formData["gender"]=checkRadioValue(userGender);
    formData["status"]=checkRadioValue(userStatus);
  return formData;
}

function checkRadioValue(val)
{
    if(val[0].checked)
    return val[0].value;
    if(val[1].checked)
    return val[1].value;
}


 function checkRadioButton(val,identity)
 {
   if(val=="Male" || val=="Active")
   identity[0].checked=true;
   else if(val=="Female" || val=="Inactive")
   identity[1].checked=true;
 }

 //----------function to update value of object in local storage array----------------------
function updateLocalStorage(entry,arr)
{
let indexing=info[0]["id"];
const newArray=arr.map(item=>{
  if(item.id==indexing)
  {
    return {...entry};
  }
  else return item;
})
localStorage.setItem("inputvalues",JSON.stringify(newArray));
}



function form(val)
{
    userName.value=val["name"];
    userEmail.value=val["email"];
    checkRadioButton(val["gender"],userGender);
    checkRadioButton(val["status"],userStatus);
  if(localStorage.getItem("updateinfo")!=[])
  {saveBtn.style.display="none";
  updateBtn.classList.remove('btn-update');}
} 


let newUpdatedValues={};
updateBtn.addEventListener("click",function(e){
  e.preventDefault();
  newUpdatedValues=editFromData();
  if(checkInput(newUpdatedValues))
  {updateLocalStorage(newUpdatedValues,JSON.parse(localStorage.getItem("inputvalues")));
  saveBtn.style.display="";
  updateBtn.classList.add("btn-update");
  localStorage.setItem("updateinfo", JSON.stringify([]));
  setTimeout(function(){window.location.href="index.html"},1000);}
})
