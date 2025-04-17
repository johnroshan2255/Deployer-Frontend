import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TvModal = ({ url, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="relative crt-tv-effect animate-flicker">
          <div className="tv-frame bg-gray-800 p-4 rounded-lg shadow-2xl w-[90vw] h-[80vh] max-w-4xl">
            <div className="tv-screen bg-black h-full rounded overflow-hidden relative">
              {/* TV Scanlines Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 
                bg-repeat opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 3px,
                    rgba(255, 255, 255, 0.1) 3px,
                    rgba(255, 255, 255, 0.1) 6px
                  )`
                }}>
              </div>
              
              {/* Screen Content */}
              <div className="h-full w-full bg-white">
              <iframe 
                src="http://localhost:5175/"
                className="h-full w-full"
                frameBorder="0"
                title="Site Preview"
                />
              </div>
            </div>
            
            {/* TV Controls */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
          
          {/* TV Frame Decoration */}
          <div className="absolute inset-0 border-4 border-gray-700 rounded-xl pointer-events-none"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    );
  };

const DeploymentList = () => {
  const [deployments, setDeployments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [showTvModal, setShowTvModal] = useState(false);
  const [currentSiteUrl, setCurrentSiteUrl] = useState('');

  const deploymentsPerPage = 6;

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        setIsLoading(true);
        // Mock data for demonstration
        const mockDeployments = [
          {
            id: '1',
            name: 'project-alpha',
            repositoryUrl: 'https://github.com/user/project-alpha',
            branchName: 'main',
            status: 'deployed',
            framework: 'laravel',
            createdAt: new Date().toISOString(),
            deployedUrl: 'https://project-alpha.test-deploy.com'
          },
          {
            id: '2',
            name: 'project-beta',
            repositoryUrl: 'https://github.com/user/project-beta',
            branchName: 'develop',
            status: 'building',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            deployedUrl: null
          },
          {
            id: '3',
            name: 'project-gamma',
            repositoryUrl: 'https://github.com/user/project-gamma',
            branchName: 'feature/new-auth',
            status: 'failed',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            deployedUrl: null
          },
          {
            id: '4',
            name: 'project-delta',
            repositoryUrl: 'https://github.com/user/project-delta',
            branchName: 'main',
            status: 'deployed',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            deployedUrl: 'https://project-delta.test-deploy.com'
          },
          {
            id: '5',
            name: 'project-epsilon',
            repositoryUrl: 'https://github.com/user/project-epsilon',
            branchName: 'staging',
            status: 'pending',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            deployedUrl: null
          },
          {
            id: '6',
            name: 'project-zeta',
            repositoryUrl: 'https://github.com/user/project-zeta',
            branchName: 'main',
            status: 'deployed',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
            deployedUrl: 'https://project-zeta.test-deploy.com'
          },
          {
            id: '7',
            name: 'project-eta',
            repositoryUrl: 'https://github.com/user/project-eta',
            branchName: 'dev',
            status: 'building',
            framework: 'laravel',
            createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
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

  // Pagination calculation
  const indexOfLastDeployment = currentPage * deploymentsPerPage;
  const indexOfFirstDeployment = indexOfLastDeployment - deploymentsPerPage;
  const currentDeployments = filteredDeployments.slice(indexOfFirstDeployment, indexOfLastDeployment);
  const totalPages = Math.ceil(filteredDeployments.length / deploymentsPerPage);

  // Status badge component with appropriate colors
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch(status) {
        case 'deployed': return 'bg-green-500';
        case 'building': return 'bg-blue-500';
        case 'failed': return 'bg-red-500';
        case 'pending': return 'bg-yellow-500';
        default: return 'bg-gray-500';
      }
    };
    
    return (
      <span className={`${getStatusColor(status)} text-white text-xs font-medium px-2 py-1 rounded-full`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Your Deployments</h1>
        <Link to="/new" className="button">
          Create New Deployment
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <button
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            onClick={() => setFilter('deployed')}
          >
            Deployed
          </button>
          <button
            onClick={() => setFilter('building')}
          >
            Building
          </button>
          <button 
            onClick={() => setFilter('failed')}
          >
            Failed
          </button>
          <button 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : filteredDeployments.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-700 mb-4">No deployments found with the selected filter.</p>
          {filter !== 'all' && (
            <button 
              onClick={() => setFilter('all')}
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Fixed 3-column grid with consistent spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentDeployments.map(deployment => (
              <div key={deployment.id} className="customcard">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-800">{deployment.name}</h2>
                    <StatusBadge status={deployment.status} />
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Branch:</span>
                      <span className="text-gray-800 ml-1">{deployment.branchName}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-600">Created:</span>
                      <span className="text-gray-800 ml-1">{formatDate(deployment.createdAt)}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-600">Framework:</span>
                      <span className="text-gray-800 ml-1">{deployment.framework}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {deployment.status === 'deployed' ? (
                      <div className="flex space-x-2">
                        <a 
                          href="#"
                          onClick={() => {
                            setCurrentSiteUrl(deployment.deployedUrl);
                            setShowTvModal(true);
                          }}
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Site
                        </a>
                        <span className="text-gray-400">|</span>
                        <Link 
                          to={`/deployment/${deployment.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    ) : (
                      <Link 
                        to={`/deployment/${deployment.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}

        {showTvModal && (
        <TvModal 
            url={currentSiteUrl} 
            onClose={() => setShowTvModal(false)}
        />
        )}

    </div>
  );
};

export default DeploymentList;