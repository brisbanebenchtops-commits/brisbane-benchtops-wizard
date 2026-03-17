import React, { useState, useCallback, useMemo } from 'react';
import { useProspect, useApp } from '../../context/AppContext';
import { WizardLayout } from '../wizard/WizardLayout';
import { inferDiscProfile, checkHighSkepticism } from '../../lib/disc/profiles';
import { PIPELINE_STAGES } from '../../lib/utils/constants';
import { ExploreSteps } from './steps';
import { NEPQPanel } from '../common/NEPQPanel';
import { EXPLORE_NEPQ, getExploreNEPQStage } from '../../lib/data/nepqQuestions';

const STEPS = [
  { id: 'precall-setup', name: 'Precall Setup' },
  { id: 'confirmation-details', name: 'Confirmation Details' },
  { id: 'initial-greeting', name: 'Initial Greeting' },
  { id: 'disc-assessment', name: 'DISC Assessment' },
  { id: 'introduction', name: 'Introduction' },
  { id: 'icebreakers-1', name: 'Icebreakers (Part 1)' },
  { id: 'icebreakers-2', name: 'Icebreakers (Part 2)' },
  { id: 'access', name: 'Access' },
  { id: 'information-confirmation', name: 'Information Confirmation' },
  { id: 'deep-dive-reason', name: 'Deep Dive (Reason)' },
  { id: 'job-type', name: 'Job Type' },
  { id: 'managed-service', name: 'Managed Service' },
  { id: 'thickness-splashback', name: 'Thickness & Splashback' },
  { id: 'pricing-timing', name: 'Pricing & Timing' },
  { id: 'additional-stone', name: 'Additional Stone' },
  { id: 'stone-brands', name: 'Stone Brands' },
  { id: 'sink-cooktop', name: 'Sink & Cooktop' },
  { id: 'final-points', name: 'Final Points' }
];

