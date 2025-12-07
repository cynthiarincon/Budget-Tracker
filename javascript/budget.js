// Budget Class
class Budget {
  constructor() {
    this.incomes = [];
    this.expenses = [];
  }

  addIncome(description, amount, date) {
    this.incomes.push({ description, amount, date });
  }

  addExpense(description, amount, date) {
    this.expenses.push({ description, amount, date });
  }

  getTotalIncome() {
    let total = 0;
    for (let i = 0; i < this.incomes.length; i++) {
      total += this.incomes[i].amount;
    }
    return total;
  }

  getTotalExpenses() {
    let total = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      total += this.expenses[i].amount;
    }
    return total;
  }

  getTotalBudget() {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  clearAll() {
    this.incomes = [];
    this.expenses = [];
  }
}


// Create Budget and Select Elements
const budget = new Budget();

const incomeDescInput = document.querySelector("#incomeDesc");
const incomeAmountInput = document.querySelector("#incomeAmount");
const expenseDescInput = document.querySelector("#expenseDesc");
const expenseAmountInput = document.querySelector("#expenseAmount");

const addIncomeBtn = document.querySelector("#addIncomeBtn");
const addExpenseBtn = document.querySelector("#addExpenseBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");

const totalIncomeDisplay = document.querySelector("#totalIncome");
const totalExpensesDisplay = document.querySelector("#totalExpenses");
const totalBudgetDisplay = document.querySelector("#totalBudget");

const incomeListContainer = document.querySelector("#incomeList");
const expenseListContainer = document.querySelector("#expenseList");


// Functions
function updateDisplays() {
  totalIncomeDisplay.textContent = "$" + budget.getTotalIncome().toFixed(2);
  totalExpensesDisplay.textContent = "$" + budget.getTotalExpenses().toFixed(2);
  totalBudgetDisplay.textContent = "$" + budget.getTotalBudget().toFixed(2);
}

function addToIncomeList(description, amount, date) {
  const item = document.createElement("p");
  item.textContent = description + " - $" + amount.toFixed(2) + " (" + date + ")";
  incomeListContainer.appendChild(item);
}

function addToExpenseList(description, amount, date) {
  const item = document.createElement("p");
  item.textContent = description + " - $" + amount.toFixed(2) + " (" + date + ")";
  expenseListContainer.appendChild(item);
}

function getCurrentDate() {
  const today = new Date();
  return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
}

function removeEmptyMessage(container) {
  const emptyMsg = container.querySelector(".empty-message");
  if (emptyMsg) {
    emptyMsg.remove();
  }
}


// Event Listeners
addIncomeBtn.addEventListener("click", function() {
  const description = incomeDescInput.value;
  const amount = parseFloat(incomeAmountInput.value);
  const date = getCurrentDate();

  if (description === "" || incomeAmountInput.value === "") {
    alert("Please fill in both fields");
    return;
  }

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  budget.addIncome(description, amount, date);
  updateDisplays();
  removeEmptyMessage(incomeListContainer);
  addToIncomeList(description, amount, date);
  
  incomeDescInput.value = "";
  incomeAmountInput.value = "";
});

addExpenseBtn.addEventListener("click", function() {
  const description = expenseDescInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const date = getCurrentDate();

  if (description === "" || expenseAmountInput.value === "") {
    alert("Please fill in both fields");
    return;
  }

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  budget.addExpense(description, amount, date);
  updateDisplays();
  removeEmptyMessage(expenseListContainer);
  addToExpenseList(description, amount, date);
  
  expenseDescInput.value = "";
  expenseAmountInput.value = "";
});

clearAllBtn.addEventListener("click", function() {
  if (confirm("Are you sure you want to clear all data?")) {
    budget.clearAll();
    incomeListContainer.innerHTML = '<p class="empty-message">No income added yet</p>';
    expenseListContainer.innerHTML = '<p class="empty-message">No expenses added yet</p>';
    updateDisplays();
  }
});