import React, { useState } from 'react';
import Terminal from '../../components/common/Terminal';

const DeploymentForm = () => {
  const [formData, setFormData] = useState({
    repositoryUrl: '',
    branchName: '',
    framework: 'laravel',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const frameworks = [
    { id: 'laravel', name: 'Laravel', available: true },
    { id: 'react', name: 'React', available: false },
    { id: 'vue', name: 'Vue.js', available: false },
    { id: 'next', name: 'Next.js', available: false },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.repositoryUrl) {
      setError('Repository URL is required');
      return false;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+(\/)?(\.git)?$/;
    if (!urlPattern.test(formData.repositoryUrl)) {
      setError('Please enter a valid GitHub repository URL');
      return false;
    }

    if (!formData.branchName) {
      setError('Branch name is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setIsDeploying(true);
    setLogs([
      '[INFO] Initiating deployment process...',
      `[INFO] Repository: ${formData.repositoryUrl}`,
      `[INFO] Branch: ${formData.branchName}`,
      `[INFO] Framework: ${formData.framework}`,
    ]);

    try {
      // Mock logs creation for demo purposes
      const logUpdates = [
        '[INFO] Cloning repository...',
        '[INFO] Checking out branch...',
        '[INFO] Installing dependencies...',
        '[INFO] Running build process...',
        '[SUCCESS] Deployment completed successfully!',
        '[INFO] Your deployment is available at: https://test-deployment.example.com/your-project'
      ];
      
      // Simulate real-time logs with delays
      for (const log of logUpdates) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLogs(prev => [...prev, log]);
      }

      // In a real app, this would call your API service
      // const response = await createDeployment(formData);
      // Handle the response
      
      setIsLoading(false);
      // Don't reset isDeploying to keep logs visible
      
    } catch (err) {
      setLogs(prev => [...prev, `[ERROR] Deployment failed: ${err.message}`]);
      setError('Failed to create deployment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="deployment-form-container">
      <h1>Create New Deployment</h1>
      <p className="description">
        Deploy your project by providing your repository URL and branch name.
      </p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="repositoryUrl">Repository URL</label>
          <input
            type="text"
            id="repositoryUrl"
            name="repositoryUrl"
            value={formData.repositoryUrl}
            onChange={handleInputChange}
            placeholder="https://github.com/username/repository"
            disabled={isLoading}
            required
          />
          <small className="form-hint">Enter a public GitHub repository URL</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="branchName">Branch Name</label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleInputChange}
            placeholder="main"
            disabled={isLoading}
            required
          />
          <small className="form-hint">Enter the branch you want to deploy</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="framework">Framework</label>
          <div className="framework-selection">
            {frameworks.map((framework) => (
              <div
                key={framework.id}
                className={`framework-option ${formData.framework === framework.id ? 'selected' : ''} ${!framework.available ? 'disabled' : ''}`}
                onClick={() => {
                  if (framework.available) {
                    handleInputChange({ target: { name: 'framework', value: framework.id } });
                  }
                }}
              >
                {framework.name}
                {!framework.available && <span className="coming-soon"> Coming Soon</span>}
              </div>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Deploying...' : 'Deploy Project'}
        </button>
      </form>

      {isDeploying && (
        <Terminal logs={logs} title="Deployment Progress" height="400px" />
      )}
    </div>
  );
};

export default DeploymentForm;