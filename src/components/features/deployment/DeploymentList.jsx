import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeploymentCard from './DeploymentCard';

const DeploymentList = () => {
  const [deployments, setDeployments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        setIsLoading(true);
        // In a real application, we would call the API service
        // const data = await getAllDeployments();

        // Mock data for demonstration
        const mockDeployments = [
          {
            id: '1',
            repositoryUrl: 'https://github.com/user/project-alpha',
            branchName: 'main',
            status: 'deployed',
            framework: 'laravel',
            createdAt: new Date().toISOString(),
            deployedUrl: 'https://project-alpha.test-deploy.com'
          },
          {
            id: '2',
            repositoryUrl: 'https://github.com/user/project-beta',
            branchName: 'develop',
            status: 'building',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            deployedUrl: null
          },
          {
            id: '3',
            repositoryUrl: 'https://github.com/user/project-gamma',
            branchName: 'feature/new-auth',
            status: 'failed',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            deployedUrl: null
          },
          {
            id: '4',
            repositoryUrl: 'https://github.com/user/project-delta',
            branchName: 'main',
            status: 'deployed',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            deployedUrl: 'https://project-delta.test-deploy.com'
          },
          {
            id: '5',
            repositoryUrl: 'https://github.com/user/project-epsilon',
            branchName: 'staging',
            status: 'pending',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            deployedUrl: null
          }
        ];
        
        setDeployments(mockDeployments);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch deployments. Please refresh the page.');
        setIsLoading(false);
      }
    };

    fetchDeployments();
  }, []);

  const filteredDeployments = filter === 'all' 
    ? deployments 
    : deployments.filter(deployment => deployment.status === filter);

  return (
    <div className="deployments-container">
      <div className="deployments-header">
        <h1>Your Deployments</h1>
        <Link to="/new" className="create-button">
          Create New Deployment
        </Link>
      </div>
      
      <div className="filter-bar">
        <span className="filter-label">Filter by status:</span>
        <div className="filter-options">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'deployed' ? 'active' : ''}`}
            onClick={() => setFilter('deployed')}
          >
            Deployed
          </button>
          <button 
            className={`filter-btn ${filter === 'building' ? 'active' : ''}`}
            onClick={() => setFilter('building')}
          >
            Building
          </button>
          <button 
            className={`filter-btn ${filter === 'failed' ? 'active' : ''}`}
            onClick={() => setFilter('failed')}
          >
            Failed
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-state">Loading deployments...</div>
      ) : error ? (
        <div className="error-state">{error}</div>
      ) : filteredDeployments.length === 0 ? (
        <div className="empty-state">
          <p>No deployments found with the selected filter.</p>
          {filter !== 'all' && (
            <button className="reset-filter" onClick={() => setFilter('all')}>
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="deployments-grid">
          {filteredDeployments.map(deployment => (
            <DeploymentCard 
              key={deployment.id} 
              deployment={deployment} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeploymentList;