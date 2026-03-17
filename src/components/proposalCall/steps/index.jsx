import React, { useState } from 'react';
import { TextField, TextArea, RadioGroup, SelectField, ScriptBlock, CoachingTip, SectionDivider } from '../../common/FormFields';
import { getDiscData } from '../../../lib/disc/profiles';
import { QUESTION_TYPES } from '../../../lib/data/nepqQuestions';

// ═══════════════════════════════════════════════════════════════
// Inline NEPQ Question Component (for interweaving with step content)
// ═══════════════════════════════════════════════════════════════
const InlineNEPQ = ({ type, text, hint, responseField, response, onResponse }) => {
  const qType = QUESTION_TYPES[type] || QUESTION_TYPES.situation;
  return (
    <div className={`border rounded-lg overflow-hidden ${qType.borderColor}`}>
      <div className={`${qType.bgColor} px-4 py-2 flex items-center gap-2`}>
        <span className={`w-2.5 h-2.5 rounded-full ${qType.dotColor}`}></span>
        <span className={`text-xs font-bold uppercase tracking-wide ${qType.textColor}`}>{qType.label}</span>
      </div>
      <div className="px-4 py-3">
        <p className="font-medium text-gray-800 text-base leading-relaxed">"{text}"</p>
        {hint && <p className="text-xs text-gray-500 mt-2 italic flex items-start gap-1"><span>📝</span> {hint}</p>}
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">Their response:</label>
          <textarea
            value={response || ''}
            onChange={(e) => onResponse(responseField, e.target.value)}
            placeholder="Jot down what they said..."
            rows={2}
            className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Step 0: Proposal Opening
// ═══════════════════════════════════════════════════════════════
const ProposalOpening = ({ prospect, exploreData, data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  const painPoint = exploreData.nepq_biggestFrustration || exploreData.deepDiveReason || '';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Opening</h2>

      <TextField label="Proposal URL (SM8 link):" value={data.proposalUrl} onChange={(v) => update('proposalUrl', v)} placeholder="Paste the ServiceM8 proposal URL" />

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

      <SectionDivider title="Reconnect to Their Pain" />

      <ScriptBlock>
        "Last time we spoke, you mentioned {painPoint || '[PAIN POINT from Explore Call]'}... is that still the case, or has anything changed since we talked?"
      </ScriptBlock>
      {painPoint && (
        <CoachingTip type="success">
          Auto-populated from Explore Call. Use their exact words where possible.
        </CoachingTip>
      )}
      <TextArea label="Their response:" value={data.nepq_reconnectPain} onChange={(v) => update('nepq_reconnectPain', v)} placeholder="Has anything changed since the Explore Call?" rows={2} />

      <ScriptBlock>"Have you had any other thoughts about what you want since our last conversation?"</ScriptBlock>
      <TextArea label="New thoughts:" value={data.nepq_newThoughtsSinceLast} onChange={(v) => update('nepq_newThoughtsSinceLast', v)} placeholder="Any new ideas or changes?" rows={2} />

      {/* Quick reference from Explore Call */}
      <div className="bg-gray-50 p-4 rounded-lg border text-sm">
        <h4 className="font-medium text-gray-700 mb-2">Explore Call Summary:</h4>
        <div className="grid grid-cols-2 gap-2 text-gray-600">
          <p><strong>Room:</strong> {exploreData.room}</p>
          <p><strong>Thickness:</strong> {exploreData.benchtopThickness}</p>
          <p><strong>Managed Service:</strong> {exploreData.managedService}</p>
          <p><strong>Stone:</strong> {(exploreData.stoneBrands || []).join(', ')}</p>
          <p><strong>Colour:</strong> {exploreData.colourChoice}</p>
          <p><strong>Timeframe:</strong> {exploreData.decisionTimeframe}</p>
          <p><strong>Decision priority:</strong> {exploreData.decisionPriority}</p>
          <p><strong>Additional Stone:</strong> {exploreData.additionalStoneWanted}</p>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Step 1: Surplus Stone Followup
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// Step 2: Value Framing (with NEPQ dropdown selector)
// ═══════════════════════════════════════════════════════════════
const ValueFraming = ({ data, update, exploreData, discProfile }) => {
  const disc = getDiscData(discProfile);
  const canSee = data.canSeeProposal === 'Yes - Computer' || data.canSeeProposal === 'Yes - Phone';
  const [selectedNepq, setSelectedNepq] = useState('');

  const nepqOptions = [
    { value: 'cheapRegret', type: 'problemAwareness', text: "Have you ever gone with the cheapest option on something... and then ended up regretting it or paying more to fix it later?", hint: "PAUSE after asking. Let the silence do the work. Their answer is more powerful than any pitch.", responseField: 'nepq_cheapRegret' },
    { value: 'priceVsQuality', type: 'solutionAwareness', text: "So when it comes to your benchtops... what matters most to you — getting the lowest price, or knowing it's done right and you won't have headaches down the track?", hint: "Anchoring question — whichever they pick, you win.", responseField: 'nepq_priceVsQuality' }
  ];

  const selectedQ = nepqOptions.find(q => q.value === selectedNepq);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Value Framing</h2>

      {discProfile && (
        <CoachingTip type="info">{disc.proposalAdvice[2]}</CoachingTip>
      )}

      <ScriptBlock>
        "So, last time we spoke, I said that I needed to narrow down the choices to 2 options. That's what I have been doing, by going backwards and forwards with our suppliers."
      </ScriptBlock>

      {!canSee && (
        <ScriptBlock>
          "Has the proposal come through yet? [PAUSE] [if no check junk] Great, have you got it open? [PAUSE] Right, let's jump in."
        </ScriptBlock>
      )}

      <ScriptBlock>
        "So you might notice it's not actually a PDF but rather an interactive document. Don't worry, I'm not going to read it all to you."
      </ScriptBlock>

      <SectionDivider title="NEPQ Value Question" />
      <CoachingTip type="info">Pick the question that feels most natural for this prospect:</CoachingTip>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Choose a NEPQ question to ask:</label>
        <select
          value={selectedNepq}
          onChange={(e) => setSelectedNepq(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a question...</option>
          <option value="cheapRegret">Cheapest option regret (Problem Awareness)</option>
          <option value="priceVsQuality">Lowest price vs done right (Solution Awareness)</option>
        </select>
      </div>

      {selectedQ && (
        <InlineNEPQ
          type={selectedQ.type}
          text={selectedQ.text}
          hint={selectedQ.hint}
          responseField={selectedQ.responseField}
          response={data[selectedQ.responseField]}
          onResponse={(field, val) => update(field, val)}
        />
      )}

      <ScriptBlock>
        "As you scroll through, does what you see so far feel like it aligns with what you told me was important — {exploreData.decisionPriority === 'Getting it right' ? 'getting it done right' : 'getting good value'}?"
      </ScriptBlock>
      <TextArea label="Their response to value framing:" value={data.valueFramingResponse} onChange={(v) => update('valueFramingResponse', v)} placeholder="How did they respond?" rows={2} />

      <ScriptBlock>
        "The section that I would like focus on for a moment is the value that we offer, and why choose Brisbane Benchtops."
      </ScriptBlock>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Step 3: Five Guarantees (NEPQ interwoven)
// ═══════════════════════════════════════════════════════════════
const Guarantees = ({ data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">5 Peace of Mind Guarantees</h2>

      <CoachingTip type="info">
        <strong>NEPQ Pattern:</strong> Ask the question FIRST, let them share their experience, THEN reveal the guarantee as the solution. Present without presenting.
      </CoachingTip>

      <ScriptBlock>"For a start, we offer five peace of mind guarantees."</ScriptBlock>

      <div className="space-y-5">
        {/* NEPQ Q1 → Guarantee 1 */}
        <InlineNEPQ
          type="problemAwareness"
          text="Have you ever had a tradie not show up when they said they would... how did that affect your plans?"
          hint="Ask BEFORE Guarantee 1. Their pain becomes the reason your guarantee matters."
          responseField="nepq_tradieNoShow"
          response={data.nepq_tradieNoShow}
          onResponse={(f, v) => update(f, v)}
        />
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 1: Start on the agreed day</h4>
          <ScriptBlock>
            "The first one is we will start on the agreed and specified day, because we understand you had to rearrange your life for this benchtop, and we respect the time you're giving in order to make this happen. And you may have experienced that, or maybe it's just me, and a few other people."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee1Response} onChange={(v) => update('guarantee1Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        {/* NEPQ Q2 → Guarantee 2 */}
        <InlineNEPQ
          type="problemAwareness"
          text="When you've had work done on your home before... did it take longer than they originally said it would?"
          hint="Ask BEFORE Guarantee 2. Most people have a horror story — let them tell it."
          responseField="nepq_workTookLonger"
          response={data.nepq_workTookLonger}
          onResponse={(f, v) => update(f, v)}
        />
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 2: Fast & efficient</h4>
          <ScriptBlock>
            "Guarantee two, is that we will allocate the resources to be fast and efficient, to minimise the disruption to your household. Again, this is my own experience that I want to ensure doesn't happen to any of our customers, and hope you can relate to that?"
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee2Response} onChange={(v) => update('guarantee2Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        {/* NEPQ Q3 → Guarantee 3 */}
        <InlineNEPQ
          type="problemAwareness"
          text="Have you ever been left wondering what was happening with a job... like, nobody was keeping you in the loop?"
          hint="Ask BEFORE Guarantee 3. Communication failures are universal — this one always hits."
          responseField="nepq_noUpdates"
          response={data.nepq_noUpdates}
          onResponse={(f, v) => update(f, v)}
        />
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-1">Guarantee 3: Keep you updated</h4>
          <ScriptBlock>
            "Our third guarantee, is to keep you updated every step of the way, so you're always aware of how the job is going. So you're never wondering how the project is going."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.guarantee3Response} onChange={(v) => update('guarantee3Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        {/* NEPQ Q4 → Guarantee 4 + 5 */}
        <InlineNEPQ
          type="problemAwareness"
          text="Have you ever been told one thing by a company and then found out afterwards it wasn't included... or there were extra charges you weren't told about?"
          hint="Ask BEFORE Guarantees 4 & 5. This is the big trust builder."
          responseField="nepq_hiddenCharges"
          response={data.nepq_hiddenCharges}
          onResponse={(f, v) => update(f, v)}
        />
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

        {/* NEPQ micro-commitment after all 5 */}
        <InlineNEPQ
          type="commitment"
          text="Can you see how these guarantees directly address the kinds of issues you've experienced before?"
          hint="Micro-commitment. They're saying YES to your value — not being sold to."
          responseField="nepq_guaranteesMicroCommit"
          response={data.nepq_guaranteesMicroCommit}
          onResponse={(f, v) => update(f, v)}
        />
      </div>

      <ScriptBlock>"Do you have any questions about any of your 5 guarantees?"</ScriptBlock>
      <TextArea label="Questions:" value={data.guaranteesQuestions} onChange={(v) => update('guaranteesQuestions', v)} placeholder="Any questions about the guarantees?" rows={2} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Step 4: Competitor Check
// ═══════════════════════════════════════════════════════════════
const CompetitorCheck = ({ data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Competitor Check</h2>

      <ScriptBlock>
        "Have you received any other quotes in writing? I'd like to possibly help you understand what's written and what's not, to read between the lines."
      </ScriptBlock>

      <RadioGroup label="Has other quotes?" name="hasOtherQuotes" value={data.hasOtherQuotes} onChange={(v) => update('hasOtherQuotes', v)} options={['Yes', 'No']} />

      {data.hasOtherQuotes === 'Yes' && (
        <>
          <ScriptBlock>"How did it look? Was it as comprehensive as your proposal?"</ScriptBlock>
          <TextArea label="Competitor quote impression:" value={data.competitorImpression} onChange={(v) => update('competitorImpression', v)} placeholder="How did their quote compare to yours?" rows={2} />

          <InlineNEPQ
            type="problemAwareness"
            text="When you looked at their quote... did you feel like they really understood what you wanted, or was it more of a generic price?"
            hint="Contrasts their experience with yours. You spent 45 mins on the Explore Call — competitors probably didn't."
            responseField="nepq_competitorUnderstanding"
            response={data.nepq_competitorUnderstanding}
            onResponse={(f, v) => update(f, v)}
          />

          <InlineNEPQ
            type="solutionAwareness"
            text="What would give you the most confidence that you're making the right choice here... is it the detail in the quote, the guarantees, the reviews, or something else?"
            hint="Criteria question — their answer tells you exactly what to emphasise in the close."
            responseField="nepq_confidenceFactor"
            response={data.nepq_confidenceFactor}
            onResponse={(f, v) => update(f, v)}
          />

          {discProfile && (
            <CoachingTip type="info">
              <strong>Objection tip ({discProfile}):</strong> {disc.objectionHandling.competitor}
            </CoachingTip>
          )}
        </>
      )}

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
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Step 5: Competitor Deep Dive
// ═══════════════════════════════════════════════════════════════
const CompetitorDeepDive = ({ data, update, discProfile }) => {
  const hasQuotes = data.hasOtherQuotes === 'Yes';

  if (!hasQuotes) {
    return (
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-blue-800">Competitor Deep Dive</h2>
        <CoachingTip type="success">
          No competitor quotes to discuss. Skip to next step or reinforce the questions from the previous step.
        </CoachingTip>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Competitor Deep Dive</h2>

      <InlineNEPQ
        type="problemAwareness"
        text="Did their quote spell out exactly what happens if something goes wrong... like who covers the warranty on each trade?"
        hint="Most competitors don't specify this. When they realise it's missing, your QBCC license becomes gold."
        responseField="nepq_competitorWarranty"
        response={data.nepq_competitorWarranty}
        onResponse={(f, v) => update(f, v)}
      />

      <InlineNEPQ
        type="consequence"
        text="What would happen if you went with them and then found out halfway through that there were extra charges they hadn't mentioned?"
        hint="Consequence question — makes the risk of choosing a competitor feel real and personal."
        responseField="nepq_competitorRiskFeeling"
        response={data.nepq_competitorRiskFeeling}
        onResponse={(f, v) => update(f, v)}
      />

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

// ═══════════════════════════════════════════════════════════════
// Step 6: Added Bonuses 1-3 (NEPQ interwoven)
// ═══════════════════════════════════════════════════════════════
const AddedBonuses1 = ({ data, update, exploreData }) => {
  const hasQuotes = data.hasOtherQuotes === 'Yes';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Added Bonus Inclusions (1-3)</h2>

      <ScriptBlock>"And there are 7 added bonus inclusions."</ScriptBlock>

      <CoachingTip type="info">
        <strong>NEPQ Pattern:</strong> Ask the question FIRST, then reveal the bonus. Let them feel the problem before you offer the solution.
      </CoachingTip>

      <div className="space-y-5">
        {/* NEPQ Q1 → Bonus 1 */}
        <InlineNEPQ
          type="problemAwareness"
          text="How would it affect your family, your investment, or your timeline if you were without a working kitchen for two or three weeks?"
          hint="Ask BEFORE Bonus 1 (day-before removal). Makes your 2-day turnaround feel like a game-changer."
          responseField="nepq_kitchenDowntimeImpact"
          response={data.nepq_kitchenDowntimeImpact}
          onResponse={(f, v) => update(f, v)}
        />
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800">Bonus 1: Day-before removal</h4>
          <ScriptBlock>
            "Your benchtop will be removed the day before installation. This is important because with competitors, it's typical ripout — template — two to three weeks — install time — and you'll be without a functional kitchen for usually two weeks. How do you feel about that?"
          </ScriptBlock>
          <ScriptBlock>"With our team, it's — two days — rip out and install."</ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.bonus1Response} onChange={(v) => update('bonus1Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        {/* NEPQ Q2 → Bonus 2 */}
        <InlineNEPQ
          type="problemAwareness"
          text="If you had to organise the benchtop removal yourself... do you know how you'd go about that?"
          hint="Ask BEFORE Bonus 2 (removal included). Most people have no idea — reveals the hidden complexity."
          responseField="nepq_selfRemoval"
          response={data.nepq_selfRemoval}
          onResponse={(f, v) => update(f, v)}
        />
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
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

        {/* NEPQ Q3 → Bonus 3 */}
        <InlineNEPQ
          type="solutionAwareness"
          text="How important is it to you that the whole thing is wrapped up quickly and doesn't drag on?"
          hint="Ask BEFORE Bonus 3 (minimal disruption). Calibrates how much this matters to them."
          responseField="nepq_speedImportance"
          response={data.nepq_speedImportance}
          onResponse={(f, v) => update(f, v)}
        />
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
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

// ═══════════════════════════════════════════════════════════════
// Step 7: Added Bonuses 4-7 (NEPQ interwoven)
// ═══════════════════════════════════════════════════════════════
const AddedBonuses2 = ({ data, update }) => {
  const hasQuotes = data.hasOtherQuotes === 'Yes';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Added Bonus Inclusions (4-7)</h2>

      <div className="space-y-5">
        {/* NEPQ Q1 → Bonus 4, 5, 6 */}
        <InlineNEPQ
          type="solutionAwareness"
          text="How important is it to you that all the warranty is handled by one company... rather than you having to chase up each individual trade?"
          hint="Ask BEFORE Bonus 4. Single point of accountability is a big deal."
          responseField="nepq_singleWarranty"
          response={data.nepq_singleWarranty}
          onResponse={(f, v) => update(f, v)}
        />

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
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

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800">Bonus 5: Local company, personal service</h4>
          <ScriptBlock>
            "You'll be dealing with a local company, not an impersonal national or multi-national corporation. If you have any challenges after our service, we are only a phone call away. You'll be dealing with me because I'm the business owner, the customer service officer and the project manager."
          </ScriptBlock>
          <TextArea className="mt-2" label="Response:" value={data.bonus5Response} onChange={(v) => update('bonus5Response', v)} placeholder="Their reaction" rows={1} />
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
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

        {/* NEPQ Q2 → Bonus 7 */}
        <InlineNEPQ
          type="problemAwareness"
          text="Have you ever had a tradie do work on your home and then had to spend hours cleaning up their mess?"
          hint="Ask BEFORE Bonus 7 (clean up included). Almost everyone has this story."
          responseField="nepq_cleanupMess"
          response={data.nepq_cleanupMess}
          onResponse={(f, v) => update(f, v)}
        />

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
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

// ═══════════════════════════════════════════════════════════════
// Step 8: Value Summary (NEPQ merged, auto-populated)
// ═══════════════════════════════════════════════════════════════
const ValueSummary = ({ data, update, exploreData, discProfile }) => {
  const disc = getDiscData(discProfile);
  const criteria = exploreData.nepq_selectionCriteria || exploreData.decisionPriority || '[their criteria]';
  const painPoint = exploreData.nepq_biggestFrustration || exploreData.deepDiveReason || '[their pain point]';
  const idealOutcome = exploreData.nepq_idealOutcome || exploreData.nepq_kitchenVision || '[their ideal outcome]';

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Value Summary</h2>

      {/* Auto-populated reference */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h4 className="font-medium text-indigo-800 mb-2">Auto-populated from Explore Call:</h4>
        <div className="text-sm space-y-1 text-indigo-700">
          <p><strong>Their criteria:</strong> {criteria}</p>
          <p><strong>Their pain point:</strong> {painPoint}</p>
          <p><strong>Their ideal outcome:</strong> {idealOutcome}</p>
        </div>
      </div>

      <InlineNEPQ
        type="transition"
        text={`So based on everything we've talked about... the ${criteria}, the ${painPoint}, and the ${idealOutcome}... does this feel like it ticks the boxes for what you're looking for?`}
        hint="Reflect their own words back. This is 'present without presenting.'"
        responseField="nepq_valueConfirmation"
        response={data.nepq_valueConfirmation}
        onResponse={(f, v) => update(f, v)}
      />

      <ScriptBlock>
        "When you look at everything together — the guarantees, the bonuses, the speed of the work, and the fact that it's all in writing... does that give you the kind of peace of mind you were looking for?"
      </ScriptBlock>
      <TextArea label="Their response:" value={data.valueSummaryResponse} onChange={(v) => update('valueSummaryResponse', v)} placeholder="How did they respond?" rows={2} />

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

// ═══════════════════════════════════════════════════════════════
// Step 9: Option Presentation (options above NEPQ, merged question)
// ═══════════════════════════════════════════════════════════════
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

      {/* Options FIRST */}
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

      {/* NEPQ merged — "Which one fits best" replaces the old separate question */}
      <InlineNEPQ
        type="commitment"
        text="Which one fits best with what you had in mind?"
        hint="Ties their earlier criteria to the option choice. They're choosing based on what THEY said matters."
        responseField="nepq_optionFit"
        response={data.nepq_optionFit}
        onResponse={(f, v) => update(f, v)}
      />

      <RadioGroup label="Which option did they lean towards?" name="selectedOption" value={data.selectedOption} onChange={(v) => update('selectedOption', v)} options={['Option 1', 'Option 2', 'Undecided', 'Neither']} />

      {/* Readiness scale */}
      <InlineNEPQ
        type="commitment"
        text="On a scale of 1 to 10... where 10 means 'let's get this done'... where are you sitting right now?"
        hint="If 7+, ask 'what would make it a 10?' If under 7, ask 'what's holding you back?'"
        responseField="nepq_readinessScale"
        response={data.nepq_readinessScale}
        onResponse={(f, v) => update(f, v)}
      />

      <TextArea label="Their response:" value={data.optionResponse} onChange={(v) => update('optionResponse', v)} placeholder="What did they say about the options?" rows={3} />

      {discProfile && data.selectedOption === 'Neither' && (
        <CoachingTip type="warning">
          <strong>Price objection ({discProfile}):</strong> {disc.objectionHandling.price}
        </CoachingTip>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Step 10: Close
// ═══════════════════════════════════════════════════════════════
const Close = ({ prospect, data, update, discProfile }) => {
  const disc = getDiscData(discProfile);
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800">Close</h2>

      <InlineNEPQ
        type="commitment"
        text="What would need to happen for you to feel 100% confident moving forward today?"
        hint="Opens the door for them to tell you exactly what they need. Much better than 'so are you ready to go ahead?'"
        responseField="nepq_whatToMoveForward"
        response={data.nepq_whatToMoveForward}
        onResponse={(f, v) => update(f, v)}
      />

      <InlineNEPQ
        type="commitment"
        text="Is there anything that's giving you pause... that we haven't addressed?"
        hint="Surfaces hidden objections before they become 'I need to think about it'."
        responseField="nepq_anyPause"
        response={data.nepq_anyPause}
        onResponse={(f, v) => update(f, v)}
      />

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

// ═══════════════════════════════════════════════════════════════
// Step 11: Call Outcome
// ═══════════════════════════════════════════════════════════════
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
