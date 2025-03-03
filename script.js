document.getElementById('compressorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRecord();
});

document.getElementById('generateReport').addEventListener('click', function() {
    generateReport();
});

let records = [];

function addRecord() {
    const date = document.getElementById('date').value;
    const pressure = document.getElementById('pressure').value;
    const temperature = document.getElementById('temperature').value;
    const compressor = document.getElementById('compressor').value;
    const responsible = document.getElementById('responsible').value;

    const record = { date, pressure, temperature, compressor, responsible };
    records.push(record);

    updateTable();
    clearForm();
}

function updateTable() {
    const tableBody = document.querySelector('#recordsTable tbody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.pressure}</td>
            <td>${record.temperature}</td>
            <td>${record.compressor}</td>
            <td>${record.responsible}</td>
        `;
        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('compressorForm').reset();
}

function generateReport() {
    // Aqui você pode usar bibliotecas como docxtemplater e xlsx para gerar relatórios em Word e Excel.
    // Exemplo básico de como gerar um arquivo Excel:

    const XLSX = require('xlsx');
    const wb = XLSX.utils.book_new();
    const wsData = [
        ['Data/Horário', 'Pressão', 'Temperatura', 'Compressor', 'Responsável']
    ];

    records.forEach(record => {
        wsData.push([record.date, record.pressure, record.temperature, record.compressor, record.responsible]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    XLSX.writeFile(wb, 'relatorio.xlsx');

    // Para gerar um arquivo Word, você pode usar a biblioteca docxtemplater.
}
