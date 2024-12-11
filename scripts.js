document.addEventListener("DOMContentLoaded", () => {
    const revenueBody = document.getElementById("revenue-body");
    const expensesBody = document.getElementById("expenses-body");
    const filterSelect = document.getElementById("filter-select");
    const searchInput = document.getElementById("search");
    const stats = {
        donations: 0,
        registrations: 0,
        fees: 0,
        net: 0,
    };

    // Handle Add Revenue Button
    document.getElementById("add-revenue").addEventListener("click", () => {
        const newRow = createTransactionRow("Donation", "12/12/2024", "54321", "$200", "John Smith", "555-9876", "$200", "$10", "Charity Event");
        revenueBody.appendChild(newRow);
        updateFinancialStats();
    });

    // Handle Add Expense Button
    document.getElementById("add-expense").addEventListener("click", () => {
        const newRow = createTransactionRow("Manual Addition", "12/12/2024", "67890", "$150", "Jane Smith", "555-1122", "$150", "$8", "Office Supplies");
        expensesBody.appendChild(newRow);
        updateFinancialStats();
    });

    // Filter Table by Dropdown
    filterSelect.addEventListener("change", (e) => {
        filterTable(e.target.value);
    });

    // Filter Table by Search Input
    searchInput.addEventListener("input", () => {
        filterTable(filterSelect.value);
    });

    // Function to Create a Transaction Row
    function createTransactionRow(type, date, receipt, payment, name, contact, subtotal, fee, notes) {
        const row = document.createElement("tr");
        row.setAttribute("data-type", type);
        row.innerHTML = `
            <td>${type}</td>
            <td>${date}</td>
            <td>${receipt}</td>
            <td>${payment}</td>
            <td>${name}</td>
            <td>${contact}</td>
            <td>${subtotal}</td>
            <td>${fee}</td>
            <td>${notes}</td>
            <td>
                <button class="void">Void</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        addEventListeners(row);
        return row;
    }

    // Add event listeners for buttons
    function addEventListeners(row) {
        row.querySelector(".void").addEventListener("click", () => {
            row.classList.add("voided");
            row.querySelector(".void").textContent = "Unvoid";
            row.querySelector(".edit").remove();
            row.querySelector(".delete").remove();
        });

        row.querySelector(".edit").addEventListener("click", () => {
            // Edit functionality here
        });

        row.querySelector(".delete").addEventListener("click", () => {
            row.remove();
            updateFinancialStats();
        });
    }

    // Filter Table Rows
    function filterTable(filter) {
        const rows = [...revenueBody.children, ...expensesBody.children];
        rows.forEach(row => {
            const type = row.getAttribute("data-type");
            const matchesType = filter === "All" || type === filter;
            const matchesSearch = row.textContent.toLowerCase().includes(searchInput.value.toLowerCase());
            if (matchesType && matchesSearch) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
        updateFinancialStats();
    }

    // Update Financial Stats
    function updateFinancialStats() {
        let donations = 0;
        let registrations = 0;
        let fees = 0;
        let net = 0;

        [...revenueBody.children, ...expensesBody.children].forEach(row => {
            if (row.style.display !== "none") {
                const type = row.querySelector("td").textContent;
                const subtotal = parseFloat(row.querySelector("td:nth-child(7)").textContent.replace("$", ""));
                const fee = parseFloat(row.querySelector("td:nth-child(8)").textContent.replace("$", ""));

                if (type === "Donation") donations += subtotal - fee;
                if (type === "Registration") registrations += subtotal;
                if (type === "Manual Addition") fees += fee;
            }
        });

        net = donations + registrations - fees;

        stats.donations = donations;
        stats.registrations = registrations;
        stats.fees = fees;
        stats.net = net;

        document.getElementById("donations").textContent = stats.donations.toFixed(2);
        document.getElementById("registrations").textContent = stats.registrations.toFixed(2);
        document.getElementById("fees").textContent = stats.fees.toFixed(2);
        document.getElementById("net").textContent = stats.net.toFixed(2);
    }

    // Initialize the page
    updateFinancialStats();
});
