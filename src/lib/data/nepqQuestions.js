/**
 * NEPQ (Neuro-Emotional Persuasion Questioning) Question Banks
 * Based on Jeremy Miner's 7th Level methodology, tailored for Brisbane Benchtops.
 *
 * NEPQ 5 Stages:
 *   1. Connection (rapport, status frame)
 *   2. Engagement (Situation → Problem Awareness → Solution Awareness → Consequence)
 *   3. Transition (bridge to presentation)
 *   4. Presentation (present without presenting — only 10-15% of the call)
 *   5. Commitment (natural close)
 *
 * Question Types (colour-coded in UI):
 *   - situation (blue)        — gather facts about their current state
 *   - problemAwareness (orange) — surface frustrations and pain points
 *   - solutionAwareness (green) — explore past attempts and ideal future
 *   - consequence (red)        — what happens if nothing changes
 *   - transition (purple)      — bridge from questions to presenting
 *   - commitment (teal)        — close naturally
 */

// ═══════════════════════════════════════════════════════════════
// NEPQ STAGE DEFINITIONS
// ═══════════════════════════════════════════════════════════════

export const NEPQ_STAGES = {
  connection: {
    name: 'Connection',
    color: 'gray',
    description: 'Build rapport, establish trust, set the frame',
    percentage: '~5%'
  },
  engagement: {
    name: 'Engagement',
    color: 'blue',
    description: 'Situation → Problem Awareness → Solution Awareness → Consequence',
    percentage: '~85%'
  },
  transition: {
    name: 'Transition',
    color: 'purple',
    description: 'Bridge from questions to presentation',
    percentage: '~0%'
  },
  presentation: {
    name: 'Presentation',
    color: 'indigo',
    description: 'Present without presenting — 10-15% max',
    percentage: '~10%'
  },
  commitment: {
    name: 'Commitment',
    color: 'teal',
    description: 'Natural close — they decide, you confirm',
    percentage: '~5%'
  }
};

