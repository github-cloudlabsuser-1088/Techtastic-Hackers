// Navbar.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../out-0.png';

const CustomNavbar = ({ onSelectCountry, selectedCountryCode, countries }) => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Techtastic Hackers Logo"
        />
        {' Socio-scanner'}
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Select Country:
          <select value={selectedCountryCode} onChange={e => onSelectCountry(e.target.value)}>
            {Object.entries(countries).map(([code, { name }]) => (
              <option key={code} value={code}>{name}</option>
            ))}
            <option value="" disabled>Data for more countries coming soon...</option>
          </select>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default CustomNavbar;
