import { Box, Typography, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getData } from "../Func/getData";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Listcomp.module.css";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { sendSale } from "../Func/sendSale";

const columns = [
  {
    name: "Product",
    selector: (row) => row.product,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
  },
  {
    name: "Articles",
    selector: (row) => row.articles,
  },
];

function Listcomp() {
  const [open, setOpen] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [maxQuantityValue, setMaxQuantityValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMaxQuantityValue(0);
    setSelectedProduct("");

    setOpen(false);
  };

  const fetchOrders = () => {
    setLoading(true);
    var parser = new DOMParser();
    getData()
      .then(async (res) => {
        setRows(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
    setMaxQuantity(
      rows.filter((item) => item.id === event.target.value)[0].quantity
    );
    setMaxQuantityValue(0);
  };

  const quantityChange = (e) => {
    setMaxQuantityValue(e.target.value);
  };

  const submitSale = async () => {
    setLoading(true);
    const patchres = await sendSale(selectedProduct, maxQuantityValue);
    if (patchres?.set) {
      console.log("did it!");
      await fetchOrders();
      handleClose();
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Add a sale</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ width: "200px" }}>
            <FormControl
              style={{ marginTop: "20px", minWidth: "200px", width: "200px" }}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProduct}
                label="Product"
                onChange={handleChange}
              >
                {rows.map((row) => (
                  <MenuItem value={row.id}>{row.product}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              style={{ marginTop: "20px", minWidth: "200px", width: "200px" }}
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              type="number"
              onChange={quantityChange}
              value={maxQuantityValue}
              InputProps={{ inputProps: { min: 0, max: maxQuantity } }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={maxQuantityValue === 0 || !selectedProduct}
            onClick={submitSale}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div className={styles.header}>
        <Typography component="h3" variant="h3">
          View Items
        </Typography>
        <Button
          disabled={rows?.length < 1}
          variant="contained"
          onClick={handleClickOpen}
        >
          Register Sale
        </Button>
      </div>

      {loading ? (
        <Backdrop
          className={styles.loadingContainer}
          sx={{ color: "#fff", zIndex: 2000 }}
          open={true}
        >
          <CircularProgress color="inherit" />
          <div className={styles.loadingText}>
            <p className={styles.shine}>Loading, Please Wait...</p>
          </div>
        </Backdrop>
      ) : (
        <DataTable
          selectableRows={true}
          pagination
          paginationRowsPerPageOptions={[10, 50, 80, 100, 500]}
          highlightOnHover
          columns={columns}
          data={rows}
        />
      )}
    </Box>
  );
}

export default Listcomp;
