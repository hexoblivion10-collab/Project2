// Expense Tracker - Strong JavaScript Implementation
class ExpenseManager {
  constructor() { this.expenses = JSON.parse(localStorage.getItem('expenses') || '[]'); }
  save() { localStorage.setItem('expenses', JSON.stringify(this.expenses)); }
  add(title, amount, category) {
    if (!title || title.length < 3) throw new Error('Title too short');
    if (amount <= 0) throw new Error('Invalid amount');
    this.expenses.push({ id: Date.now(), title, amount: Number(amount), category, date: new Date().toISOString() });
    this.save();
  }
  remove(id) { this.expenses = this.expenses.filter(e => e.id !== id); this.save(); }
  getTotal() { return this.expenses.reduce((s, e) => s + e.amount, 0); }
  getByCategory() { return this.expenses.reduce((a, e) => { a[e.category] = (a[e.category] || 0) + e.amount; return a; }, {}); }
  search(q) { return this.expenses.filter(e => e.title.toLowerCase().includes(q.toLowerCase())); }
}
const manager = new ExpenseManager();
const formatCurrency = (n) => new Intl.NumberFormat('en-KE', {style: 'currency', currency: 'KES'}).format(n);
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expenseForm');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try { manager.add(data.title, data.amount, data.category); location.reload(); } catch(err) { alert(err.message); }
  });
});
