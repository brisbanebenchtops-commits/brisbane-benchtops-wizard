import React from 'react';
import { TextField, TextArea, RadioGroup, SelectField, ScriptBlock, CoachingTip, SectionDivider } from '../../common/FormFields';
import { getDiscData } from '../../../lib/disc/profiles';

// Step 0: Proposal Opening
const ProposalOpening = ({ prospect, exploreData, data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Opening</h2>

      {discProfile && (
        <CoachingTip type="info">
          <strong>DISC Reminder:</strong> {disc.proposalAdvice[0]}
        </CoachingTip>
      )}

      <ScriptBlock>
        "Thanks for joining me on the call. Now that I have got you, I'm sending you your proposal now, are you near a computer, or do you just want to look at it on your phone?"
      </ScriptBlock>

      <RadioGroup label="Can they see the proposal?" name="canSeeProposal" value={data.canSeeProposal} onChange={(v) => update('canSeeProposal', v)} options={['Yes - Computer', 'Yes - Phone', 'Not yet']} />

      {data.canSeeProposal === 'Not yet' && (
        <CoachingTip type="warning">
          Wait for them to open it. Ask them to check junk/spam if it hasn't arrived.
        </CoachingTip>
      )}

      <TextField label="Proposal URL (SM8 link):" value={data.proposalUrl} onChange={(v) => update('proposalUrl', v)} placeholder="Paste the ServiceM8 proposal URL" />

      <ScriptBlock>
        "Just before we get into it, have you had any other thoughts or ideas about your benchtop or us carrying out any of the work or extra work for you?"
      </ScriptBlock>

      <TextArea label="New thoughts or ideas:" value={data.newThoughts} onChange={(v) => update('newThoughts', v)} placeholder="Note any new thoughts, changes, or additional work they want" rows={3} />

      {/* Quick reference from Explore Call */}
      <div className="bg-gray-50 p-4 rounded-lg border text-sm">
        <h4 className="font-medium text-gray-700 mb-2">Explore Call Summary:</h4>
        <div className="grid grid-cols-2 gap-2 text-gray-600">
          <p><strong>Room:</strong> {exploreData.room}</p>
          <p><strong>Thickness:</strong> {exploreData.benchtopThickness}</p>
          <p><strong>Job Type:</strong> {exploreData.jobType}</p>
          <p><strong>Managed Service:</strong> {exploreData.managedService}</p>
          <p><strong>Stone:</strong> {(exploreData.stoneBrands || []).join(', ')}</p>
          <p><strong>Colour:</strong> {exploreData.colourChoice}</p>
          <p><strong>Timeframe:</strong> {exploreData.decisionTimeframe}</p>
          <p><strong>Additional Stone:</strong> {exploreData.additionalStoneWanted}</p>
        </div>
      </div>
    </div>
  );
};

// Step 1: Surplus Stone Followup
const SurplusStoneFollowup = ({ exploreData, data, update }) => {
  const wantsSurplus = exploreData.additionalStoneWanted === 'Yes';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Surplus Stone Follow-up</h2>

      {wantsSurplus ? (
        <>
          <CoachingTip type="info">
            In the Explore Call, they said YES to surplus stone: "{exploreData.additionalStone}"
          </CoachingTip>
          <ScriptBlock>
            "Did you have any ideas about what you want to do with surplus stone? Last time we spoke you mentioned {exploreData.additionalStone || 'some ideas'}..."
          </ScriptBlock>
          <TextArea label="Surplus stone ideas:" value={data.surplusStoneIdeas} onChange={(v) => update('surplusStoneIdeas', v)} placeholder="What do they want to do with leftover stone?" rows={3} />
        </>
      ) : (
        <>
          <CoachingTip type="success">
            They said NO to surplus stone in the Explore Call. You can skip or briefly mention it.
          </CoachingTip>
          <ScriptBlock>
            "Just a quick reminder — since you're paying for a full slab, if you do think of anything you'd like made from leftover stone, just let me know."
          </ScriptBlock>
        </>
      )}
    </div>
  );
};

