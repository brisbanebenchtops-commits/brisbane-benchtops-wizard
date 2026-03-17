import React from 'react';
import { getDiscData } from '../../lib/disc/profiles';
import { NEPQStageIndicator } from '../common/NEPQPanel';

export const WizardLayout = ({
  title,
  subtitle,
  steps,
  currentStep,
  onStepClick,
  onNext,
  onPrev,
  canGoNext = true,
  discProfile,
  showSkepticism = false,
  nepqStage,
  onExport,
  exportLabel,
  prospectName,
  children
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-5 rounded-xl mb-5 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Brisbane Benchtops</h1>
            <p className="text-blue-100 text-lg mt-0.5">{title}</p>
            {prospectName && (
              <p className="text-blue-200 text-sm mt-1">Prospect: {prospectName}</p>
            )}
          </div>
          <a href="/" className="text-blue-200 hover:text-white text-sm transition-colors">
            ← Dashboard
          </a>
        </div>
      </div>

      {/* Skepticism Warning - full width above everything */}
      {showSkepticism && (
        <div className="mb-4 bg-red-100 border-2 border-red-400 rounded-xl p-3 text-center">
          <span className="text-lg font-bold text-red-700">
            ⚠️ Caution: HIGH Skepticism and/or Denial
          </span>
        </div>
      )}

      {/* NEPQ Stage Indicator */}
      {nepqStage && (
        <div className="mb-4 flex items-center justify-between">
          <NEPQStageIndicator stage={nepqStage} />
          <span className="text-xs text-gray-400 italic">Ask, don't tell</span>
        </div>
      )}

      {/* Progress */}
      <div className="bg-white p-4 rounded-xl mb-4 shadow-sm border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-700 mt-2 font-medium">{steps[currentStep]?.name}</p>
      </div>

      {/* Step Tabs */}
      <div className="bg-white border rounded-xl mb-4 shadow-sm overflow-x-auto">
        <div className="flex border-b min-w-max">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepClick(index)}
              className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                currentStep === index
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {step.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area — two-column layout with sticky DISC sidebar */}
      <div className="flex gap-4 items-start">
        {/* Left: Step Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border rounded-xl p-6 mb-5 shadow-sm min-h-[400px]">
            {children}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={onPrev}
              disabled={currentStep === 0}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-3">
              {onExport && (
                <button
                  onClick={onExport}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors"
                >
                  ⬇️ {exportLabel || 'Export'}
                </button>
              )}
              <span className="text-sm text-gray-500">
                {currentStep + 1} / {steps.length}
              </span>
            </div>

            <button
              onClick={onNext}
              disabled={currentStep === steps.length - 1 || !canGoNext}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                currentStep === steps.length - 1 || !canGoNext
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right: Sticky DISC Sidebar */}
        {discProfile && (
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-4">
              <DiscSidebar profile={discProfile} context={subtitle} />
            </div>
          </div>
        )}
      </div>

      {/* DISC panel for small screens (below content) */}
      {discProfile && (
        <div className="lg:hidden mt-4">
          <DiscSidebar profile={discProfile} context={subtitle} />
        </div>
      )}
    </div>
  );
};

const DiscSidebar = ({ profile, context }) => {
  const data = getDiscData(profile);
  const isProposal = context && context.toLowerCase().includes('proposal');
  const adviceList = isProposal ? data.proposalAdvice : data.advice;

  // Bold the first few key words in each advice item
  const boldFirst = (text) => {
    const parts = text.split(' ');
    if (parts.length <= 3) return <strong>{text}</strong>;
    const boldPart = parts.slice(0, 3).join(' ');
    const rest = parts.slice(3).join(' ');
    return <><strong>{boldPart}</strong> {rest}</>;
  };

  return (
    <div className={`border-2 rounded-xl p-4 ${data.panelColor} shadow-sm`}>
      <div className="mb-3">
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${data.tagColor}`}>
          DISC: {profile}
        </span>
      </div>

      <div className="mb-3">
        <h4 className="font-bold text-green-700 mb-1.5 text-xs uppercase tracking-wide">How to behave:</h4>
        <ul className="text-xs space-y-1.5">
          {adviceList.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-green-600 mr-1.5 mt-0.5 shrink-0">•</span>
              <span>{boldFirst(item)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-orange-700 mb-1.5 text-xs uppercase tracking-wide">Expected behaviors:</h4>
        <ul className="text-xs space-y-1.5">
          {data.expectations.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-orange-600 mr-1.5 mt-0.5 shrink-0">•</span>
              <span>{boldFirst(item)}</span>
            </li>
          ))}
        </ul>
      </div>

      {data.objectionHandling && (
        <div className="mt-3 pt-3 border-t border-opacity-30" style={{ borderColor: 'currentColor' }}>
          <h4 className="font-bold text-gray-700 mb-1.5 text-xs uppercase tracking-wide">Objection tips:</h4>
          <ul className="text-xs space-y-1">
            {Object.entries(data.objectionHandling).map(([key, tip]) => (
              <li key={key} className="flex items-start">
                <span className="text-gray-500 mr-1.5 mt-0.5 shrink-0">•</span>
                <span><strong className="capitalize">{key}:</strong> <span className="text-gray-600">{tip.substring(0, 60)}...</span></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
