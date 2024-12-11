// Variables for table data
const revenueTable = document.getElementById('revenueTable');
const expensesTable = document.getElementById('expensesTable');
const totalDonationsElement = document.getElementById('totalDonations');
const totalRegistrationsElement = document.getElementById('totalRegistrations');
const creditCardFeesElement = document.getElementById('creditCardFees');
const netAmountElement = document.getElementById('netAmount');

let revenueData = [];
let expenseData = [];

// Update Financial Stats
function updateFinancialStats() {
    let totalDonations = 0;
    let totalRegistrations = 0;
    let totalFees = 0;
    let netAmount = 0;

    revenueData.forEach(row => {
        totalDonations += parseFloat(row.querySelector('.revenueSubtotal').innerText);
        totalFees += parseFloat(row.querySelector('.revenueFee').innerText);
    });

    expenseData.forEach(row => {
        totalRegistrations += parseFloat(row.querySelector('.expenseSubtotal').innerText);
        totalFees += parseFloat(row.querySelector('.expenseFee').innerText);
    });

    netAmount = totalDonations - totalRegistrations;

    totalDonationsElement.innerText = `$${totalDonations.toFixed(2)}`;
    totalRegistrationsElement.innerText = `$${totalRegistrations.toFixed(2)}`;
    creditCardFeesElement.innerText = `$${totalFees.toFixed(2)}`;
    netAmountElement.innerText = `$${netAmount.toFixed(2)}`;
}

// Function to add revenue to the table
function addRevenueToTable() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="revenueType">${document.getElementById('revenueType').value}</td>
        <td class="revenueDate">${document.getElementById('revenueDate').value}</td>
        <td class="revenueReceipt">${document.getElementById('revenueReceipt').value}</td>
        <td class="revenuePayment">${document.getElementById('revenuePayment').value}</td>
        <td class="revenueName">${document.getElementById('revenueName').value}</td>
        <td class="revenueContact">${document.getElementById('revenueContact').value}</td>
        <td class="revenueSubtotal">${document.getElementById('revenueSubtotal').value}</td>
        <td class="revenueFee">${document.getElementById('revenueFee').value}</td>
        <td class="revenueNotes">${document.getElementById('revenueNotes').value}</td>
        <td>
            <button onclick="voidTransaction(this)">Void</button>
            <button onclick="editRevenue(this)">Edit</button>
            <button onclick="deleteRevenue(this)">Delete</button>
        </td>
    `;
    revenueTable.querySelector('tbody').appendChild(newRow);
    revenueData.push(newRow); // Add to revenue data array
    updateFinancialStats(); // Update stats
    closePopup('revenuePopup');
}

// Function to add expense to the table
function addExpenseToTable() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="expenseType">${document.getElementById('expenseType').value}</td>
        <td class="expenseDate">${document.getElementById('expenseDate').value}</td>
        <td class="expenseReceipt">${document.getElementById('expenseReceipt').value}</td>
        <td class="expensePayment">${document.getElementById('expensePayment').value}</td>
        <td class="expenseName">${document.getElementById('expenseName').value}</td>
        <td class="expenseContact">${document.getElementById('expenseContact').value}</td>
        <td class="expenseSubtotal">${document.getElementById('expenseSubtotal').value}</td>
        <td class="expenseFee">${document.getElementById('expenseFee').value}</td>
        <td class="expenseNotes">${document.getElementById('expenseNotes').value}</td>
        <td>
            <button onclick="voidTransaction(this)">Void</button>
            <button onclick="editExpense(this)">Edit</button>
            <button onclick="deleteExpense(this)">Delete</button>
        </td>
    `;
    expensesTable.querySelector('tbody').appendChild(newRow);
    expenseData.push(newRow); // Add to expense data array
    updateFinancialStats(); // Update stats
    closePopup('expensePopup');
}

// Void transaction function
function voidTransaction(button) {
    const row = button.closest('tr');
    row.classList.toggle('strikethrough');
    const voidButton = row.querySelector('button');
    if (row.classList.contains('strikethrough')) {
        voidButton.innerText = 'Unvoid';
    } else {
        voidButton.innerText = 'Void';
    }
    updateFinancialStats(); // Update stats after voiding
}

// Edit transaction functions
function editRevenue(button) {
    // Implement edit functionality here
}

function editExpense(button) {
    // Implement edit functionality here
}

// Delete transaction functions
function deleteRevenue(button) {
    const row = button.closest('tr');
    row.remove();
    updateFinancialStats(); // Update stats after deletion
}

function deleteExpense(button) {
    const row = button.closest('tr');
    row.remove();
    updateFinancialStats(); // Update stats after deletion
}

// Show popups
function showAddRevenuePopup() {
    document.getElementById('revenuePopup').style.display = 'flex';
}

function showAddExpensePopup() {
    document.getElementById('expensePopup').style.display = 'flex';
}

// Close popups
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Export to CSV function
function exportToCSV(tableId) {
    const table = document.getElementById(tableId);
    let csv = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const rowData = [];
        const cols = row.querySelectorAll('td, th');
        cols.forEach(col => {
            rowData.push(col.innerText);
        });
        csv.push(rowData.join(','));
    });

    const csvString = csv.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tableId}.csv`;
    link.click();
}

// Initial update
updateFinancialStats();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  modal.style.opacity = 1;
  modal.querySelector(".modal-content").style.transform = "translateY(0)";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal.style.opacity = 0;
  modal.querySelector(".modal-content").style.transform = "translateY(-10px)";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.style.opacity = 0;
    modal.querySelector(".modal-content").style.transform = "translateY(-10px)";
  }
}

