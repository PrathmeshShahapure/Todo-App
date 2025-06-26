
let ulE=document.getElementById("ulContainer");
let addBtnE=document.getElementById("addBtnId");
let saveBtnE=document.getElementById("saveBtnId");

// let taskArray=[
//   {
//     task:"Learn HTML",
//     id:1,
//     isChecked:false
//   },
//   {
//     task:"Learn CSS",
//     id:2,
//     isChecked:false
//   }
// ];

function deleteTask(liEID){
  let listEle=document.getElementById(liEID);
  ulE.removeChild(listEle);
    
   let index=taskArrayg.findIndex(function (foreach){
     let each="list"+foreach.id;
     if(each===liEID)
     {
        return true ;
     }
     else{
        return false;
     }
     
       
   });
   console.log(index);

   taskArrayg.splice(index,1);
  
}






function todostatus(liEID,labelEID){
    let labelText=document.getElementById(labelEID);
    labelText.classList.toggle("underline");
    
    let index=taskArrayg.findIndex(function(foreach){
         let each="label"+foreach.id;
         if(each===labelEID){
            return true;
         }
         else{
            return false;
         }
    });
//    console.log(index);
   if(taskArrayg[index].isChecked===true){
    taskArrayg[index].isChecked=false;
   }
   else{
    taskArrayg[index].isChecked=true
   }


}

function getFormLocal(){
   let needToparse= localStorage.getItem("keyForGet");
   let parse=JSON.parse(needToparse);
   if(parse===null)
   {
        return [];
   }
   else{
       return parse;
   }
}

let taskArrayg=getFormLocal();
let noOFArray=taskArrayg.length+1;

saveBtnE.onclick=function(){
    localStorage.setItem("keyForGet",JSON.stringify(taskArrayg)) ;

}

function createTask(newObj){

let {task,id,isChecked}=newObj;

let liEID="list"+id;
let inpCheEID="checkbox"+id;
let labelEID="label"+id;
let deleteIconID="icon"+id;





let liE=document.createElement("li");
liE.id=liEID;
ulE.appendChild(liE);

let inpCheE=document.createElement("input");
inpCheE.type="checkbox";
inpCheE.id=inpCheEID;
inpCheE.classList.add("checkboxInp");
inpCheE.checked = isChecked;
inpCheE.onclick=function(){
    todostatus(liEID,labelEID);
}
liE.appendChild(inpCheE);

let labelDivE=document.createElement("div");
labelDivE.classList.add("labelDiv");
liE.appendChild(labelDivE);

let labelE=document.createElement("label");
labelE.htmlFor=inpCheEID;
labelE.id=labelEID;
labelE.textContent=task;
if(isChecked===true){
    labelDivE.classList.add("underline");
}
labelDivE.appendChild(labelE);

let deleteDivE=document.createElement("div");
labelDivE.appendChild(deleteDivE);

let iE=document.createElement("i");
iE.classList.add("fa-solid", "fa-trash");
iE.id=deleteIconID;
iE.onclick=function(){
    deleteTask(liEID);
}
deleteDivE.appendChild(iE);

}

for (let obj of taskArrayg){
    createTask(obj);
}

addBtnE.onclick=function(){
    let mainInpE=document.getElementById("mainInp");
    let text=mainInpE.value;
    if(text===""){
        alert("Please Enter the Task ");

    }
    else{
   
       let newObj={
        task:text,
        id:noOFArray++,
        isChecked:false
       };
        
        taskArrayg.push(newObj);
        
        createTask(newObj);

        mainInpE.value="";
    }
}
