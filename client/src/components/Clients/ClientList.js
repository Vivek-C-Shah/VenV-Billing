import React, { useState, useEffect } from "react";
import Clients from "./Clients";
import AddClient from "./AddClient";
import { getClientsByUser } from "../../actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import NoData from "../svgIcons/NoData";
import Spinner from "../Spinner/Spinner";

const ClientList = () => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { clients } = useSelector((state) => state.clients);
  const isLoading = useSelector((state) => state.clients.isLoading);

  // create a function that redirects to the clientinvoicesummary page when clicked on clients
  const getClientInvoiceSummary = (id) => {
    history.push(`/clients/${id}/invoices/summary`);
  };

  useEffect(() => {
    dispatch(
      getClientsByUser({ search: user?.result?._id || user.result.googleId })
    );
  }, [location, dispatch]);

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

  if (clients.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
          margin: "80px",
        }}
      >
        <NoData />
        <p style={{ padding: "40px", color: "gray", textAlign: "center" }}>
          No customers yet. Click the plus icon to add a customer
        </p>
      </div>
    );
  }

  // Filter clients based on search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AddClient
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />

      {/* Add the search bar */}
      <input
        type="text"
        placeholder="Search clients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "20px auto",
          width: "80%",
          display: "block",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          borderBottom: "1px solid #1976d2",
          fontSize: "16px",
          fontWeight: "500",
          color: "#1976d2",
          letterSpacing: "1px",
          outline: "none",
          left: "40%",
          right: "40%",
        }}
      />

      <Clients
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
        clients={filteredClients} // Render the filtered clients instead of all clients
      />
    </div>
  );
};

export default ClientList;
