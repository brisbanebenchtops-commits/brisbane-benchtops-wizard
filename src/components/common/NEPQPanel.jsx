import React, { useState } from 'react';
import { QUESTION_TYPES, NEPQ_STAGES, NEPQ_OBJECTION_HANDLING } from '../../lib/data/nepqQuestions';

/**
 * NEPQPanel — Collapsible panel showing NEPQ questions for a wizard step.
 * Questions are colour-coded by type, with response capture fields.
 */
export const NEPQPanel = ({ nepqData, responses, onResponseChange, exploreData }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [usedQuestions, setUsedQuestions] = useState({});

  if (!nepqData || (!nepqData.questions?.length && !nepqData.coaching)) return null;

  const stage = NEPQ_STAGES[nepqData.stage];

  const toggleUsed = (index) => {
    setUsedQuestions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="border-2 border-indigo-200 rounded-xl overflow-hidden mb-5">
      {/* Header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div className="text-left">
            <h3 className="font-bold text-indigo-900 text-sm">NEPQ Questions</h3>
            <p className="text-xs text-indigo-600">
              {stage?.name} Stage • Ask, don't tell
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {nepqData.questions?.length > 0 && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {nepqData.questions.length} question{nepqData.questions.length > 1 ? 's' : ''}
            </span>
          )}
          <span className={`text-indigo-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {/* Body — collapsible */}
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white">
          {/* Coaching tip */}
          {nepqData.coaching && (
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-lg">
              <p className="text-sm text-indigo-800 font-medium flex items-start gap-2">
                <span className="mt-0.5">💡</span>
                <span>{nepqData.coaching}</span>
              </p>
            </div>
          )}

          {/* Questions */}
          {nepqData.questions?.map((q, index) => {
            const qType = QUESTION_TYPES[q.type];
            const isUsed = usedQuestions[index];
            const currentResponse = responses?.[q.responseField] || '';

            return (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden transition-all ${
                  isUsed ? 'opacity-60' : ''
                } ${qType.borderColor}`}
              >
                {/* Question header */}
                <div className={`${qType.bgColor} px-4 py-2 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${qType.dotColor}`}></span>
                    <span className={`text-xs font-bold uppercase tracking-wide ${qType.textColor}`}>
                      {qType.label}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleUsed(index)}
                    className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                      isUsed
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {isUsed ? '✓ Used' : 'Mark Used'}
                  </button>
                </div>

                {/* Question text */}
                <div className="px-4 py-3">
                  <p className="font-medium text-gray-800 text-base leading-relaxed">
                    "{q.text}"
                  </p>
                  {q.hint && (
                    <p className="text-xs text-gray-500 mt-2 italic flex items-start gap-1">
                      <span>📝</span> {q.hint}
                    </p>
                  )}

                  {/* Radio options (if applicable) */}
                  {q.radioOptions && q.radioField && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {q.radioOptions.map((opt) => {
                        const radioValue = responses?.[q.radioField] || '';
                        return (
                          <button
                            key={opt}
                            onClick={() => onResponseChange(q.radioField, opt)}
                            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                              radioValue === opt
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Response field */}
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Their response:
                    </label>
                    <textarea
                      value={currentResponse}
                      onChange={(e) => onResponseChange(q.responseField, e.target.value)}
                      placeholder="Jot down what they said..."
                      rows={2}
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * NEPQStageIndicator — Shows current NEPQ stage in the wizard header
 */
export const NEPQStageIndicator = ({ stage }) => {
  if (!stage) return null;

  const stageData = NEPQ_STAGES[stage];
  if (!stageData) return null;

  const stageColors = {
    connection: 'bg-gray-100 text-gray-700 border-gray-300',
    engagement: 'bg-blue-100 text-blue-700 border-blue-300',
    transition: 'bg-purple-100 text-purple-700 border-purple-300',
    presentation: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    commitment: 'bg-teal-100 text-teal-700 border-teal-300'
  };

  const stageEmoji = {
    connection: '🤝',
    engagement: '🔍',
    transition: '🌉',
    presentation: '🎯',
    commitment: '✅'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${stageColors[stage]}`}>
      <span>{stageEmoji[stage]}</span>
      <span>NEPQ: {stageData.name}</span>
      <span className="opacity-60">{stageData.percentage}</span>
    </div>
  );
};

/**
 * NEPQObjectionHelper — Shows NEPQ objection handling questions
 */
export const NEPQObjectionHelper = ({ objectionType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const objection = NEPQ_OBJECTION_HANDLING[objectionType];
  if (!objection) return null;

  return (
    <div className="border-2 border-amber-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span className="font-bold text-amber-900 text-sm">NEPQ Objection: {objection.label}</span>
        </div>
        <span className={`text-amber-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="p-4 bg-white space-y-3">
          <p className="text-xs text-amber-700 font-medium">
            Don't rebut — ask a question instead. Pick the one that feels most natural:
          </p>
          {objection.questions.map((q, i) => (
            <div key={i} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-800 font-medium">"{q}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * ExploreCallNEPQSummary — Shows key NEPQ answers from Explore Call
 * Used in Proposal Call to reference what the prospect said
 */
export const ExploreCallNEPQSummary = ({ exploreData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Collect all non-empty NEPQ responses from explore data
  const nepqFields = Object.entries(exploreData || {})
    .filter(([key, val]) => key.startsWith('nepq_') && val && val.trim())
    .map(([key, val]) => ({
      field: key,
      label: key.replace('nepq_', '').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
      value: val
    }));

  if (nepqFields.length === 0) return null;

  return (
    <div className="border-2 border-green-200 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>📋</span>
          <div className="text-left">
            <span className="font-bold text-green-900 text-sm">Explore Call — Their Words</span>
            <span className="text-xs text-green-600 ml-2">{nepqFields.length} responses captured</span>
          </div>
        </div>
        <span className={`text-green-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="p-4 bg-white space-y-2 max-h-64 overflow-y-auto">
          {nepqFields.map((f, i) => (
            <div key={i} className="bg-green-50 p-2.5 rounded-lg border border-green-100">
              <p className="text-xs font-semibold text-green-700">{f.label}:</p>
              <p className="text-sm text-gray-700 mt-0.5">"{f.value}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
