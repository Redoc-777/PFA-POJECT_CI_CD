import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Badge } from '@mui/material';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [thankYouDialogOpen, setThankYouDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });
  
  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(false);
  

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Add null checks for 'product' and 'product.price'
      const product = item.product;
      const productPrice = product ? product.price : 0;
  
      return total + productPrice * item.quantity;
    }, 0);
  };
  

  useEffect(() => {
    // Fetch the cart items count from the backend
    const fetchCartItemsCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cart/8');
        const totalCount = response.data.orders.reduce((acc, order) => acc + order.quantity, 0);
        setCartItemsCount(totalCount);
      } catch (error) {
        console.error('Error fetching cart items count:', error);
      }
    };

    fetchCartItemsCount();
  }, []);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleUserInfoClick = () => {
    setUserInfoDialogOpen(true);
  };
  
  const handleCloseUserInfoDialog = () => {
    setUserInfoDialogOpen(false);
  };
  
  const handleOrderClick = (product) => {
    // Set the selected product and open the order dialog
    setSelectedProduct(product);
    setOrderDialogOpen(true);
  };

  const handleCloseDialog = () => {
    // Close both dialogs
    setOrderDialogOpen(false);
    setCartDialogOpen(false);
  };

  const handleCartClick = async () => {
    // Fetch the latest cart items from the backend
    try {
      const response = await axios.get('http://localhost:8080/cart/8');
      setCartItems(response.data.orders);

      // Open the cart items dialog
      setCartDialogOpen(true);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleCookizaClick = () => {
    // Navigate to the home component
    navigate('/');
  };
 
  const handleConfirmOrderWithUserInfo = async () => {
    try {
      // Check if a product is selected, if not, use the product from the existing order
      let productId;
      if (selectedProduct) {
        productId = selectedProduct.id;
      } else if (cartItems.length > 0) {
        // Assuming the first item in the cart represents the product for confirmation
        productId = cartItems[0].product.id;
      } else {
        console.error('Error confirming order: No product selected and no items in the cart');
        return;
      }
  
      // Prepare the data to be sent in the POST request
      const userData = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        address: userInfo.address,
        phone: userInfo.phone,
        email: userInfo.email,
        // Add other necessary fields
      };
  
      // Send the POST request to place the order with user information
      const orderResponse = await axios.post('http://localhost:8080/orders/placeOrder', {
        ...userData,
        productId: productId,
        quantity: 1,
      });
  
      // Handle the response or trigger any necessary action
      console.log('Order confirmed with user information:', orderResponse.data);
  
      // Reset the user information and close the dialog
      setUserInfo({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
      });
      setUserInfoDialogOpen(false);
      setThankYouDialogOpen(true);
    } catch (error) {
      console.error('Error confirming order with user information:', error);
    }
  };
  

  const handleThankYouDialogOpen = () => {
    setThankYouDialogOpen(true);
  };

  const handleCloseThankYouDialog = () => {
    setThankYouDialogOpen(false);
  };
  
  const handlePlaceOrder = async () => {
    try {
      // Make a POST request to add the product to the cart
      const response = await axios.post('http://localhost:8080/cart/8/addOrder', {
        product: selectedProduct,
        quantity: 1,
      });

      // Handle the response or trigger any necessary action
      console.log('Product added to cart:', response.data);

      // Close the order dialog after placing the order
      setOrderDialogOpen(false);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '2rem', margin: '20px', cursor: 'pointer' }} onClick={handleCookizaClick}>
        Cookiza
      </Typography>
      <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={handleCartClick}>
        <Badge badgeContent={cartItemsCount} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </div>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <BakeryDiningIcon style={{ marginRight: '10px' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Nos délices
        </Typography>
        <BakeryDiningIcon style={{ marginLeft: '10px' }} />
      </div>

      <div style={{ marginLeft: '70px' }}>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} style={{ textAlign: 'center', padding: '20px', width: '200px', height: '400px' }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p> {product.price} dh</p>
                <Button onClick={() => handleOrderClick(product)} style={{ backgroundColor: '#d5cdba', color: 'white' }}>Acheter</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Dialog for order confirmation */}
      <Dialog open={orderDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Commande</DialogTitle>
        <DialogContent>
          <p>Produit: {selectedProduct && selectedProduct.name}</p>
          <TextField
            label="Quantité"
            type="number"
            defaultValue={1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: 'black' }}>Annuler</Button>
          <Button onClick={handlePlaceOrder} variant="contained" style={{ backgroundColor: '#d5cdba', color: 'white' }}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for cart items */}
      <Dialog open={cartDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Commande</DialogTitle>
        <DialogContent>
        {cartItems.map((item) => (
  <div key={item.id}>
    {/* Add a check for null or undefined before accessing 'name' property */}
    <p>{item.product && item.product.name} : {item.quantity}</p>
  </div>
))}
          <p>{cartItems.length === 0 ? 'Aucune commande dans le panier.' : `Total: ${calculateTotalPrice()} dh`}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: 'black' }}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleUserInfoClick} style={{ backgroundColor: '#d5cdba', color: 'white' }}>
            Confirmer la commande
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={userInfoDialogOpen} onClose={handleCloseUserInfoDialog}>
  <DialogTitle>Informations Utilisateur</DialogTitle>
  <DialogContent>
  <TextField
      label="Prénom"
      value={userInfo.firstName}
      onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Nom"
      value={userInfo.lastName}
      onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Téléphone"
      value={userInfo.phone}
      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Email"
      value={userInfo.email}
      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Adresse"
      value={userInfo.address}
      onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
      fullWidth
      margin="normal"
    />
    {/* Add other necessary fields */}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseUserInfoDialog} style={{ color: 'black' }}>
      Annuler
    </Button>
    <Button
      variant="contained"
      style={{ backgroundColor: '#d5cdba', color: 'white' }}
      onClick={handleConfirmOrderWithUserInfo}
    >
      Confirmer
    </Button>
  </DialogActions>
</Dialog>
<Dialog open={thankYouDialogOpen} onClose={handleCloseThankYouDialog}>
    <DialogTitle>Merci !</DialogTitle>
    <DialogContent>
      <p>Nous vous remercions pour votre commande.  Merci !<p>
     </p>Nous Vous contacterons le plutôt possible.</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseThankYouDialog} style={{ color: 'black' }}>
        Fermer
      </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
};

export default Products;
