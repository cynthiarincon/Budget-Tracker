// ==============================================
// Budget Class - Handles income and expense tracking
// ==============================================
class Budget {
  constructor() {
    // Initialize empty arrays for storing financial data
    this.incomes = [];
    this.expenses = [];
  }

  addIncome(description, amount) {
    // Store income entry as an object with description and amount
    this.incomes.push({ description, amount });
  }

  addExpense(description, amount) {
    // Store expense entry as an object with description and amount
    this.expenses.push({ description, amount });
  }

  getTotalIncome() {
    // Calculate sum of all income amounts
    let total = 0;
    for (let i = 0; i < this.incomes.length; i++) {
      total += this.incomes[i].amount;
    }
    return total;
  }

  getTotalExpenses() {
    // Calculate sum of all expense amounts
    let total = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      total += this.expenses[i].amount;
    }
    return total;
  }

  getTotalBudget() {
    // Calculate remaining budget (income minus expenses)
    return this.getTotalIncome() - this.getTotalExpenses();
  }
}


// ===========================================
// Initialize Budget Instance
// ===========================================
const budget = new Budget();


// ===========================================
// DOM Element References
// ============================================
// Input fields
const incomeDescInput = document.querySelector("#incomeDesc");
const incomeAmountInput = document.querySelector("#incomeAmount");
const expenseDescInput = document.querySelector("#expenseDesc");
const expenseAmountInput = document.querySelector("#expenseAmount");

// Action buttons
const addIncomeBtn = document.querySelector("#addIncomeBtn");
const addExpenseBtn = document.querySelector("#addExpenseBtn");

// Summary display elements
const totalIncomeDisplay = document.querySelector("#totalIncome");
const totalExpensesDisplay = document.querySelector("#totalExpenses");
const totalBudgetDisplay = document.querySelector("#totalBudget");

// List containers
const incomeListContainer = document.querySelector("#incomeList");
const expenseListContainer = document.querySelector("#expenseList");


// ============================================
// Display Update Functions
// ===========================================
function updateDisplays() {
  // Update all summary totals with current budget values
  totalIncomeDisplay.textContent = "$" + budget.getTotalIncome().toFixed(2);
  totalExpensesDisplay.textContent = "$" + budget.getTotalExpenses().toFixed(2);
  totalBudgetDisplay.textContent = "$" + budget.getTotalBudget().toFixed(2);
}

function addToIncomeList(description, amount) {
  // Create new list item for income entry
  const item = document.createElement("p");
  item.textContent = description + " - $" + amount.toFixed(2);
  incomeListContainer.appendChild(item);
}

function addToExpenseList(description, amount) {
  // Create new list item for expense entry
  const item = document.createElement("p");
  item.textContent = description + " - $" + amount.toFixed(2);
  expenseListContainer.appendChild(item);
}

function clearIncomeInputs() {
  // Reset income input fields
  incomeDescInput.value = "";
  incomeAmountInput.value = "";
}

function clearExpenseInputs() {
  // Reset expense input fields
  expenseDescInput.value = "";
  expenseAmountInput.value = "";
}

function removeEmptyMessage(container) {
  // Remove placeholder text when first item is added
  const emptyMsg = container.querySelector(".empty-message");
  if (emptyMsg) {
    emptyMsg.remove();
  }
}


// ===========================================
// Event Handlers
// ============================================
addIncomeBtn.addEventListener("click", function() {
  // Retrieve input values
  const description = incomeDescInput.value;
  const amount = parseFloat(incomeAmountInput.value);

  // Input validation
  if (description === "" || incomeAmountInput.value === "") {
    alert("Please fill in both fields");
    return;
  }

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  // Process valid income entry
  budget.addIncome(description, amount);
  updateDisplays();
  removeEmptyMessage(incomeListContainer);
  addToIncomeList(description, amount);
  clearIncomeInputs();
});

addExpenseBtn.addEventListener("click", function() {
  // Retrieve input values
  const description = expenseDescInput.value;
  const amount = parseFloat(expenseAmountInput.value);

  // Input validation
  if (description === "" || expenseAmountInput.value === "") {
    alert("Please fill in both fields");
    return;
  }

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  // Process valid expense entry
  budget.addExpense(description, amount);
  updateDisplays();
  removeEmptyMessage(expenseListContainer);
  addToExpenseList(description, amount);
  clearExpenseInputs();
});