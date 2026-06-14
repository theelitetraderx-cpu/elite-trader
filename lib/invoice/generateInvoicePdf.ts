import PDFDocument from "pdfkit";

export type InvoiceData = {
  customerEmail: string;
  phone?: string;
  planName: string;
  amount: string;
  network?: string;
  invoiceNumber: string;
  invoiceDate: Date;
};

const GOLD = "#C9A227";
const DARK = "#111111";
const MUTED = "#666666";

function formatAmount(amount: string) {
  return amount.startsWith("$") ? amount : `$${amount}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function generateInvoiceNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = String(now.getTime()).slice(-4);
  return `ELT-${date}-${suffix}`;
}

export function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width - 100;

    // Header bar
    doc.rect(50, 50, pageWidth, 4).fill(GOLD);

    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor(GOLD)
      .text("THE ELITE TRADER", 50, 70);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(MUTED)
      .text("Precision Trading · Consistent Profits", 50, 98)
      .text("https://theelitetrader.in", 50, 112);

    doc
      .font("Helvetica-Bold")
      .fontSize(28)
      .fillColor(DARK)
      .text("INVOICE", 50, 150);

    // Invoice meta (right side)
    const metaX = 350;
    doc.font("Helvetica").fontSize(9).fillColor(MUTED);
    doc.text("Invoice No.", metaX, 150);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK);
    doc.text(data.invoiceNumber, metaX, 163);

    doc.font("Helvetica").fontSize(9).fillColor(MUTED);
    doc.text("Date", metaX, 185);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK);
    doc.text(formatDate(data.invoiceDate), metaX, 198);

    doc.font("Helvetica").fontSize(9).fillColor(MUTED);
    doc.text("Status", metaX, 220);
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#B45309");
    doc.text("PENDING VERIFICATION", metaX, 233);

    // Bill to
    doc.moveDown(4);
    const billY = 280;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK).text("BILL TO", 50, billY);
    doc.font("Helvetica").fontSize(11).fillColor(DARK).text(data.customerEmail, 50, billY + 18);
    if (data.phone) {
      doc.font("Helvetica").fontSize(10).fillColor(MUTED).text(data.phone, 50, billY + 36);
    }

    // Table header
    const tableTop = billY + 70;
    doc.rect(50, tableTop, pageWidth, 28).fill("#F5F5F5");
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(DARK)
      .text("DESCRIPTION", 60, tableTop + 9)
      .text("AMOUNT", 460, tableTop + 9);

    // Line item
    const rowY = tableTop + 40;
    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(DARK)
      .text(`${data.planName} Program`, 60, rowY);

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(DARK)
      .text(formatAmount(data.amount), 460, rowY);

    if (data.network) {
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(MUTED)
        .text(`Payment via ${data.network}`, 60, rowY + 18);
    }

    // Divider
    const dividerY = rowY + 50;
    doc.moveTo(50, dividerY).lineTo(50 + pageWidth, dividerY).strokeColor("#E5E5E5").stroke();

    // Total
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(DARK)
      .text("TOTAL", 380, dividerY + 16)
      .fontSize(14)
      .fillColor(GOLD)
      .text(formatAmount(data.amount), 460, dividerY + 14);

    // Notes
    const notesY = dividerY + 70;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(DARK)
      .text("Notes", 50, notesY);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(MUTED)
      .text(
        "Thank you for enrolling with The Elite Trader. Your payment proof has been received and is under verification. You will receive a confirmation email once verified (usually within 1–6 hours).",
        50,
        notesY + 18,
        { width: pageWidth, lineGap: 4 }
      );

    // Footer
    const footerY = doc.page.height - 80;
    doc.rect(50, footerY, pageWidth, 1).fill("#E5E5E5");
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(MUTED)
      .text(
        "The Elite Trader · theelitetrader.in · support@theelitetrader.in",
        50,
        footerY + 12,
        { align: "center", width: pageWidth }
      );

    doc.end();
  });
}
