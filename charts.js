document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chartType') && document.getElementById('filterType')) {
        drawCharts();

        document.getElementById('chartType').addEventListener('change', drawCharts);
        document.getElementById('filterType').addEventListener('change', drawCharts);
    } else {
        console.error('Required elements not found in the DOM');
    }
});

function drawCharts() {
    const chartElement = document.getElementById('myChart');
    const chartTypeElement = document.getElementById('chartType');
    const filterTypeElement = document.getElementById('filterType');

    if (!chartTypeElement || !filterTypeElement) {
        console.error('Required elements not found in the DOM');
        return;
    }

    const chartType = chartTypeElement.value;
    const filterType = filterTypeElement.value;

    const data = getData(filterType); // Get data based on filter

    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        new Chart(ctx, {
            type: chartType,
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function getData(filterType) {
    // Implement logic to filter data based on the filterType (revenue, expenses, all)
    // Return the filtered data array
    return [12, 19, 3, 5, 2, 3, 7]; // Example data
}
