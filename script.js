function calculateTotal() {
    let rows = document.querySelectorAll('#itemsTable tbody tr');
    rows.forEach((row, index) => {
        let rate = parseFloat(row.querySelector('.rate').value) || 0;
        let quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        let taxPercentage = parseFloat(row.querySelector('.taxPercentage').value) || 0;

        // Calculate taxable amount
        let taxableAmount = rate * quantity;
        row.querySelector('.taxableAmount').value = taxableAmount.toFixed(2);

        // Calculate tax amount
        let taxAmount = (taxableAmount * taxPercentage) / 100;
        row.querySelector('.taxAmount').value = taxAmount.toFixed(2);

        // Calculate total amount
        let totalAmount = taxableAmount + taxAmount;
        row.querySelector('.totalAmount').value = totalAmount.toFixed(2);
    });
}

function addItem() {
    let tableBody = document.querySelector('#itemsTable tbody');
    let newRow = tableBody.insertRow();
    let rowCount = tableBody.rows.length;

    // Create new row with empty input fields
    newRow.innerHTML = `
        <td><input type="number" class="slNumber" value="${rowCount + 1}" readonly /></td>
        <td><input type="text" class="itemName" /></td>
        <td><input type="text" class="description" /></td>
        <td><input type="number" class="rate" onchange="calculateTotal()" /></td>
        <td><input type="number" class="quantity" onchange="calculateTotal()" /></td>
        <td><input type="number" class="taxableAmount" readonly /></td>
        <td><input type="number" class="taxPercentage" onchange="calculateTotal()" /></td>
        <td><input type="number" class="taxAmount" readonly /></td>
        <td><input type="number" class="totalAmount" readonly /></td>
    `;
}

function generatePDF() {
    // Using jsPDF to generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Fetch form data
    const billFrom = document.getElementById('billFrom').value;
    const billTo = document.getElementById('billTo').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;

    // Add header
    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 40);
    doc.text(`Invoice Date: ${invoiceDate}`, 150, 40);
    doc.text(`Bill From: ${billFrom}`, 20, 50);
    doc.text(`Bill To: ${billTo}`, 150, 50);

    // Table headers
    let startY = 70;
    doc.text("Sl. No", 20, startY);
    doc.text("Item", 40, startY);
    doc.text("Description", 80, startY);
    doc.text("Rate", 140, startY);
    doc.text("Quantity", 180, startY);
    doc.text("Taxable Amount", 220, startY);
    doc.text("Tax %", 270, startY);
    doc.text("Tax Amount", 310, startY);
    doc.text("Total", 350, startY);

    // Table rows
    let rows = document.querySelectorAll('#itemsTable tbody tr');
    let yPosition = startY + 10;
    rows.forEach(row => {
        doc.text(row.querySelector('.slNumber').value, 20, yPosition);
        doc.text(row.querySelector('.itemName').value, 40, yPosition);
        doc.text(row.querySelector('.description').value, 80, yPosition);
        doc.text(row.querySelector('.rate').value, 140, yPosition);
        doc.text(row.querySelector('.quantity').value, 180, yPosition);
        doc.text(row.querySelector('.taxableAmount').value, 220, yPosition);
        doc.text(row.querySelector('.taxPercentage').value, 270, yPosition);
        doc.text(row.querySelector('.taxAmount').value, 310, yPosition);
        doc.text(row.querySelector('.totalAmount').value, 350, yPosition);
        yPosition += 10;
    });

    // Seal and Sign
    const sealSign = document.getElementById('sealSign').checked ? "Seal and Sign: YES" : "Seal and Sign: NO";
    doc.text(sealSign, 20, yPosition + 10);

    // Save the PDF
    doc.save(`Invoice_${invoiceNumber}.pdf`);
}
