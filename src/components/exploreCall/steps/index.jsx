import React from 'react';
import { TextField, TextArea, SelectField, RadioGroup, CheckboxGroup, ScriptBlock, CoachingTip, SectionDivider } from '../../common/FormFields';
import { STONE_BRANDS, THICKNESS_OPTIONS, ACCESS_TYPES, SINK_TYPES, COOKTOP_TYPES, HOW_FOUND_OPTIONS, SEASONAL_TIMING_OPTIONS } from '../../../lib/utils/constants';

// ─── Hot / Warm / Cold Response Rating ───────────────────────────────────────
// Appears after each question to rate how the prospect responded
const HWCRating = ({ field, value, onChange }) => (
  <div className="flex items-center gap-2 mt-2 mb-1">
    <span className="text-xs text-gray-400 font-medium">Rate:</span>
    {[
      { val: 'hot',  label: '🔥 Hot',   active: 'bg-red-100 text-red-700 border-red-400 ring-1 ring-red-300' },
      { val: 'warm', label: '🌤 Warm',  active: 'bg-amber-100 text-amber-700 border-amber-400 ring-1 ring-amber-300' },
      { val: 'cold', label: '❄️ Cold',  active: 'bg-blue-100 text-blue-700 border-blue-400 ring-1 ring-blue-300' },
    ].map(({ val, label, active }) => (
      <button
        key={val}
        type="button"
        onClick={() => onChange(`${field}_hwc`, value === val ? '' : val)}
        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
          value === val
            ? active
            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

// ─── Step 0: Precall Setup ────────────────────────────────────────────────────
const PrecallSetup = ({ prospect, data, update, updateBasic }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Precall Setup</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <TextField label="Prospect First Name" icon="👤" value={prospect.firstName} onChange={(v) => updateBasic('firstName', v)} placeholder="Enter prospect's first name" />
      <TextField label="Prospect Last Name" icon="👤" value={prospect.lastName} onChange={(v) => updateBasic('lastName', v)} placeholder="Enter prospect's last name" />
      <TextField label="Caller Name" icon="📞" value={data.callerName} onChange={(v) => update('callerName', v)} placeholder="Enter caller's name" />
      <TextField label="Prospect Suburb" icon="📍" value={prospect.suburb} onChange={(v) => updateBasic('suburb', v)} placeholder="Enter prospect's suburb" />
      <TextField label="Room" icon="🏠" value={data.room} onChange={(v) => update('room', v)} placeholder="e.g. Kitchen, Bathroom" />
      <SelectField label="Benchtop Thickness" value={data.benchtopThickness} onChange={(v) => update('benchtopThickness', v)} options={THICKNESS_OPTIONS} placeholder="Select thickness" />
    </div>
    <CheckboxGroup label="Stone Brand (Select all that apply)" values={data.stoneBrands} onChange={(v) => update('stoneBrands', v)} options={STONE_BRANDS} />

    <SectionDivider title="Benchtop Type" />
    <RadioGroup label="Replacing existing or new benchtops?" name="benchtopType" value={data.benchtopType} onChange={(v) => update('benchtopType', v)} options={['Replacing existing benchtops', 'New benchtops']} />
    {data.benchtopType === 'Replacing existing benchtops' && (
      <RadioGroup label="Existing benchtop thickness:" name="existingBenchtopThickness" value={data.existingBenchtopThickness} onChange={(v) => update('existingBenchtopThickness', v)} options={['20mm', '30-38mm', '40mm', 'Other']} />
    )}
    {data.benchtopType === 'Replacing existing benchtops' && data.existingBenchtopThickness === 'Other' && (
      <TextField label="Specify existing thickness:" value={data.existingBenchtopThicknessOther} onChange={(v) => update('existingBenchtopThicknessOther', v)} placeholder="e.g. 50mm, unsure" />
    )}

    <SectionDivider title="Estimator & Timing" />
    <RadioGroup label="Did the prospect use our benchtop estimator?" name="usedEstimator" value={data.usedEstimator} onChange={(v) => update('usedEstimator', v)} options={['Yes', 'No']} />
    <RadioGroup label="Key time of year (for urgency messaging)" name="seasonalTiming" value={data.seasonalTiming} onChange={(v) => update('seasonalTiming', v)} options={SEASONAL_TIMING_OPTIONS} />

    <SectionDivider title="Proposal Call Times" />
    <div className="grid md:grid-cols-2 gap-4">
      <TextField label="Proposal Call Day 1 and Time" value={data.proposalCallDay1Time} onChange={(v) => update('proposalCallDay1Time', v)} placeholder="In Two days time in the afternoon" />
      <TextField label="Proposal Call Day 2 and Time" value={data.proposalCallDay2Time} onChange={(v) => update('proposalCallDay2Time', v)} placeholder="In Three days time in the morning" />
    </div>
  </div>
);

// ─── Step 1: Confirmation Details ────────────────────────────────────────────
const ConfirmationDetails = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Confirmation Details</h2>
    <TextArea label="Information from Airtable to confirm with prospect" value={data.confirmationDetails} onChange={(v) => update('confirmationDetails', v)} placeholder="Enter details provided by prospect in Airtable that need confirmation..." rows={5} />
  </div>
);

// ─── Step 2: Initial Greeting ─────────────────────────────────────────────────
const InitialGreeting = ({ prospect, data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Initial Greeting</h2>
    <CoachingTip type="info">
      Make sure to say your introduction with a happy melodic voice. Stand up to do this if possible and don't be afraid of being over the top a bit.
    </CoachingTip>
    <ScriptBlock>
      "Hi {prospect.firstName || '[PROSPECT FIRST NAME]'} this is {data.callerName || '[CALLER]'} from Brisbane Benchtops. [PAUSE FOR RESPONSE] How's your day been so far?"
    </ScriptBlock>
    <HWCRating field="greeting" value={data.greeting_hwc} onChange={update} />
  </div>
);

// ─── Step 3: DISC Assessment ──────────────────────────────────────────────────
const DISCAssessment = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">DISC Assessment</h2>
    <RadioGroup label="How did they meet your energy?" name="energyLevel" value={data.energyLevel} onChange={(v) => update('energyLevel', v)} options={['Less', 'Same', 'More']} />
    <RadioGroup label="Were they friendly?" name="friendly" value={data.friendly} onChange={(v) => update('friendly', v)} options={['Yes', 'No']} />
    <RadioGroup label="Did they lead or bring up new topics?" name="leadTopics" value={data.leadTopics} onChange={(v) => update('leadTopics', v)} options={['Yes', 'No']} />
    <HWCRating field="discVibe" value={data.discVibe_hwc} onChange={update} />
  </div>
);

// ─── Step 4: Introduction ─────────────────────────────────────────────────────
const Introduction = ({ data }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Introduction</h2>
    <ScriptBlock>
      "Do you mind if I outline the steps of our call? [PAUSE] First, I'll ask some background questions to understand your needs, then review what you've provided, ask lots of detailed questions, and finally explain the next steps. It is not a sales pitch and will be brief (e.g., 10-15 minutes) but that is really driven by you and how much information you want to share. The process is thorough to ensure the best outcome, and not to waste your time."
    </ScriptBlock>
    <ScriptBlock>
      "Also, just so you know, if I go quiet at any point it's just because I'm taking down lots of notes — I want to make sure I capture everything properly."
    </ScriptBlock>
  </div>
);

// ─── Step 5: Icebreakers Part 1 ───────────────────────────────────────────────
const Icebreakers1 = ({ prospect, data, update }) => {
  const howFound = data.howFoundUs;
  const spokeToYouScript = (() => {
    switch (howFound) {
      case 'Facebook':               return '"Great, and tell me, what spoke to you on our Facebook page?"';
      case 'Google':                 return '"Great, and tell me, what spoke to you on our website?"';
      case 'Business Referral':      return '"Great, and tell me, what was it about the referral that made you reach out to us?"';
      case 'Friend or Family Referral': return '"Great, and tell me, what did they say about us that made you get in touch?"';
      default:                       return '"Great, and tell me, what spoke to you about Brisbane Benchtops?"';
    }
  })();

  const estimatorScript = data.usedEstimator === 'Yes'
    ? '"And can I ask, how did you find using our estimator? It\'s pretty new, so we\'re gathering feedback on it at the moment."'
    : '"Did you try out our benchtop estimator on the website?"';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Icebreakers (Part 1)</h2>
      <ScriptBlock>
        "Firstly is it alright if I ask how you found us? Was it on Facebook, Google, or has someone referred us?"
      </ScriptBlock>
      <SelectField label="How did they find you?" value={data.howFoundUs} onChange={(v) => update('howFoundUs', v)} options={HOW_FOUND_OPTIONS} placeholder="Select option" />

      {howFound === 'Other' && (
        <TextField label="Please specify:" value={data.howFoundUsOther} onChange={(v) => update('howFoundUsOther', v)} placeholder="Please specify how they found you" />
      )}

      {howFound && (
        <>
          <ScriptBlock>{spokeToYouScript}</ScriptBlock>
          <TextArea label="What spoke to them:" value={data.adAppeal} onChange={(v) => update('adAppeal', v)} placeholder="What grabbed their attention / spoke to them" rows={2} />
          <HWCRating field="adAppeal" value={data.adAppeal_hwc} onChange={update} />
        </>
      )}

      <ScriptBlock>{estimatorScript}</ScriptBlock>
      {data.usedEstimator === 'Yes' && (
        <>
          <TextArea label="Estimator feedback:" value={data.estimatorFeedback} onChange={(v) => update('estimatorFeedback', v)} placeholder="How did they find using the estimator?" rows={2} />
          <HWCRating field="estimatorFeedback" value={data.estimatorFeedback_hwc} onChange={update} />
        </>
      )}
      {data.usedEstimator === 'No' && (
        <CoachingTip type="info">No worries if they haven't — just move on. You can mention it's available if they're interested.</CoachingTip>
      )}

      {/* ── NEW: Showroom Preference Research Question ── */}
      <SectionDivider title="New Showroom Preference" />
      <ScriptBlock>
        "We are thinking about opening a new showroom. We are thinking about either a traditional bricks and mortar location vs a mobile showroom where we would fit out a van with samples and be able to visit various areas. Which would you prefer and why?"
      </ScriptBlock>
      <RadioGroup
        label="Showroom preference:"
        name="showroomPreference"
        value={data.showroomPreference}
        onChange={(v) => update('showroomPreference', v)}
        options={['Bricks & Mortar', 'Mobile Showroom (Van)', 'No Preference']}
      />
      <TextArea
        label="Why they prefer it:"
        value={data.showroomPreferenceReason}
        onChange={(v) => update('showroomPreferenceReason', v)}
        placeholder="Their reason for the preference..."
        rows={2}
      />
      <HWCRating field="showroomPreference" value={data.showroomPreference_hwc} onChange={update} />
    </div>
  );
};

// ─── Step 6: Icebreakers Part 2 ───────────────────────────────────────────────
const Icebreakers2 = ({ prospect, data, update, updateBasic }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Icebreakers (Part 2)</h2>
    <ScriptBlock>
      "Great, and just confirming, you are located in {prospect.suburb || '[SUBURB]'}, is that correct? Cool, so how do you like living there, have you been there long?"
    </ScriptBlock>
    <TextField label="Years at property:" value={data.yearsAtProperty} onChange={(v) => update('yearsAtProperty', v)} placeholder="Enter number of years" />
    <ScriptBlock>
      "So can tell me a bit about the property, in fact do you mind if I grab the address so I can pull it up on Google/realestate.com.au? It's just going to help me get a feel for your home, like its age and outlook."
    </ScriptBlock>
    <TextField label="Property Address:" value={prospect.address} onChange={(v) => updateBasic('address', v)} placeholder="Enter full property address" />
    <ScriptBlock>
      "Oh, so your home's the one that is [X]. That's a nice [Y] (Queenslander etc). Would you describe it as your forever home, a rental, what's the story?"
    </ScriptBlock>
    <TextArea label="Home description/story:" value={data.homeDescription} onChange={(v) => update('homeDescription', v)} placeholder="Enter home description and living situation" rows={3} />
    <HWCRating field="homeDescription" value={data.homeDescription_hwc} onChange={update} />
  </div>
);

// ─── Step 7: Access ───────────────────────────────────────────────────────────
const Access = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Access</h2>
    <ScriptBlock>
      "What can you tell me about access, is it walk in off the street/ any stairs/ steep driveway etc?"
    </ScriptBlock>
    <CheckboxGroup label="Access Type (Select all that apply):" values={data.accessType} onChange={(v) => update('accessType', v)} options={ACCESS_TYPES} />
    {(data.accessType?.includes('Stairs') || data.accessType?.includes('Other')) && (
      <TextArea label="Access Details:" value={data.accessOther} onChange={(v) => update('accessOther', v)} placeholder="Provide details about stairs or other access considerations" rows={3} />
    )}
    <HWCRating field="access" value={data.access_hwc} onChange={update} />
  </div>
);

// ─── Step 8: Information Confirmation ────────────────────────────────────────
const InformationConfirmation = ({ prospect, data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Information Confirmation</h2>
    <ScriptBlock>
      "Right and just to confirm some of the details that you have already provided you are wanting..."
    </ScriptBlock>
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h4 className="font-medium mb-2">Details to confirm:</h4>
      <div className="space-y-1 text-sm">
        <p><strong>Room:</strong> {data.room || '[Room details]'}</p>
        <p><strong>Thickness:</strong> {data.benchtopThickness || '[Thickness]'}</p>
        <p><strong>Stone Brands:</strong> {(data.stoneBrands || []).join(', ') || '[Stone brand preferences]'}</p>
        {data.confirmationDetails && <div><strong>Additional Details:</strong><p className="mt-1 whitespace-pre-wrap">{data.confirmationDetails}</p></div>}
      </div>
    </div>
    <ScriptBlock>"Great, thanks for that — have I missed anything?"</ScriptBlock>
    <RadioGroup label="Did I miss anything?" name="missedAnything" value={data.missedAnything} onChange={(v) => update('missedAnything', v)} options={['Yes', 'No']} />
    {data.missedAnything === 'Yes' && (
      <TextArea label="What was missed:" value={data.missedAnythingDetails} onChange={(v) => update('missedAnythingDetails', v)} placeholder="Enter what was missed or needs correcting" rows={3} />
    )}
    <HWCRating field="infoConfirmation" value={data.infoConfirmation_hwc} onChange={update} />
  </div>
);

// ─── Step 9: Deep Dive Reason ─────────────────────────────────────────────────
const DeepDiveReason = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Deep Dive (Reason)</h2>
    <ScriptBlock>
      "So, what I like to do is get a little bit of a picture in my own mind of what you're trying to achieve so I know best how to achieve that outcome for you, and also, the reason for your new benchtop. For example - are you sick of the old one, your renovating to sell soon, or is this a new kitchen?"
    </ScriptBlock>
    <TextArea label="Reason for new benchtop:" value={data.deepDiveReason} onChange={(v) => update('deepDiveReason', v)} placeholder="Enter their reason for wanting new benchtops" rows={3} />
    <HWCRating field="deepDiveReason" value={data.deepDiveReason_hwc} onChange={update} />

    <SectionDivider title="Existing Benchtop" />
    <RadioGroup label="Does the prospect have an existing benchtop?" name="hasExistingBenchtop" value={data.hasExistingBenchtop} onChange={(v) => update('hasExistingBenchtop', v)} options={['Yes', 'No']} />

    {data.hasExistingBenchtop === 'Yes' && (
      <>
        <ScriptBlock>
          "What's been the biggest frustration with your current benchtop... [PAUSE] is it more the look of it, or is it actually causing day-to-day issues?"
        </ScriptBlock>
        <TextArea label="Biggest frustration:" value={data.nepq_biggestFrustration} onChange={(v) => update('nepq_biggestFrustration', v)} placeholder="What frustrates them most about their current benchtop" rows={2} />
        <HWCRating field="nepq_biggestFrustration" value={data.nepq_biggestFrustration_hwc} onChange={update} />
        <ScriptBlock>"How long has that been bothering you?"</ScriptBlock>
        <TextArea label="How long:" value={data.nepq_howLongBothered} onChange={(v) => update('nepq_howLongBothered', v)} placeholder="How long has this been an issue" rows={1} />
        <HWCRating field="nepq_howLongBothered" value={data.nepq_howLongBothered_hwc} onChange={update} />
        <ScriptBlock>"And how does that affect things day-to-day... like when you're cooking or when people come over?"</ScriptBlock>
        <TextArea label="Daily impact:" value={data.nepq_dailyImpact} onChange={(v) => update('nepq_dailyImpact', v)} placeholder="How it affects their daily life" rows={2} />
        <HWCRating field="nepq_dailyImpact" value={data.nepq_dailyImpact_hwc} onChange={update} />
      </>
    )}

    {data.hasExistingBenchtop === 'No' && (
      <>
        <ScriptBlock>
          "So with a brand new kitchen... [PAUSE] what's been the hardest part of the process so far — is it finding the right supplier, choosing the material, or something else?"
        </ScriptBlock>
        <TextArea label="Biggest challenge:" value={data.nepq_biggestFrustration} onChange={(v) => update('nepq_biggestFrustration', v)} placeholder="What's been the hardest part of the process" rows={2} />
        <HWCRating field="nepq_biggestFrustration" value={data.nepq_biggestFrustration_hwc} onChange={update} />
        <ScriptBlock>"How long have you been looking into getting this sorted?"</ScriptBlock>
        <TextArea label="How long:" value={data.nepq_howLongBothered} onChange={(v) => update('nepq_howLongBothered', v)} placeholder="How long they've been looking" rows={1} />
        <HWCRating field="nepq_howLongBothered" value={data.nepq_howLongBothered_hwc} onChange={update} />
        <ScriptBlock>"And what's been holding things up... is it just the number of decisions, or is there something specific that's made it tricky?"</ScriptBlock>
        <TextArea label="What's holding things up:" value={data.nepq_dailyImpact} onChange={(v) => update('nepq_dailyImpact', v)} placeholder="What's been tricky about the process" rows={2} />
        <HWCRating field="nepq_dailyImpact" value={data.nepq_dailyImpact_hwc} onChange={update} />
      </>
    )}

    <ScriptBlock>"Have you tried to get this sorted before... or is this the first time you've seriously looked into it?"</ScriptBlock>
    <RadioGroup label="Tried before?" name="triedBefore" value={data.triedBefore} onChange={(v) => update('triedBefore', v)} options={['Yes', 'No — first time']} />

    {data.triedBefore === 'Yes' && (
      <>
        <TextArea label="What did they try:" value={data.nepq_triedBefore} onChange={(v) => update('nepq_triedBefore', v)} placeholder="What did they look into or try before?" rows={2} />
        <HWCRating field="nepq_triedBefore" value={data.nepq_triedBefore_hwc} onChange={update} />
        <ScriptBlock>"What stopped you from moving forward at that point?"</ScriptBlock>
        <TextArea label="What stopped them:" value={data.nepq_whatStopped} onChange={(v) => update('nepq_whatStopped', v)} placeholder="What prevented them from going ahead" rows={2} />
        <HWCRating field="nepq_whatStopped" value={data.nepq_whatStopped_hwc} onChange={update} />
      </>
    )}

    {data.triedBefore === 'No — first time' && (
      <>
        <ScriptBlock>"So what's made now the right time to finally look into it?"</ScriptBlock>
        <TextArea label="Why now:" value={data.nepq_whyNow} onChange={(v) => update('nepq_whyNow', v)} placeholder="What triggered them to start looking now" rows={2} />
        <HWCRating field="nepq_whyNow" value={data.nepq_whyNow_hwc} onChange={update} />
      </>
    )}
  </div>
);

// ─── Step 10: Job Type ────────────────────────────────────────────────────────
const JobType = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Job Type</h2>
    <ScriptBlock>
      "And have you ever bought stone benchtops before? Have you been through the process of deciding on a stone benchtop and how many decisions you have to make?"
    </ScriptBlock>
    <RadioGroup label="Ever bought stone benchtops before?" name="boughtBenchTopsBefore" value={data.boughtBenchTopsBefore} onChange={(v) => update('boughtBenchTopsBefore', v)} options={['Yes', 'No']} />
    <HWCRating field="boughtBenchTopsBefore" value={data.boughtBenchTopsBefore_hwc} onChange={update} />
  </div>
);

// ─── Step 11: Managed Service ─────────────────────────────────────────────────
const ManagedService = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Managed Service</h2>
    <ScriptBlock>
      "In case you didn't know, nearly all the benchtop suppliers you talk to won't do the benchtop removal and cannot organise trades for you, and that means you're likely to be without a functioning kitchen from anywhere from 10-18 days. [PAUSE] Would you like us to quote a fully managed service for you, so you're only without your kitchen for 5 days or are you just looking for a price for the benchtops? [PAUSE]"
    </ScriptBlock>
    <RadioGroup
      label="Service Type:"
      name="managedService"
      value={data.managedService}
      onChange={(v) => update('managedService', v)}
      options={['Benchtops Only', 'Whole Job', 'Unsure']}
    />
    <HWCRating field="managedService" value={data.managedService_hwc} onChange={update} />

    {/* ── Conditional: Benchtops Only ── */}
    {data.managedService === 'Benchtops Only' && (
      <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
        <p className="text-sm font-semibold text-amber-800">Follow-up question:</p>
        <p className="text-sm text-amber-700 italic">"Why do they only want a benchtops price?"</p>
        <TextArea
          label="Their reason:"
          value={data.benchtopsOnlyReason}
          onChange={(v) => update('benchtopsOnlyReason', v)}
          placeholder="Enter their reason for only wanting a benchtops price..."
          rows={3}
        />
        <HWCRating field="benchtopsOnlyReason" value={data.benchtopsOnlyReason_hwc} onChange={update} />
      </div>
    )}

    {/* ── Conditional: Unsure ── */}
    {data.managedService === 'Unsure' && (
      <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
        <p className="text-sm font-semibold text-blue-800">Follow-up question:</p>
        <p className="text-sm text-blue-700 italic">"Why are they unsure?"</p>
        <TextArea
          label="Their reason:"
          value={data.managedServiceUnsureReason}
          onChange={(v) => update('managedServiceUnsureReason', v)}
          placeholder="Enter why they are unsure about the managed service..."
          rows={3}
        />
        <HWCRating field="managedServiceUnsureReason" value={data.managedServiceUnsureReason_hwc} onChange={update} />
        <ScriptBlock>
          "You could always let me know later if you like. And have you ever bought stone benchtops before? Have you been through the process of deciding on a stone benchtop and how many decisions you have to make?"
        </ScriptBlock>
      </div>
    )}
  </div>
);

