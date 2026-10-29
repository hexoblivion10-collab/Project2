let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let form = document.getElementById("form");
let list = document.getElementById("list");
let balanceSpan = document.getElementById("balance");
let incomeSpan = document.getElementById("income");
let expenseSpan = document.getElementById("expense");

form.onsubmit = function(e){
  e.preventDefault();
  
  let desc = document.getElementById("description").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;
  let date = document.getElementById("dateInput").value;
  
  if(date === ""){
    let today = new Date();
    date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
  }
  
  let newItem = {
    id: Date.now(),
    description: desc,
    amount: amount,
    type: type,
    date: date
  };
  
  transactions.push(newItem);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  form.reset();
  renderList();
};

function renderList(){
  list.innerHTML = "";
  let income = 0;
  let expense = 0;
  
  for(let i = 0; i < transactions.length; i++){
    let t = transactions[i];
    
    if(t.type === "income"){
      income = income + Number(t.amount);
    } else {
      expense = expense + Number(t.amount);
    }
    
    let prettyDate = t.date;
    if(prettyDate.length > 10){
      prettyDate = prettyDate.split("T")[0];
    }
    
    let li = document.createElement("li");
    li.textContent = t.description + " - " + t.amount + " - " + t.type + " - " + prettyDate + " ";
    
    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = function(){
      let newList = [];
      for(let i = 0; i < transactions.length; i++){
        if(transactions[i].id !== t.id){
          newList.push(transactions[i]);
        }
      }
      transactions = newList;
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderList();
    };
    
    li.appendChild(btn);
    list.appendChild(li);
  }
  
  incomeSpan.textContent = income;
  expenseSpan.textContent = expense;
  balanceSpan.textContent = income - expense;
}

renderList();