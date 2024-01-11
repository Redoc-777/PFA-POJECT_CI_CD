import React from 'react';
import { Typography, Container, Rating, Button , Avatar} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '2rem', margin: '20px' }}>
        Cookiza
      </Typography>
      <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
        <img
          src="https://images.unsplash.com/photo-1573504241177-69684aba8fa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8"
          alt="Bakery"
          style={{ width: '40%', height: 'auto' }}
        />
        <div style={{ marginRight: '300px' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
            Commandez vos délices en ligne avec facilité
          </Typography>
          <p>
            Vous avez envie de délicieuses pâtisseries ? Notre application vous permet de commander en ligne une variété de délices, tels que des cheesecakes, des croissants, et bien plus encore.
          </p>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={{ backgroundColor: '#d5cdba', color: 'white', marginTop: '20px' }}>
              Commander
            </Button>
          </Link>
          <Container style={{ marginTop: '30px', height: '150px', width: '100%', display: 'flex', alignItems: 'center' }}>
            {/* Avatar */}
            <Avatar alt="User Avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

            {/* Rating and review */}
            <div style={{ marginLeft: '20px' }}>
              <Rating name="read-only" value={5} readOnly size="small" />
              <p>Les gâteaux ici sont exceptionnels ! J’ai commandé pour une occasion, tout le monde a adoré. </p>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Home;

