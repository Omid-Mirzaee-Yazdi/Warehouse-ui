import { Box, Typography, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getData } from "../Func/getData";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Dashboard.module.css";
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
    name: "Id",
    selector: (row) => row.id,
  },
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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setmaxquantityvalue(0);
    setselectedProduct("");

    setOpen(false);
  };
  const [maxquantity, setmaxquantity] = useState(0);
  const [maxquantityvalue, setmaxquantityvalue] = useState(0);
  const [rows, setrows] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchorders = () => {
    setloading(true);
    getData()
      .then(async (res) => {
        setrows(res);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchorders();
  }, []);

  const [selectedProduct, setselectedProduct] = React.useState("");

  const handleChange = (event) => {
    setselectedProduct(event.target.value);
    setmaxquantity(
      rows.filter((item) => item.id === event.target.value)[0].quantity
    );
    setmaxquantityvalue(0);
  };

  const quantityChange = (e) => {
    setmaxquantityvalue(e.target.value);
  };

  const submitSale = async () => {
    await setloading(true);
    const patchres = await sendSale(selectedProduct, maxquantityvalue);
    if (patchres?.set) {
      console.log("did it!");
      await fetchorders();
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add a sale"}</DialogTitle>
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
              value={maxquantityvalue}
              InputProps={{ inputProps: { min: 0, max: maxquantity } }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={maxquantityvalue === 0 || !selectedProduct}
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
