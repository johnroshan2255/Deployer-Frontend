// This is a mock service that would be replaced with actual API calls in production

// Mock data for deployments
const mockDeployments = [
    {
      id: '1',
      repoUrl: 'https://github.com/user/laravel-project',
      branch: 'main',
      framework: 'laravel',
      status: 'deployed',
      createdAt: '2025-04-15T10:30:00Z',
      deployedUrl: 'https://main-laravel-project.test-deploy.com',
      logs: [
        '[INFO] Cloning repository...',
        '[INFO] Checking out branch: main',
        '[INFO] Installing dependencies...',
        '[INFO] Running migrations...',
        '[SUCCESS] Deployment successful!'
      ]
    },
    {
      id: '2',
      repoUrl: 'https://github.com/user/laravel-api',
      branch: 'feature/auth',
      framework: 'laravel',
      status: 'building',
      createdAt: '2025-04-16T14:20:00Z',
      logs: [
        '[INFO] Cloning repository...',
        '[INFO] Checking out branch: feature/auth',
        '[INFO] Installing dependencies...',
        '[INFO] Running migrations...',
        '[INFO] Building assets...'
      ]
    },
    {
      id: '3',
      repoUrl: 'https://github.com/user/laravel-blog',
      branch: 'develop',
      framework: 'laravel',
      status: 'failed',
      createdAt: '2025-04-14T09:15:00Z',
      logs: [
        '[INFO] Cloning repository...',
        '[INFO] Checking out branch: develop',
        '[INFO] Installing dependencies...',
        '[ERROR] Failed to install dependencies. Package incompatibility detected.',
        '[ERROR] Deployment failed.'
      ]
    },
    {
      id: '4',
      repoUrl: 'https://github.com/user/laravel-cms',
      branch: 'staging',
      framework: 'laravel',
      status: 'pending',
      createdAt: '2025-04-17T08:05:00Z',
      logs: [
        '[INFO] Deployment queued...',
        '[INFO] Waiting for available resources...'
      ]
    }
  ];
  
  // Fetch all deployments
  export const fetchDeployments = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDeployments);
      }, 500);
    });
  };
  
  // Fetch a deployment by ID
  export const fetchDeploymentById = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deployment = mockDeployments.find(d => d.id === id);
        if (deployment) {
          resolve(deployment);
        } else {
          reject(new Error('Deployment not found'));
        }
      }, 500);
    });
  };
  
  // Create a new deployment
  export const createDeployment = (deploymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDeployment = {
          id: Date.now().toString(),
          ...deploymentData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          logs: ['[INFO] Deployment queued...']
        };
        mockDeployments.unshift(newDeployment);
        resolve(newDeployment);
      }, 1000);
    });
  };
  
  // Get real-time logs for a deployment
  export const getDeploymentLogs = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deployment = mockDeployments.find(d => d.id === id);
        if (deployment) {
          resolve(deployment.logs);
        } else {
          resolve([]);
        }
      }, 300);
    });
  };
  
  // Update deployment status
  export const updateDeploymentStatus = (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deployment = mockDeployments.find(d => d.id === id);
        if (deployment) {
          deployment.status = status;
          resolve(deployment);
        } else {
          resolve(null);
        }
      }, 500);
    });
  };