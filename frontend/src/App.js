// App.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import Header from './components/Header';
import BarChart from './components/BarChart';
import mockData from './US.json';  // Adjust path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your CSS file here
function App() {
  const [theme, setTheme] = useState('dark');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('All');
  const [chartSize, setChartSize] = useState({ width: window.innerWidth * 0.6, height: 400 });



  useEffect(() => {
    // Here you'd replace mockData with a fetch request to your backend,
    // this code simulates fetching data based on the selectedCountry state.
    const fetchData = async () => {
      // Simulate a delay for fetching data
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For now, directly using mockData as a simulation
      setData(mockData.parameters || {}); 
    };

    fetchData();
  }, [selectedCountry]);
  
  const { 'summary text': summaryText, ...chartData } = data;

  const filteredChartData = filter === 'All' 
    ? chartData 
    : { [filter]: chartData[filter] };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const appStyles = {
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#343a40' : '#f8f9fa',
    color: theme === 'dark' ? '#fff' : '#000',
  };

  return (
    <div style={appStyles}>
      <Button variant="outline-light" onClick={toggleTheme} style={{ position: 'absolute',marginTop:"30px", right: 20, top: 50 }}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <Header theme={theme} />
      <Container>
        <Row className="p-3">
          <Col >
            {/* Country Selector Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant={theme === 'dark' ? 'secondary' : 'outline-secondary'}>
                Country: {selectedCountry}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedCountry('US')}>US</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col >
            {/* Filter Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant={theme === 'dark' ? 'secondary' : 'outline-secondary'}>
                Filter: {filter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter('All')}>All</Dropdown.Item>
                {Object.keys(chartData).map(key => (
                  <Dropdown.Item key={key} onClick={() => setFilter(key)}>
                    {key.replaceAll('_', ' ')}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <div >
          <BarChart data={filteredChartData} width={chartSize.width} height={chartSize.height} />
        </div>
        <Row>
          <Col>
            {/* Displaying the summary text */}
            <div className="my-4">
              <p>{summaryText}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;