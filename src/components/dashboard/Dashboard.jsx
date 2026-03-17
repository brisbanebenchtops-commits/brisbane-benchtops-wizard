import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { createNewProspect } from '../../lib/data/prospectTemplate';
import { exportProspectJSON, importProspectJSON } from '../../lib/data/persistence';
import { PIPELINE_LABELS, PIPELINE_COLORS, PIPELINE_STAGES } from '../../lib/utils/constants';
import { formatDate, timeAgo } from '../../lib/utils/id';
import { inferDiscProfile, getDiscData } from '../../lib/disc/profiles';

const Dashboard = ({ onNavigate }) => {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);
  const excelInputRef = useRef(null);

  const handleNewProspect = () => {
    const prospect = createNewProspect();
    dispatch({ type: 'ADD_PROSPECT', payload: prospect });
    onNavigate(`/explore/${prospect.id}`);
  };

  const handleImportJSON = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const prospect = await importProspectJSON(file);
      dispatch({ type: 'IMPORT_PROSPECT', payload: prospect });
    } catch (err) {
      alert('Failed to import: ' + err.message);
    }
    e.target.value = '';
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Parse the Explore Call Excel format
      const getValue = (label) => {
        const row = rows.find(r => r[0] === label);
        return row ? (row[1] || '') : '';
      };

      const prospect = createNewProspect({
        firstName: (getValue('Name:').split(' ')[0] || '').trim(),
        lastName: (getValue('Name:').split(' ').slice(1).join(' ') || '').trim(),
        suburb: getValue('Suburb:'),
        address: getValue('Address:'),
        pipelineStage: PIPELINE_STAGES.EXPLORE_COMPLETED,
        exploreCall: {
          status: 'completed',
          completedAt: new Date().toISOString(),
          callerName: getValue('Caller Name:'),
          room: getValue('Room:'),
          benchtopThickness: getValue('Benchtop Thickness:'),
          stoneBrands: getValue('Stone Brands:') ? getValue('Stone Brands:').split(', ') : [],
          energyLevel: getValue('Energy Level:') || getValue('Energy Level Match:'),
          friendly: getValue('Friendly:') || getValue('Friendly Response:'),
          leadTopics: getValue('Led Topics:'),
          discProfile: getValue('Inferred Profile:') || getValue('Profile:'),
          howFoundUs: getValue('How Found Us:'),
          adAppeal: getValue('Ad/Website Appeal:'),
          visitedShowrooms: getValue('Visited Showrooms:'),
          decisionTimeframe: getValue('Decision Timeframe:'),
          deepDiveReason: getValue('Deep Dive Reason:'),
          additionalStoneWanted: getValue('Additional Stone Wanted:'),
          additionalStone: getValue('Additional Stone Notes:') || getValue('Additional Stone:'),
          colourChoice: getValue('Colour Preferences:') || getValue('Colour Choice:'),
          sinkInstallation: getValue('Sink Installation:') || getValue('Sink Installation Type:'),
          cooktopCutout: getValue('Cooktop Type:') || getValue('Cooktop Cutout Type:'),
          jobType: getValue('Job Type:'),
          managedService: getValue('Managed Service:'),
          proposalCallDay1Time: getValue('Option 1:'),
          proposalCallDay2Time: getValue('Option 2:'),
          otherPoints: getValue('Other Points:'),
          yearsAtProperty: getValue('Years at Property:'),
        }
      });

      dispatch({ type: 'ADD_PROSPECT', payload: prospect });
      alert(`Imported: ${prospect.firstName} ${prospect.lastName}. Ready for Proposal Call.`);
    } catch (err) {
      alert('Failed to import Excel: ' + err.message);
    }
    e.target.value = '';
  };

  const filtered = state.prospects
    .filter(p => filter === 'all' || p.pipelineStage === filter)
    .filter(p => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (p.firstName + ' ' + p.lastName).toLowerCase().includes(s) ||
        (p.suburb || '').toLowerCase().includes(s);
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Stats
  const stats = {
    total: state.prospects.length,
    active: state.prospects.filter(p => !['won', 'lost'].includes(p.pipelineStage)).length,
    won: state.prospects.filter(p => p.pipelineStage === 'won').length,
    lost: state.prospects.filter(p => p.pipelineStage === 'lost').length,
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-5 rounded-xl mb-5 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Brisbane Benchtops</h1>
            <p className="text-blue-100 text-lg">Sales Call Dashboard</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => excelInputRef.current?.click()}
              className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              📊 Import Excel
            </button>
            <button onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors border border-blue-400">
              📁 Import JSON
            </button>
            <button onClick={handleNewProspect}
              className="px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
              + New Prospect
            </button>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
        <input ref={excelInputRef} type="file" accept=".xlsx,.xls" onChange={handleImportExcel} className="hidden" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', value: stats.total, color: 'bg-white' },
          { label: 'Active', value: stats.active, color: 'bg-blue-50' },
          { label: 'Won', value: stats.won, color: 'bg-green-50' },
          { label: 'Lost', value: stats.lost, color: 'bg-red-50' }
        ].map(s => (
          <div key={s.label} className={`${s.color} p-4 rounded-xl border shadow-sm text-center`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl border shadow-sm mb-4 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search prospects..."
          className="flex-1 min-w-[200px] p-2 border rounded-lg text-sm"
        />
        <div className="flex flex-wrap gap-1">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterBtn>
          {Object.entries(PIPELINE_LABELS).map(([key, label]) => (
            <FilterBtn key={key} active={filter === key} onClick={() => setFilter(key)}>
              {label}
            </FilterBtn>
          ))}
        </div>
      </div>

      {/* Prospect List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
          <p className="text-gray-400 text-lg mb-3">
            {state.prospects.length === 0 ? 'No prospects yet' : 'No prospects match your filter'}
          </p>
          {state.prospects.length === 0 && (
            <button onClick={handleNewProspect}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              + Add Your First Prospect
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(prospect => (
            <ProspectCard key={prospect.id} prospect={prospect} onNavigate={onNavigate} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProspectCard = ({ prospect, onNavigate, dispatch }) => {
  const ec = prospect.exploreCall || {};
  const pc = prospect.proposalCall || {};
  const discProfile = ec.discProfile || inferDiscProfile(ec.energyLevel, ec.friendly, ec.leadTopics);
  const discData = discProfile ? getDiscData(discProfile) : null;

  // Primary action button
  const getPrimaryAction = () => {
    if (ec.status !== 'completed') {
      return { label: 'Continue Explore Call', path: `/explore/${prospect.id}`, color: 'bg-blue-600 hover:bg-blue-700' };
    }
    if (pc.status !== 'completed') {
      return { label: 'Start Proposal Call', path: `/proposal/${prospect.id}`, color: 'bg-indigo-600 hover:bg-indigo-700' };
    }
    if (pc.outcome === 'pending' || pc.outcome === 'deferred') {
      return { label: 'Review Proposal', path: `/proposal/${prospect.id}`, color: 'bg-orange-600 hover:bg-orange-700' };
    }
    return null;
  };

  const primaryAction = getPrimaryAction();
  const exploreCompleted = ec.status === 'completed';
  const proposalExists = pc.status === 'completed' || pc.status === 'in-progress';

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900">
                {prospect.firstName} {prospect.lastName || '(New)'}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${PIPELINE_COLORS[prospect.pipelineStage] || 'bg-gray-100 text-gray-600'}`}>
                {PIPELINE_LABELS[prospect.pipelineStage] || prospect.pipelineStage}
              </span>
              {discData && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${discData.tagColor}`}>
                  {discData.short}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              {prospect.suburb && <span>📍 {prospect.suburb}</span>}
              {ec.room && <span>🏠 {ec.room}</span>}
              {ec.benchtopThickness && <span>📐 {ec.benchtopThickness}</span>}
              {pc.outcome === 'accepted' && <span className="text-green-600 font-medium">🎉 Won</span>}
              {pc.followUpDate && <span className="text-orange-600">📅 Follow-up: {pc.followUpDate}</span>}
              <span>Updated {timeAgo(prospect.updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-3">
          <button
            onClick={() => exportProspectJSON(prospect)}
            className="px-2 py-1.5 text-xs text-gray-600 border rounded-lg hover:bg-gray-50"
            title="Export as JSON"
          >
            💾
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete ${prospect.firstName} ${prospect.lastName}?`)) {
                dispatch({ type: 'DELETE_PROSPECT', payload: prospect.id });
              }
            }}
            className="px-2 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
            title="Delete"
          >
            🗑️
          </button>

          {/* Always show Explore Call button once it exists */}
          <button
            onClick={() => onNavigate(`/explore/${prospect.id}`)}
            className={`px-3 py-2 text-white rounded-lg text-xs font-medium transition-colors ${
              !exploreCompleted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {exploreCompleted ? 'View Explore' : 'Continue Explore'}
          </button>

          {/* Show Proposal Call button once explore is completed */}
          {exploreCompleted && (
            <button
              onClick={() => onNavigate(`/proposal/${prospect.id}`)}
              className={`px-3 py-2 text-white rounded-lg text-xs font-medium transition-colors ${
                pc.status === 'completed'
                  ? 'bg-gray-500 hover:bg-gray-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {pc.status === 'completed' ? 'View Proposal' : (proposalExists ? 'Continue Proposal' : 'Start Proposal')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterBtn = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
      active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

export default Dashboard;