// Step 2: Value Framing
const ValueFraming = ({ data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Value Framing</h2>

      <CoachingTip type="info">
        {disc.proposalAdvice[2]}
      </CoachingTip>

      <ScriptBlock>
        "So, last time we spoke, I said that I needed to narrow down the choices to 2 options. That's what I have been doing, by going backwards and forwards with our suppliers."
      </ScriptBlock>

      <ScriptBlock>
        "Has the proposal come through yet? [PAUSE] [if no check junk] Great, have you got it open? [PAUSE] Right, let's jump in."
      </ScriptBlock>

      <ScriptBlock>
        "So you might notice it's not actually a PDF but rather an interactive document. Don't worry I'm not going to read it all to you. The first section is a reminder that going with the lowest priced option is something we have all regretted at least once. We think we'll get good value by paying a low price, but found out afterwards, we shouldn't have gone with the low. Can you relate to that?"
      </ScriptBlock>

      <TextArea label="Their response to value framing:" value={data.valueFramingResponse} onChange={(v) => update('valueFramingResponse', v)} placeholder="How did they respond? Could they relate?" rows={2} />

      <ScriptBlock>
        "The section that I would like focus on for a moment is the <strong>value</strong> that we offer, and why choose Brisbane Benchtops."
      </ScriptBlock>
    </div>
  );
};

