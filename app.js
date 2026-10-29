// Expense Tracker - Handles DOM manipulation, Event Handling, and localStorage persistence

// Load transactions from localStorage - Data Persistence across pages
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// DOM manipulation - Getting elements from HTML
let form = document.getElementById("form");
let list = document.getElementById("list");
let balanceSpan = document.getElementById("balance");
let incomeSpan = document.getElementById("income");
let expenseSpan = document.getElementById("expense");
let errorMsg = document.getElementById("errorMsg");

// Event Handling - Listens for form submit
form.onsubmit = function(e){
    e.preventDefault();
    let desc = document.getElementById("description").value.trim();
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    let date = document.getElementById("dateInput").value;

    // Validation
    if(!desc || !amount || !date){
        errorMsg.textContent = "Please fill all fields";
        return;
    }

    // Add transaction object
    const transaction = {
        id: Date.now(),
        description: desc,
        amount: Number(amount),
        type: type,
        date: date
    };

    transactions.push(transaction);

    // Save to localStorage - So data shows on History and Report pages
    localStorage.setItem("transactions", JSON.stringify(transactions));
    
    // Update UI - DOM manipulation
    renderList();
    form.reset();
}

// Function to display transactions - Manipulates DOM
function renderList(){
    list.innerHTML = "";
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if(t.type === "income") income += t.amount;
        else expense += t.amount;

                const li = document.createElement("li");
        li.textContent = t.description + " - " + t.amount + " - " + t.type;
        list.appendChild(li);

    // Calculate balance
    balanceSpan.textContent = income - expense;
    incomeSpan.textContent = income;
    expenseSpan.textContent = expense;
}

// Initial render
renderList();
