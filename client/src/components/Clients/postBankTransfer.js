import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { postBankTransfer } from "../../actions/clientActions";

import { useDispatch } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
import { reset } from "../../api";

const PostBankTransferForm = () => {
  const dispatch = useDispatch();
  const [openSnackbar] = useSnackbar();

  const [formData, setFormData] = useState({
    clientName: "",
    amount: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postBankTransfer(formData, openSnackbar));
    // reset the form
    setFormData({
      clientName: "",
      amount: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: "20%", marginInlineStart: "5rem" }}>
        <label htmlFor="clientName">Client Name:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          width: "20%",
          marginBlockStart: "1rem",
          marginInlineStart: "5.15rem",
        }}
      >
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          width: "20%",
          marginBlockStart: "1rem",
          marginInlineStart: "5.95rem",
        }}
      >
        <label htmlFor="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          width: "10%",
          marginBlockStart: "1rem",
          marginInlineStart: "9rem",
        }}
      >
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PostBankTransferForm;