// ─── Step 12: Thickness & Splashback ─────────────────────────────────────────
const ThicknessSplashback = ({ data, update }) => {
  const isNew = data.benchtopType === 'New benchtops';
  const existingThick = data.existingBenchtopThickness;
  const wantedThick = data.benchtopThickness;

  if (isNew) {
    return (
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-blue-800">Thickness & Splashback</h2>
        <CoachingTip type="success">
          New benchtops — no existing splashback concerns. Skip this step.
        </CoachingTip>
      </div>
    );
  }

  const is30to38 = existingThick === '30-38mm';
  const thicknessMismatch = (wantedThick === '20mm' && (existingThick === '30-38mm' || existingThick === '40mm'));

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Thickness & Splashback</h2>

      {is30to38 && (
        <>
          <ScriptBlock>
            "I can see from your photos it looks like a 30mm top, and it looks like you'll be keeping the splashback — does that sound right?"
          </ScriptBlock>
          <RadioGroup label="Keeping splashback?" name="keepingSplashback" value={data.keepingSplashback} onChange={(v) => update('keepingSplashback', v)} options={['Yes', 'No', 'Unsure']} />
          <HWCRating field="keepingSplashback" value={data.keepingSplashback_hwc} onChange={update} />
        </>
      )}

      {!is30to38 && (wantedThick === '20mm' || wantedThick === '40mm') && (
        <>
          <ScriptBlock>
            "So I notice that you are looking at {wantedThick} stone options. Can I ask, are you updating the splashback as well?"
          </ScriptBlock>
          <RadioGroup label="Updating splashback?" name="splashbackUpdate" value={data.splashbackUpdate} onChange={(v) => update('splashbackUpdate', v)} options={['Yes', 'No']} />
          <HWCRating field="splashbackUpdate" value={data.splashbackUpdate_hwc} onChange={update} />
        </>
      )}

      {!is30to38 && wantedThick !== '20mm' && wantedThick !== '40mm' && (
        <CoachingTip type="success">
          Prospect selected {wantedThick || 'no thickness yet'} with existing {existingThick || 'unknown'} — no splashback concerns to address.
        </CoachingTip>
      )}

      {thicknessMismatch && (
        <CoachingTip type="warning">
          <strong>Thickness mismatch:</strong> They want {wantedThick} but their existing is {existingThick}. This may cause a gap with the splashback — make sure to address this with the NEPQ question below.
        </CoachingTip>
      )}
    </div>
  );
};

