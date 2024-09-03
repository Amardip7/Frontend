import React from 'react';
import SuperDashboard from './SuperDashboard';
import OpDashboard from './OpDashboard';


const Dashboard = ({ user }) => {
  return (
    <div>
      {user.role === 'superuser' ? (
        <SuperDashboard />
      ) : (
        <OpDashboard />
      )}
    </div>
  );
};

export default Dashboard;
