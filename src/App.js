import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Commodity from './components/Commodity'; 
import Login from './components/Login';
import FuturesandOptions from './components/FuturesandOptions';
import EquityPositions from './components/EquityPositions';
import FuturesandOptionsPositions from './components/FuturesandOptionsPositions'
import CommodityPositions from './components/CommodityPositions';
import Equity from './components/Equity';
import Orders from './components/Orders';
import SquareOff from './components/SquareOff';
import OrderVerification from './components/OrderVerification';
import OpDashboard from './components/OpDashboard'
import Acknowledgment from './components/Acknowledgement';
import FOOrders from './components/FOOrders';
// import { DropdownMenu } from 'react-bootstrap';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Define primary navigation links
  const primaryLinks = [
    { to: '/commodity', label: 'Commodity' },
    { to: '/f&o', label: 'F&O' },
    { to: '/equity', label: 'Equity' }
  ];

  // Define secondary navigation links based on the primary navigation
  const getSecondaryLinks = (pathname) => {
    if (pathname.startsWith('/commodity')) {
      return [
        { to: '/commodity/positions', label: 'Positions' },
        { to: '/commodity/orders', label: 'Orders' }
      ];
    }
    if (pathname.startsWith('/f&o')) {
      return [
        { to: '/f&o/positions', label: 'Positions' },
        { to: '/f&o/orders', label: 'Orders' }
      ];
    }
    if (pathname.startsWith('/equity')) {
      return [
        { to: '/equity/positions', label: 'Positions' },
        { to: '/equity/orders', label: 'Orders' }
      ];
    }
    return [];
  };

  // Determine default secondary link based on the current pathname
  const getDefaultSecondaryLink = (pathname) => {
    const secondaryLinks = getSecondaryLinks(pathname);
    return secondaryLinks.length > 0 ? secondaryLinks[0].to : '';
  };

  const isLoginPage = location.pathname === '/login';
  const secondaryLinks = getSecondaryLinks(location.pathname);
  const defaultSecondaryLink = getDefaultSecondaryLink(location.pathname);

  return (
    <div>
      {!isLoginPage && (
        <NavigationBar
          primaryLinks={primaryLinks}
          secondaryLinks={secondaryLinks}
          defaultSecondaryLink={defaultSecondaryLink}
        />
      )}
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/commodity" element={<Commodity />} />
        <Route path="/commodity/positions" element={<CommodityPositions />} />
        <Route path="/commodity/orders" element={<Orders />} />
        <Route path="/f&o" element={<FuturesandOptions />} />
        <Route path="/f&o/positions" element={<FuturesandOptionsPositions />} />
        <Route path="/f&o/orders" element={<FOOrders />} />
        <Route path="/equity" element={<Equity />} />
        <Route path="/equity/positions" element={<EquityPositions />} />
        <Route path="/equity/orders" element={<Orders />} />
        <Route path="/squareoff" element={<SquareOff />} />
        <Route path="/opdashboard" element={<OpDashboard />} />
        <Route path="/acknowledgement" element={<Acknowledgment />} />
        {/* <Route path="/orderverification" element={<OrderVerification />} /> */}
        <Route path="/squareoff/order/:uccId/:prodTyp" element={<OrderVerification />} />
        {/* <Route path="/dropdownmenu" element={<DropdownMenu />} /> */}
      </Routes>
    </div>
  );
}

export default App;
