import { Box, Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomModal from "./CustomModal";
const ProductManagement = ({ updateProductsCount }) => {
  const [open, setOpen] = useState(false);
  const [operationType, setOperationType] = useState();
  const [editItem, setEditItem] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      category: "Category A",
      price: 20,
      stockQuantity: 50,
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category B",
      price: 30,
      stockQuantity: 40,
    },
    {
      id: 3,
      name: "Product 3",
      category: "Category B",
      price: 30,
      stockQuantity: 40,
    },
    {
      id: 4,
      name: "Product 4",
      category: "Category B",
      price: 30,
      stockQuantity: 40,
    },
  ]);
  const handleAddNewItem = (newItem) => {
    if (newItem) {
      const newItemData = { ...newItem, id: products.length + 1 };
      setProducts((prevData) => [...prevData, newItemData]);
    }
    handleClose();
  };

  const handleEditItem = (editedItem) => {
    const updatedData = products.map((item) =>
      item.id === editedItem.id ? { ...item, ...editedItem } : item
    );
    setProducts(updatedData);
    handleClose();
  };

  const handleDeleteItem = (id) => {
    if (id !== undefined) {
      const updatedData = products.filter((item) => item.id !== id);
      setProducts(updatedData);
      handleClose();
    }
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "stockQuantity",
      label: "Stock Qty.",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          console.log(value);
          console.log(tableMeta);
          const productData = tableMeta.rowData;

          return (
            <Box>
              <IconButton onClick={() => handleOpen("edit", productData)}>
                <EditIcon color="success" />
              </IconButton>
              <IconButton onClick={() => handleOpen("delete", productData)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  const handleOpen = (operation, itemData) => {
    setOperationType(operation);
    setEditItem(itemData ? { ...itemData } : null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = products.map((product) => [
    product.id,
    product.name,
    product.category,
    product.price,
    product.stockQuantity,
  ]);

  useEffect(() => {
    console.log("usefect in products");
    const count = products.length;
    updateProductsCount(count);
  }, []);

  return (
    <Box p={1.5}>
      <Button
        sx={{ mb: 1 }}
        variant="contained"
        onClick={() => handleOpen("add")}
      >
        Add +
      </Button>
      <MUIDataTable
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Products
          </Typography>
        }
        data={data}
        columns={columns}
        options={{
          // Disable checkbox selection
          selectableRows: "none",
        }}
      />
      <CustomModal
        open={open}
        onClose={handleClose}
        operation={operationType}
        handleAddNewItem={handleAddNewItem}
        handleEditItem={handleEditItem}
        editItem={editItem}
        handleDeleteItem={handleDeleteItem}
      />
    </Box>
  );
};
export default ProductManagement;
