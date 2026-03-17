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
    <div className="max-w-5xl mx-auto p-4 md:p-6 min-h-screen bg-gray-50">
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

      {/* DISC Profile + Skepticism Banner */}
      {discProfile && <DiscBanner profile={discProfile} showSkepticism={showSkepticism} context={subtitle} />}

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

      {/* Step Content */}
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
  );
};

const DiscBanner = ({ profile, showSkepticism, context }) => {
  const data = getDiscData(profile);
  const isProposal = context && context.toLowerCase().includes('proposal');
  const adviceList = isProposal ? data.proposalAdvice : data.advice;

  return (
    <div className="mb-4 space-y-2">
      <div className={`border rounded-xl p-4 ${data.panelColor}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${data.tagColor}`}>
              DISC: {profile}
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-700 mb-1.5 text-sm">How to behave:</h4>
            <ul className="text-xs space-y-1">
              {adviceList.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-600 mr-1.5 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-700 mb-1.5 text-sm">Expected behaviors:</h4>
            <ul className="text-xs space-y-1">
              {data.expectations.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-orange-600 mr-1.5 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showSkepticism && (
        <div className="bg-red-100 border-2 border-red-400 rounded-xl p-3 text-center">
          <span className="text-lg font-bold text-red-700">
            ⚠️ Caution: HIGH Skepticism and/or Denial
          </span>
        </div>
      )}
    </div>
  );
};
