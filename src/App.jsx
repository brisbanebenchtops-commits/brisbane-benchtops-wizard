import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/dashboard/Dashboard';
import ExploreCallWizard from './components/exploreCall/ExploreCallWizard';
import ProposalCallWizard from './components/proposalCall/ProposalCallWizard';

// Simple hash-based router (no extra dependency needed)
const useHashRouter = () => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newPath) => {
    window.location.hash = newPath;
  };

  return { path, navigate };
};

const App = () => {
  const { path, navigate } = useHashRouter();

  const matchRoute = () => {
    if (path === '/' || path === '') {
      return <Dashboard onNavigate={navigate} />;
    }

    const exploreMatch = path.match(/^\/explore\/(.+)$/);
    if (exploreMatch) {
      return <ExploreCallWizard prospectId={exploreMatch[1]} />;
    }

    const proposalMatch = path.match(/^\/proposal\/(.+)$/);
    if (proposalMatch) {
      return <ProposalCallWizard prospectId={proposalMatch[1]} />;
    }

    return <Dashboard onNavigate={navigate} />;
  };

  return (
    <AppProvider>
      {matchRoute()}
    </AppProvider>
  );
};

export default App;