// Step 3: Five Guarantees
const Guarantees = ({ data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">5 Peace of Mind Guarantees</h2>

      <CoachingTip type="info">
        <strong>Tip:</strong> {disc.proposalAdvice[2]}. Pause after each guarantee for their reaction.
      </CoachingTip>

      <ScriptBlock>"For a start, we offer five peace of mind guarantees."</ScriptBlock>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 1: Start on the agreed day</h4>
          <ScriptBlock>
            "The first one is we will start on the agreed and specified day, because we understand you had to rearrange your life for this benchtop, and we respect the time you're giving in order to make this happen. And you may have experienced that, or maybe it's just me, and a few other people."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee1Response} onChange={(v) => update('guarantee1Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 2: Fast & efficient</h4>
          <ScriptBlock>
            "Guarantee two, is that we will allocate the resources to be fast and efficient, to minimise the disruption to your household. Again, this is my own experience that I want to ensure doesn't happen to any of our customers, and hope you can relate to that?"
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee2Response} onChange={(v) => update('guarantee2Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 3: Keep you updated</h4>
          <ScriptBlock>
            "Our third guarantee, is to keep you updated every step of the way, so you're always aware of how the job is going. So you're never wondering how the project is going."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee3Response} onChange={(v) => update('guarantee3Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 4: Honour the proposal</h4>
          <ScriptBlock>
            "Guarantee four, is that we will honour the wording of our proposal in full. If you are looking at other quotes, just make sure that you are comparing apples to apples. That's harder than it sounds. An example is, if it's in writing in ours but it's not in writing in theirs, you're probably not getting it, and you may have to pay extra. Have you had that experience before, where you are told something, and you didn't receive it?"
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee4Response} onChange={(v) => update('guarantee4Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 5: No hidden extras</h4>
          <ScriptBlock>
            "Guarantee five is, there are no hidden extras. For example there can be a 'subject to' clause in competitor's quotes that doesn't give much detail, it may say, subject to access, and that's all."
          </ScriptBlock>
          <ScriptBlock>
            "But what they don't tell you is that, sometimes that means they classify access to your kitchen as requiring a heavy lift, and that is often an extra $400 because of that. That's one of a few examples I can give you. I'm not proud of our industry in some ways, which is why I put these guarantees in to explain exactly what you're getting for your money."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee5Response} onChange={(v) => update('guarantee5Response', v)} placeholder="Their reaction" rows={1} />
        </div>
      </div>

      <ScriptBlock>"Can you see how these 5 guarantees give you a lot of value, and give you peace of mind?"</ScriptBlock>
      <TextArea label="Value response:" value={data.guaranteesValueResponse} onChange={(v) => update('guaranteesValueResponse', v)} placeholder="Did they see value in the guarantees?" rows={2} />

      <ScriptBlock>"Do you have any questions so far or about any of your 5 guarantees?"</ScriptBlock>
      <TextArea label="Questions:" value={data.guaranteesQuestions} onChange={(v) => update('guaranteesQuestions', v)} placeholder="Any questions about the guarantees?" rows={2} />

      <ScriptBlock>"Do you feel there is value in these guarantees?"</ScriptBlock>
      <CoachingTip type="success">If they say yes: "Yeah that's exactly why we have them."</CoachingTip>
    </div>
  );
};

// Step 4: Competitor Check
const CompetitorCheck = ({ data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Competitor Check</h2>

      <ScriptBlock>
        "Have you received any other quotes in writing? I'd like to possibly help you understand what's written and what's not, to read between the lines."
      </ScriptBlock>

      <RadioGroup label="Has other quotes?" name="hasOtherQuotes" value={data.hasOtherQuotes} onChange={(v) => update('hasOtherQuotes', v)} options={['Yes', 'No']} />

      {data.hasOtherQuotes === 'No' && (
        <>
          <ScriptBlock>
            "Can I give you a few questions I'd recommend you ask when you do get other quotes?"
          </ScriptBlock>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">Questions to suggest they ask competitors:</h4>
            <ul className="text-sm space-y-2 text-amber-900">
              <li>• Look for the "care factor" — how much time did they spend getting to know you?</li>
              <li>• How much detail did they put into their quote?</li>
              <li>• In regard to access, what's included?</li>
              <li>• What's NOT included in the quote?</li>
              <li>• Are they going to organise the trades for you?</li>
              <li>• What's their QBCC License number?</li>
              <li>• Are they fully insured — public AND product liability?</li>
              <li>• How quickly can they do the job?</li>
            </ul>
          </div>
        </>
      )}

      {discProfile && data.hasOtherQuotes && (
        <CoachingTip type="info">
          <strong>Objection tip ({discProfile}):</strong> {disc.objectionHandling.competitor}
        </CoachingTip>
      )}
    </div>
  );
};

// Step 5: Competitor Deep Dive (if they have quotes)
const CompetitorDeepDive = ({ data, update, discProfile }) => {
  const hasQuotes = data.hasOtherQuotes === 'Yes';

  if (!hasQuotes) {
    return (
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-blue-800">Competitor Deep Dive</h2>
        <CoachingTip type="success">
          No competitor quotes to discuss. This step is about strengthening their buying criteria for if/when they do get other quotes. Skip to next step or reinforce the questions from the previous step.
        </CoachingTip>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Competitor Deep Dive</h2>

      <ScriptBlock>"How did it look? Was it as comprehensive as your proposal?"</ScriptBlock>
      <TextArea label="Comprehensive?" value={data.competitorQuoteComprehensive} onChange={(v) => update('competitorQuoteComprehensive', v)} placeholder="How did their quote compare?" rows={2} />

      <ScriptBlock>"Did they write in any 'subject to' clauses?"</ScriptBlock>
      <TextArea label="Subject to clauses:" value={data.competitorSubjectToClauses} onChange={(v) => update('competitorSubjectToClauses', v)} placeholder="What clauses were included?" rows={2} />

      <ScriptBlock>"Did they talk to you about access to your property?"</ScriptBlock>
      <TextArea label="Access discussed:" value={data.competitorAccessDiscussed} onChange={(v) => update('competitorAccessDiscussed', v)} placeholder="Did they ask about access?" rows={2} />

      <CoachingTip type="warning">
        "If you remember, in the Explore Call, I asked you what the access was like, and looked at your home on Google from the street. If other companies don't do that, then that's a potential concern because their hidden extras can kick in as a result of any assumptions."
      </CoachingTip>

      <ScriptBlock>"Did they tell you how long you'd be without your kitchen?"</ScriptBlock>
      <TextArea label="Kitchen downtime:" value={data.competitorKitchenDowntime} onChange={(v) => update('competitorKitchenDowntime', v)} placeholder="What did they say?" rows={2} />

      <ScriptBlock>"What did they say about the removal of your benchtop?"</ScriptBlock>
      <TextArea label="Removal:" value={data.competitorRemovalIncluded} onChange={(v) => update('competitorRemovalIncluded', v)} placeholder="Was removal included?" rows={2} />

      <ScriptBlock>"What's their sequence? For example, when are they getting their trades in?"</ScriptBlock>
      <TextArea label="Trade sequence:" value={data.competitorTradeSequence} onChange={(v) => update('competitorTradeSequence', v)} placeholder="What's their process?" rows={2} />

      <TextArea label="Other competitor notes:" value={data.competitorNotes} onChange={(v) => update('competitorNotes', v)} placeholder="Any other competitor info worth noting" rows={3} />
    </div>
  );
};

// Step 6: Added Bonuses 1-3
const AddedBonuses1 = ({ data, update, exploreData }) => {
  const hasQuotes = data.hasOtherQuotes === 'Yes';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Added Bonus Inclusions (1-3)</h2>

      <ScriptBlock>"And there are 7 added bonus inclusions."</ScriptBlock>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-4">
        <div>
          <h4 className="font-semibold text-green-800">Bonus 1: Day-before removal</h4>
          <ScriptBlock>
            "Your benchtop will be removed the day before installation. This is important because with competitors, it's typical ripout — template — two to three weeks — install time — and you'll be without a functional kitchen for usually two weeks. How do you feel about that?"
          </ScriptBlock>
          <ScriptBlock>
            "With our team, it's — two days — rip out and install."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.bonus1Response} onChange={(v) => update('bonus1Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div>
          <h4 className="font-semibold text-green-800">Bonus 2: Removal included</h4>
          <ScriptBlock>
            "Your benchtop removal is included in the investment. Most competitors ask the customer to remove it and won't provide this service."
          </ScriptBlock>
          {hasQuotes ? (
            <CoachingTip type="warning">Ask: "What did their quote say about the removal, do you remember?"</CoachingTip>
          ) : (
            <CoachingTip type="info">This is important for them to look for in other quotes.</CoachingTip>
          )}
          <TextArea className="mt-2" label="Response:" value={data.bonus2Response} onChange={(v) => update('bonus2Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div>
          <h4 className="font-semibold text-green-800">Bonus 3: Minimal disruption</h4>
          <ScriptBlock>
            "We aim to create the least amount of disruption to your routines and will not start work before 7 am sharp on any day. And the whole job is aimed to be in and out within a week."
          </ScriptBlock>
          {hasQuotes ? (
            <CoachingTip type="warning">Ask: "Did they state in their quote how long the whole job would take?"</CoachingTip>
          ) : (
            <CoachingTip type="info">Watch out point: Check that competitors give a specific timeframe in writing, not a rough guess.</CoachingTip>
          )}
          <TextArea className="mt-2" label="Response:" value={data.bonus3Response} onChange={(v) => update('bonus3Response', v)} placeholder="Their reaction" rows={1} />
        </div>
      </div>
    </div>
  );
};

// Step 7: Added Bonuses 4-7
const AddedBonuses2 = ({ data, update }) => {
  const hasQuotes = data.hasOtherQuotes === 'Yes';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Added Bonus Inclusions (4-7)</h2>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-4">
        <div>
          <h4 className="font-semibold text-green-800">Bonus 4: 12-month warranty + 10yr stone</h4>
          <ScriptBlock>
            "All workmanship carries a 12-month warranty provided by our company. All stone suppliers provide a minimum 10-year warranty, with instructions included for you to register your purchase after the work is completed."
          </ScriptBlock>
          {hasQuotes && (
            <CoachingTip type="warning">
              Ask: "Did they state who the warranty on trade work would be covered by? If not, you need to check with every trade and ask for a warranty certificate from each one."
            </CoachingTip>
          )}
          <TextArea className="mt-2" label="Response:" value={data.bonus4Response} onChange={(v) => update('bonus4Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div>
          <h4 className="font-semibold text-green-800">Bonus 5: Local company, personal service</h4>
          <ScriptBlock>
            "You'll be dealing with a local company, not an impersonal national or multi-national corporation. If you have any challenges after our service, we are only a phone call away. You'll be dealing with me because I'm the business owner, the customer service officer and the project manager."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.bonus5Response} onChange={(v) => update('bonus5Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div>
          <h4 className="font-semibold text-green-800">Bonus 6: QBCC licensed builder</h4>
          <ScriptBlock>
            "All work with trades is organised and scheduled through us as a fully insured and QBCC licensed builder. And QBCC as you may know, enforce a lot of rules within the industry, which is more peace of mind for you."
          </ScriptBlock>
          {hasQuotes ? (
            <CoachingTip type="warning">Ask: "Do you know if they have a QBCC license?"</CoachingTip>
          ) : (
            <CoachingTip type="info">Important for them to find out — the answer determines where their warranty comes from.</CoachingTip>
          )}
          <TextArea className="mt-2" label="Response:" value={data.bonus6Response} onChange={(v) => update('bonus6Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div>
          <h4 className="font-semibold text-green-800">Bonus 7: Clean up included</h4>
          <ScriptBlock>
            "You won't need to clean up when our work is finished. Your kitchen area will be left clean and dust-free. Ever had a tradie do work on your home, and then you had to clean up their mess? That's not going to be the case when you engage our team."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.bonus7Response} onChange={(v) => update('bonus7Response', v)} placeholder="Their reaction" rows={1} />
        </div>
      </div>

      <ScriptBlock>"So that's our 7 added bonuses. Do you have any questions about any of them?"</ScriptBlock>
      <TextArea label="Bonus questions:" value={data.bonusQuestions} onChange={(v) => update('bonusQuestions', v)} placeholder="Any questions about the bonuses?" rows={2} />

      <ScriptBlock>
        "I recommend you look for these with any other quotes if you want to go down that path."
      </ScriptBlock>
    </div>
  );
};

// Step 8: Value Summary
const ValueSummary = ({ data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Value Summary</h2>

      <ScriptBlock>
        "When you put all these guarantees and added bonuses together, you get incredible value for money when considering our company for your new benchtop — especially with the speed of the work and the peace of mind you'll enjoy, to get your job done right."
      </ScriptBlock>

      <ScriptBlock>
        "One final thought is, just compare what's in writing, because that's what matters."
      </ScriptBlock>

      <ScriptBlock>
        "In our Explore call I said at the end of it that I would narrow down the options to two only."
      </ScriptBlock>

      {discProfile && (
        <CoachingTip type="info">
          <strong>Transition tip ({discProfile}):</strong> {disc.proposalAdvice[4]}
        </CoachingTip>
      )}
    </div>
  );
};

// Step 9: Option Presentation
const OptionPresentation = ({ prospect, data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Present Options</h2>

      {discProfile && (
        <CoachingTip type="info">
          <strong>Closing tip ({discProfile}):</strong> {disc.proposalAdvice[5]}
        </CoachingTip>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
          <h3 className="font-bold text-blue-800 text-lg mb-3">Option 1</h3>
          <TextField label="Stone type/name:" value={data.option1Stone} onChange={(v) => update('option1Stone', v)} placeholder="e.g. Caesarstone Empira White" />
          <TextField className="mt-2" label="Investment:" value={data.option1Price} onChange={(v) => update('option1Price', v)} placeholder="e.g. $8,870.96" />
          <TextArea className="mt-2" label="Includes:" value={data.option1Includes} onChange={(v) => update('option1Includes', v)} placeholder="What's included in this option" rows={3} />
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-300">
          <h3 className="font-bold text-indigo-800 text-lg mb-3">Option 2</h3>
          <TextField label="Stone type/name:" value={data.option2Stone} onChange={(v) => update('option2Stone', v)} placeholder="e.g. YDL Calacatta Azuro" />
          <TextField className="mt-2" label="Investment:" value={data.option2Price} onChange={(v) => update('option2Price', v)} placeholder="e.g. $11,176.68" />
          <TextArea className="mt-2" label="Includes:" value={data.option2Includes} onChange={(v) => update('option2Includes', v)} placeholder="What's included in this option" rows={3} />
        </div>
      </div>

      <ScriptBlock>
        "Option 1 gives you {data.option1Stone || '[stone type]'} and your investment for that is {data.option1Price || '$...'}. Option 2 is with your choice of {data.option2Stone || '[stone type]'} and your investment is {data.option2Price || '$...'}."
      </ScriptBlock>

      <ScriptBlock>
        "Which one fits best with what you had in mind?"
      </ScriptBlock>

      <RadioGroup label="Which option did they lean towards?" name="selectedOption" value={data.selectedOption} onChange={(v) => update('selectedOption', v)} options={['Option 1', 'Option 2', 'Undecided', 'Neither']} />

      <TextArea label="Their response:" value={data.optionResponse} onChange={(v) => update('optionResponse', v)} placeholder="What did they say about the options?" rows={3} />

      {discProfile && data.selectedOption === 'Neither' && (
        <CoachingTip type="warning">
          <strong>Price objection ({discProfile}):</strong> {disc.objectionHandling.price}
        </CoachingTip>
      )}
    </div>
  );
};

// Step 10: Close
const Close = ({ prospect, data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Close</h2>

      <ScriptBlock>
        "And to get it underway, you just need to click Accept on the web page to get things underway."
      </ScriptBlock>

      <ScriptBlock>
        "That activates a notification message to me, and from there I'd send you the deposit invoice. It has the instructions of how to pay. Then once your payment has been received, I will talk to my trades to work out when we can start, and then I'll come back with a start date. And then the dates that follow after that."
      </ScriptBlock>

      <ScriptBlock>
        "So in summary, we'd love to do your job, so when you're ready, we can get it underway, so you can start enjoying your new benchtop."
      </ScriptBlock>

      <RadioGroup label="Acceptance status:" name="acceptanceStatus" value={data.acceptanceStatus} onChange={(v) => update('acceptanceStatus', v)}
        options={['Accepted on call', 'Will accept later today', 'Needs time to think', 'Wants to get other quotes', 'Declined']} />

      {data.acceptanceStatus === 'Needs time to think' && discProfile && (
        <CoachingTip type="info">
          <strong>Delay handling ({discProfile}):</strong> {disc.objectionHandling.delay}
        </CoachingTip>
      )}

      {data.acceptanceStatus === 'Wants to get other quotes' && discProfile && (
        <CoachingTip type="info">
          <strong>Competitor handling ({discProfile}):</strong> {disc.objectionHandling.competitor}
        </CoachingTip>
      )}

      <TextArea label="Next steps discussed:" value={data.nextSteps} onChange={(v) => update('nextSteps', v)} placeholder="What are the agreed next steps?" rows={3} />
    </div>
  );
};

// Step 11: Call Outcome
const CallOutcome = ({ prospect, data, update, onComplete }) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-blue-800">Call Outcome</h2>

    <SelectField label="Call outcome:" value={data.outcome} onChange={(v) => update('outcome', v)}
      options={[
        { value: 'accepted', label: 'Accepted - Won!' },
        { value: 'pending', label: 'Pending - Following up' },
        { value: 'declined', label: 'Declined - Lost' },
        { value: 'deferred', label: 'Deferred - Getting other quotes' }
      ]}
      placeholder="Select outcome"
    />

    {(data.outcome === 'pending' || data.outcome === 'deferred') && (
      <TextField label="Follow-up date:" value={data.followUpDate} onChange={(v) => update('followUpDate', v)} placeholder="e.g. Next Tuesday 2pm" />
    )}

    <TextArea label="Follow-up notes:" value={data.followUpNotes} onChange={(v) => update('followUpNotes', v)} placeholder="Key things to remember for follow-up" rows={3} />

    <TextArea label="General call notes:" value={data.callNotes} onChange={(v) => update('callNotes', v)} placeholder="Any other observations from the call" rows={4} />

    {/* Summary card */}
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h4 className="font-medium text-gray-700 mb-2">Call Summary</h4>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Prospect:</strong> {prospect.firstName} {prospect.lastName}</p>
        <p><strong>Option selected:</strong> {data.selectedOption || 'None yet'}</p>
        <p><strong>Acceptance:</strong> {data.acceptanceStatus || 'Not discussed'}</p>
        <p><strong>Outcome:</strong> {data.outcome || 'Not set'}</p>
        {data.followUpDate && <p><strong>Follow-up:</strong> {data.followUpDate}</p>}
      </div>
    </div>

    {data.status === 'completed' ? (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-medium text-green-800 mb-1">
          {data.outcome === 'accepted' ? '🎉 Won!' : 'Proposal Call Complete ✓'}
        </h3>
        <p className="text-green-700 text-sm">
          Call outcome recorded for {prospect.firstName} {prospect.lastName}.
        </p>
        <a href="/" className="inline-block mt-2 text-sm text-blue-600 hover:underline">Back to Dashboard</a>
      </div>
    ) : (
      <button onClick={onComplete} disabled={!data.outcome}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          data.outcome ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}>
        ✓ Complete Proposal Call
      </button>
    )}
  </div>
);

export const ProposalSteps = [
  ProposalOpening, SurplusStoneFollowup, ValueFraming, Guarantees,
  CompetitorCheck, CompetitorDeepDive, AddedBonuses1, AddedBonuses2,
  ValueSummary, OptionPresentation, Close, CallOutcome
];