// ─── Step 13: Pricing & Timing ────────────────────────────────────────────────
const PricingTiming = ({ data, update }) => {
  const seasonalMessages = {
    'Easter': "Just so you're aware, we usually book out in the lead-up to Easter by late February, so planning ahead is key if that's your goal.",
    'End of Financial Year': "Just so you're aware, we usually get really busy in the lead-up to End of Financial Year, so planning ahead is key if you're wanting to get it done before June 30.",
    'Spring': "Just so you're aware, spring is our busiest season and we usually book out by mid-September, so planning ahead is key if that's your goal.",
    'Christmas': "Just so you're aware, we usually book out up to Christmas by mid-November, so planning ahead is key if that's your goal."
  };
  const urgencyMessage = seasonalMessages[data.seasonalTiming] || seasonalMessages['Christmas'];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Pricing & Timing</h2>

      <ScriptBlock>
        "When are you thinking of making the decision to go ahead with your benchtop? Are you thinking weeks or months?"
      </ScriptBlock>
      <TextField label="Decision timeframe:" value={data.decisionTimeframe} onChange={(v) => update('decisionTimeframe', v)} placeholder="Enter their decision timeframe" />
      <HWCRating field="decisionTimeframe" value={data.decisionTimeframe_hwc} onChange={update} />

      <ScriptBlock>
        "Thanks, where are you up to with getting your new benchtops underway, have you gone to any of the suppliers' showrooms?"
      </ScriptBlock>
      <RadioGroup label="Visited showrooms?" name="visitedShowrooms" value={data.visitedShowrooms} onChange={(v) => update('visitedShowrooms', v)} options={['Yes', 'No']} />
      <HWCRating field="visitedShowrooms" value={data.visitedShowrooms_hwc} onChange={update} />

      {data.visitedShowrooms === 'Yes' && (
        <>
          <ScriptBlock>"Great, did they explain how the price ranges work?"</ScriptBlock>
          <RadioGroup label="Did they explain price ranges?" name="priceRangesExplained" value={data.priceRangesExplained} onChange={(v) => update('priceRangesExplained', v)} options={['Yes', 'No']} />
          <HWCRating field="priceRangesExplained" value={data.priceRangesExplained_hwc} onChange={update} />
        </>
      )}
      {data.visitedShowrooms === 'No' && (
        <ScriptBlock>
          "Ok, so as you've already found by filling in the web form, there's a lot in the process of getting a benchtop. It's like buying a car, you're not making one decision you're making dozens. But that's what we're here for, to help you. [PAUSE FOR RESPONSE] Just so as you know, stone is generally priced in 5 different price ranges, but we can talk about that a bit later."
        </ScriptBlock>
      )}

      <ScriptBlock>{urgencyMessage}</ScriptBlock>

      {/* ── NEW: Decision Style — drives NEPQ auto-select on Proposal Call ── */}
      <SectionDivider title="Decision Style" />
      <ScriptBlock>
        "When you've made big decisions like this before — renovations, cars, whatever — what's usually most important to you... getting it right, or getting it cheap?"
      </ScriptBlock>
      <RadioGroup
        label="What matters most to them:"
        name="decisionPriority"
        value={data.decisionPriority}
        onChange={(v) => update('decisionPriority', v)}
        options={['Getting it right', 'Getting it cheap']}
      />
      <HWCRating field="decisionPriority" value={data.decisionPriority_hwc} onChange={update} />
    </div>
  );
};

