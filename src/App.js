import React, { useState } from 'react';

const ChevronRight = () => <span>→</span>;
const ChevronLeft = () => <span>←</span>;
const User = () => <span>👤</span>;
const Phone = () => <span>📞</span>;
const MapPin = () => <span>📍</span>;
const Home = () => <span>🏠</span>;
const Download = () => <span>⬇️</span>;

const CallWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [formData, setFormData] = useState({
    // Precall data
    prospectFirstName: '',
    prospectLastName: '',
    callerName: '',
    prospectSuburb: '',
    room: '',
    confirmationDetails: '',
    benchtopThickness: '',
    stoneBrands: [],
    proposalCallDay1Time: '',
    proposalCallDay2Time: '',
    
    // Call data
    energyLevel: '',
    friendly: '',
    leadTopics: '',
    discProfile: '',
    howFoundUs: '',
    howFoundUsOther: '',
    adAppeal: '',
    nameCorrect: '',
    yearsAtProperty: '',
    address: '',
    homeDescription: '',
    accessType: [],
    accessOther: '',
    deepDiveReason: '',
    jobType: '',
    jobTypeDetails: '',
    boughtBenchTopsBefore: '',
    managedService: '',
    splashbackUpdate: '',
    consider30mm: '',
    visitedShowrooms: '',
    priceRangesExplained: '',
    decisionTimeframe: '',
    additionalStone: '',
    additionalStoneWanted: '',
    familiarBrands: '',
    familiarWithOtherBrands: '',
    alternativeBrands: '',
    colourChoice: '',
    openToAlternatives: '',
    sinkInstallation: '',
    cooktopCutout: '',
    otherPoints: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
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

  const jumpToStep = (stepIndex) => {
    setLastStep(currentStep);
    setCurrentStep(stepIndex);
  };

  const goBackToPrevious = () => {
    setCurrentStep(lastStep);
  };

  const generateExcelReport = () => {
    // Import the XLSX library
    import('xlsx').then((XLSX) => {
      const currentProfile = formData.discProfile || inferDiscProfile();
      const profileData = getDiscAdvice(currentProfile);
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Sheet 1: Call Summary
      const summaryData = [
        ['Brisbane Benchtops - Explore Call Summary'],
        ['Generated:', new Date().toLocaleDateString()],
        [''],
        ['PROSPECT INFORMATION'],
        ['Name:', `${formData.prospectFirstName} ${formData.prospectLastName}`],
        ['Suburb:', formData.prospectSuburb],
        ['Room:', formData.room],
        ['Address:', formData.address],
        ['Years at Property:', formData.yearsAtProperty],
        [''],
        ['CALLER INFORMATION'],
        ['Caller Name:', formData.callerName],
        [''],
        ['PROPOSAL CALL SCHEDULING'],
        ['Option 1:', formData.proposalCallDay1Time],
        ['Option 2:', formData.proposalCallDay2Time],
        [''],
        ['PROJECT DETAILS'],
        ['Benchtop Thickness:', formData.benchtopThickness],
        ['Stone Brands:', formData.stoneBrands.join(', ')],
        ['Job Type:', formData.jobType],
        ['Managed Service:', formData.managedService],
        [''],
        ['DISC PROFILE ANALYSIS'],
        ['Energy Level Match:', formData.energyLevel],
        ['Friendly Response:', formData.friendly],
        ['Led Topics:', formData.leadTopics],
        ['Inferred Profile:', currentProfile],
        [''],
        ['CALL DETAILS'],
        ['How Found Us:', formData.howFoundUs + (formData.howFoundUsOther ? ` (${formData.howFoundUsOther})` : '')],
        ['Ad/Website Appeal:', formData.adAppeal || ''],
        ['Visited Showrooms:', formData.visitedShowrooms],
        ['Decision Timeframe:', formData.decisionTimeframe],
        ['Deep Dive Reason:', formData.deepDiveReason],
        ['Additional Stone Wanted:', formData.additionalStoneWanted],
        ['Additional Stone Notes:', formData.additionalStone],
        ['Colour Preferences:', formData.colourChoice],
        ['Sink Installation:', formData.sinkInstallation],
        ['Cooktop Type:', formData.cooktopCutout],
        ['Other Points:', formData.otherPoints]
      ];
      
      const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, ws1, 'Call Summary');
      
      // Sheet 2: DISC Profile Details
      const discData = [
        ['DISC PROFILE: ' + currentProfile],
        [''],
        ['HOW TO BEHAVE WITH THIS PROSPECT:'],
        ...profileData.advice.map(advice => ['•', advice]),
        [''],
        ['EXPECTED PROSPECT BEHAVIORS:'],
        ...profileData.expectations.map(behavior => ['•', behavior]),
        [''],
        ['ASSESSMENT RESPONSES:'],
        ['Energy Level:', formData.energyLevel],
        ['Friendly:', formData.friendly],
        ['Led Topics:', formData.leadTopics]
      ];
      
      const ws2 = XLSX.utils.aoa_to_sheet(discData);
      XLSX.utils.book_append_sheet(wb, ws2, 'DISC Profile');
      
      // Sheet 3: Access & Property Details
      const propertyData = [
        ['PROPERTY & ACCESS INFORMATION'],
        [''],
        ['Property Address:', formData.address],
        ['Home Description:', formData.homeDescription],
        ['Access Types:', formData.accessType.join(', ')],
        ['Access Details:', formData.accessOther],
        ['Years at Property:', formData.yearsAtProperty],
        [''],
        ['CONFIRMATION DETAILS'],
        ['Pre-call Information:', formData.confirmationDetails]
      ];
      
      const ws3 = XLSX.utils.aoa_to_sheet(propertyData);
      XLSX.utils.book_append_sheet(wb, ws3, 'Property Details');
      
      // Sheet 4: Technical Specifications
      const techData = [
        ['TECHNICAL SPECIFICATIONS'],
        [''],
        ['Thickness Preference:', formData.benchtopThickness],
        ['Splashback Update:', formData.splashbackUpdate],
        ['Consider 30mm:', formData.consider30mm],
        ['Stone Brands Selected:', formData.stoneBrands.join(', ')],
        ['Open to Alternatives:', formData.openToAlternatives],
        ['Familiar with Brands:', formData.familiarBrands],
        [''],
        ['INSTALLATION DETAILS'],
        ['Sink Installation Type:', formData.sinkInstallation],
        ['Cooktop Cutout Type:', formData.cooktopCutout],
        ['Additional Stone Wanted:', formData.additionalStoneWanted],
        ['Additional Stone Notes:', formData.additionalStone]
      ];
      
      const ws4 = XLSX.utils.aoa_to_sheet(techData);
      XLSX.utils.book_append_sheet(wb, ws4, 'Technical Specs');
      
      // Auto-size columns
      [ws1, ws2, ws3, ws4].forEach(ws => {
        const cols = [];
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          let max_width = 10;
          for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell = ws[XLSX.utils.encode_cell({r: R, c: C})];
            if (cell && cell.v) {
              const width = cell.v.toString().length;
              if (width > max_width) max_width = width;
            }
          }
          cols[C] = { width: Math.min(max_width + 2, 50) };
        }
        ws['!cols'] = cols;
      });
      
      // Generate filename
      const fileName = `Brisbane_Benchtops_Call_${formData.prospectFirstName}_${formData.prospectLastName}_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Save file
      XLSX.writeFile(wb, fileName);
    }).catch(err => {
      console.error('Error generating Excel file:', err);
      alert('Error generating Excel file. Please try again.');
    });
  };

  const inferDiscProfile = () => {
    const { energyLevel, friendly, leadTopics } = formData;
    
    if (energyLevel === 'More' || energyLevel === 'Same') {
      if (leadTopics === 'Yes') return 'High D (Dominant)';
      return 'High I (Influential)';
    } else {
      if (friendly === 'Yes') return 'High S (Steady)';
      return 'High C (Conscientious)';
    }
  };

  const getDiscAdvice = (profile) => {
    const profiles = {
      'High D (Dominant)': {
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
        ]
      },
      'High I (Influential)': {
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
        ]
      },
      'High C (Conscientious)': {
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
          'Asking questions about what'
        ]
      },
      'High S (Steady)': {
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
        ]
      }
    };
    return profiles[profile] || { advice: [], expectations: [] };
  };

  // Check for high skepticism/denial
  const checkHighSkepticism = () => {
    let noAnswers = 0;
    if (formData.boughtBenchTopsBefore === 'No') noAnswers++;
    if (formData.visitedShowrooms === 'No') noAnswers++;
    if (formData.familiarWithOtherBrands === 'No') noAnswers++;
    if (formData.openToAlternatives === 'No') noAnswers++;
    return noAnswers >= 3;
  };

  const SkepticismWarning = () => {
    if (!checkHighSkepticism()) return null;
    
    return (
      <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 mb-6">
        <h3 className="text-2xl font-bold text-red-700 text-center">
          ⚠️ Caution: HIGH Skepticism and/or Denial
        </h3>
      </div>
    );
  };

  const DiscProfileBox = () => {
    const currentProfile = formData.discProfile || inferDiscProfile();
    const profileData = getDiscAdvice(currentProfile);
    
    return (
      <div className="flex gap-6 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">Inferred DISC Profile:</label>
            <select 
              value={formData.discProfile || currentProfile}
              onChange={(e) => updateFormData('discProfile', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="High D (Dominant)">High D (Dominant)</option>
              <option value="High I (Influential)">High I (Influential)</option>
              <option value="High C (Conscientious)">High C (Conscientious)</option>
              <option value="High S (Steady)">High S (Steady)</option>
            </select>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2">How to behave:</h4>
              <ul className="text-sm space-y-1">
                {profileData.advice.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-700 mb-2">Expected behaviors:</h4>
              <ul className="text-sm space-y-1">
                {profileData.expectations.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-orange-600 mr-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <SkepticismWarning />
      </div>
    );
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0: // Precall Setup
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Precall Setup</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Prospect First Name
                </label>
                <input
                  type="text"
                  value={formData.prospectFirstName}
                  onChange={(e) => updateFormData('prospectFirstName', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter prospect's first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Prospect Last Name
                </label>
                <input
                  type="text"
                  value={formData.prospectLastName}
                  onChange={(e) => updateFormData('prospectLastName', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter prospect's last name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Caller Name
                </label>
                <input
                  type="text"
                  value={formData.callerName}
                  onChange={(e) => updateFormData('callerName', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter caller's name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Prospect Suburb
                </label>
                <input
                  type="text"
                  value={formData.prospectSuburb}
                  onChange={(e) => updateFormData('prospectSuburb', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter prospect's suburb"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Home className="inline w-4 h-4 mr-1" />
                  Room Where Benchtops are being installed
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => updateFormData('room', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="e.g. Kitchen, Bathroom"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Benchtop Thickness</label>
                <select
                  value={formData.benchtopThickness}
                  onChange={(e) => updateFormData('benchtopThickness', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select thickness</option>
                  <option value="20mm">20mm</option>
                  <option value="30mm">30mm</option>
                  <option value="40mm">40mm</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Stone Brand (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['None', 'Caesarstone', 'YDL', 'Stone Ambassador', 'Royal Victoria Collection', 'Other'].map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.stoneBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('stoneBrands', [...formData.stoneBrands, brand]);
                        } else {
                          updateFormData('stoneBrands', formData.stoneBrands.filter(b => b !== brand));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Proposal Call Times</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Proposal Call Day 1 and Time</label>
                  <input
                    type="text"
                    value={formData.proposalCallDay1Time}
                    onChange={(e) => updateFormData('proposalCallDay1Time', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="In Two days time in the afternoon"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Proposal Call Day 2 and Time</label>
                  <input
                    type="text"
                    value={formData.proposalCallDay2Time}
                    onChange={(e) => updateFormData('proposalCallDay2Time', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="In Three days time in the morning"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Confirmation Details
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Confirmation Details</h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                Information from Airtable to confirm with prospect
              </label>
              <textarea
                value={formData.confirmationDetails}
                onChange={(e) => updateFormData('confirmationDetails', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Enter details provided by prospect in Airtable that need confirmation..."
              />
            </div>
          </div>
        );

      case 2: // Initial Greeting
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Initial Greeting</h2>
            
            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-600 mb-3">
                Make sure to say your introduction with a happy melodic voice. Stand up to do this if possible and don't be afraid of being over the top a bit.
              </p>
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Hi {formData.prospectFirstName || '[PROSPECT FIRST NAME]'} this is {formData.callerName || '[CALLER]'} from Brisbane Benchtops. [PAUSE FOR RESPONSE] How's your day been so far?"
                </p>
              </div>
            </div>
          </div>
        );

      case 3: // DISC Assessment
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">DISC Assessment</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">How did they meet your energy?</label>
                <div className="flex space-x-4">
                  {['Less', 'Same', 'More'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="energyLevel"
                        value={option}
                        checked={formData.energyLevel === option}
                        onChange={(e) => updateFormData('energyLevel', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Were they friendly?</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="friendly"
                        value={option}
                        checked={formData.friendly === option}
                        onChange={(e) => updateFormData('friendly', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Did they lead or bring up new topics?</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="leadTopics"
                        value={option}
                        checked={formData.leadTopics === option}
                        onChange={(e) => updateFormData('leadTopics', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {(formData.energyLevel || formData.friendly || formData.leadTopics) && <DiscProfileBox />}
          </div>
        );

      case 4: // Introduction
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Introduction</h2>
            
            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <p className="text-lg leading-relaxed">
                "Do you mind if I outline the steps of our call? [PAUSE] First, I'll ask some background questions to understand your needs, then review what you've provided, ask some detailed questions, and finally explain the next steps. It is not a sales pitch and will be brief (e.g., 10–15 minutes). The process is thorough to ensure the best outcome, and not to waste your time."
              </p>
            </div>
          </div>
        );

      case 5: // Icebreakers (Part 1)
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Icebreakers (Part 1)</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg mb-4">
                  "Firstly is it alright if I ask how you found us? Was it on Facebook, Google, or has someone referred us?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">How did they find you?</label>
                <select
                  value={formData.howFoundUs}
                  onChange={(e) => updateFormData('howFoundUs', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select option</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                  <option value="Business Referral">Business Referral</option>
                  <option value="Friend or Family Referral">Friend or Family Referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {formData.howFoundUs === 'Facebook' && (
                <div>
                  <div className="bg-white p-4 rounded border-2 border-blue-200">
                    <p className="font-medium text-lg">
                      "Great, and what was it about our Facebook ad that grabbed your attention?"
                    </p>
                  </div>
                  <label className="block text-sm font-medium mb-2 mt-3">Facebook ad appeal:</label>
                  <textarea
                    value={formData.adAppeal}
                    onChange={(e) => updateFormData('adAppeal', e.target.value)}
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="What grabbed their attention about the Facebook ad"
                  />
                </div>
              )}

              {formData.howFoundUs === 'Google' && (
                <div>
                  <div className="bg-white p-4 rounded border-2 border-blue-200">
                    <p className="font-medium text-lg">
                      "Fantastic, and was there anything in particular in our Google ad or website that really spoke to you?"
                    </p>
                  </div>
                  <label className="block text-sm font-medium mb-2 mt-3">Google ad/website appeal:</label>
                  <textarea
                    value={formData.adAppeal}
                    onChange={(e) => updateFormData('adAppeal', e.target.value)}
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="What spoke to them about the Google ad or website"
                  />
                </div>
              )}
              
              {formData.howFoundUs === 'Other' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Please specify:</label>
                  <input
                    type="text"
                    value={formData.howFoundUsOther}
                    onChange={(e) => updateFormData('howFoundUsOther', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Please specify how they found you"
                  />
                </div>
              )}

              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Great thanks for that, and can I just confirm your name is {formData.prospectFirstName} {formData.prospectLastName}?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Name correction (if needed):</label>
                <input
                  type="text"
                  value={formData.nameCorrect}
                  onChange={(e) => updateFormData('nameCorrect', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter correct name if different"
                />
              </div>
            </div>
          </div>
        );

   case 6: // Icebreakers (Part 2)
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Icebreakers (Part 2)</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Great, and just confirming, you are located in {formData.prospectSuburb || '[SUBURB]'}, is that correct? Cool, so how do you like living there, have you been there long?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Years at property:</label>
                <input
                  type="text"
                  value={formData.yearsAtProperty}
                  onChange={(e) => updateFormData('yearsAtProperty', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter number of years"
                />
              </div>

              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "So can tell me a bit about the property, in fact do you mind if I grab the address so I can pull it up on Google/realestate.com.au? It's just going to help me get a feel for your home, like its age and outlook."
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Property Address:</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter full property address"
                />
              </div>

              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Oh, so your home's the one that is [X]. That's a nice [Y] (Queenslander etc). Would you describe it as your forever home, a rental, what's the story?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Home description/story:</label>
                <textarea
                  value={formData.homeDescription}
                  onChange={(e) => updateFormData('homeDescription', e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                  placeholder="Enter home description and living situation"
                />
              </div>
            </div>
          </div>
        );

      case 7: // Access
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Access</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "What can you tell me about access, is it walk in off the street/ any stairs/ steep driveway etc?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Access Type (Select all that apply):</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Lowset', 'Stairs', 'Townhouse', 'Elevator', 'Other'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.accessType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData('accessType', [...formData.accessType, type]);
                          } else {
                            updateFormData('accessType', formData.accessType.filter(t => t !== type));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {(formData.accessType.includes('Stairs') || formData.accessType.includes('Other')) && (
                <div>
                  <label className="block text-sm font-medium mb-2">Access Details:</label>
                  <textarea
                    value={formData.accessOther}
                    onChange={(e) => updateFormData('accessOther', e.target.value)}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Provide details about stairs or other access considerations"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 8: // Information Confirmation
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Information Confirmation</h2>
            
            <div className="bg-white p-6 rounded border-2 border-blue-200">
              <p className="font-medium text-lg mb-4">
                "Right and just to confirm some of the details that you have already provided you are wanting..."
              </p>
              
              <div className="bg-gray-50 p-4 rounded mt-4">
                <h4 className="font-medium mb-2">Details to confirm:</h4>
                <div className="space-y-2">
                  <p><strong>Room:</strong> {formData.room || '[Room details]'}</p>
                  <p><strong>Thickness:</strong> {formData.benchtopThickness || '[Thickness]'}</p>
                  <p><strong>Stone Brands:</strong> {formData.stoneBrands.join(', ') || '[Stone brand preferences]'}</p>
                  {formData.confirmationDetails && (
                    <div>
                      <strong>Additional Details:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{formData.confirmationDetails}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="font-medium text-lg mt-4">
                "... Great, thanks for that!"
              </p>
            </div>
          </div>
        );

      case 9: // Deep Dive (Reason)
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Deep Dive (Reason)</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "So, what I like to do is get a little bit of a picture in my own mind of what you're trying to achieve so I know best how to achieve that outcome for you, and also, the reason for your new benchtop. For example - are you sick of the old one, your renovating to sell soon, or is this a new kitchen?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Reason for new benchtop:</label>
                <textarea
                  value={formData.deepDiveReason}
                  onChange={(e) => updateFormData('deepDiveReason', e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                  placeholder="Enter their reason for wanting new benchtops"
                />
              </div>
            </div>
          </div>
        );

      case 10: // Job Type
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Job Type</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "By the way, in case you weren't aware, Brisbane Benchtops is a fully licensed and insured building company. You can get us to do everything from full kitchens, bathrooms and robe fitouts to stone benchtops only. So were you wanting us to quote the benchtops only or would you like us to quote the full {formData.room || '[kitchen/bathroom/etc]'}?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Job Type:</label>
                <div className="flex space-x-4">
                  {['Benchtops Only', 'Whole Job'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="jobType"
                        value={option}
                        checked={formData.jobType === option}
                        onChange={(e) => updateFormData('jobType', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.jobType === 'Whole Job' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Job Details:</label>
                  <textarea
                    value={formData.jobTypeDetails}
                    onChange={(e) => updateFormData('jobTypeDetails', e.target.value)}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Enter details about the whole job requirements"
                  />
                </div>
              )}

              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "And have you ever bought stone benchtops before? Have you been through the process of deciding on a stone benchtop and how many decisions you have to make?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Ever bought stone benchtops before?</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="boughtBenchTopsBefore"
                        value={option}
                        checked={formData.boughtBenchTopsBefore === option}
                        onChange={(e) => updateFormData('boughtBenchTopsBefore', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 11: // Managed Service
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Managed Service</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "In case you didn't know, nearly all the benchtop suppliers you talk to won't do the benchtop removal and cannot organise trades for you, and that means you're likely to be without a functioning kitchen from anywhere from 10-18 days. [PAUSE] Would you like us to quote a fully managed service for you, so you're only without your kitchen for 5 days or are you just looking for a price for the benchtops? [PAUSE]"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Service Type:</label>
                <div className="flex space-x-4">
                  {['Benchtops Only', 'Whole Job', 'Unsure'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="managedService"
                        value={option}
                        checked={formData.managedService === option}
                        onChange={(e) => updateFormData('managedService', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.managedService === 'Unsure' && (
                <div className="bg-white p-4 rounded border-2 border-blue-200">
                  <p className="font-medium text-lg">
                    "You could always let me know later if you like. And have you ever bought stone benchtops before? Have you been through the process of deciding on a stone benchtop and how many decisions you have to make?"
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 12: // Thickness & Splashback
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Thickness & Splashback</h2>
            
            {(formData.benchtopThickness === '20mm' || formData.benchtopThickness === '40mm') && (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded border-2 border-blue-200">
                  <p className="font-medium text-lg">
                    "So I notice that you are looking at {formData.benchtopThickness} stone options. Can I ask, are you updating the splashback as well?"
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    If you need to you can elaborate on the issue with leaving a gap between the benchtop and splashback (20mm), or having to sit the benchtop in front of the existing splashback creating a larger gap at the edge. This is an opportunity to discuss 30mm.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Updating splashback?</label>
                  <div className="flex space-x-4">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="splashbackUpdate"
                          value={option}
                          checked={formData.splashbackUpdate === option}
                          onChange={(e) => updateFormData('splashbackUpdate', e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded border-2 border-blue-200">
                  <p className="font-medium text-lg">
                    "I can see from your photos it looks like a 30mm top, and it looks like you'll be keeping the splashback—does that sound right?"
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Consider 30mm?</label>
                  <div className="flex space-x-4">
                    {['Yes', 'No', 'Unsure'].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="consider30mm"
                          value={option}
                          checked={formData.consider30mm === option}
                          onChange={(e) => updateFormData('consider30mm', e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 13: // Pricing & Timing
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Pricing & Timing</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Thanks, where are you up to with getting your new benchtops underway, have you gone to any of the suppliers' showrooms?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Visited showrooms?</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="visitedShowrooms"
                        value={option}
                        checked={formData.visitedShowrooms === option}
                        onChange={(e) => updateFormData('visitedShowrooms', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.visitedShowrooms === 'Yes' && (
                <div>
                  <div className="bg-white p-4 rounded border-2 border-blue-200">
                    <p className="font-medium text-lg">
                      "Great, did they explain how the price ranges work?"
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Did they explain price ranges?</label>
                    <div className="flex space-x-4">
                      {['Yes', 'No'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="priceRangesExplained"
                            value={option}
                            checked={formData.priceRangesExplained === option}
                            onChange={(e) => updateFormData('priceRangesExplained', e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.visitedShowrooms === 'No' && (
                <div className="bg-white p-4 rounded border-2 border-blue-200">
                  <p className="font-medium text-lg">
                    "Ok, so you as you've already found by filling in the web form, there's a lot in the process of getting a benchtop. It's like buying a car, you're not making one decision you're making dozens. But that's what we're here for, to help you. [PAUSE FOR RESPONSE] Just so as you know, stone is generally priced in 5 different price ranges, but we can talk about that a bit later."
                  </p>
                </div>
              )}

              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "When are you thinking of making the decision to go ahead with your the benchtop? Are you thinking weeks or months?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Decision timeframe:</label>
                <input
                  type="text"
                  value={formData.decisionTimeframe}
                  onChange={(e) => updateFormData('decisionTimeframe', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter their decision timeframe"
                />
              </div>
              
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Just so you're aware, we usually book out up to Christmas by mid-November, so planning ahead is key if that's your goal."
                </p>
              </div>
            </div>
          </div>
        );

      case 14: // Additional Stone
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Additional Stone</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Now, how stone works is you pay for a slab, and sometimes there's a bit left over that you may be able to use. Is there anywhere else in your home where you think you might want a piece of stone, even say, a coffee table, bedside table or sideboard?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Want additional stone items?</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="additionalStoneWanted"
                        value={option}
                        checked={formData.additionalStoneWanted === option}
                        onChange={(e) => updateFormData('additionalStoneWanted', e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.additionalStoneWanted === 'Yes' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Additional stone details:</label>
                  <textarea
                    value={formData.additionalStone}
                    onChange={(e) => updateFormData('additionalStone', e.target.value)}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Enter details about what additional stone items they want"
                  />
                </div>
              )}
              
              {formData.additionalStoneWanted === 'No' && (
                <div className="bg-white p-4 rounded border-2 border-blue-200">
                  <p className="font-medium text-lg">
                    "That's OK, its Your stone right, so you may as well use it. If you do happen to think of something just let me know the next time we talk, because we can make it for you"
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 15: // Stone Brands
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Stone Brands</h2>
            
            <div className="space-y-6">
              {formData.stoneBrands.includes('None') ? (
                <div>
                  <div className="bg-white p-4 rounded border-2 border-blue-200">
                    <p className="font-medium text-lg">
                      "Are you familiar with the different brands of stone in market?"
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Familiar with brands?</label>
                    <div className="flex space-x-4">
                      {['Yes', 'No'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="familiarBrands"
                            value={option}
                            checked={formData.familiarBrands === option}
                            onChange={(e) => updateFormData('familiarBrands', e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.familiarBrands === 'No' && (
                    <div className="bg-white p-4 rounded border-2 border-blue-200">
                      <p className="font-medium text-lg">
                        "If you weren't aware there are lots of choices in pattern and colour for you to choose from, have you landed on a particular colour or look that you wanted for your new benchtops? For instance were you thinking a single light or dark colour, a fleck or perhaps a veined look?"
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="bg-white p-4 rounded border-2 border-blue-200">
                    <p className="font-medium text-lg">
                      "I see that you have nominated {formData.stoneBrands.filter(b => b !== 'Other').join(', ')}, are you familiar with any other brands?"
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Familiar with other brands?</label>
                    <div className="flex space-x-4">
                      {['Yes', 'No'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="familiarWithOtherBrands"
                            value={option}
                            checked={formData.familiarWithOtherBrands === option}
                            onChange={(e) => updateFormData('familiarWithOtherBrands', e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border-2 border-blue-200">
                    <p className="font-medium text-lg">
                      "Yeah, that is a great looking stone, that choice. Are you also open to looking at similar stones from alternative brands that may be more cost effective?"
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Open to alternatives?</label>
                    <div className="flex space-x-4">
                      {['Yes', 'No'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="openToAlternatives"
                            value={option}
                            checked={formData.openToAlternatives === option}
                            onChange={(e) => updateFormData('openToAlternatives', e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.openToAlternatives === 'No' && (
                    <div className="bg-white p-4 rounded border-2 border-blue-200">
                      <p className="font-medium text-lg">
                        "Ok so, you are set on [COLOUR] by [BRAND]. Yeah, that is a great looking stone, that choice."
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Colour choice details:</label>
                <textarea
                  value={formData.colourChoice}
                  onChange={(e) => updateFormData('colourChoice', e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                  placeholder='If prospect is a "D" or unsure on brands, colours and patterns, consider prompting about price and livability'
                />
              </div>
            </div>
          </div>
        );

      case 16: // Sink & Cooktop
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Sink & Cooktop</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "OK, so, what type of sink installation did you want to get? Do the words drop in or undermount mean anything to you?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sink Installation Type:</label>
                <select
                  value={formData.sinkInstallation}
                  onChange={(e) => updateFormData('sinkInstallation', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select installation type</option>
                  <option value="Drop in">Drop in</option>
                  <option value="Undermount">Undermount</option>
                  <option value="Farmer Style">Farmer Style</option>
                  <option value="Topmount">Topmount</option>
                  <option value="Semirecessed">Semirecessed</option>
                </select>
              </div>

              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Are we just doing a standard cutout for the cooktop?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cooktop Type:</label>
                <select
                  value={formData.cooktopCutout}
                  onChange={(e) => updateFormData('cooktopCutout', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select cooktop type</option>
                  <option value="Drop in">Drop in</option>
                  <option value="Free standing hob">Free standing hob</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 17: // Final Points
        return (
          <div className="space-y-6">
            <DiscProfileBox />
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Final Points</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <p className="font-medium text-lg">
                  "Are there any other points that you think we haven't covered and still need to?"
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Other points:</label>
                <textarea
                  value={formData.otherPoints}
                  onChange={(e) => updateFormData('otherPoints', e.target.value)}
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Enter any additional points or requirements"
                />
              </div>

              <div className="bg-white p-6 rounded border-2 border-blue-200">
                <div className="space-y-4">
                  <p className="font-medium text-lg">
                    "So now you'll be pleased to know, we're at the last step for today. [PAUSE] Based on your choices so far you have [MIN] to [MAX MUST BE REALISTIC] options and ideally we want to get that down to two only. That'll be my focus over the next day or two, to narrow it down and to work out prices by talking to the suppliers that suit your job and choices so far."
                  </p>
                  <p className="font-medium text-lg">
                    "Then, what I do is what we call a Proposal call, and that's to propose the two options and explain my recommendations why."
                  </p>
                  <p className="font-medium text-lg">
                    "From there you still need to look at stone to make a final decision on colour, style and range, but with that said could we talk on say {formData.proposalCallDay1Time || '[PROPOSAL DAY & TIME 1]'}, or {formData.proposalCallDay2Time || '[PROPOSAL DAY & TIME 2]'}?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  const canGoNext = () => {
    switch(currentStep) {
      case 0:
        return formData.prospectFirstName && formData.prospectLastName && formData.callerName && formData.prospectSuburb;
      case 3:
        return formData.energyLevel && formData.friendly && formData.leadTopics;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canGoNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Brisbane Benchtops</h1>
        <p className="text-xl">Explore Call Wizard</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-2 font-medium">{steps[currentStep].name}</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border rounded-lg mb-6 overflow-x-auto">
        <div className="flex border-b min-w-max">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => jumpToStep(index)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                currentStep === index
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {step.name}
            </button>
          ))}
        </div>
        
        {lastStep !== currentStep && (
          <div className="p-3 bg-yellow-50 border-t">
            <button
              onClick={goBackToPrevious}
              className="text-sm text-yellow-800 hover:text-yellow-900 font-medium"
            >
              ← Return to {steps[lastStep].name}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6 min-h-96">
        {renderStep()}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-medium ${
            currentStep === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={generateExcelReport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            title="Download call data as Excel file"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </button>
          
          <div className="text-sm text-gray-600">
            {currentStep + 1} / {steps.length}
          </div>
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1 || !canGoNext()}
          className={`flex items-center px-6 py-3 rounded-lg font-medium ${
            currentStep === steps.length - 1 || !canGoNext()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {currentStep === steps.length - 1 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-2">Call Complete!</h3>
          <p className="text-green-700">
            You have successfully completed the Explore Call. All information has been captured and you can now proceed with creating the proposal for {formData.prospectFirstName} {formData.prospectLastName}.
          </p>
        </div>
      )}
    </div>
  );
};

export default CallWizard;
