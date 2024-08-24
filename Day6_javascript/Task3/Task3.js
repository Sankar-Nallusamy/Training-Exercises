const studentList=[]
const addbtn=document.getElementById("add-btn")
const displaybtn=document.getElementById("display-btn")
const averagebtn=document.getElementById("average-btn")
document.forms["student-form"]["student-name"].addEventListener('input',(e)=>{
        if(!Number.isNaN(parseInt(e.target.value)))
        {
            e.target.style.borderColor="red";
        }
        else
        {
            e.target.style.borderColor="gray";
        }
})
document.forms["student-form"]["student-grade"].addEventListener("input",(e)=>
{
    const errormsg=document.getElementById("error");
    const val=parseInt(e.target.value);
    if(val<0 || val>100)
    {
        errormsg.style.display="block"
    }
    else
    {
        errormsg.style.display="none"
    }
})
addbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const form=document.forms["student-form"];
    const studentName=form["student-name"].value
    const grade=form["student-grade"].value
    if(studentName==="")
    {
        alert("Student name can't be empty")
        return;
    }
    if(grade==="")
    {
        alert("Grade can't be empty")
        return;
    }
    studentList.push([studentName,grade])
    window.alert("Student added successfully")
    form["student-name"].value=""
    form["student-grade"].value=""
    console.log(studentList)
})
displaybtn.addEventListener("click",()=>
{
    if(studentList.length<1)
    {
        alert("There student list is empty");
        return;
    }
    const list=document.getElementById("student-list")
    list.innerHTML='';
    for(let i of studentList)
    {
        const node=document.createElement("li")
        node.innerHTML=`${i[0]} : ${i[1]}`;
        list.appendChild(node)
    }
})
averagebtn.addEventListener('click',()=>
{
    let sum=0;
    if(studentList.length<1)
    {
        alert("StudentList is Empty");
        return
    }
    for(let i of studentList)
    {
        sum+=parseFloat(i[1]);
    }
    let averageval=(sum/studentList.length)
    const average=document.getElementById("average")
    average.innerHTML=`Average Grade : ${averageval}`;
})