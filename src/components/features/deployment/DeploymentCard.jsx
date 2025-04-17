import React from 'react';
import { Link } from 'react-router-dom';

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'deployed':
        return 'status-badge-success';
      case 'building':
        return 'status-badge-warning';
      case 'pending':
        return 'status-badge-info';
      case 'failed':
        return 'status-badge-error';
      default:
        return 'status-badge-default';
    }
  };

  return (
    <span className={`status-badge ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Main DeploymentCard component
const DeploymentCard = ({ deployment }) => {
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed':
        return <span className="icon-check" aria-hidden="true" />;
      case 'building':
        return <span className="icon-spinner" aria-hidden="true" />;
      case 'pending':
        return <span className="icon-clock" aria-hidden="true" />;
      case 'failed':
        return <span className="icon-x" aria-hidden="true" />;
      default:
        return <span className="icon-question" aria-hidden="true" />;
    }
  };

  return (
    <div className="deployment-card">
      <div className="deployment-card-header">
        <div className="project-name">
          {extractProjectName(deployment.repositoryUrl)}
        </div>
        <StatusBadge status={deployment.status} />
      </div>
      
      <div className="deployment-card-body">
        <div className="deployment-info">
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
        </div>
      </div>
      
      <div className="deployment-card-footer">
        {deployment.status === 'deployed' && (
          <a 
            href={deployment.deployedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-link"
          >
            View Site
          </a>
        )}
        
        <Link to={`/deployments/${deployment.id}`} className="details-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DeploymentCard;