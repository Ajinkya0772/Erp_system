import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderManagement = ({ updateOrdersCount }) => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", orderDate: "2024-03-12", status: "Pending" },
    {
      id: 2,
      customer: "Jane Smith",
      orderDate: "2024-03-11",
      status: "Shipped",
    },
  ]);

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    orderDate: "",
    status: "",
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenViewDialog(true);
  };

  const handleAddOrder = () => {
    setOpenAddDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewOrder({ customer: "", orderDate: "", status: "" });
  };

  const handleSaveOrder = () => {
    const newOrderId = orders.length + 1;
    setOrders([...orders, { id: newOrderId, ...newOrder }]);
    handleCloseAddDialog();
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    handleCloseViewDialog();
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    handleCloseViewDialog();
  };
  useEffect(() => {
    console.log("usefect in orders");
    const count = orders.length;
    updateOrdersCount(count);
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOrder}
        style={{ marginBottom: "16px" }}
      >
        Add Order
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewDetails(order)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOrder(order.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" gutterBottom>
              Order ID: {selectedOrder?.id}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Customer Name: {selectedOrder?.customer}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Order Date: {selectedOrder?.orderDate}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Status:
              <Select
                value={selectedOrder?.status}
                onChange={(e) =>
                  handleUpdateStatus(selectedOrder?.id, e.target.value)
                }
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </Select>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Order Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Customer Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              type="date"
              value={newOrder.orderDate}
              onChange={(e) =>
                setNewOrder({ ...newOrder, orderDate: e.target.value })
              }
            />
            <TextField
              label="Status"
              fullWidth
              variant="outlined"
              margin="normal"
              value={newOrder.status}
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value })
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAddDialog}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveOrder} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
