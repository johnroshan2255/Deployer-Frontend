import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchDeployments, fetchDeploymentById } from '../services/deployment/deploymentService';

const DeploymentContext = createContext({
  deployments: [],
  activeDeployment: null,
  loading: false,
  error: null,
  refreshDeployments: () => {},
  getDeploymentById: () => {},
  createDeployment: () => {},
});

export const DeploymentProvider = ({ children }) => {
  const [deployments, setDeployments] = useState([]);
  const [activeDeployment, setActiveDeployment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial fetch of deployments
  useEffect(() => {
    refreshDeployments();
  }, []);

  // Function to refresh the deployments list
  const refreshDeployments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchDeployments();
      setDeployments(data);
    } catch (err) {
      setError('Failed to fetch deployments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to get a deployment by ID
  const getDeploymentById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchDeploymentById(id);
      setActiveDeployment(data);
      return data;
    } catch (err) {
      setError('Failed to fetch deployment details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new deployment
  const createDeployment = async (deploymentData) => {
    // In a real implementation, this would make an API call
    // For now, we'll simulate adding a new deployment
    const newDeployment = {
      id: Date.now().toString(),
      repoUrl: deploymentData.repoUrl,
      branch: deploymentData.branch,
      framework: deploymentData.framework,
      status: 'pending',
      createdAt: new Date().toISOString(),
      logs: ['Initializing deployment...'],
    };

    // Simulate API call
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        setDeployments(prev => [newDeployment, ...prev]);
        setLoading(false);
        resolve(newDeployment);
      }, 1000);
    });
  };

  return (
    <DeploymentContext.Provider
      value={{
        deployments,
        activeDeployment,
        loading,
        error,
        refreshDeployments,
        getDeploymentById,
        createDeployment,
      }}
    >
      {children}
    </DeploymentContext.Provider>
  );
};

export const useDeployments = () => useContext(DeploymentContext);

export default DeploymentContext;