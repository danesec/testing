// Get the modal elements
var revenueModal = document.getElementById("addRevenueModal");
var expenseModal = document.getElementById("addExpenseModal");

// Get the button that opens the modals
var addRevenueBtn = document.getElementById("addRevenueBtn");
var addExpenseBtn = document.getElementById("addExpenseBtn");

// Get the <span> elements that close the modals
var closeBtns = document.querySelectorAll(".close");

// Get the tables to display revenue and expense records
var revenueTable = document.getElementById("revenueTable").getElementsByTagName('tbody')[0];
var expenseTable = document.getElementById("expenseTable").getElementsByTagName('tbody')[0];

// Example revenue and expense data
var exampleRevenue = [
  { source: "Event Registration", amount: 500, date: "2024-12-01", notes: "This is from our fundraising event." },
  { source: "Sponsorship", amount: 2000, date: "2024-12-01", notes: "Corporate sponsorship for the event." },
  { source: "Ticket Sales", amount: 1500, date: "2024-12-01", notes: "Sales from the online ticket platform." }
];

var exampleExpenses = [
  { category: "Catering", amount: 200, date: "2024-12-02", notes: "Catering for the event." },
  { category: "Marketing", amount: 500, date: "2024-12-01", notes: "Advertising costs for the event." },
  { category: "Venue Rental", amount: 1000, date: "2024-12-01", notes: "Venue rental for the fundraiser." }
];

// Function to add a row to the table
function addRow(table, data) {
  var row = table.insertRow();
  for (var key in data) {
    var cell = row.insertCell();
    cell.textContent = data[key];
  }
}

// Populate the tables with example data
exampleRevenue.forEach(function(revenue) {
  addRow(revenueTable, revenue);
});

exampleExpenses.forEach(function(expense) {
  addRow(expenseTable, expense);
});

// When the user clicks the 'Add Revenue' button, open the modal
addRevenueBtn.onclick = function() {
  revenueModal.style.display = "block";
}

// When the user clicks the 'Add Expense' button, open the modal
addExpenseBtn.onclick = function() {
  expenseModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modals
closeBtns.forEach(function(span) {
  span.onclick = function() {
    revenueModal.style.display = "none";
    expenseModal.style.display = "none";
  }
});

// When the user clicks anywhere outside the modal content, close the modals
window.onclick = function(event) {
  if (event.target === revenueModal || event.target === expenseModal) {
    revenueModal.style.display = "none";
    expenseModal.style.display = "none";
  }
}
