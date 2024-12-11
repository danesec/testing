// Get the modal elements
var revenueModal = document.getElementById("addRevenueModal");
var expenseModal = document.getElementById("addExpenseModal");

// Get the button that opens the modals (you'll need to replace this with your actual button ID)
var addRevenueBtn = document.getElementById("addRevenueBtn");
var addExpenseBtn = document.getElementById("addExpenseBtn");

// Get the <span> elements that close the modals
var closeBtns = document.querySelectorAll(".close");

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
