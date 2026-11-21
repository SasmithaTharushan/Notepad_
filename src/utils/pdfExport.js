import { jsPDF } from "jspdf";

export const exportSingleNotePDF = (note) => {
  const doc = new jsPDF();

  // Document styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(22, 163, 74); // emerald-600
  doc.text("Notepad Document", 20, 25);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 33);
  doc.line(20, 37, 190, 37);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(note.title || "Untitled Note", 20, 48);

  // Metadata
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text(`Category: ${note.category || "General"}   |   Date: ${note.date || new Date().toISOString().split('T')[0]}`, 20, 56);

  // Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  
  const content = note.content || "(No content)";
  const splitText = doc.splitTextToSize(content, 170);
  doc.text(splitText, 20, 68);

  doc.save(`${(note.title || "note").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`);
};

export const exportAllNotesPDF = (notes) => {
  const doc = new jsPDF();
  let yPosition = 25;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(22, 163, 74);
  doc.text("Notepad - All Documents Report", 20, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Notes: ${notes.length}   |   Exported: ${new Date().toLocaleString()}`, 20, yPosition);

  yPosition += 6;
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 12;

  notes.forEach((note, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 25;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(`${index + 1}. ${note.title || "Untitled"}`, 20, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text(`[${note.category || "General"}] - ${note.date || "N/A"}`, 20, yPosition);
    yPosition += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const contentLines = doc.splitTextToSize(note.content || "", 170);
    doc.text(contentLines, 20, yPosition);
    yPosition += (contentLines.length * 6) + 10;
  });

  doc.save(`Notepad_Summary_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};
