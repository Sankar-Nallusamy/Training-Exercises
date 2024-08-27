class Product {
    constructor(id,name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id=id;
    }
    
    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
    }
    
    display() {
        const node = document.createElement("tr");
        node.innerHTML = `
            <td>${this.name}</td>
            <td>${this.price}</td>
            <td class="quantity-cell">${this.quantity}</td>
            <td><button class="edit-btn">Edit</button></td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        
        const editBtn = node.querySelector(".edit-btn");
        editBtn.addEventListener('click', (e) => this.editQuantity(e,node));
        const deletebtn=node.querySelector(".delete-btn")
        deletebtn.addEventListener('click',()=>{
            document.getElementById("table-body").removeChild(node);
            inventory=inventory.filter((Element)=>Element.id!=this.id);
            console.log(inventory)
        })
        return node;
    }
    
    editQuantity(e,node) {
        const quantityCell = node.querySelector(".quantity-cell");
        const currentQuantity = this.quantity;
        if(e.target.textContent==="Edit")
        {
            quantityCell.setAttribute("contenteditable","true");
            e.target.textContent="Update";
        }
        else
        {
            quantityCell.setAttribute("contenteditable","false");
            e.target.textContent="Edit";
            let newQuantity=parseInt(quantityCell.textContent)
            if(isNaN(newQuantity)||newQuantity<=0)
            {
                quantityCell.textContent=`${currentQuantity}`
            }
            else
                this.updateQuantity(newQuantity)
        }
        console.log(inventory)
    }
}

let inventory = [];
let isValid = false;
let id=0;
const formElements = document.forms["inventory-form"];
function validateInput(e) {
    if (!e.target.value) {
        isValid = false;
    } else {
        isValid = true;
    }
}
function handlesubmit(e){
    e.preventDefault();
    if (!isValid) {
        document.getElementById("error-msg").style.display = "block";
        return;
    }
    document.getElementById("error-msg").style.display = "none";

    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    const form = document.forms["inventory-form"];
    let name = form["product-name"];
    let price = form["product-price"];
    let quantity = form["product-quantity"];

    let product = new Product(id,name.value, parseInt(price.value), parseInt(quantity.value));
    inventory.push(product);
    id++;
    for (let i of inventory) {
        tbody.appendChild(i.display());
    }
}
