// Simple Expense Tracker - Easy to explain
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense() {
  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  if (title === '' || amount === '') {
    alert('Please fill all fields');
    return;
  }

  const expense = {
    id: Date.now(),
    title: title,
    amount: parseFloat(amount),
    category: category
  };

  expenses.push(expense);
  saveExpenses();
  showExpenses();
  document.getElementById('expenseForm').reset();
}

function deleteExpense(id) {
  expenses = expenses.filter(function(exp) {
    return exp.id !== id;
  });
  saveExpenses();
  showExpenses();
}

function showExpenses() {
  const list = document.getElementById('expenseList');
  if (!list) return;

  list.innerHTML = '';

  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    const exp = expenses[i];
    total = total + exp.amount;

    list.innerHTML += `
      <div>
        <p>${exp.title} - ${exp.category} - ${exp.amount} KES 
        <button onclick="deleteExpense(${exp.id})">Delete</button></p>
      </div>
    `;
  }

  const totalElement = document.getElementById('totalAmount');
  if (totalElement) {
    totalElement.textContent = total + ' KES';
  }
}

// Load when page opens
window.onload = function() {
  showExpenses();
  const form = document.getElementById('expenseForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      addExpense();
    });
  }
}
