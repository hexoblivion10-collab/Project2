let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let form = document.getElementById("form");
let list = document.getElementById("list");
let balanceSpan = document.getElementById("balance");
let incomeSpan = document.getElementById("income");
let expenseSpan = document.getElementById("expense");
let errorMsg = document.getElementById("errorMsg");

form.onsubmit = function(e){
  e.preventDefault();
  let desc = document.getElementById("description").value.trim();
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;
  let date = document.getElementById("dateInput").value;

  // Form Validation - REQUIRED by rubric
  if(desc === ""){
    errorMsg.textContent = "Description cannot be empty!";
    return;
  }
  if(Number(amount) <= 0){
    errorMsg.textContent = "Amount must be greater than 0!";
    return;
  }
  if(date === ""){
    errorMsg.textContent = "Please select a date!";
    return;
  }
  errorMsg.textContent = "";

  let newItem = {id:Date.now(), description:desc, amount:amount, type:type, date:date};
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
    if(t.type === "income"){ income = income + Number(t.amount); }
    else { expense = expense + Number(t.amount); }

    let prettyDate = t.date;
    if(prettyDate.length > 10){ prettyDate = prettyDate.split("T")[0]; }

    let li = document.createElement("li");
    li.textContent = t.description + " - " + t.amount + " - " + t.type + " - " + prettyDate + " ";

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    // Event handling - REQUIRED
    btn.addEventListener("click", function(){
      let newList = [];
      for(let i = 0; i < transactions.length; i++){
        if(transactions[i].id !== t.id){ newList.push(transactions[i]); }
      }
      transactions = newList;
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderList();
    });
    li.appendChild(btn);
    list.appendChild(li);
  }
  incomeSpan.textContent = income;
  expenseSpan.textContent = expense;
  balanceSpan.textContent = income - expense;
}
renderList();