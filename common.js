function filterTable() {
    const revenueQuery = document.getElementById('revenueSearch').value.toLowerCase();
    const expenseQuery = document.getElementById('expenseSearch').value.toLowerCase();
    const revenueRows = document.querySelectorAll('#revenueTableBody tr');
    const expenseRows = document.querySelectorAll('#expenseTableBody tr');
    const revenueTypeFilter = document.getElementById('revenueTypeFilter').value.toLowerCase();
    const expenseTypeFilter = document.getElementById('expenseTypeFilter').value.toLowerCase();

    filterRows(revenueRows, revenueQuery, revenueTypeFilter);
    filterRows(expenseRows, expenseQuery, expenseTypeFilter);
}

function filterRows(rows, query, typeFilter) {
    rows.forEach(row => {
        const description = row.cells[0].textContent.toLowerCase();
        const receipt = row.cells[2].textContent.toLowerCase();
        const contact = row.cells[5].textContent.toLowerCase();
        const matchesQuery = description.includes(query) || receipt.includes(query) || contact.includes(query);
        const matchesType = typeFilter === '' || description.includes(typeFilter);
        row.style.display = matchesQuery && matchesType ? '' : 'none';
    });
}