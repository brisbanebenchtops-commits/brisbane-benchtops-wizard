import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadProspects, saveProspects } from '../lib/data/persistence';

const AppContext = createContext(null);

const initialState = {
  prospects: [],
  loaded: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROSPECTS':
      return { ...state, prospects: action.payload, loaded: true };

    case 'ADD_PROSPECT':
      return { ...state, prospects: [...state.prospects, action.payload] };

    case 'UPDATE_PROSPECT':
      return {
        ...state,
        prospects: state.prospects.map(p =>
          p.id === action.payload.id
            ? { ...action.payload, updatedAt: new Date().toISOString() }
            : p
        )
      };

    case 'DELETE_PROSPECT':
      return {
        ...state,
        prospects: state.prospects.filter(p => p.id !== action.payload)
      };

    case 'IMPORT_PROSPECT':
      const exists = state.prospects.find(p => p.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          prospects: state.prospects.map(p =>
            p.id === action.payload.id ? action.payload : p
          )
        };
      }
      return { ...state, prospects: [...state.prospects, action.payload] };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const prospects = loadProspects();
    dispatch({ type: 'LOAD_PROSPECTS', payload: prospects });
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    if (state.loaded) {
      saveProspects(state.prospects);
    }
  }, [state.prospects, state.loaded]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const useProspect = (id) => {
  const { state, dispatch } = useApp();
  const prospect = state.prospects.find(p => p.id === id);

  const updateProspect = (updates) => {
    if (!prospect) return;
    dispatch({
      type: 'UPDATE_PROSPECT',
      payload: { ...prospect, ...updates }
    });
  };

  const updateExploreCall = (field, value) => {
    if (!prospect) return;
    dispatch({
      type: 'UPDATE_PROSPECT',
      payload: {
        ...prospect,
        exploreCall: { ...prospect.exploreCall, [field]: value }
      }
    });
  };

  const updateProposalCall = (field, value) => {
    if (!prospect) return;
    dispatch({
      type: 'UPDATE_PROSPECT',
      payload: {
        ...prospect,
        proposalCall: { ...prospect.proposalCall, [field]: value }
      }
    });
  };

  return { prospect, updateProspect, updateExploreCall, updateProposalCall };
};
