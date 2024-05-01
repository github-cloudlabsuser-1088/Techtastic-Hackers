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
  const [selectedFilterGroup, setSelectedFilterGroup] = useState('All');
  const [chartSize, setChartSize] = useState({ width: window.innerWidth * 0.6, height: 400 });
  // Defined filter groups
  const filterGroups = {
    "Economic Factors": ["GDP_growth_rate", "unemployment_rate", "inflation_rate", "poverty_rate"],
    "Government Expenditures": ["education_expenditure", "healthcare_expenditure"],
    "Societal Metrics": ["life_expectancy", "median_age", "income_inequality_index"],
    "Political Scores": ["political_stability_index", "political_freedom_index", "corruption_perceptions_index"],
  };

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockData.parameters || {}); 
    };
    fetchData();
  }, [selectedCountry]);

  // Function to filter chart data based on selected filter group
  const getFilteredChartData = () => {
    const allChartData = { ...data };
    delete allChartData['summary text']; // Remove summary text to clean up chart data

    if (selectedFilterGroup === 'All') {
      // If 'All' is selected, return all data
      return allChartData;
    }

    const groupKeys = filterGroups[selectedFilterGroup];
    const filteredChartData = {};

    groupKeys.forEach(key => {
      if (allChartData[key]) {
        filteredChartData[key] = allChartData[key];
      }
    });

    return filteredChartData; 
  };

  // Prepare filtered chart data based on the selected filter group
  const filteredChartData = getFilteredChartData();
  
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
      <Button variant="outline-light" onClick={toggleTheme} style={{ position: 'absolute', marginTop: "0px", right: 20, top: 50 }}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <Header theme={theme} />
      <Container>
        <Row className="p-3">
          <Col>
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
          <Col>
            {/* Filter Dropdown to select Filter Groups */}
            <Dropdown>
              <Dropdown.Toggle variant={theme === 'dark' ? 'secondary' : 'outline-secondary'}>
                Filter: {selectedFilterGroup}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedFilterGroup('All')}>All</Dropdown.Item>
                {Object.keys(filterGroups).map(groupName => (
                  <Dropdown.Item key={groupName} onClick={() => setSelectedFilterGroup(groupName)}>
                    {groupName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <div>
          <BarChart data={filteredChartData} width={chartSize.width} height={chartSize.height} />
        </div>
        <Row>
          <Col>
            {/* Displaying the summary text */}
            <div className="my-4">
              <p>{data['summary text'] || ''}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;