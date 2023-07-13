import React, { useEffect, useState, useLocation, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@material-ui/core/Container";
import { getClientInvoiceSummary } from "../../actions/clientActions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// API.interceptors.request.use((req) => {
//   if(localStorage.getItem('profile')) {
//       req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
//   }

//   return req
// })
const ClientInvoiceSummary = () => {
  const { clientId } = useParams();
  const [summaryData, setSummaryData] = useState(null);
  const location = window.location.pathname;
  useEffect(() => {
    const fetchInvoiceSummary = async (clientId) => {
      try {
        // const response = await getClientInvoiceSummary('6478d261ce968413e4875293'); // Pass the clientId to the API call
        const response = await axios.get(`http://localhost:5000${location}`);
        setSummaryData(response.data); //Fetching the data from the API call

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInvoiceSummary();
  }, [clientId]); // Fetch data whenever the clientId changes

  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true); // Create a new PDF document
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      ); // Add the image to the PDF
      pdf.save("invoice.pdf"); // Save the PDF
    });
  };

  return (
    <div>
      {summaryData ? (
        <div>
          <div ref={pdfRef}>
            <Container
              style={{
                width: "85%",
                paddingTop: "70px",
                paddingBottom: "50px",
                border: "none",
              }}
            >
              <h1 style={{ textAlign: "center" }}>{summaryData.name}</h1>
              <br />
              <br />
              <br />

              <h2>Client Invoice Summary</h2>
              <table style={{ width: "100%", border: "none" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Total Invoices
                    </th>
                    <th
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Total Amount
                    </th>
                    <th
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Total Amount Paid
                    </th>
                    <th
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Total Amount Remaining
                    </th>
                    <th
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Balance after Bank Transfer
                    </th>
                    <th
                      style={{
                        width: "25%",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      Additional Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      {summaryData.totalInvoices}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      {summaryData.totalAmount}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      {summaryData.totalAmountPaid}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      {summaryData.totalAmountRemaining}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      {summaryData.balance}
                    </td>
                    <td
                      style={{
                        width: "25%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          width: "20%",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        <pre>{summaryData.notes}</pre>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* show the invoices */}
              <h2>Client Invoices</h2>
              <table style={{ width: "100%", border: "none" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "20%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Invoice Number
                    </th>
                    <th
                      style={{
                        width: "20%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Invoice Creation Date
                    </th>
                    <th
                      style={{
                        width: "20%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Invoice Amount
                    </th>
                    <th
                      style={{
                        width: "20%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Invoice Amount Paid
                    </th>
                    <th
                      style={{
                        width: "20%",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      Additional Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.invoices.map((invoices) => (
                    <tr key={invoices._id}>
                      <td
                        style={{
                          width: "20%",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        {invoices.invoiceNumber}
                      </td>
                      <td
                        style={{
                          width: "20%",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        {new Date(invoices.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          width: "20%",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        {invoices.total}
                      </td>
                      <td
                        style={{
                          width: "20%",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        {invoices.totalAmountReceived}
                      </td>
                      <td
                        style={{
                          width: "20%",
                          border: "none",
                          textAlign: "left",
                        }}
                      >
                        {invoices.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Container>

            {/* <h2>Client Invoice Summary</h2>
          <p>Total Invoices: {summaryData.totalInvoices}</p>
          <p>Total Amount: {summaryData.totalAmount}</p>
          <p>Total Amount Paid: {summaryData.totalAmountPaid}</p>
          <p>Total Amount Remaining: {summaryData.totalAmountRemaining}</p> */}
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{ width: "20%", height: "20%" }}
              onClick={downloadPDF}
            >
              Download as PDF
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClientInvoiceSummary;
