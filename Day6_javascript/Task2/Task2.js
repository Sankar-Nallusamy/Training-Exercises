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
    tasktag.textContent=task
    const deletebtn=document.createElement("button")
    const updatebtn=document.createElement("button")
    deletebtn.textContent="Delete"
    updatebtn.textContent="Edit"
    updatebtn.className="update-btn"
    const litag=document.createElement("li");
    litag.appendChild(checkbox)
    litag.appendChild(tasktag)
    litag.appendChild(updatebtn)
    litag.appendChild(deletebtn)
    todoContainer.appendChild(litag)
    updatebtn.addEventListener('click',(e)=>{
        if(e.target.textContent==="Edit")
        {
            tasktag.setAttribute("contenteditable","true");
            e.target.textContent="Update"
        }
        else
        {
            tasktag.setAttribute("contenteditable","false");
            if(tasktag.textContent==="")
                tasktag.textContent=task
            e.target.textContent="Edit";
        }
    })
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