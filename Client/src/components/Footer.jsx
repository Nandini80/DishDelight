import React from 'react';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container className="text-center">
        <p className="mb-0">Your Source for Tasty Food Narratives</p>
        <small className="text-muted">Proudly powered by WordPress | Theme: Listorify by CozyThemes.</small>
      </Container>
    </footer>
  );
};

export default Footer;
