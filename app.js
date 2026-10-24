let list = document.getElementById("list");
let form = document.getElementById("form");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function renderList() {
  if (!list) {
    return;
  }

  list.innerHTML = "";
  let income = 0;
  let expenses = 0;
  let categoryTotals = {};

  let monthFilter = document.getElementById("monthFilter");
  let filterValue = "all";
  if (monthFilter) {
    filterValue = monthFilter.value;
  }

  for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i];
    let value = Number(t.amount);
    if (isNaN(value)) {
      value = 0;
    }
    let transMonth = new Date(t.date).getMonth();

    if (filterValue !== "all") {
      if (transMonth != filterValue) {
        continue;
      }
    }

    if (t.type === "income") {
      income = income + value;
    } else {
      expenses = expenses + value;
    }

    if (categoryTotals[t.category] === undefined) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] = categoryTotals[t.category] + value;

    let item = document.createElement("li");
    item.textContent = t.description + " - " + t.category + " - " + value;

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    
    delBtn.onclick = function() {
      let newList = [];
      for (let j = 0; j < transactions.length; j++) {
        if (transactions[j].id !== t.id) {
          newList.push(transactions[j]);
        }
      }
      transactions = newList;
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderList();
    };

    item.appendChild(delBtn);
    list.appendChild(item);
  }

  let incomeElement = document.getElementById("income");
  let expenseElement = document.getElementById("expense");
  let balanceElement = document.getElementById("balance");
  
  if (incomeElement) {
    incomeElement.textContent = income;
  }
  if (expenseElement) {
    expenseElement.textContent = expenses;
  }
  if (balanceElement) {
    balanceElement.textContent = income - expenses;
  }

  let catDiv = document.getElementById("categoryReport");
  if (catDiv) {
    catDiv.innerHTML = "<h3>Spending by Category</h3>";
    for (let cat in categoryTotals) {
      catDiv.innerHTML = catDiv.innerHTML + "<p>" + cat + ": " + categoryTotals[cat] + "</p>";
    }
  }
}

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let desc = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (desc === "") {
      return;
    }
    if (isNaN(amount)) {
      return;
    }
    if (!type) {
      return;
    }

    let newItem = {
      id: Date.now(),
      description: desc,
      amount: amount,
      type: type,
      category: category,
      date: new Date().toISOString()
    };

    transactions.push(newItem);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderList();
    form.reset();
  });
}

let monthFilter2 = document.getElementById("monthFilter");
if (monthFilter2) {
  monthFilter2.onchange = function() {
    renderList();
  };
}

renderList();// Day2 0
// Day2 1
// Day2 2
// Day2 3
// Day2 4
// Day2 5
// Day2 6
// Day2 7
// Day2 8
