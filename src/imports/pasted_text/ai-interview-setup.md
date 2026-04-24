🎯 Figma Make Prompt — Screen 1 (AI Interview Setup)
🧩 Prompt

Design a clean, modern enterprise SaaS screen for creating an AI Interview (Adaptive). The layout should follow a structured, step-based form with a right-side interactive panel for advanced configuration.

Use a minimal, high-clarity design similar to modern ATS or hiring platforms. Maintain strong hierarchy, spacing, and clarity. Avoid clutter.

🟦 Overall Layout
Full-width container
Centered content area (max-width ~1100–1200px)
2-column layout:
Left: Main form (70%)
Right: Side panel (hidden by default, slides in)
Use:
Soft background (#F8FAFC or similar)
White cards with subtle shadows
Rounded corners (12–16px)
Clean typography (Inter or similar)
🟦 Header Section

Top of page:

Title:
Create AI Interview (Adaptive)

Subtitle:
Set up a dynamic, role-based interview with real-time AI questioning and deep capability validation

Spacing:

Title: large (24–28px, semibold)
Subtitle: smaller, muted (14–16px)
🟨 Section 1 — Role Information (Card)

Create a card container with padding.

Fields:

1. Role Title (text input)

Placeholder: “e.g., SAP TM Consultant, Backend Engineer”

2. Upload Job Description (upload box)

Drag & drop zone
Icon (upload)
Text: “Drag & drop or upload JD”
Subtext: “PDF, DOCX supported”

Helper text below:
“We extract skills, responsibilities, and seniority to auto-configure the interview”

🟨 Section 2 — Interview Objective (Card)

Radio group with 4 options:

Screening (L1 replacement)
Deep Evaluation ⭐ (default selected)
Final Validation
Culture Fit

Add subtle highlight for selected option.

Helper text below (dynamic for selected):
“Deep evaluation focuses on technical depth, problem-solving, and consistency through adaptive questioning”

🟨 Section 3 — Interview Type (Card)

Radio group:

Technical Interview
System Design Interview
Behavioral Interview
Mixed (Recommended) ⭐ (default)

Helper text:
“Mixed combines technical, system design, and behavioral evaluation for a complete assessment”

🟩 Section 4 — AI Interview Setup (Auto-Optimized)

Card with slightly highlighted background (very light tint)

Content:

Text:
“The AI interview is automatically configured based on the role and job description.”

Then show summary list:

Question Strategy: Cross-validation (JD + candidate profile)
Depth Level: Advanced
Follow-ups: Adaptive (real-time probing)
Interview Style: Professional ⭐
Evaluation Focus: Role-based signals
CTA Button:

Customize AI Behavior

Secondary button style
On click → opens right side panel
AFTER APPLY STATE (important)

When user customizes:

Replace button with:

AI Behavior Customized ✎ Edit

And update summary dynamically.

🟨 Section 5 — Additional Context (Collapsible Card)

Collapsed by default.

Header:
“Additional Context (Optional)” + chevron

On expand:

Resume Upload (optional)
Focus Areas input
Placeholder: “e.g., integrations, scalability, stakeholder management”
🟩 Bottom Navigation

Right aligned:

Primary button:
Continue → Configure Interview

🟦 Right Side Panel (Drawer)
Behavior
Hidden by default
Slides in from right on click
Width: ~380–420px
Background: white
Overlay: dim main screen slightly
Panel Header

Customize AI Behavior
Subtext: “Adjust how the AI asks questions and evaluates responses”

Close icon (top right)

Panel Content (scrollable)
🔹 Section 1 — Question Strategy

Radio group:

JD-based
Resume/Profile-based
Cross-validation (Recommended) ⭐ (default)
🔹 Section 2 — Depth Level

Radio group:

Basic
Advanced ⭐ (default)
Expert
🔹 Section 3 — Interview Style (IMPORTANT)

Radio group:

Conversational
Professional ⭐ (default)
Strict / Panel-style

Helper text:
“Controls how the AI interacts with the candidate”

🔹 Section 4 — Follow-up Behavior

Radio group:

Adaptive ⭐ (default)
Deep probing
🔹 Section 5 — Evaluation Focus (multi-select)

Checkbox list:

Technical Depth (checked)
Problem Solving (checked)
Consistency (checked)
Communication (unchecked)
Cultural Fit (unchecked)
🔻 Section 6 — Advanced Behavior (collapsible)

Collapsed by default

On expand:

Difficulty Adaptation

Adaptive ⭐ (default)
Fixed

Probing Intensity

Low
Medium ⭐ (default)
High
Panel Footer (sticky)

Two buttons:

Secondary: Reset to Recommended
Primary: Apply Changes
Interaction Logic
1. Open Panel
Click “Customize AI Behavior”
Panel slides in from right
2. Apply Changes
User clicks “Apply Changes”
Panel closes
Summary updates in main card
CTA changes to:
→ “AI Behavior Customized ✎ Edit”
3. Reset
Resets all fields to defaults
4. Close without Apply
Discard changes (or optionally confirm)
5. Dynamic Summary Update

If user changes:

Depth → summary updates
Style → summary updates
Strategy → summary updates
Micro-interactions
Smooth slide animation (300ms ease)
Hover states on radio/checkbox
Subtle highlight on selected options
Chevron rotate on expand/collapse
Visual Style
Clean enterprise UI
Minimal borders
Soft shadows
Accent color for selected states (blue or brand color)
Icons for sections (optional but subtle)
🎯 Final Output Expectation

Figma should generate:

Fully structured screen
Interactive side panel
Expand/collapse behavior
Apply/reset logic
Clear visual hierarchy