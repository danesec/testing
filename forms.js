document.addEventListener('DOMContentLoaded', setupEventListeners);

function addEntry(type) {
    const formPrefix = `add${type}`;
    const tableBody = document.getElementById(`${type.toLowerCase()}TableBody`);

    const entryData = {
        type: document.getElementById(`${formPrefix}Type`).value,
        date: document.getElementById(`${formPrefix}Date`).value,
        receipt: document.getElementById(`${formPrefix}Receipt`).value,
        payment: document.getElementById(`${formPrefix}Payment`).value,
        name: document.getElementById(`${formPrefix}Name`).value,
        contact: document.getElementById(`${formPrefix}Contact`).value,
        subtotal: parseFloat(document.getElementById(`${formPrefix}SubtotalInput`).value).toFixed(2),
        fee: parseFloat(document.getElementById(`${formPrefix}Fee`).value).toFixed(2),
        notes: document.getElementById(`${formPrefix}Notes`).value
    };

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${entryData.type}</td>
        <td>${entryData.date}</td>
        <td>${entryData.receipt}</td>
        <td>${entryData.payment}</td>
        <td>${entryData.name}</td>
        <td>${entryData.contact}</td>
        <td>$${entryData.subtotal}</td>
        <td>$${entryData.fee}</td>
        <td>${entryData.notes}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
    updateSummary();
    drawCharts(); // Redraw charts after adding an entry
}

function updateEntry(type) {
    const formPrefix = `edit${type}`;
    const tableBody = document.getElementById(`${type.toLowerCase()}TableBody`);
    const editingRow = document.getElementById(`${formPrefix}Form`).dataset.editingRow;

    const entryData = {
        type: document.getElementById(`${formPrefix}Type`).value,
        date: document.getElementById(`${formPrefix}Date`).value,
        receipt: document.getElementById(`${formPrefix}Receipt`).value,
        payment: document.getElementById(`${formPrefix}Payment`).value,
        name: document.getElementById(`${formPrefix}Name`).value,
        contact: document.getElementById(`${formPrefix}Contact`).value,
        subtotal: parseFloat(document.getElementById(`${formPrefix}SubtotalInput`).value).toFixed(2),
        fee: parseFloat(document.getElementById(`${formPrefix}Fee`).value).toFixed(2),
        notes: document.getElementById(`${formPrefix}Notes`).value
    };

    const row = tableBody.rows[editingRow - 1];
    row.cells[0].textContent = entryData.type;
    row.cells[1].textContent = entryData.date;
    row.cells[2].textContent = entryData.receipt;
    row.cells[3].textContent = entryData.payment;
    row.cells[4].textContent = entryData.name;
    row.cells[5].textContent = entryData.contact;
    row.cells[6].textContent = `$${entryData.subtotal}`;
    row.cells[7].textContent = `$${entryData.fee}`;
    row.cells[8].textContent = entryData.notes;

    updateSummary();
    drawCharts(); // Redraw charts after updating an entry
}

function clearForm(formPrefix) {
    document.getElementById(`${formPrefix}Form`).reset();
    delete document.getElementById(`${formPrefix}Form`).dataset.editingRow;
}

function filterTable() {
    const query = document.getElementById('revenueSearch').value.toLowerCase();
    const revenueRows = document.querySelectorAll('#revenueTableBody tr');
    const expenseRows = document.querySelectorAll('#expensesTableBody tr');
    const revenueTypeFilter = document.getElementById('revenueTypeFilter').value.toLowerCase();
    const expenseTypeFilter = document.getElementById('expenseTypeFilter').value.toLowerCase();

    filterRows(revenueRows, query, revenueTypeFilter);
    filterRows(expenseRows, query, expenseTypeFilter);
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