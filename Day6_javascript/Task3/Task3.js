const studentList=[]
const addbtn=document.getElementById("add-btn")
const displaybtn=document.getElementById("display-btn")
const averagebtn=document.getElementById("average-btn")
let isValid=false
document.forms["student-form"]["student-name"].addEventListener('input',(e)=>{
    const errormsg=document.getElementById("name-error");
        if(!Number.isNaN(parseInt(e.target.value)))
        {
             errormsg.style.display="block";
             isValid=false;
        }
        else
        {
            errormsg.style.display="none";
            isValid=true;
        }
})
document.forms["student-form"]["student-grade"].addEventListener("input",(e)=>
{
    const errormsg=document.getElementById("grade-error");
    const val=parseInt(e.target.value);
    if(val<0 || val>100)
    {
        errormsg.style.display="block"
        isValid=false;
    }
    else
    {
        isValid=true;
        errormsg.style.display="none"
    }
})
addbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(!isValid)
        return;
    const errormsg=document.getElementById("empty-error");
    errormsg.style.display="none"
    const form=document.forms["student-form"];
    const studentName=form["student-name"].value
    const grade=form["student-grade"].value
    const student={
        name:studentName,
        mark:grade,
    }
    debugger;
    studentList.filter((ele)=>ele.name!=studentName)
    studentList.push(student)
    window.alert("Student added successfully")
    form["student-name"].value=""
    form["student-grade"].value="";
})
displaybtn.addEventListener("click",()=>
{
    const errormsg=document.getElementById("empty-error");
    if(studentList.length<1)
    {
       errormsg.style.display="block"
        return;
    }
    errormsg.style.display="none"
    const list=document.getElementById("student-list")
    list.innerHTML='';
    for(let i of studentList)
    {
        const node=document.createElement("li")
        node.innerHTML=`${i.name} : ${i.mark}`;
        list.appendChild(node)
    }
})
averagebtn.addEventListener('click',()=>
{
    let sum=0;
    const errormsg=document.getElementById("empty-error");
    if(studentList.length<1)
    {
        errormsg.style.display="block"
        return
    }
    errormsg.style.display="none"
    for(let i of studentList)
    {
        sum+=parseFloat(i.mark);
    }
    let averageval=(sum/studentList.length)
    const average=document.getElementById("average")
    average.innerHTML=`Average Grade : ${averageval}`;
})