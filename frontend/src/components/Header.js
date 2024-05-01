// Assuming this file is located at ./components/Header.js
import React from 'react';
import logo from '../Techtastic Hackers.png'; // Adjust the path if your directory structure is different

function Header({ theme }) {
  const headerStyles = {
    backgroundColor: theme === 'dark' ? '#343a40' : '#f8f9fa',
    color: theme === 'dark' ? '#fff' : '#000',
    display: 'flex', // Use Flexbox for layout
    alignItems: 'center', // Vertically align items in the flex container
    padding: '20px',
  };
  
  const logoStyles = {
    width: '50px', // Adjust logo size accordingly
    marginRight: '20px', // Space between logo and title
  };

  return (
    <header style={headerStyles}>
      <img src={logo} alt="Techtastic Hackers Logo" style={logoStyles}/>
      <div> {/* Wrap title and subtitle for better alignment */}
        <h1 style={{ margin: 0, lineHeight: '1.2' }}>AI-Global Insights</h1> {/* App name aligned to the left */}
        <p style={{ margin: 0 }}><strong>Gain valuable insights into socio-political security, employment labour trends, and more.</strong></p>
      </div>
    </header>
  );
}

export default Header;