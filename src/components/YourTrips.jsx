import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function YourTrips({ savedTrips = [], destinations = [] }) {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const container = pdfRef.current;
    if (!container || savedTrips.length === 0) return;

    const pageDivs = container.querySelectorAll(".pdf-page");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    for (let i = 0; i < pageDivs.length; i++) {
      const page = pageDivs[i];
      const originalDisplay = page.style.display;
      const originalPosition = page.style.position;
      
      page.style.display = "block";
      page.style.position = "relative";
      page.style.left = "0";
      page.style.top = "0";
      page.style.background = "white";
      page.style.color = "black";

      try {
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, 10, pageWidth - 20, imgHeight);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        page.style.display = originalDisplay;
        page.style.position = originalPosition;
      }
    }

    pdf.save(`PinDrop_Trip_${savedTrips.length}_Places.pdf`);
  };

  const saved = destinations.filter(d => savedTrips.includes(d.title));

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div ref={pdfRef} style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        {saved.map((d, i) => (
          <div
            key={i}
            className="pdf-page"
            style={{ 
              display: "none", 
              width: "210mm", 
              minHeight: "297mm",
              padding: "5mm 20mm 20mm 20mm", 
              background: "white", 
              color: "black",
              boxSizing: "border-box"
            }}
          >
            <div className="text-center" style={{ background: "white", color: "black" }}>
              <h1 className="text-5xl font-bold mb-16 text-teal-600">
                Your PinDrop Trip
              </h1>
              <img
                src={d.img}
                alt={d.title}
                className="w-full max-w-2xl mx-auto h-80 object-cover rounded-2xl shadow-2xl mb-8"
                crossOrigin="anonymous"
              />
              <h2 className="text-4xl font-bold mb-6" style={{ color: "black" }}>{d.title}</h2>
              <p className="text-lg leading-8 max-w-3xl mx-auto mb-10 text-gray-700">
                {d.longDesc}
              </p>
              <div className="bg-teal-50 p-8 rounded-2xl max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-teal-700 mb-6">
                  Must-Do Tips
                </h3>
                <ul className="space-y-4 text-lg text-gray-800">
                  {d.tips.map((t, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-16 text-gray-500">
                Page {i + 1} of {saved.length} • Generated on {new Date().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Your Trips section */}
      {savedTrips.length > 0 && (
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-8 md:p-12 rounded-3xl text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white select-none">
            Your Trips ({savedTrips.length}/3)
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {savedTrips.map(t => (
              <span
                key={t}
                className="bg-white text-teal-600 px-6 py-3 rounded-full text-lg font-bold shadow-lg select-none"
              >
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={downloadPDF}
            className="bg-green-800 text-white hover:bg-teal-600 hover:border px-8 py-4 rounded-full text-xl font-bold shadow-2xl transition-transform hover:scale-105"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}