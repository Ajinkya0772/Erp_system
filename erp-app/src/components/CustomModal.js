import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

const CustomModal = (props) => {
  const {
    open,
    onClose,
    operation,
    handleAddNewItem,
    editItem,
    handleEditItem,
    handleDeleteItem,
  } = props;
  console.log("editeditem", editItem);
  const [productFields, setProductFields] = useState({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stockQuantity: 0,
  });

  const handleAddClearInputField = () => {
    handleAddNewItem(productFields);

    // Clear input fields
    setProductFields({
      id: 0,
      name: "",
      category: "",
      price: 0,
      stockQuantity: 0,
    });
  };

  useEffect(() => {
    if (editItem) {
      setProductFields({
        id: editItem[0],
        name: editItem[1],
        category: editItem[2],
        price: editItem[3],
        stockQuantity: editItem[4],
      });
    } else {
      setProductFields({
        id: 0,
        name: "",
        category: "",
        price: 0,
        stockQuantity: 0,
      });
    }
  }, [editItem]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              p: 0.2,
              pl: 2,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component="p" fontWeight="bold">
              {operation === "add"
                ? "Add Product"
                : operation === "edit"
                ? "Edit Product"
                : "Confirmation"}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: "white" }}>
              <ClearIcon />
            </IconButton>
          </Box>
          {operation === "delete" ? (
            <Box sx={{ padding: 2, pb: 3 }}>
              <Typography sx={{ fontSize: "15px", mb: 1 }}>
                Are you sure you want to delete this?
              </Typography>
            </Box>
          ) : (
            <Box sx={{ padding: 2, pb: 6 }}>
              <Typography sx={{ fontSize: "15px", fontWeight: "bold", mb: 1 }}>
                Product Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={productFields.name}
                onChange={(e) =>
                  setProductFields({ ...productFields, name: e.target.value })
                }
              />

              <Typography
                sx={{ fontSize: "15px", fontWeight: "bold", mb: 1, mt: 2 }}
              >
                Category
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={productFields.category}
                onChange={(e) =>
                  setProductFields({
                    ...productFields,
                    category: e.target.value,
                  })
                }
              />

              <Typography
                sx={{ fontSize: "15px", fontWeight: "bold", mb: 1, mt: 2 }}
              >
                Price
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={productFields.price}
                onChange={(e) =>
                  setProductFields({
                    ...productFields,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />

              <Typography
                sx={{ fontSize: "15px", fontWeight: "bold", mb: 1, mt: 2 }}
              >
                Stock Quantity
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={productFields.stockQuantity}
                onChange={(e) =>
                  setProductFields({
                    ...productFields,
                    stockQuantity: parseInt(e.target.value) || 0,
                  })
                }
              />
            </Box>

            // ...
          )}
          <Box
            sx={{
              backgroundColor: "#f5f7fa",
              p: 1.5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="small"
              sx={{ mr: 1, color: "#2b7985", borderColor: "#2b7985" }}
              variant="outlined"
              onClick={onClose}
            >
              <ClearIcon fontSize="small" sx={{ pr: 0.5, color: "#2b7985" }} />
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                if (operation === "add") {
                  handleAddClearInputField();
                } else if (operation === "edit" && editItem) {
                  handleEditItem({ ...editItem, ...productFields });
                } else if (operation === "delete" && editItem) {
                  handleDeleteItem(productFields.id);
                }
              }}
            >
              {operation === "delete" ? (
                <DeleteIcon fontSize="small" sx={{ color: "white", pr: 0.5 }} />
              ) : (
                <DoneIcon fontSize="small" sx={{ color: "white", pr: 0.5 }} />
              )}
              {operation === "add" || operation === "edit" ? "Save" : "Ok"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