// ─── Step 14: Additional Stone ────────────────────────────────────────────────
const AdditionalStone = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Additional Stone</h2>
    <ScriptBlock>
      "Now, how stone works is you pay for a slab, and sometimes there's a bit left over that you may be able to use. Is there anywhere else in your home where you think you might want a piece of stone, even say, a coffee table, bedside table or sideboard?"
    </ScriptBlock>
    <RadioGroup label="Want additional stone items?" name="additionalStoneWanted" value={data.additionalStoneWanted} onChange={(v) => update('additionalStoneWanted', v)} options={['Yes', 'No']} />
    <HWCRating field="additionalStoneWanted" value={data.additionalStoneWanted_hwc} onChange={update} />
    {data.additionalStoneWanted === 'Yes' && (
      <>
        <TextArea label="Additional stone details:" value={data.additionalStone} onChange={(v) => update('additionalStone', v)} placeholder="Enter details about what additional stone items they want" rows={3} />
        <HWCRating field="additionalStone" value={data.additionalStone_hwc} onChange={update} />
      </>
    )}
    {data.additionalStoneWanted === 'No' && (
      <ScriptBlock>
        "That's OK, it's your stone right, so you may as well use it. If you do happen to think of something just let me know the next time we talk, because we can make it for you"
      </ScriptBlock>
    )}
  </div>
);

