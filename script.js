let budget = 0; // Set the initial budget
let balance = 0; // Balance starts at 0
const transactions = [];

// Budget Form Submission
document.getElementById("budget-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const budgetValue = parseFloat(document.getElementById("set-budget").value);
  if (!isNaN(budgetValue)) {
    budget = budgetValue;
    balance = budget; // Set the initial balance equal to the budget
    document.getElementById("budget").textContent = ` Ksh ${budget.toFixed(2)}`;
    document.getElementById("balance").textContent = `Ksh ${balance.toFixed(
      2
    )}`; // Display the initial balance
    document.getElementById("set-budget").value = "";
    clearTransactions(); // Clear any previous transactions
  }
});

// Transaction Form Submission
document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = new Date();

    if (description && !isNaN(amount)) {
      const transaction = {
        description,
        amount,
        date,
      };
      transactions.push(transaction);
      addTransactionToList(transaction);
      updateBalance();

      // Clear fields
      document.getElementById("description").value = "";
      document.getElementById("amount").value = "";
    }
  });

// Update Balance Display and Check for Budget Exceeded
function updateBalance() {
  const totalExpenses = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  balance = budget - totalExpenses; // Update balance by subtracting total expenses from budget
  document.getElementById("balance").textContent = `Ksh ${balance.toFixed(2)}`;

  // Check if expenses exceed the budget
  checkBudgetExceeded();
}

// Add Transaction to List
function addTransactionToList(transaction) {
  const list = document.getElementById("transaction-list");
  const listItem = document.createElement("li");
  listItem.textContent = `${
    transaction.description
  }: Ksh ${transaction.amount.toFixed(
    2
  )} on ${transaction.date.toDateString()}`;
  list.appendChild(listItem);
}

// Check if the total expenses exceed the budget and show a warning message
function checkBudgetExceeded() {
  const budgetWarning = document.getElementById("budget-warning");

  if (balance < 0) {
    if (!budgetWarning) {
      const warningMessage = document.createElement("p");
      warningMessage.id = "budget-warning";
      warningMessage.style.color = "red";
      warningMessage.textContent = "Warning: Budget exceeded!";
      document.getElementById("app").appendChild(warningMessage);
    }
  } else if (budgetWarning) {
    budgetWarning.remove();
  }
}

// Clear Transaction List
function clearTransactions() {
  transactions.length = 0; // Clear the transactions array
  const list = document.getElementById("transaction-list");
  list.innerHTML = ""; // Clear existing transaction list
  balance = budget; // Reset balance to the budget
  document.getElementById("balance").textContent = `Ksh ${balance.toFixed(2)}`; // Reset balance display
}

// Filter Transactions by Weekly or Monthly
function filterTransactions(filterType) {
  const list = document.getElementById("transaction-list");
  list.innerHTML = ""; // Clear existing list
  const now = new Date();

  let filteredTransactions = transactions;
  if (filterType === "weekly") {
    const oneWeekAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
    filteredTransactions = transactions.filter(
      (transaction) => transaction.date >= oneWeekAgo
    );
  } else if (filterType === "monthly") {
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    filteredTransactions = transactions.filter(
      (transaction) => transaction.date >= oneMonthAgo
    );
  }

  filteredTransactions.forEach((transaction) =>
    addTransactionToList(transaction)
  );
}