const ExploreCallWizard = ({ prospectId }) => {
  const { prospect, updateProspect, updateExploreCall } = useProspect(prospectId);
  const { dispatch } = useApp();

  const ec = prospect?.exploreCall || {};
  const [currentStep, setCurrentStep] = useState(ec.currentStep || 0);

  const discProfile = useMemo(() => {
    return ec.discProfile || inferDiscProfile(ec.energyLevel, ec.friendly, ec.leadTopics);
  }, [ec.discProfile, ec.energyLevel, ec.friendly, ec.leadTopics]);

  const skepticism = useMemo(() => checkHighSkepticism(ec), [ec]);

  const nepqStage = useMemo(() => getExploreNEPQStage(currentStep), [currentStep]);
  const nepqData = EXPLORE_NEPQ[currentStep];

  const update = useCallback((field, value) => {
    updateExploreCall(field, value);
  }, [updateExploreCall]);

  const updateBasic = useCallback((field, value) => {
    updateProspect({ [field]: value });
  }, [updateProspect]);

  const handleNEPQResponse = useCallback((field, value) => {
    updateExploreCall(field, value);
  }, [updateExploreCall]);

  const handleStepChange = useCallback((step) => {
    setCurrentStep(step);
    updateExploreCall('currentStep', step);
  }, [updateExploreCall]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1 && canGoNext()) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) handleStepChange(currentStep - 1);
  };

  const canGoNext = () => {
    if (currentStep === 0) {
      return prospect?.firstName && prospect?.lastName && ec.callerName && prospect?.suburb;
    }
    if (currentStep === 3) {
      return ec.energyLevel && ec.friendly && ec.leadTopics;
    }
    return true;
  };

  const handleExport = () => {
    import('xlsx').then((XLSX) => {
      const profile = discProfile || 'Unknown';
      const wb = XLSX.utils.book_new();

      const summaryData = [
        ['Brisbane Benchtops - Explore Call Summary'],
        ['Generated:', new Date().toLocaleDateString('en-AU')],
        [''],
        ['PROSPECT INFORMATION'],
        ['Name:', `${prospect.firstName} ${prospect.lastName}`],
        ['Suburb:', prospect.suburb],
        ['Address:', prospect.address],
        ['Room:', ec.room],
        ['Years at Property:', ec.yearsAtProperty],
        [''],
        ['CALLER INFORMATION'],
        ['Caller Name:', ec.callerName],
        [''],
        ['DISC PROFILE'],
        ['Profile:', profile],
        ['Energy Level:', ec.energyLevel],
        ['Friendly:', ec.friendly],
        ['Led Topics:', ec.leadTopics],
        [''],
        ['PROJECT DETAILS'],
        ['Benchtop Thickness:', ec.benchtopThickness],
        ['Stone Brands:', (ec.stoneBrands || []).join(', ')],
        ['Job Type:', ec.jobType],
        ['Managed Service:', ec.managedService],
        ['Colour Choice:', ec.colourChoice],
        ['Sink Installation:', ec.sinkInstallation],
        ['Cooktop Type:', ec.cooktopCutout],
        ['Additional Stone Wanted:', ec.additionalStoneWanted],
        [''],
        ['CALL DETAILS'],
        ['How Found Us:', ec.howFoundUs + (ec.howFoundUsOther ? ` (${ec.howFoundUsOther})` : '')],
        ['Ad/Website Appeal:', ec.adAppeal || ''],
        ['Visited Showrooms:', ec.visitedShowrooms],
        ['Decision Timeframe:', ec.decisionTimeframe],
        ['Deep Dive Reason:', ec.deepDiveReason],
        [''],
        ['NEPQ INSIGHTS (Prospect\'s Own Words)'],
        ['Biggest Frustration:', ec.nepq_biggestFrustration || ''],
        ['How Long Bothered:', ec.nepq_howLongBothered || ''],
        ['Daily Impact:', ec.nepq_dailyImpact || ''],
        ['Tried Before:', ec.nepq_triedBefore || ''],
        ['What Stopped Them:', ec.nepq_whatStopped || ''],
        ['Ideal Outcome:', ec.nepq_idealOutcome || ''],
        ['Selection Criteria:', ec.nepq_selectionCriteria || ''],
        ['Kitchen Vision:', ec.nepq_kitchenVision || ''],
        ['Decision Style:', ec.nepq_decisionStyle || ''],
        ['Delay Consequence:', ec.nepq_delayConsequence || ''],
        [''],
        ['PROPOSAL CALL SCHEDULING'],
        ['Option 1:', ec.proposalCallDay1Time],
        ['Option 2:', ec.proposalCallDay2Time],
        [''],
        ['NOTES'],
        ['Other Points:', ec.otherPoints]
      ];

      const ws = XLSX.utils.aoa_to_sheet(summaryData);
      const cols = [];
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        let max = 10;
        for (let R = range.s.r; R <= range.e.r; ++R) {
          const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
          if (cell && cell.v) {
            const w = cell.v.toString().length;
            if (w > max) max = w;
          }
        }
        cols[C] = { width: Math.min(max + 2, 50) };
      }
      ws['!cols'] = cols;
      XLSX.utils.book_append_sheet(wb, ws, 'Call Summary');

      const fileName = `Brisbane_Benchtops_Explore_${prospect.firstName}_${prospect.lastName}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
    });
  };

  const handleComplete = () => {
    // Must do a single dispatch to avoid stale closure overwriting previous updates
    if (!prospect) return;
    dispatch({
      type: 'UPDATE_PROSPECT',
      payload: {
        ...prospect,
        pipelineStage: PIPELINE_STAGES.EXPLORE_COMPLETED,
        exploreCall: {
          ...prospect.exploreCall,
          status: 'completed',
          completedAt: new Date().toISOString()
        }
      }
    });
  };

  if (!prospect) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-500">Prospect not found.</p>
        <a href="/" className="text-blue-600 hover:underline mt-2 inline-block">Back to Dashboard</a>
      </div>
    );
  }

  const StepComponent = ExploreSteps[currentStep];

  return (
    <WizardLayout
      title="Explore Call Wizard"
      subtitle="Explore Call"
      steps={STEPS}
      currentStep={currentStep}
      onStepClick={handleStepChange}
      onNext={handleNext}
      onPrev={handlePrev}
      canGoNext={canGoNext()}
      discProfile={discProfile}
      showSkepticism={skepticism}
      nepqStage={nepqStage}
      onExport={handleExport}
      exportLabel="Export Excel"
      prospectName={`${prospect.firstName} ${prospect.lastName}`.trim() || 'New Prospect'}
    >
      {/* NEPQ Questions Panel — position varies by step */}
      {![5, 6, 9].includes(currentStep) && (
        <NEPQPanel
          nepqData={nepqData}
          responses={ec}
          onResponseChange={handleNEPQResponse}
        />
      )}

      {StepComponent && (
        <StepComponent
          prospect={prospect}
          data={ec}
          update={update}
          updateBasic={updateBasic}
          discProfile={discProfile}
          onComplete={currentStep === STEPS.length - 1 ? handleComplete : undefined}
        />
      )}

      {[5, 6, 9].includes(currentStep) && (
        <NEPQPanel
          nepqData={nepqData}
          responses={ec}
          onResponseChange={handleNEPQResponse}
        />
      )}
    </WizardLayout>
  );
};

export default ExploreCallWizard;