// ─── Step 15: Stone Brands ────────────────────────────────────────────────────
const StoneBrands = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Stone Brands</h2>
    {(data.stoneBrands || []).includes('None') ? (
      <>
        <ScriptBlock>"Are you familiar with the different brands of stone in market?"</ScriptBlock>
        <RadioGroup label="Familiar with brands?" name="familiarBrands" value={data.familiarBrands} onChange={(v) => update('familiarBrands', v)} options={['Yes', 'No']} />
        <HWCRating field="familiarBrands" value={data.familiarBrands_hwc} onChange={update} />
        {data.familiarBrands === 'No' && (
          <ScriptBlock>
            "If you weren't aware there are lots of choices in pattern and colour for you to choose from, have you landed on a particular colour or look that you wanted for your new benchtops? For instance were you thinking a single light or dark colour, a fleck or perhaps a veined look?"
          </ScriptBlock>
        )}
      </>
    ) : (
      <>
        <ScriptBlock>
          "I see that you have nominated {(data.stoneBrands || []).filter(b => b !== 'Other').join(', ')}, are you familiar with any other brands?"
        </ScriptBlock>
        <RadioGroup label="Familiar with other brands?" name="familiarWithOtherBrands" value={data.familiarWithOtherBrands} onChange={(v) => update('familiarWithOtherBrands', v)} options={['Yes', 'No']} />
        <HWCRating field="familiarWithOtherBrands" value={data.familiarWithOtherBrands_hwc} onChange={update} />
        <ScriptBlock>
          "Yeah, that is a great looking stone, that choice. Are you also open to looking at similar stones from alternative brands that may be more cost effective?"
        </ScriptBlock>
        <RadioGroup label="Open to alternatives?" name="openToAlternatives" value={data.openToAlternatives} onChange={(v) => update('openToAlternatives', v)} options={['Yes', 'No']} />
        <HWCRating field="openToAlternatives" value={data.openToAlternatives_hwc} onChange={update} />
        {data.openToAlternatives === 'No' && (
          <ScriptBlock>
            "Ok so, you are set on [COLOUR] by [BRAND]. Yeah, that is a great looking stone, that choice."
          </ScriptBlock>
        )}
      </>
    )}
    <TextArea
      label="Colour choice details:"
      value={data.colourChoice}
      onChange={(v) => update('colourChoice', v)}
      placeholder='If prospect is a "D" or unsure on brands, colours and patterns, consider prompting about price and livability'
      rows={3}
    />
    <HWCRating field="colourChoice" value={data.colourChoice_hwc} onChange={update} />
  </div>
);

