import React, { useState, useCallback, useMemo } from 'react';
import { useProspect } from '../../context/AppContext';
import { WizardLayout } from '../wizard/WizardLayout';
import { inferDiscProfile, checkHighSkepticism } from '../../lib/disc/profiles';
import { PIPELINE_STAGES } from '../../lib/utils/constants';
import { ProposalSteps } from './steps';
import { NEPQPanel, ExploreCallNEPQSummary, NEPQObjectionHelper } from '../common/NEPQPanel';
import { PROPOSAL_NEPQ, getProposalNEPQStage } from '../../lib/data/nepqQuestions';

const STEPS = [
  { id: 'proposal-opening', name: 'Opening' },
  { id: 'surplus-stone', name: 'Surplus Stone' },
  { id: 'value-framing', name: 'Value Framing' },
  { id: 'guarantees', name: '5 Guarantees' },
  { id: 'competitor-check', name: 'Competitor Check' },
  { id: 'competitor-deep-dive', name: 'Competitor Deep Dive' },
  { id: 'added-bonuses-1', name: 'Bonuses 1-3' },
  { id: 'added-bonuses-2', name: 'Bonuses 4-7' },
  { id: 'value-summary', name: 'Value Summary' },
  { id: 'option-presentation', name: 'Present Options' },
  { id: 'close', name: 'Close' },
  { id: 'call-outcome', name: 'Call Outcome' }
];

const ProposalCallWizard = ({ prospectId }) => {
  const { prospect, updateProspect, updateProposalCall } = useProspect(prospectId);
  const ec = prospect?.exploreCall || {};
  const pc = prospect?.proposalCall || {};
  const [currentStep, setCurrentStep] = useState(pc.currentStep || 0);

  const discProfile = useMemo(() => {
    return ec.discProfile || inferDiscProfile(ec.energyLevel, ec.friendly, ec.leadTopics);
  }, [ec.discProfile, ec.energyLevel, ec.friendly, ec.leadTopics]);

  const skepticism = useMemo(() => checkHighSkepticism(ec), [ec]);

  const nepqStage = useMemo(() => getProposalNEPQStage(currentStep), [currentStep]);
  const nepqData = PROPOSAL_NEPQ[currentStep];

  const update = useCallback((field, value) => {
    updateProposalCall(field, value);
  }, [updateProposalCall]);

  const handleNEPQResponse = useCallback((field, value) => {
    updateProposalCall(field, value);
  }, [updateProposalCall]);

  const handleStepChange = useCallback((step) => {
    setCurrentStep(step);
    updateProposalCall('currentStep', step);
  }, [updateProposalCall]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) handleStepChange(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) handleStepChange(currentStep - 1);
  };

  const handleComplete = () => {
    updateProposalCall('status', 'completed');
    updateProposalCall('completedAt', new Date().toISOString());
    const outcome = pc.outcome;
    if (outcome === 'accepted') {
      updateProspect({ pipelineStage: PIPELINE_STAGES.WON });
    } else if (outcome === 'declined') {
      updateProspect({ pipelineStage: PIPELINE_STAGES.LOST });
    } else {
      updateProspect({ pipelineStage: PIPELINE_STAGES.PROPOSAL_COMPLETED });
    }
  };

  // Determine which objection helpers to show based on current step and data
  const getObjectionType = () => {
    if (currentStep === 10) { // Close step
      if (pc.acceptanceStatus === 'Needs time to think') return 'thinkAboutIt';
      if (pc.acceptanceStatus === 'Wants to get other quotes') return 'otherQuotes';
    }
    if (currentStep === 9 && pc.selectedOption === 'Neither') return 'tooExpensive';
    return null;
  };

  if (!prospect) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-500">Prospect not found.</p>
        <a href="/" className="text-blue-600 hover:underline mt-2 inline-block">Back to Dashboard</a>
      </div>
    );
  }

  if (ec.status !== 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
          <h2 className="text-lg font-bold text-amber-800 mb-2">Explore Call Not Complete</h2>
          <p className="text-amber-700 mb-3">Complete the Explore Call first before starting the Proposal Call.</p>
          <a href={`/explore/${prospect.id}`} className="text-blue-600 hover:underline">Go to Explore Call →</a>
        </div>
      </div>
    );
  }

  const StepComponent = ProposalSteps[currentStep];
  const objectionType = getObjectionType();

  return (
    <WizardLayout
      title="Proposal Call Wizard"
      subtitle="Proposal Call"
      steps={STEPS}
      currentStep={currentStep}
      onStepClick={handleStepChange}
      onNext={handleNext}
      onPrev={handlePrev}
      canGoNext={true}
      discProfile={discProfile}
      showSkepticism={skepticism}
      nepqStage={nepqStage}
      prospectName={`${prospect.firstName} ${prospect.lastName}`.trim()}
    >
      {/* Explore Call NEPQ Summary — collapsible reference of their words */}
      <ExploreCallNEPQSummary exploreData={ec} />

      {/* NEPQ Questions Panel — renders above the step content */}
      <NEPQPanel
        nepqData={nepqData}
        responses={pc}
        onResponseChange={handleNEPQResponse}
        exploreData={ec}
      />

      {StepComponent && (
        <StepComponent
          prospect={prospect}
          exploreData={ec}
          data={pc}
          update={update}
          discProfile={discProfile}
          onComplete={currentStep === STEPS.length - 1 ? handleComplete : undefined}
        />
      )}

      {/* NEPQ Objection Helper — shows when specific objections arise */}
      {objectionType && (
        <div className="mt-4">
          <NEPQObjectionHelper objectionType={objectionType} />
        </div>
      )}
    </WizardLayout>
  );
};

export default ProposalCallWizard;
