import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = ({ productsCount, ordersCount }) => {
  console.log(productsCount, ordersCount);
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={2}>
        {/* Products */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 180,
            }}
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              Products
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              Total Products: {productsCount}
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              View Products
            </Button>
          </Paper>
        </Grid>
        {/* Orders */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 180,
            }}
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              Orders
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              Total Orders: {ordersCount}
            </Typography>
            <Button
              component={Link}
              to="/orders"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              View Orders
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