// ─── Step 16: Sink & Cooktop ──────────────────────────────────────────────────
const SinkCooktop = ({ data, update }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Sink & Cooktop</h2>
    <ScriptBlock>
      "OK, so, what type of sink installation did you want to get? Do the words drop in or undermount mean anything to you?"
    </ScriptBlock>
    <SelectField label="Sink Installation Type:" value={data.sinkInstallation} onChange={(v) => update('sinkInstallation', v)} options={SINK_TYPES} placeholder="Select installation type" />
    <HWCRating field="sinkInstallation" value={data.sinkInstallation_hwc} onChange={update} />
    <ScriptBlock>"Are we just doing a standard cutout for the cooktop?"</ScriptBlock>
    <SelectField label="Cooktop Type:" value={data.cooktopCutout} onChange={(v) => update('cooktopCutout', v)} options={COOKTOP_TYPES} placeholder="Select cooktop type" />
    <HWCRating field="cooktopCutout" value={data.cooktopCutout_hwc} onChange={update} />
  </div>
);

// ─── Helper: Auto-populate key points summary ─────────────────────────────────
const buildKeyPointsSummary = (data) => {
  const points = [];
  if (data.room) points.push(`Room: ${data.room}`);
  if (data.benchtopThickness) points.push(`Thickness: ${data.benchtopThickness}`);
  if ((data.stoneBrands || []).filter(b => b !== 'None').length > 0) {
    points.push(`Stone brands: ${data.stoneBrands.filter(b => b !== 'None').join(', ')}`);
  }
  if (data.managedService) points.push(`Service: ${data.managedService}`);
  if (data.decisionPriority) points.push(`Priority: ${data.decisionPriority}`);
  if (data.deepDiveReason) points.push(`Reason: ${data.deepDiveReason}`);
  if (data.nepq_biggestFrustration) points.push(`Main frustration: ${data.nepq_biggestFrustration}`);
  if (data.nepq_idealOutcome) points.push(`Ideal outcome: ${data.nepq_idealOutcome}`);
  if (data.nepq_selectionCriteria) points.push(`Most important factor: ${data.nepq_selectionCriteria}`);
  return points.join('\n');
};

