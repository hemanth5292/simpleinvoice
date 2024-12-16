function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Fetch form data
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const customerName = document.getElementById('customerName').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    // Add content to PDF
    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 40);
    doc.text(`Customer Name: ${customerName}`, 20, 50);
    doc.text(`Amount: $${amount}`, 20, 60);
    doc.text(`Description:`, 20, 70);
    doc.text(description, 20, 80, { maxWidth: 170 });

    // Save the PDF
    doc.save(`Invoice_${invoiceNumber}.pdf`);
    alert("Invoice PDF generated successfully!");
}
