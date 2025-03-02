class Account {
    constructor(name, chores, transaction, balance) {
        this.name = name;
        this.chores = chores;
        this.transaction = transaction;
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        this.transaction++

    }
    choresCompleted(amount) {
        this.chores += amount;
    }
}
class Transaction {
    constructor(name, reason, amount, date) {
        this.name = name;
        this.reason = reason;
        this.amount = amount;
        this.date = date;
    }
}

let balance = localStorage.getItem("balance") ? JSON.parse(localStorage.getItem("balance")) : 0;  
const people = localStorage.getItem("people") ? 
    JSON.parse(localStorage.getItem("people")).map(accountData => new Account(accountData.name, accountData.chores, accountData.transaction, accountData.balance)) 
    : [];const names = localStorage.getItem("names") ? JSON.parse(localStorage.getItem("names")) : [];
const transactions = localStorage.getItem("transactions") ? JSON.parse(localStorage.getItem("transactions")).map(transactionData => new Transaction(transactionData.name, transactionData.reason, transactionData.amount, transactionData.date)) : [];
// choreList = ["Dishes", "Laundry", "Vacuum", "Trash", "Mow", "Clean", "Cook", "Sweep", "Dust", "Wash"]; for future use
const reasons = ["Allowance", "Chore", "Gift", "Other"];

const balanceBTN = document.querySelector("#income");
balanceBTN.addEventListener("click", () => {
    balance += parseInt(prompt("How much money did you make this month?"));
    console.log(balance);
    localStorage.setItem("balance", JSON.stringify(balance));
    location.reload();
});

const getName = () => {
    let name = prompt("Name for account?");
    return name;
}

const newAccount = () => {
    const newAccount = new Account(getName(), 0, 0, 0);
    people.push(newAccount);
    names.push(newAccount.name);
    localStorage.setItem("people", JSON.stringify(people));
    localStorage.setItem("names", JSON.stringify(names));
}

const createAccountBTN = document.querySelector("#newAccount");
createAccountBTN.addEventListener("click", newAccount);


const newTransaction = () => {
    let name = document.getElementById("names").value;
    let reason = document.getElementById("reason").value;
    let amount = parseInt(document.getElementById("amount").value);
    let date = document.getElementById("date").value;

      if (!name || !reason || isNaN(amount) || !date) {
        alert("Please fill in all fields properly.");
        return;
    }
    let transaction = new Transaction(name, reason, amount, date);
    
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    balance -= amount;

    let account = people.find(person => person.name === name);
    console.log(account,typeof account);
    account.deposit(amount);
    if (reason === "Chore") {
        account.choresCompleted(1);
    }
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("people", JSON.stringify(people));

    closePopup();
    location.reload();
}
const newTransactionBTN = document.querySelector("#submitTransaction");
newTransactionBTN.addEventListener("click", newTransaction);

function populateDropdown(id, options) {
    const selectElement = document.getElementById(id);
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

function openPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";

    populateDropdown("names", names);
    populateDropdown("reason", reasons);

}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

const resetBTN = document.querySelector("#resetBank");
resetBTN.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
document.getElementById("menuButton").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("open");
});

// menu control
// Menu control
const contentArea = document.querySelectorAll(".contentArea");
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', (event) => {
        console.log(event.target.id);  // Get the id of the clicked menu item
        
        // Hide all content areas
        contentArea.forEach(content => {
            content.classList.add("hidden");
        });
        
        // Show the corresponding content area based on the clicked menu item
        if (event.target.id === "home") {
            contentArea[0].classList.remove("hidden");
        } else if (event.target.id === "account") {
            contentArea[1].classList.remove("hidden");
        } else {
            contentArea[2].classList.remove("hidden");
        }
    });
});
// filling tables
window.onload = () => {
    const accountTable = document.querySelector("#accountsTable>tbody");
    const transactionTable = document.querySelector("#transactionsTable>tbody");
    accountTable.innerHTML = "";
    transactionTable.innerHTML = "";
    people.forEach(person => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.chores}</td>
            <td>${person.transaction}</td>
            <td>${person.balance}</td>
        `;
        accountTable.appendChild(row);
    });
    transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.name}</td>
            <td>${transaction.reason}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.date}</td>
        `;
        transactionTable.appendChild(row);
        
    const balanceSheet = document.querySelector("#balance");
    balanceSheet.textContent = `${balance}`;
    if (balance < 0) {
        balanceSheet.style.color = "red";
    }else if (balance > 10000) {
        balanceSheet.style.color = "green";
    }
    else {
        balanceSheet.style.color = "black";
    }

    });
}