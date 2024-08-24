const addBtn=document.getElementById("add-btn");
const todoContainer=document.getElementById("todo-list")
addBtn.addEventListener('click',()=>{
    const task=document.getElementById("task").value;
    if(task==="")
    {
        window.alert("Input field can't be empty")
        return;
    }
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    const tasktag=document.createElement("p");
    tasktag.append(document.createTextNode(task));
    const deletebtn=document.createElement("button")
    deletebtn.append(document.createTextNode("Delete"));
    const litag=document.createElement("li");
    litag.appendChild(checkbox)
    litag.appendChild(tasktag)
    litag.appendChild(deletebtn)
    todoContainer.appendChild(litag)

    deletebtn.addEventListener('click',()=>
    {
        todoContainer.removeChild(litag);
    })
    checkbox.addEventListener('change',()=>
    {
        if(checkbox.checked===true)
        tasktag.style.textDecoration="line-through";
        else
        tasktag.style.textDecoration="none";
    })
    document.getElementById("task").value=""
    alert("Task added Successfully")
})