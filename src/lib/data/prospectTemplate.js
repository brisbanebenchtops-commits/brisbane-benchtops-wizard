import { generateId } from '../utils/id';
import { PIPELINE_STAGES } from '../utils/constants';

export const createNewProspect = (overrides = {}) => ({
  id: generateId(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  firstName: '',
  lastName: '',
  suburb: '',
  address: '',
  email: '',
  phone: '',
  pipelineStage: PIPELINE_STAGES.LEAD,
  assignedTo: '',

  // Explore Call data
  exploreCall: {
    status: 'pending',
    completedAt: null,
    callerName: '',
    currentStep: 0,
    // Precall
    room: '',
    confirmationDetails: '',
    benchtopThickness: '',
    stoneBrands: [],
    proposalCallDay1Time: '',
    proposalCallDay2Time: '',
    // DISC
    energyLevel: '',
    friendly: '',
    leadTopics: '',
    discProfile: '',
    // Icebreakers
    howFoundUs: '',
    howFoundUsOther: '',
    adAppeal: '',
    nameCorrect: '',
    yearsAtProperty: '',
    homeDescription: '',
    // Access
    accessType: [],
    accessOther: '',
    // Deep dive
    deepDiveReason: '',
    jobType: '',
    jobTypeDetails: '',
    boughtBenchTopsBefore: '',
    // Managed service
    managedService: '',
    // Thickness
    splashbackUpdate: '',
    consider30mm: '',
    // Pricing
    visitedShowrooms: '',
    priceRangesExplained: '',
    decisionTimeframe: '',
    // Stone
    additionalStone: '',
    additionalStoneWanted: '',
    familiarBrands: '',
    familiarWithOtherBrands: '',
    alternativeBrands: '',
    colourChoice: '',
    openToAlternatives: '',
    // Sink & cooktop
    sinkInstallation: '',
    cooktopCutout: '',
    // Final
    otherPoints: '',
    notes: '',
    // NEPQ Response Capture (Explore Call)
    nepq_triggerTiming: '',
    nepq_kitchenVision: '',
    nepq_thinkingDuration: '',
    nepq_biggestFrustration: '',
    nepq_howLongBothered: '',
    nepq_dailyImpact: '',
    nepq_triedBefore: '',
    nepq_whatStopped: '',
    nepq_idealOutcome: '',
    nepq_selectionCriteria: '',
    nepq_longDowntimeImpact: '',
    nepq_hiddenCosts: '',
    nepq_othersBadExperience: '',
    nepq_splashbackAwareness: '',
    nepq_delayConsequence: '',
    nepq_decisionStyle: '',
    nepq_stoneAppeal: '',
    nepq_transitionSummary: '',
    nepq_anythingElse: ''
  },

  // Proposal Call data
  proposalCall: {
    status: 'pending',
    completedAt: null,
    callerName: '',
    currentStep: 0,
    proposalUrl: '',
    // Opening
    canSeeProposal: '',
    newThoughts: '',
    // Surplus stone followup
    surplusStoneIdeas: '',
    // Guarantees
    guarantee1Response: '',
    guarantee2Response: '',
    guarantee3Response: '',
    guarantee4Response: '',
    guarantee5Response: '',
    guaranteesValueResponse: '',
    guaranteesQuestions: '',
    // Competitor
    hasOtherQuotes: '',
    competitorQuoteComprehensive: '',
    competitorSubjectToClauses: '',
    competitorAccessDiscussed: '',
    competitorKitchenDowntime: '',
    competitorRemovalIncluded: '',
    competitorTradeSequence: '',
    competitorNotes: '',
    // Questions for them to ask competitors
    questionsForCompetitors: '',
    // Added bonuses
    bonus1Response: '',
    bonus2Response: '',
    bonus3Response: '',
    bonus4Response: '',
    bonus5Response: '',
    bonus6Response: '',
    bonus7Response: '',
    bonusQuestions: '',
    // Options
    option1Stone: '',
    option1Price: '',
    option1Includes: '',
    option2Stone: '',
    option2Price: '',
    option2Includes: '',
    selectedOption: '',
    optionResponse: '',
    // Close
    acceptanceStatus: '',
    nextSteps: '',
    // Outcome
    outcome: '',
    followUpDate: '',
    followUpNotes: '',
    callNotes: '',
    // NEPQ Response Capture (Proposal Call)
    nepq_reconnectPain: '',
    nepq_newThoughtsSinceLast: '',
    nepq_cheapRegret: '',
    nepq_priceVsQuality: '',
    nepq_tradieNoShow: '',
    nepq_workTookLonger: '',
    nepq_noUpdates: '',
    nepq_hiddenCharges: '',
    nepq_guaranteesMicroCommit: '',
    nepq_competitorUnderstanding: '',
    nepq_confidenceFactor: '',
    nepq_competitorWarranty: '',
    nepq_competitorRiskFeeling: '',
    nepq_kitchenDowntimeImpact: '',
    nepq_selfRemoval: '',
    nepq_speedImportance: '',
    nepq_singleWarranty: '',
    nepq_cleanupMess: '',
    nepq_valueConfirmation: '',
    nepq_optionFit: '',
    nepq_readinessScale: '',
    nepq_whatToMoveForward: '',
    nepq_anyPause: ''
  },

  ...overrides
});
