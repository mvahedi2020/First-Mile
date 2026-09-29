# First Mile — product brief and decision rationale

**Date:** September 28, 2026 · **Session:** S001 · **Stage:** framing, before implementation

## 1. The problem and primary user

**Primary user:** a first-time administrator setting up inquiry routing for a small B2B team in the fictional Northstar workspace. They understand their team's job but should not need technical configuration knowledge to try the product.

**Problem hypothesis:** requiring team invitations, workspace details, and routing configuration before a useful result may make the administrator abandon setup without understanding the benefit. This is a hypothesis for this prototype, not a finding from customer interviews.

**User job:** “Let me see whether an inquiry can reach the right place before I ask my team to join.”

**Entry situation:** the administrator is evaluating whether a new workspace fits an existing team need. They have not connected an inbox or brought in teammates. This is a chosen sample context, not evidence that all new customers arrive at the same stage.

The buyer, an experienced administrator optimizing an established workspace, and a teammate handling daily requests are outside the primary journey. Keeping one user and one setup decision makes the value proposition testable.

The administrator can decide whether the practice workflow is understandable and relevant. That does not establish purchase authority or permission to connect a real customer system. “Administrator” describes the scenario role; it does not imply implemented access controls.

## 2. The smallest useful outcome

The administrator deliberately routes **one bundled fictional inquiry to its intended sample queue**, then can identify the destination and explain that the action was practice only.

A completed checklist, visited screen, or selected template alone is not this outcome. The result must make the connection between the user's goal, chosen setup, and destination visible. Completing practice does not mean the workspace is ready for real customers.

| Evidence level | What it would establish | What it would not establish |
|---|---|---|
| Practice action completed | The sample inquiry reached the intended sample queue. | The person understood the destination. |
| Result understood | The person correctly explained the destination and practice boundary. | Their team adopted the product. |
| Real adoption | Requires separately obtained evidence of actual ongoing use. | Cannot be inferred from this fictional demonstration. |

The intended journey is:

1. Choose the supported goal: try routing a customer inquiry.
2. Preview a small-team template and understand its intended destination.
3. Confirm the practice setup and route the sample inquiry.
4. Inspect the result, then defer optional collaborator setup if desired.
5. Return later with an understandable account of what was done and what remains.

These are intended capabilities, not implemented behavior. S002 will define the original sample records and exact interaction rules.

## 3. Decision: first useful outcome before complete setup

**Commercial hypothesis:** allowing an administrator to evaluate a useful workflow before involving teammates may reduce the effort needed to decide whether to continue evaluating the product. The potential beneficiary is the team considering the product. Purchase intent, willingness to pay, and reduced onboarding cost remain unknown; this prototype will not measure them through simulated activity.

**Working direction:** a guided practice journey using a prepared template, followed by optional setup. This follows the authorized First Mile plan. The detailed rationale below is the current product recommendation, open to Mo's review; it is not presented as a separately observed customer preference.

| Approach | Benefit | Cost or risk | Decision |
|---|---|---|---|
| Complete setup before allowing practice | The user encounters all configuration choices before acting. | Invitations and unfamiliar settings delay the first result; more completion does not establish understanding. | Principal alternative; do not use for this bounded practice journey. |
| Start with a blank workspace | Experienced users have flexibility from the beginning. | A first-time administrator has to invent both the setup and a meaningful trial. | Defer; it serves a different starting user. |
| Guided practice with a prepared template | Makes one outcome reachable with few decisions and a visible explanation. | The template can hide real complexity or feel irrelevant to a different workflow. | Choose for the prototype; disclose practice scope and show the destination before confirmation. |

The tradeoff is deliberate: less early flexibility in exchange for a more understandable first attempt. We will not disguise a single supported journey as broad customization.

### What must happen first, and why?

| Step or input | Before the first outcome? | Product reason |
|---|---|---|
| Identify the inquiry-routing goal | Yes | The administrator needs to know which benefit this practice can demonstrate. A single supported goal must be described honestly. |
| Review the template's routing destination | Yes | A successful-looking result is misleading if the person cannot tell where the inquiry will go. |
| Confirm the practice action | Yes | The person should distinguish looking at a suggested setup from choosing to use it. |
| Invent a workspace name or upload branding | No | Neither changes whether the bundled inquiry reaches the intended sample queue. Use a fictional default. |
| Invite collaborators | No | One person can evaluate this practice outcome. A real invitation is outside scope entirely. |
| Configure real channels, credentials, or integrations | No | This prototype uses bundled sample data and performs no external action. |
| Complete every remaining setup step | No | Optional work must not become an artificial prerequisite for value or be counted as completed when skipped. |

“Minimum setup” therefore means the choices needed to understand and intentionally try this outcome, not a long form with fewer required fields.

## 4. Boundaries and experience direction

The planned scope is one guided practice outcome, a clear optional-setup choice, and an understandable return visit. The visual direction is warm white, ink, and tangerine, with a calm guided journey beside a small workspace preview. Detailed visual and state decisions belong to S002.

Exclude sign-in, real invitations or messages, live routing, paid APIs, external AI models, production integrations, a full help desk, and connections to the five existing portfolio demos. First Mile explores initial adoption; it does not reproduce Asana Agent's ongoing conversational task management or Feedback Nexus's feedback prioritization.

Use original fictional Northstar content. Do not copy employer materials, resume metrics, customer data, or private planning sources into the sample. A practice success is not a claim of customer activation, retention, revenue, or reduced support demand.

## 5. What would support or change the decision?

| Question | Proposed evidence | How it affects the decision |
|---|---|---|
| Can a first-time administrator reach the practice outcome without help? | In a separately authorized formative study, observe completion and record assistance. Start timing at the first actionable goal screen; stop when the routing result is visible. Report comprehension separately. | Repeated stalls before the result would justify simplifying or explaining the prerequisite causing them. |
| Do they understand the result rather than just finish the flow? | Ask the person to identify the destination and explain whether anything was sent externally. | A fast completion with a wrong explanation is not a successful comprehension outcome; clarify practice and routing context. |
| Can optional setup wait without creating confusion? | Observe the defer choice and ask what remains when the person returns. | Confusing skipped with completed would require clearer progress and return messaging. |
| Is the prepared template relevant enough? | Record when the supported goal fails to match the person's stated job and why. | Repeated mismatch would reopen the primary-user or template choice before adding more setup screens. |

These are proposed observations, not a study conducted today. No participant count, performance target, or improvement percentage is claimed. A later comparison with setup-first would require a defined study; this brief does not establish that guided practice is faster.

Software checks will separately establish whether the committed prototype follows its stated rules. They cannot establish that real users find it useful or easy.

## 6. Today's acceptance and next boundary

S001 defines the primary user, problem hypothesis, observable outcome, principal alternative, prerequisite rationale, non-goals, and fictional-data boundary. The main product decision is explainable without reading code: **ask only for decisions needed to understand and try one useful result; let unrelated setup wait.**

The next session is S002: specify sample records, interaction states, cancellation, errors, recovery, and visual direction. Public repository creation and the first application foundation belong to S003. No application, test results, user study, or deployment is represented as completed by this brief.
