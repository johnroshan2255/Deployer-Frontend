import React, { useEffect, useRef } from 'react';

const Terminal = ({ logs = [], title = 'Deployment Logs', height = '300px' }) => {
  const terminalRef = useRef(null);
  
  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);
  
  const terminalStyle = {
    backgroundColor: 'var(--terminal-background)',
    color: 'var(--terminal-text)',
    fontFamily: 'monospace',
    padding: '12px',
    borderRadius: 'var(--border-radius)',
    height,
    overflowY: 'auto',
    marginTop: '16px',
    marginBottom: '16px',
    position: 'relative',
  };
  
  const titleBarStyle = {
    position: 'sticky',
    top: '0',
    backgroundColor: 'var(--terminal-background)',
    padding: '0 0 8px 0',
    fontWeight: 'bold',
    borderBottom: '1px solid var(--color-gray-600)',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const copyButtonStyle = {
    background: 'none',
    border: '1px solid var(--color-gray-500)',
    color: 'var(--terminal-text)',
    padding: '2px 8px',
    fontSize: '12px',
    cursor: 'pointer',
  };
  
  const logItemStyle = {
    margin: '4px 0',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };
  
  const copyLogs = () => {
    const logText = logs.join('\n');
    navigator.clipboard.writeText(logText);
  };
  
  // Determine log style based on content
  const getLogStyle = (log) => {
    if (log.includes('[ERROR]') || log.toLowerCase().includes('error')) {
      return { color: 'var(--color-error)' };
    } else if (log.includes('[WARNING]') || log.toLowerCase().includes('warning')) {
      return { color: 'var(--color-warning)' };
    } else if (log.includes('[SUCCESS]') || log.toLowerCase().includes('success')) {
      return { color: 'var(--color-success)' };
    } else if (log.includes('[INFO]') || log.toLowerCase().includes('info')) {
      return { color: 'var(--color-info)' };
    }
    return {};
  };

  return (
    <div style={terminalStyle} ref={terminalRef}>
      <div style={titleBarStyle}>
        <span>{title}</span>
        <button style={copyButtonStyle} onClick={copyLogs}>
          Copy Logs
        </button>
      </div>
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index} style={{ ...logItemStyle, ...getLogStyle(log) }}>
            {log}
          </div>
        ))
      ) : (
        <div style={logItemStyle}>No logs available yet...</div>
      )}
    </div>
  );
};

export default Terminal;