// ─── Step 17: Final Points ────────────────────────────────────────────────────
const FinalPoints = ({ prospect, data, update, onComplete }) => {
  const autoSummary = buildKeyPointsSummary(data);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Final Points</h2>

      {/* Transition Q1 — CHANGED: "main things" → "key things" */}
      <div className="border rounded-lg overflow-hidden border-purple-300">
        <div className="bg-purple-50 px-4 py-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span className="text-xs font-bold uppercase tracking-wide text-purple-800">Transition</span>
        </div>
        <div className="px-4 py-3">
          <p className="font-medium text-gray-800 text-base leading-relaxed">
            "Based on everything you've shared with me today... it sounds like the key things you're looking for are:"
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
            <p className="text-xs font-semibold text-purple-700 mb-1">Auto-populated Key Points (read these back using their words):</p>
            <pre className="text-sm text-purple-800 whitespace-pre-wrap font-sans">{autoSummary || 'Complete earlier steps to auto-populate...'}</pre>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic flex items-start gap-1">
            <span>📝</span> Confirm you understand by using their exact words. This builds massive trust.
          </p>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-500 mb-1">Their response:</label>
            <textarea
              value={data.nepq_transitionSummary || ''}
              onChange={(e) => update('nepq_transitionSummary', e.target.value)}
              placeholder="Jot down what they said..."
              rows={2}
              className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
            />
          </div>
          <HWCRating field="nepq_transitionSummary" value={data.nepq_transitionSummary_hwc} onChange={update} />
        </div>
      </div>

      {/* Transition Q2 — CHANGED: question text updated */}
      <div className="border rounded-lg overflow-hidden border-purple-300">
        <div className="bg-purple-50 px-4 py-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span className="text-xs font-bold uppercase tracking-wide text-purple-800">Transition</span>
        </div>
        <div className="px-4 py-3">
          <p className="font-medium text-gray-800 text-base leading-relaxed">
            "Have I covered everything you wanted?"
          </p>
          <p className="text-xs text-gray-500 mt-2 italic flex items-start gap-1">
            <span>📝</span> Opens the floor one last time — prevents "I forgot to mention..." objections later
          </p>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-500 mb-1">Their response:</label>
            <textarea
              value={data.nepq_anythingElse || ''}
              onChange={(e) => update('nepq_anythingElse', e.target.value)}
              placeholder="Jot down what they said..."
              rows={2}
              className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
            />
          </div>
          <HWCRating field="nepq_anythingElse" value={data.nepq_anythingElse_hwc} onChange={update} />
        </div>
      </div>

      <ScriptBlock>
        "So based on all of that, I have a really clear picture of what you need. [PAUSE] My next step is to narrow your options down to the best two that fit what you're after, and work out the pricing with the suppliers. Then we'll have a quick Proposal call where I'll walk you through my recommendations and you can ask me anything. [PAUSE] How does that sound?"
      </ScriptBlock>
      <ScriptBlock>
        "From there, you'll just need to see the stone in person to make your final colour and pattern decision. [PAUSE] So when works best for that call?"
      </ScriptBlock>

      <SectionDivider title="Proposal Call Time" />
      <RadioGroup
        label="Proposal call time:"
        name="proposalCallTimeChoice"
        value={data.proposalCallTimeChoice}
        onChange={(v) => update('proposalCallTimeChoice', v)}
        options={[
          data.proposalCallDay1Time || 'Option 1 (set in Precall)',
          data.proposalCallDay2Time || 'Option 2 (set in Precall)',
          'Other'
        ]}
      />
      {data.proposalCallTimeChoice === 'Other' && (
        <TextField label="Other time:" value={data.proposalCallOtherTime} onChange={(v) => update('proposalCallOtherTime', v)} placeholder="Enter the agreed proposal call time" />
      )}

      {data.status === 'completed' ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-1">Explore Call Complete ✓</h3>
          <p className="text-green-700 text-sm">
            All information captured for {prospect.firstName} {prospect.lastName}. Ready to proceed to Proposal Call.
          </p>
          <a href="/" className="inline-block mt-2 text-sm text-blue-600 hover:underline">Back to Dashboard</a>
        </div>
      ) : (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          ✓ Mark Explore Call as Complete
        </button>
      )}
    </div>
  );
};

export const ExploreSteps = [
  PrecallSetup, ConfirmationDetails, InitialGreeting, DISCAssessment,
  Introduction, Icebreakers1, Icebreakers2, Access,
  InformationConfirmation, DeepDiveReason, JobType, ManagedService,
  ThicknessSplashback, PricingTiming, AdditionalStone, StoneBrands,
  SinkCooktop, FinalPoints
];
