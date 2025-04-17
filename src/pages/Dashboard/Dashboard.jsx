import React from 'react';
import DeploymentList from '../../components/features/deployment/DeploymentList';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Deployment Platform Dashboard</h1>
        <p className="dashboard-description">
          Manage and monitor all your deployments in one place
        </p>
      </div>
      
      {/* The DeploymentList component handles displaying all deployments */}
      <DeploymentList />
      
      {/* You could add additional dashboard widgets here if needed */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Deployments</h3>
          <p className="stat-value">5</p>
        </div>
        <div className="stat-card">
          <h3>Successful Deployments</h3>
          <p className="stat-value">12</p>
        </div>
        <div className="stat-card">
          <h3>Failed Deployments</h3>
          <p className="stat-value">2</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;