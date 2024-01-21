const balance = document.getElementById("balance")

const money_pulse = document.getElementById("money_pulse")
const money_minus = document.getElementById("money_minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")
  
const dummyTransaction = [{
  id:1,Text:"salary",amount:20000,
  id:2,Text:"pen",amount:-20,
  id:3,Text:"book",amount:-80,
  id:4,Text:"bonus",amount:300,
}]

let transaction = dummyTransaction
function addTransaction(e){
    e.preventDefault();
    if(
      text.value.trim() === "" && amount.value.trim() === ""
    ){
     alert("please entre text and amount")
}else{
  const transaction = {
      id:generateId() ,
      text: text.value,
      amount:+amount.value
  };

  addTransactionDOM(transaction)
  updatevalues()
  text.value = ""
  amount.value = ""
}

}

function generateId(){
  return Math.floor(Math.random()*100000)
}

function addTransactionDOM(transaction){
  console.log(transaction)
const sign = transaction.amount <0 ? '-':"+"
const item = document.createElement("li");

item.classList.add(
    transaction.amount < 0 ? "minus":"pulse"
);


item.innerHTML = `
${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
<button class = "delete-btn"onclick = "removeTrasaction(${transaction.id})">x</button>
`
list.appendChild(item)
}
function  removeTrasaction(id)    {
  transaction = transaction.filter((transaction)=>transaction.id !== id)
  particular()
}

function updatevalues(){
  const amount = transaction.map(transaction=>(transaction.amount))
  const total = amount.reduce((amount,item) => (amount += item),0).toFixed(2)
  const income = amount.filter(item => item > 0).reduce((amount,item)=>(amount += item),0).toFixed(2)
  const expense = amount.filter(item => item < 0).reduce((amount,item)=>(amount += item),0).toFixed(2)

balance.innerText = `$${total}`;
money_pulse.innerText = `$${income}`;
money_minus.innerText = `$${expense}`;
}

function particular(){
  list.innerHTML = "";
  transaction.forEach(addTransactionDOM);
  updatevalues()
    
  };
  particular()
form.addEventListener("submit",addTransaction)

// addTransactionDOM(transaction)
//}
