export const inferDiscProfile = (energyLevel, friendly, leadTopics) => {
  if (!energyLevel || !friendly || !leadTopics) return null;
  if (energyLevel === 'More' || energyLevel === 'Same') {
    if (leadTopics === 'Yes') return 'High D (Dominant)';
    return 'High I (Influential)';
  } else {
    if (friendly === 'Yes') return 'High S (Steady)';
    return 'High C (Conscientious)';
  }
};

export const DISC_DATA = {
  'High D (Dominant)': {
    short: 'D',
    color: 'red',
    tagColor: 'bg-red-100 text-red-700 border-red-200',
    panelColor: 'border-red-300 bg-red-50',
    advice: [
      'Be direct and to the point',
      'Focus on results and productivity',
      'Show confidence and authority',
      'Avoid unnecessary small talk',
      'Provide facts and logical reasons',
      'Give them control and respect'
    ],
    expectations: [
      'Take control of conversation',
      'Direct & blunt',
      'Raising voice',
      '"I want to know", "what I want"',
      'Cut you off mid-sentence'
    ],
    proposalAdvice: [
      'Get to the numbers quickly — they want bottom line',
      'Emphasise speed and efficiency of your process',
      'Frame guarantees as results-based commitments',
      'Don\'t over-explain — let them ask if they want detail',
      'Present both options crisply with clear differentiation',
      'Let them feel like they\'re making the decision'
    ],
    objectionHandling: {
      price: 'Acknowledge directly: "I understand price matters. Here\'s what you get for that investment..." Focus on ROI and time saved.',
      delay: 'Be direct: "What specifically do you need to make this decision?" Remove barriers.',
      competitor: 'Challenge respectfully: "What specifically did their quote include? Let me show you how to compare properly."'
    }
  },
  'High I (Influential)': {
    short: 'I',
    color: 'yellow',
    tagColor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    panelColor: 'border-yellow-300 bg-yellow-50',
    advice: [
      'Be friendly, enthusiastic, and personable',
      'Let them do most of the talking',
      'Focus on fun and excitement',
      'Show a genuine interest in them',
      'Share stories and make conversations lively',
      'Be spontaneous and sincere in advice'
    ],
    expectations: [
      'Doing a lot of talking',
      'Offer own point of view',
      'Interject in conversation',
      'Lots of questions'
    ],
    proposalAdvice: [
      'Build excitement about the transformation of their kitchen',
      'Use stories — "Another client in your area loved how..."',
      'Let them talk through their vision — they\'ll sell themselves',
      'Make the guarantees feel personal and caring',
      'Paint a picture of the end result with each option',
      'Keep energy high — match their enthusiasm'
    ],
    objectionHandling: {
      price: 'Connect emotionally: "Imagine waking up every morning to your new kitchen... that feeling is what you\'re investing in."',
      delay: 'Create excitement: "I totally get wanting to think it over! Most of our clients felt the same, and they were so glad they went ahead."',
      competitor: 'Social proof: "I love that you\'re doing your research! Here\'s what our customers tell us sets us apart..."'
    }
  },
  'High C (Conscientious)': {
    short: 'C',
    color: 'blue',
    tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    panelColor: 'border-blue-300 bg-blue-50',
    advice: [
      'Provide lots of detailed information',
      'Be prepared for lots of questions',
      'Stay logical and fact-driven',
      'Avoid emotional or exaggerated pitches',
      'Respect their need for careful decision-making',
      'Be clear and precise in your communication'
    ],
    expectations: [
      'Will speak up if disagree',
      'Asking questions about what and why'
    ],
    proposalAdvice: [
      'Walk through the proposal document in detail',
      'Point out specifics — measurements, materials, brands',
      'Explain the logic behind your two recommendations',
      'Give them the full breakdown of what\'s included vs not',
      'Reference the written guarantees they can verify',
      'Don\'t rush — let them read and absorb each section'
    ],
    objectionHandling: {
      price: 'Provide data: "Let me break down exactly what\'s in each line item so you can compare like-for-like with any other quote."',
      delay: 'Respect the process: "Absolutely, take the time you need. Would it help if I emailed you a comparison checklist?"',
      competitor: 'Offer analysis: "I\'d love to help you compare. Do you have their quote handy? Let\'s look at what\'s written vs assumed."'
    }
  },
  'High S (Steady)': {
    short: 'S',
    color: 'green',
    tagColor: 'bg-green-100 text-green-700 border-green-200',
    panelColor: 'border-green-300 bg-green-50',
    advice: [
      'Be patient and avoid pressure',
      'Build rapport with a friendly approach',
      'Provide details and give them time',
      'Use eye contact and gentle listening',
      'Be firm but non-pushy in closing',
      'Allow them to confirm their decisions'
    ],
    expectations: [
      'Good listener',
      'Few opinions',
      'Few Questions'
    ],
    proposalAdvice: [
      'Reassure them throughout — "there\'s no pressure today"',
      'Emphasise the peace of mind guarantees heavily',
      'Frame your service as taking the stress off their plate',
      'Check in often: "How are you feeling about all this?"',
      'Don\'t push for a decision — plant seeds for acceptance',
      'Highlight that you\'ll be their one point of contact'
    ],
    objectionHandling: {
      price: 'Reassure: "I completely understand. The peace of mind and our guarantees mean you won\'t have any surprises. That\'s real value."',
      delay: 'Support: "Of course, take whatever time you need. I\'m here whenever you\'re ready — no pressure at all."',
      competitor: 'Gentle guidance: "That\'s smart to look around. When you do, just make sure you feel as comfortable with them as you do with us."'
    }
  }
};

export const getDiscData = (profile) => {
  return DISC_DATA[profile] || DISC_DATA['High I (Influential)'];
};

export const checkHighSkepticism = (formData) => {
  let noAnswers = 0;
  if (formData.boughtBenchTopsBefore === 'No') noAnswers++;
  if (formData.visitedShowrooms === 'No') noAnswers++;
  if (formData.familiarWithOtherBrands === 'No') noAnswers++;
  if (formData.openToAlternatives === 'No') noAnswers++;
  return noAnswers >= 3;
};
