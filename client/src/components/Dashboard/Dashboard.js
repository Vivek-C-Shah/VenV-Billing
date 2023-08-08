import React, { useEffect } from "react";
import { toCommas } from "../../utils/utils";
import styles from "./Dashboard.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInvoicesByUser } from "../../actions/invoiceActions";
import Empty from "../svgIcons/Empty";
import Chart from "./Chart";
// import Donut from './Donut'
import moment from "moment";
import { Check, Pie, Bag, Card, Clock, Frown } from "./Icons";
import Spinner from "../Spinner/Spinner";

const Dashboard = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { invoices, isLoading } = useSelector((state) => state?.invoices);
  // const unpaid = invoices?.filter((invoice) => (invoice.status === 'Unpaid') || (invoice.status === 'Partial'))
  const overDue = invoices?.filter(
    (invoice) => invoice.dueDate <= new Date().toISOString()
  );

  let paymentHistory = [];
  for (let i = 0; i < invoices.length; i++) {
    let history = [];
    if (invoices[i].paymentRecords !== undefined) {
      history = [...paymentHistory, invoices[i].paymentRecords];
      paymentHistory = [].concat.apply([], history);
    }
  }

  //sort payment history by date
  const sortHistoryByDate = paymentHistory.sort(function (a, b) {
    var c = new Date(a.datePaid);
    var d = new Date(b.datePaid);
    return d - c;
  });

  //filter payment history by payment method and that too date wise

  const sortHistoryByMethod = paymentHistory.filter(
    (record) =>
      record.paymentMethod === "Cash" &&
      moment(record.datePaid).format("MMMM Do YYYY") ===
        moment(new Date()).format("MMMM Do YYYY")
  );
  const sortHistoryByMethod2 = paymentHistory.filter(
    (record) =>
      record.paymentMethod === "Bank Transfer" &&
      moment(record.datePaid).format("MMMM Do YYYY") ===
        moment(new Date()).format("MMMM Do YYYY")
  );
  const sortHistoryByMethod3 = paymentHistory.filter(
    (record) =>
      record.paymentMethod === "Cheque" &&
      moment(record.datePaid).format("MMMM Do YYYY") ===
        moment(new Date()).format("MMMM Do YYYY")
  );
  const sortHistoryByMethod4 = paymentHistory.filter(
    (record) =>
      record.paymentMethod === "Credit Card" &&
      moment(record.datePaid).format("MMMM Do YYYY") ===
        moment(new Date()).format("MMMM Do YYYY")
  );
  const sortHistoryByMethod5 = paymentHistory.filter(
    (record) =>
      record.paymentMethod === "Other" &&
      moment(record.datePaid).format("MMMM Do YYYY") ===
        moment(new Date()).format("MMMM Do YYYY")
  );
  const sortHistoryByMethod6 = paymentHistory.filter(
    (record) => record.paymentMethod === "Cash"
  );
  const sortHistoryByMethod7 = paymentHistory.filter(
    (record) => record.paymentMethod === "Bank Transfer"
  );
  const sortHistoryByMethod8 = paymentHistory.filter(
    (record) => record.paymentMethod === "Cheque"
  );
  const sortHistoryByMethod9 = paymentHistory.filter(
    (record) => record.paymentMethod === "Credit Card"
  );
  const sortHistoryByMethod10 = paymentHistory.filter(
    (record) => record.paymentMethod === "Other"
  );

  let totalPaid = 0;
  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].totalAmountReceived !== undefined) {
      totalPaid += invoices[i].totalAmountReceived;
    }
  }

  let totalAmount = 0;
  for (let i = 0; i < invoices.length; i++) {
    totalAmount += invoices[i].total;
  }

  useEffect(() => {
    dispatch(
      getInvoicesByUser({ search: user?.result._id || user?.result?.googleId })
    );
    // eslint-disable-next-line
  }, [location, dispatch]);

  const unpaidInvoice = invoices?.filter(
    (invoice) => invoice.status === "Unpaid"
  );
  const paid = invoices?.filter((invoice) => invoice.status === "Paid");
  const partial = invoices?.filter((invoice) => invoice.status === "Partial");

  if (!user) {
    history.push("/login");
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        {/* <Spinner /> */}
        <Empty />
        <p style={{ padding: "40px", color: "gray" }}>
          Nothing to display. Click the plus icon to start creating
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.stat}>
        <ul className={styles.autoGrid}>
          <li
            className={styles.listItem}
            style={{ backgroundColor: "#1976d2", color: "white" }}
          >
            <div>
              <p>{toCommas(totalPaid)}</p>
              <h2 style={{ color: "white" }}>Payment Received</h2>
            </div>
            <div>
              <Check />
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>{toCommas(totalAmount - totalPaid)}</p>
              <h2>Pending Amount</h2>
            </div>
            <div>
              <Pie />
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>{toCommas(totalAmount)}</p>
              <h2>Total Amount</h2>
            </div>
            <div>
              <Bag />
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>{invoices.length}</p>
              <h2>Total Invoices</h2>
            </div>
            <div>
              <Card />
            </div>
          </li>

          <li
            className={styles.listItem}
            style={{ backgroundColor: "#206841", color: "white" }}
          >
            <div>
              <p>{paid.length}</p>
              <h2 style={{ color: "white" }}>Paid Invoices</h2>
            </div>
            <div>
              <Check />
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>{partial.length}</p>
              <h2>Partially Paid Invoices</h2>
            </div>
            <div>
              <Pie />
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>{unpaidInvoice.length}</p>
              <h2>Unpaid Invoices</h2>
            </div>
            <div>
              <Frown />
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>{overDue.length}</p>
              <h2>Overdue</h2>
            </div>
            <div>
              <Clock />
            </div>
          </li>
        </ul>
      </section>

      {paymentHistory.length !== 0 && (
        <section>
          <Chart paymentHistory={paymentHistory} />
        </section>
      )}

      <section>
        <h1 style={{ textAlign: "center", padding: "30px" }}>
          {paymentHistory.length
            ? "Payment History"
            : "No payment received yet"}
        </h1>
        <div>
          <div className={styles.table}>
            <table>
              <tbody>
                {/* {paymentHistory.length === 0 && (
                                <tr>
                                <th style={{padding: '15px'}}></th>
                                <th style={{padding: '15px'}}>Paid By</th>
                                <th style={{padding: '15px'}}>Date Paid</th>
                                <th style={{padding: '15px'}}>Amount Paid</th>
                                <th style={{padding: '15px'}}>Payment Method</th>
                                <th style={{padding: '15px'}}>Note</th>
                            </tr>
                            )} */}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Date wise Cash</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Date wise Bank Transfer</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod2.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod2.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Date wise Cheque</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod3.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod3.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Date wise Credit Card</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod4.length}
                    </th>

                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod4.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Date wise Other</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod5.length}
                    </th>

                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod5.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Total Cash</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod6.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod6.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Total Bank Transfer</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod7.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod7.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}
                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Total Cheque</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod8.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod8.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}
                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Total Credit Card</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod9.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod9.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}
                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Total Other</th>
                    <th style={{ padding: "15px" }}>
                      {sortHistoryByMethod10.length}
                    </th>
                    <th style={{ padding: "15px" }}>
                      {toCommas(
                        sortHistoryByMethod10.reduce(
                          (a, b) => a + b.amountPaid,
                          0
                        )
                      )}
                    </th>
                  </tr>
                )}

                <br />
                <br />
                <br />
                {paymentHistory.length !== 0 && (
                  <tr>
                    <th style={{ padding: "15px" }}></th>
                    <th style={{ padding: "15px" }}>Paid By</th>
                    <th style={{ padding: "15px" }}>Date Paid</th>
                    <th style={{ padding: "15px" }}>Amount Paid</th>
                    <th style={{ padding: "15px" }}>Payment Method</th>
                    <th style={{ padding: "15px" }}>Note</th>
                  </tr>
                )}

                {sortHistoryByDate.map((record) => (
                  <tr className={styles.tableRow} key={record._id}>
                    <td>
                      <button>{record?.paidBy?.charAt(0)}</button>
                    </td>
                    <td>{record.paidBy}</td>
                    <td>{moment(record.datePaid).format("MMMM Do YYYY")}</td>
                    <td>
                      <h3 style={{ color: "#00A86B", fontSize: "14px" }}>
                        {toCommas(record.amountPaid)}
                      </h3>
                    </td>
                    <td>{record.paymentMethod}</td>
                    <td>{record.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