export const QUESTION_TYPES = {
  situation: { label: 'Situation', color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-300', textColor: 'text-blue-800', dotColor: 'bg-blue-500' },
  problemAwareness: { label: 'Problem Awareness', color: 'orange', bgColor: 'bg-orange-50', borderColor: 'border-orange-300', textColor: 'text-orange-800', dotColor: 'bg-orange-500' },
  solutionAwareness: { label: 'Solution Awareness', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-300', textColor: 'text-green-800', dotColor: 'bg-green-500' },
  consequence: { label: 'Consequence', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-300', textColor: 'text-red-800', dotColor: 'bg-red-500' },
  transition: { label: 'Transition', color: 'purple', bgColor: 'bg-purple-50', borderColor: 'border-purple-300', textColor: 'text-purple-800', dotColor: 'bg-purple-500' },
  commitment: { label: 'Commitment', color: 'teal', bgColor: 'bg-teal-50', borderColor: 'border-teal-300', textColor: 'text-teal-800', dotColor: 'bg-teal-500' }
};

// ═══════════════════════════════════════════════════════════════
// EXPLORE CALL — NEPQ QUESTIONS PER STEP
// ═══════════════════════════════════════════════════════════════

export const EXPLORE_NEPQ = {
  // Step 0: Precall Setup — no NEPQ questions (this is prep)
  0: null,

  // Step 1: Confirmation Details — no NEPQ questions
  1: null,

  // Step 2: Initial Greeting — Connection stage
  2: {
    stage: 'connection',
    coaching: "Use a calm, curious tone — not salesy. The verbal pause after your greeting is crucial. Let them respond naturally.",
    questions: []
  },

  // Step 3: DISC Assessment — no NEPQ questions (observation only)
  3: null,

  // Step 4: Introduction — Connection stage
  4: {
    stage: 'connection',
    coaching: "Setting the agenda is your 'status frame' — it positions you as the expert guide, not a salesperson. Notice the NEPQ trick: 'It is not a sales pitch' disarms their guard.",
    questions: []
  },

  // Step 5: Icebreakers Part 1 — Connection stage
  5: {
    stage: 'connection',
    coaching: "These are Connection Questions. Keep it conversational. Their answers tell you about their personality — listen for emotional cues, not just facts.",
    questions: [
      {
        type: 'situation',
        text: "What was it that made you start looking into new benchtops right now... as opposed to, say, six months from now?",
        hint: "Uncovers urgency and emotional trigger. Use verbal pause after 'right now...'",
        responseField: 'nepq_triggerTiming'
      }
    ]
  },

  // Step 6: Icebreakers Part 2 — Connection → Engagement
  6: {
    stage: 'engagement',
    coaching: "You're transitioning from Connection to Engagement. The home description questions are Situation Questions — they establish the baseline before you dig into problems.",
    questions: [
      {
        type: 'situation',
        text: "When you picture your kitchen finished... what does it look like? What's the feeling you're going for?",
        hint: "Gets them visualising the outcome — creates emotional investment early",
        responseField: 'nepq_kitchenVision'
      },
      {
        type: 'situation',
        text: "How long have you been thinking about doing something with the benchtops?",
        hint: "Reveals how long the problem has been on their mind — longer = more urgency",
        responseField: 'nepq_thinkingDuration'
      }
    ]
  },

  // Step 7: Access — Situation Questions
  7: {
    stage: 'engagement',
    coaching: "Access questions are pure Situation — gathering facts. Keep it efficient.",
    questions: []
  },

  // Step 8: Information Confirmation — Situation Questions
  8: {
    stage: 'engagement',
    coaching: "Confirming details builds trust and shows you listen. This is still Situation stage.",
    questions: []
  },

  // Step 9: Deep Dive Reason — Problem Awareness (THIS IS THE BIG ONE)
  9: {
    stage: 'engagement',
    coaching: "This is where NEPQ gets powerful. You're moving from Situation into Problem Awareness. Don't just accept their first answer — probe deeper with clarifying and probing questions. The goal is for THEM to feel the gap between where they are and where they want to be.",
    questions: [
      {
        type: 'problemAwareness',
        text: "What's been the biggest frustration with your current benchtop... is it more the look of it, or is it actually causing day-to-day issues?",
        hint: "Two Truths technique — give two options so they pick one and elaborate. Use verbal pause after 'benchtop...'",
        responseField: 'nepq_biggestFrustration'
      },
      {
        type: 'problemAwareness',
        text: "How long has that been bothering you?",
        hint: "Clarifying question — deepens the pain. The longer it's been, the more urgency they'll feel.",
        responseField: 'nepq_howLongBothered'
      },
      {
        type: 'problemAwareness',
        text: "And how does that affect things day-to-day... like when you're cooking or when people come over?",
        hint: "Probing question — connects the problem to their daily life and social identity",
        responseField: 'nepq_dailyImpact'
      },
      {
        type: 'solutionAwareness',
        text: "Have you tried to get this sorted before... or is this the first time you've seriously looked into it?",
        hint: "Solution Awareness Part 1 — uncovers past failed attempts. If they've tried before, ask what stopped them.",
        responseField: 'nepq_triedBefore'
      },
      {
        type: 'solutionAwareness',
        text: "What stopped you from moving forward at that point?",
        hint: "Only ask if they've looked before. Reveals objections they've already overcome internally.",
        responseField: 'nepq_whatStopped'
      }
    ]
  },

  // Step 10: Job Type — Solution Awareness
  10: {
    stage: 'engagement',
    coaching: "You're in Solution Awareness now. They're starting to see that this needs to happen. Help them see that the HOW matters as much as the WHAT.",
    questions: [
      {
        type: 'solutionAwareness',
        text: "If you could have this done exactly the way you wanted... with no compromises... what would that look like for you?",
        hint: "Future pacing — gets them describing their ideal outcome in their own words. Use verbal pause after 'wanted...'",
        responseField: 'nepq_idealOutcome'
      },
      {
        type: 'solutionAwareness',
        text: "What would be the most important thing for you when choosing who does this work... is it more about price, quality, speed, or something else?",
        hint: "Criteria question — their answer tells you exactly how to frame your proposal later",
        responseField: 'nepq_selectionCriteria'
      }
    ]
  },

  // Step 11: Managed Service — Consequence Questions
  11: {
    stage: 'engagement',
    coaching: "This is where Consequence Questions shine. Instead of TELLING them about the 10-18 day kitchen downtime, ASK them how that would affect them. Let them feel the weight of the wrong choice.",
    questions: [
      {
        type: 'consequence',
        text: "If you went with a company that took 2-3 weeks and you were without a functioning kitchen that whole time... how would that affect your household?",
        hint: "Consequence question — makes the pain of the wrong choice tangible. Let them talk.",
        responseField: 'nepq_longDowntimeImpact'
      },
      {
        type: 'consequence',
        text: "And what about the cost of eating out every night for two or three weeks... have you thought about what that adds up to?",
        hint: "Hidden cost consequence — reframes 'cheaper quote' as potentially more expensive overall",
        responseField: 'nepq_hiddenCosts'
      },
      {
        type: 'problemAwareness',
        text: "Have you heard any stories from friends or family about renovation jobs that didn't go to plan?",
        hint: "Borrowed experience — triggers problem awareness through other people's pain",
        responseField: 'nepq_othersBadExperience'
      }
    ]
  },

  // Step 12: Thickness & Splashback — Situation (technical)
  12: {
    stage: 'engagement',
    coaching: "Technical Situation Questions. But notice the NEPQ opportunity — the splashback gap issue is a Problem Awareness moment hiding in a technical question.",
    questions: [
      {
        type: 'problemAwareness',
        text: "Have you seen what happens when a 20mm benchtop meets an existing splashback... that gap can be a real issue. Were you aware of that?",
        hint: "Problem Awareness disguised as education — you're revealing a problem they didn't know they had",
        responseField: 'nepq_splashbackAwareness'
      }
    ]
  },

  // Step 13: Pricing & Timing — Consequence + Solution Awareness
  13: {
    stage: 'engagement',
    coaching: "Decision timeframe reveals urgency. Use Consequence Questions if they're dragging their feet, and Solution Awareness to understand their buying criteria.",
    questions: [
      {
        type: 'consequence',
        text: "If you put this off for another 6 months... would anything change, or would you just be living with the same frustrations for longer?",
        hint: "Future consequence — makes delay feel costly. Only use if they seem to be in no rush.",
        responseField: 'nepq_delayConsequence'
      },
      {
        type: 'solutionAwareness',
        text: "When you've made big decisions like this before — renovations, cars, whatever — what's usually most important to you... getting it right, or getting it cheap?",
        hint: "Anchors them to quality over price. Their answer becomes your leverage in the Proposal Call.",
        responseField: 'nepq_decisionStyle'
      }
    ]
  },

  // Step 14: Additional Stone — Situation
  14: {
    stage: 'engagement',
    coaching: "Light Situation Questions. The surplus stone conversation is about maximising value — frame it as 'it's your stone, you've paid for it.'",
    questions: []
  },

  // Step 15: Stone Brands — Solution Awareness
  15: {
    stage: 'engagement',
    coaching: "Solution Awareness — help them see the range of options. If they're fixated on one brand, explore why. If they're open, that's a buying signal.",
    questions: [
      {
        type: 'solutionAwareness',
        text: "What is it about that particular stone that appeals to you... is it the look, something you've seen online, or did someone recommend it?",
        hint: "Uncovers the emotional driver behind their choice — look, social proof, or practical",
        responseField: 'nepq_stoneAppeal'
      }
    ]
  },

  // Step 16: Sink & Cooktop — Situation (technical)
  16: {
    stage: 'engagement',
    coaching: "Pure Situation — technical details. Quick and efficient.",
    questions: []
  },

  // Step 17: Final Points — Transition
  17: {
    stage: 'transition',
    coaching: "This is the NEPQ Transition. You've done the 85% Engagement work. Now you're bridging to the Proposal Call. Summarise what you've heard — use THEIR words, not yours — and set up the next call as the natural next step.",
    questions: [
      {
        type: 'transition',
        text: "Based on everything you've shared with me today... it sounds like the main things you're looking for are [summarise their key points]. Did I get that right?",
        hint: "Transition recap — confirm you understand. Use their exact words where possible. This builds massive trust.",
        responseField: 'nepq_transitionSummary'
      },
      {
        type: 'transition',
        text: "Is there anything else that's important to you that we haven't covered?",
        hint: "Opens the floor one last time — prevents 'I forgot to mention...' objections later",
        responseField: 'nepq_anythingElse'
      }
    ]
  }
};

// ═══════════════════════════════════════════════════════════════
// PROPOSAL CALL — NEPQ QUESTIONS PER STEP
// ═══════════════════════════════════════════════════════════════

export const PROPOSAL_NEPQ = {
  // Step 0: Proposal Opening — Transition (reconnecting)
  0: {
    stage: 'transition',
    coaching: "Start by reconnecting to their pain from the Explore Call. NEPQ says: never present a proposal without first reminding them WHY they need this. Use their own words from the Explore Call.",
    questions: [
      {
        type: 'transition',
        text: "Last time we spoke, you mentioned [PAIN POINT from Explore Call]... is that still the case, or has anything changed since we talked?",
        hint: "Reconnects them to their emotional driver. Check the Explore Call answers panel for their exact words.",
        responseField: 'nepq_reconnectPain',
        usesExploreData: true
      },
      {
        type: 'situation',
        text: "Have you had any other thoughts about what you want since our last conversation?",
        hint: "Opens the door for new info and shows you care about getting it right",
        responseField: 'nepq_newThoughtsSinceLast'
      }
    ]
  },

  // Step 1: Surplus Stone Followup — Situation
  1: {
    stage: 'engagement',
    coaching: "Quick Situation check-in. Don't linger here.",
    questions: []
  },

  // Step 2: Value Framing — Transition → Presentation
  2: {
    stage: 'transition',
    coaching: "NEPQ Transition into Presentation. The 'lowest price regret' question is already NEPQ-aligned — it's a Problem Awareness question disguised as value framing. After they relate, you've earned the right to present.",
    questions: [
      {
        type: 'problemAwareness',
        text: "Have you ever gone with the cheapest option on something... and then ended up regretting it or paying more to fix it later?",
        hint: "This is already in your script — but PAUSE after asking. Let the silence do the work. Their answer is more powerful than any pitch you could give.",
        responseField: 'nepq_cheapRegret'
      },
      {
        type: 'solutionAwareness',
        text: "So when it comes to your benchtops... what matters most to you — getting the lowest price, or knowing it's done right and you won't have headaches down the track?",
        hint: "Anchoring question — whichever they pick, you win. If 'done right', that's your value prop. If 'lowest price', you can address it.",
        responseField: 'nepq_priceVsQuality'
      }
    ]
  },

  // Step 3: Five Guarantees — Presentation (NEPQ STYLE)
  3: {
    stage: 'presentation',
    coaching: "THIS IS THE BIGGEST NEPQ OPPORTUNITY. Instead of reading each guarantee, ASK about their past experience first, then reveal the guarantee as the solution. This turns a monologue into a dialogue. Present without presenting.",
    questions: [
      {
        type: 'problemAwareness',
        text: "Have you ever had a tradie not show up when they said they would... how did that affect your plans?",
        hint: "Ask BEFORE Guarantee 1 (start on agreed day). Their pain becomes the reason your guarantee matters.",
        responseField: 'nepq_tradieNoShow'
      },
      {
        type: 'problemAwareness',
        text: "When you've had work done on your home before... did it take longer than they originally said it would?",
        hint: "Ask BEFORE Guarantee 2 (fast & efficient). Most people have a horror story — let them tell it.",
        responseField: 'nepq_workTookLonger'
      },
      {
        type: 'problemAwareness',
        text: "Have you ever been left wondering what was happening with a job... like, nobody was keeping you in the loop?",
        hint: "Ask BEFORE Guarantee 3 (keep you updated). Communication failures are universal — this one always hits.",
        responseField: 'nepq_noUpdates'
      },
      {
        type: 'problemAwareness',
        text: "Have you ever been told one thing by a company and then found out afterwards it wasn't included... or there were extra charges you weren't told about?",
        hint: "Ask BEFORE Guarantees 4 & 5 (honour proposal, no hidden extras). This is the big trust builder.",
        responseField: 'nepq_hiddenCharges'
      },
      {
        type: 'commitment',
        text: "Can you see how these guarantees directly address the kinds of issues you've experienced before?",
        hint: "Micro-commitment after all 5 guarantees. They're saying YES to your value — not being sold to.",
        responseField: 'nepq_guaranteesMicroCommit'
      }
    ]
  },

  // Step 4: Competitor Check — Problem Awareness + Solution Awareness
  4: {
    stage: 'engagement',
    coaching: "This is Engagement — you're using Problem Awareness to highlight gaps in competitor quotes. NEPQ says: don't attack competitors directly. Instead, ask questions that let the prospect discover the gaps themselves.",
    questions: [
      {
        type: 'problemAwareness',
        text: "When you looked at their quote... did you feel like they really understood what you wanted, or was it more of a generic price?",
        hint: "Contrasts their experience with yours. You spent 45 mins on the Explore Call — competitors probably didn't.",
        responseField: 'nepq_competitorUnderstanding'
      },
      {
        type: 'solutionAwareness',
        text: "What would give you the most confidence that you're making the right choice here... is it the detail in the quote, the guarantees, the reviews, or something else?",
        hint: "Criteria question — their answer tells you exactly what to emphasise in the close",
        responseField: 'nepq_confidenceFactor'
      }
    ]
  },

  // Step 5: Competitor Deep Dive — Problem Awareness
  5: {
    stage: 'engagement',
    coaching: "Deep Problem Awareness on competitor gaps. Ask, don't tell. Let them discover the issues.",
    questions: [
      {
        type: 'problemAwareness',
        text: "Did their quote spell out exactly what happens if something goes wrong... like who covers the warranty on each trade?",
        hint: "Most competitors don't specify this. When the prospect realises it's missing, your QBCC license becomes gold.",
        responseField: 'nepq_competitorWarranty'
      },
      {
        type: 'consequence',
        text: "What would happen if you went with them and then found out halfway through that there were extra charges they hadn't mentioned?",
        hint: "Consequence question — makes the risk of choosing a competitor feel real and personal",
        responseField: 'nepq_competitorRiskFeeling'
      }
    ]
  },

  // Step 6: Added Bonuses 1-3 — Presentation (NEPQ STYLE)
  6: {
    stage: 'presentation',
    coaching: "Same principle as Guarantees — ask about their past experience BEFORE revealing each bonus. 'Present without presenting.'",
    questions: [
      {
        type: 'problemAwareness',
        text: "How would it affect your family if you were without a working kitchen for two or three weeks?",
        hint: "Ask BEFORE Bonus 1 (day-before removal). Makes your 2-day turnaround feel like a game-changer.",
        responseField: 'nepq_kitchenDowntimeImpact'
      },
      {
        type: 'problemAwareness',
        text: "If you had to organise the benchtop removal yourself... do you know how you'd go about that?",
        hint: "Ask BEFORE Bonus 2 (removal included). Most people have no idea — reveals the hidden complexity.",
        responseField: 'nepq_selfRemoval'
      },
      {
        type: 'solutionAwareness',
        text: "How important is it to you that the whole thing is wrapped up quickly and doesn't drag on?",
        hint: "Ask BEFORE Bonus 3 (minimal disruption). Calibrates how much this matters to them.",
        responseField: 'nepq_speedImportance'
      }
    ]
  },

  // Step 7: Added Bonuses 4-7 — Presentation (NEPQ STYLE)
  7: {
    stage: 'presentation',
    coaching: "Continue the ask-first, present-second pattern. By now they should be nodding along.",
    questions: [
      {
        type: 'solutionAwareness',
        text: "How important is it to you that all the warranty is handled by one company... rather than you having to chase up each individual trade?",
        hint: "Ask BEFORE Bonus 4 (12-month warranty). Single point of accountability is a big deal.",
        responseField: 'nepq_singleWarranty'
      },
      {
        type: 'problemAwareness',
        text: "Have you ever had a tradie do work on your home and then had to spend hours cleaning up their mess?",
        hint: "Ask BEFORE Bonus 7 (clean up included). Almost everyone has this story.",
        responseField: 'nepq_cleanupMess'
      }
    ]
  },

  // Step 8: Value Summary — Transition
  8: {
    stage: 'transition',
    coaching: "Transition from Presentation to Commitment. Summarise what THEY said matters, not what you think matters. Use their words from the NEPQ responses captured above.",
    questions: [
      {
        type: 'transition',
        text: "So based on everything we've talked about... the [their criteria], the [their pain point], and the [their ideal outcome]... does this feel like it ticks the boxes for what you're looking for?",
        hint: "Fill in from their actual NEPQ responses. This is the 'present without presenting' — you're reflecting their own words back.",
        responseField: 'nepq_valueConfirmation',
        usesExploreData: true
      }
    ]
  },

  // Step 9: Option Presentation — Presentation + Commitment
  9: {
    stage: 'presentation',
    coaching: "NEPQ says always 3 options (you currently do 2 — consider adding a third 'premium' option). Present facts, then ask which resonates. Don't push.",
    questions: [
      {
        type: 'commitment',
        text: "Based on what you told me was most important to you... which of these options feels like the best fit?",
        hint: "Ties their earlier criteria to the option choice. They're not choosing based on price alone — they're choosing based on what THEY said matters.",
        responseField: 'nepq_optionFit'
      },
      {
        type: 'commitment',
        text: "On a scale of 1 to 10... where 10 means 'let's get this done'... where are you sitting right now?",
        hint: "Qualifying question from NEPQ. If 7+, ask 'what would make it a 10?' If under 7, ask 'what's holding you back?'",
        responseField: 'nepq_readinessScale'
      }
    ]
  },

  // Step 10: Close — Commitment
  10: {
    stage: 'commitment',
    coaching: "NEPQ Commitment stage. Don't push — guide. If they hesitate, use NEPQ objection-handling questions instead of rebuttals. Questions dissolve objections; statements create resistance.",
    questions: [
      {
        type: 'commitment',
        text: "What would need to happen for you to feel 100% confident moving forward today?",
        hint: "Opens the door for them to tell you exactly what they need. Much better than 'so are you ready to go ahead?'",
        responseField: 'nepq_whatToMoveForward'
      },
      {
        type: 'commitment',
        text: "Is there anything that's giving you pause... that we haven't addressed?",
        hint: "Surfaces hidden objections before they become 'I need to think about it'",
        responseField: 'nepq_anyPause'
      }
    ]
  },

  // Step 11: Call Outcome — no NEPQ questions
  11: null
};

// ═══════════════════════════════════════════════════════════════
// NEPQ OBJECTION HANDLING QUESTIONS
// (Used as coaching tips when specific objections arise)
// ═══════════════════════════════════════════════════════════════

export const NEPQ_OBJECTION_HANDLING = {
  thinkAboutIt: {
    label: '"I need to think about it"',
    questions: [
      "That's completely fair... when you say you want to think about it, is it more about the investment, or is there something specific you're not sure about?",
      "I appreciate that... typically when people say they want to think about it, it usually comes down to one of three things — the price, the timing, or whether we're the right fit. Which one is it for you?",
      "Of course... and just so I can help, what specifically would you be weighing up?"
    ]
  },
  sendProposal: {
    label: '"Just send me the proposal/quote"',
    questions: [
      "I'd be happy to... and just so I can make sure the proposal actually answers your questions, what would be the main things you'd be looking at?",
      "Sure thing... and when you get it, what would make you say 'yes, this is the one'?",
      "Absolutely... and just out of curiosity, how many other quotes are you getting? I want to make sure ours is easy for you to compare."
    ]
  },
  tooExpensive: {
    label: '"It\'s too expensive"',
    questions: [
      "I can understand that... when you say it's too expensive, are you comparing it to something specific, or is it more that it's above what you had in mind?",
      "Fair enough... and if the price were where you wanted it, is this the kind of job and service you'd want to go with?",
      "I hear you... so if we could find a way to work within your budget — maybe adjusting the stone choice or scope — would that be worth exploring?"
    ]
  },
  otherQuotes: {
    label: '"I want to get other quotes"',
    questions: [
      "That makes total sense... and just so you have a benchmark, what are the main things you'd be comparing across the quotes?",
      "Absolutely, I'd encourage that... what would be the deciding factor for you between one quote and another?",
      "Of course... and when you do get those other quotes, would it help if I gave you a few questions to ask so you can compare apples to apples?"
    ]
  },
  partnerApproval: {
    label: '"I need to talk to my partner"',
    questions: [
      "Of course... and when you talk to them, what do you think their main concern will be — the cost, the timing, or something else?",
      "That's understandable... would it be helpful if I jumped on a quick call with both of you, so they can ask any questions directly?",
      "Sure... and in your gut, if it were just your decision, where are you leaning?"
    ]
  }
};

// ═══════════════════════════════════════════════════════════════
// HELPER: Get NEPQ stage for a given wizard step
// ═══════════════════════════════════════════════════════════════

export const getExploreNEPQStage = (stepIndex) => {
  const data = EXPLORE_NEPQ[stepIndex];
  if (!data) {
    // Default stage mapping for steps without explicit NEPQ data
    if (stepIndex <= 4) return 'connection';
    if (stepIndex <= 16) return 'engagement';
    return 'transition';
  }
  return data.stage;
};

export const getProposalNEPQStage = (stepIndex) => {
  const data = PROPOSAL_NEPQ[stepIndex];
  if (!data) {
    if (stepIndex <= 1) return 'transition';
    if (stepIndex <= 8) return 'presentation';
    if (stepIndex <= 10) return 'commitment';
    return 'commitment';
  }
  return data.stage;
};
