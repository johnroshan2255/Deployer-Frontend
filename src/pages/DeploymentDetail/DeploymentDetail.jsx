import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Terminal from '../../components/common/Terminal';

const DeploymentDetail = () => {
  const { id } = useParams();
  const [deployment, setDeployment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRestarting, setIsRestarting] = useState(false);

  useEffect(() => {
    const fetchDeployment = async () => {
      try {
        setIsLoading(true);
        // In a real application, we would call the API service
        // const data = await getDeploymentById(id);
        
        // Mock data for demonstration
        const mockDeployment = {
          id,
          repositoryUrl: 'https://github.com/user/project-alpha',
          branchName: 'main',
          status: 'deployed',
          framework: 'laravel',
          createdAt: new Date().toISOString(),
          deployedUrl: 'https://project-alpha.test-deploy.com',
          logs: [
            '[INFO] Cloning repository...',
            '[INFO] Checking out branch main...',
            '[INFO] Installing dependencies...',
            '[INFO] Running build process...',
            '[INFO] Optimizing assets...',
            '[INFO] Configuring environment...',
            '[INFO] Setting up database connections...',
            '[INFO] Running migrations...',
            '[SUCCESS] Deployment completed successfully!',
            '[INFO] Your deployment is available at: https://project-alpha.test-deploy.com'
          ],
          configuration: {
            environment: 'production',
            php_version: '8.1',
            node_version: '16.x',
            memory_limit: '512M',
            max_execution_time: '300',
            auto_scaling: true
          },
          history: [
            {
              id: 'hist1',
              status: 'deployed',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
              commit: 'a1b2c3d'
            },
            {
              id: 'hist2',
              status: 'failed',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
              commit: 'e4f5g6h'
            }
          ]
        };
        
        setDeployment(mockDeployment);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch deployment details. Please try again.');
        setIsLoading(false);
      }
    };

    fetchDeployment();
  }, [id]);

  const handleRestartDeployment = async () => {
    try {
      setIsRestarting(true);
      // In a real application, we would call the API service
      // await restartDeployment(id);
      
      // Mock success message
      setTimeout(() => {
        setDeployment(prev => ({
          ...prev,
          status: 'building',
          logs: [
            ...prev.logs,
            '[INFO] Restarting deployment...',
            '[INFO] Pulling latest changes...'
          ]
        }));
        setIsRestarting(false);
      }, 2000);
    } catch (err) {
      setError('Failed to restart deployment. Please try again.');
      setIsRestarting(false);
    }
  };

  // Extract project name from repository URL
  const extractProjectName = (url) => {
    if (!url) return 'Unknown Project';
    
    try {
      // Handle GitHub URLs
      if (url.includes('github.com')) {
        const parts = url.split('/');
        return parts[parts.length - 1].replace('.git', '');
      }
      return url.split('/').pop().replace('.git', '') || 'Unknown Project';
    } catch (error) {
      return 'Unknown Project';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return <div className="loading-state">Loading deployment details...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (!deployment) {
    return <div className="not-found">Deployment not found</div>;
  }

  return (
    <div className="deployment-detail-container">
      <div className="navigation-bar">
        <Link to="/deployments" className="back-link">
          &larr; Back to Deployments
        </Link>
      </div>

      <div className="deployment-header">
        <h1>{extractProjectName(deployment.repositoryUrl)}</h1>
        <div className="deployment-meta">
          <div className={`status-badge status-badge-${deployment.status}`}>
            {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
          </div>
          <div className="branch-info">
            Branch: <span className="branch-name">{deployment.branchName}</span>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            Logs
          </button>
          <button
            className={`tab-button ${activeTab === 'configuration' ? 'active' : ''}`}
            onClick={() => setActiveTab('configuration')}
          >
            Configuration
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="overview-card">
                <h2>Deployment Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Repository URL:</span>
                    <span className="info-value">{deployment.repositoryUrl}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Branch:</span>
                    <span className="info-value">{deployment.branchName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Created:</span>
                    <span className="info-value">{formatDate(deployment.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Framework:</span>
                    <span className="info-value">{deployment.framework}</span>
                  </div>
                  {deployment.deployedUrl && (
                    <div className="info-item">
                      <span className="info-label">Deployed URL:</span>
                      <a
                        href={deployment.deployedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="info-link"
                      >
                        {deployment.deployedUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="actions-card">
                <h2>Actions</h2>
                <div className="action-buttons">
                  <button
                    className="action-button restart-button"
                    onClick={handleRestartDeployment}
                    disabled={isRestarting || deployment.status === 'building'}
                  >
                    {isRestarting ? 'Restarting...' : 'Restart Deployment'}
                  </button>
                  <button className="action-button delete-button">
                    Delete Deployment
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="logs-tab">
              <Terminal logs={deployment.logs} title="Deployment Logs" height="600px" />
            </div>
          )}

          {activeTab === 'configuration' && (
            <div className="configuration-tab">
              <div className="config-card">
                <h2>Deployment Configuration</h2>
                <div className="config-grid">
                  {Object.entries(deployment.configuration).map(([key, value]) => (
                    <div className="config-item" key={key}>
                      <span className="config-key">{key.replace('_', ' ')}</span>
                      <span className="config-value">
                        {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <h2>Deployment History</h2>
              {deployment.history.length > 0 ? (
                <div className="history-list">
                  {deployment.history.map((item) => (
                    <div className="history-item" key={item.id}>
                      <div className={`status-dot status-${item.status}`} />
                      <div className="history-details">
                        <div className="history-timestamp">
                          {formatDate(item.timestamp)}
                        </div>
                        <div className="history-meta">
                          <span className="history-commit">Commit: {item.commit}</span>
                          <span className={`history-status ${item.status}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-history">No deployment history available.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentDetail;