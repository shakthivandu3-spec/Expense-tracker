let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// =========================
// ADD TRANSACTION
// =========================

function addTransaction() {

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    saveTransactions();

    displayTransactions();
    updateSummary();

    // Clear form
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}


// =========================
// DISPLAY TRANSACTIONS
// =========================

function displayTransactions() {

    const transactionList = document.getElementById("transactionList");

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <li class="empty-message">
                No transactions yet.
            </li>
        `;

        return;
    }


    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        const sign = transaction.type === "income" ? "+" : "-";

        const amountClass =
            transaction.type === "income"
                ? "income-amount"
                : "expense-amount";


        li.innerHTML = `

            <div class="transaction-info">

                <div class="transaction-icon ${amountClass}">
                    ${transaction.type === "income" ? "↗" : "↘"}
                </div>

                <div>

                    <strong>
                        ${transaction.description}
                    </strong>

                    <small>
                        ${transaction.category}
                    </small>

                </div>

            </div>


            <div class="transaction-right">

                <span class="${amountClass}">
                    ${sign}₹${transaction.amount}
                </span>

                <button
                    onclick="deleteTransaction(${transaction.id})"
                >
                    Delete
                </button>

            </div>

        `;

        transactionList.appendChild(li);

    });
}


// =========================
// DELETE TRANSACTION
// =========================

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });

    saveTransactions();

    displayTransactions();
    updateSummary();
}


// =========================
// UPDATE SUMMARY
// =========================

function updateSummary() {

    let income = 0;
    let expense = 0;


    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });


    const balance = income - expense;


    document.getElementById("income").textContent =
        `₹${income.toLocaleString("en-IN")}`;

    document.getElementById("expense").textContent =
        `₹${expense.toLocaleString("en-IN")}`;

    document.getElementById("balance").textContent =
        `₹${balance.toLocaleString("en-IN")}`;
}


// =========================
// LOCAL STORAGE
// =========================

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// =========================
// LOAD DATA
// =========================

displayTransactions();

updateSummary();