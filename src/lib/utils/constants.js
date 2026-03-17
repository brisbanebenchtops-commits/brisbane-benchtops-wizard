export const PIPELINE_STAGES = {
  LEAD: 'lead',
  EXPLORE_SCHEDULED: 'explore-scheduled',
  EXPLORE_COMPLETED: 'explore-completed',
  PROPOSAL_SCHEDULED: 'proposal-scheduled',
  PROPOSAL_COMPLETED: 'proposal-completed',
  WON: 'won',
  LOST: 'lost'
};

export const PIPELINE_LABELS = {
  'lead': 'New Lead',
  'explore-scheduled': 'Explore Scheduled',
  'explore-completed': 'Explore Complete',
  'proposal-scheduled': 'Proposal Scheduled',
  'proposal-completed': 'Proposal Delivered',
  'won': 'Won',
  'lost': 'Lost'
};

export const PIPELINE_COLORS = {
  'lead': 'bg-gray-100 text-gray-700',
  'explore-scheduled': 'bg-blue-100 text-blue-700',
  'explore-completed': 'bg-indigo-100 text-indigo-700',
  'proposal-scheduled': 'bg-yellow-100 text-yellow-700',
  'proposal-completed': 'bg-orange-100 text-orange-700',
  'won': 'bg-green-100 text-green-700',
  'lost': 'bg-red-100 text-red-700'
};

export const DISC_PROFILES = {
  HIGH_D: 'High D (Dominant)',
  HIGH_I: 'High I (Influential)',
  HIGH_C: 'High C (Conscientious)',
  HIGH_S: 'High S (Steady)'
};

export const STONE_BRANDS = ['None', 'Caesarstone', 'YDL', 'Stone Ambassador', 'Royal Victoria Collection', 'Other'];
export const THICKNESS_OPTIONS = ['20mm', '30mm', '40mm', 'Other'];
export const ACCESS_TYPES = ['Lowset', 'Stairs', 'Townhouse', 'Elevator', 'Other'];
export const SINK_TYPES = ['Drop in', 'Undermount', 'Farmer Style', 'Topmount', 'Semirecessed'];
export const COOKTOP_TYPES = ['Drop in', 'Free standing hob'];
export const HOW_FOUND_OPTIONS = ['Facebook', 'Google', 'Business Referral', 'Friend or Family Referral', 'Other'];

export const STORAGE_KEY = 'bb_wizard_prospects';
