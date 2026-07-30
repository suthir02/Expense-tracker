const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");

// Get transactions from Local Storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter description and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: Number(amount.value)
    };

    transactions.push(transaction);

    updateLocalStorage();
    init();

    text.value = "";
    amount.value = "";
});

// Display Transactions
function addTransaction(transaction) {

    const sign = transaction.amount > 0 ? "+" : "-";
    const className = transaction.amount > 0 ? "plus" : "minus";

    const li = document.createElement("li");
    li.classList.add(className);

    li.innerHTML = `
        <span>${transaction.text}</span>

        <div>
            ${sign} ₹${Math.abs(transaction.amount).toFixed(2)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
                X
            </button>
        </div>
    `;

    list.appendChild(li);
}

// Update Balance
function updateValues() {

    const amounts = transactions.map(item => item.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0);

    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0);

    const expenseTotal = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0);

    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerText = `₹${incomeTotal.toFixed(2)}`;
    expense.innerText = `₹${Math.abs(expenseTotal).toFixed(2)}`;
}

// Remove Transaction
function removeTransaction(id) {

    transactions = transactions.filter(item => item.id !== id);

    updateLocalStorage();
    init();
}

// Save to Local Storage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize App
function init() {

    list.innerHTML = "";

    transactions.forEach(addTransaction);

    updateValues();
}

init();