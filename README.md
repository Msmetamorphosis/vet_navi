# NextMission Navigator

Helping veterans plan their next chapter with clarity, connection, and confidence.

---

## 🙌 Overview

NextMission Navigator is a personalized, AI-powered assistant built to guide veterans through civilian transition. Whether the goal is finding housing, accessing mental health support, applying for grants, or exploring new career paths, this tool turns real-time, trusted data into tailored, step-by-step action plans.

Powered by Anthropic Claude, it delivers accurate, relevant, and personalized recommendations based on a veteran's unique goals. Integrated voice functionality, developed using Claude Haiku and ElevenLabs, provides an accessible, conversational experience designed to meet users where they are.

The mission is simple: empower those who served by providing clear direction, actionable resources, and AI-powered confidence.

---

## 🔧 Built With

- **Next.js** – Frontend framework for modern, scalable React apps  
- **Tailwind CSS + ShadCN UI** – Responsive, accessible, production-grade styling  
- **Anthropic Claude (via Bolt)** – Delivers AI-generated, trusted, real-time recommendations  
- **Claude Haiku + ElevenLabs** – Voice-enabled AI responses for enhanced accessibility  
- **Custom API Logic & Prompt Engineering** – Structured to ensure highly relevant, goal-specific action plans based on user input  
- **Custom Knowledge Base & Prompt Library** – Curated by the creator to align AI responses with the specific needs of veterans and transitioning service members  
- **IONOS Domain & Integration** – Domain management and platform connectivity  
- **Netlify** – Seamless deployment and scalable hosting  
- **GitHub** – Version control and collaborative development  

---

## 🤝 Why It Matters

Veterans exit military service with unmatched skills but often face overwhelming civilian systems without clear guidance. NextMission Navigator exists to:

- Reduce the complexity and confusion of civilian transition  
- Offer real resources, not just information overload  
- Promote confidence, clarity, and forward action  
- Connect veterans with AI-powered, trustworthy recommendations  

No veteran should feel lost after service. This project bridges that gap using AI, trusted resources, and simplified next steps.

---

## ✨ Features

✅ AI-generated action plans tailored to personal veteran goals  
✅ Real-time, relevant responses based on user context  
✅ Structured, actionable recommendations with step-by-step instructions  
✅ Voice-enabled responses powered by Claude Haiku + ElevenLabs  
✅ Smart API logic ensuring outputs align precisely with each user's stated needs  
✅ Custom knowledge base guides conversational accuracy for veterans  
✅ Mobile-responsive, intuitive interface  
✅ Professional, empathetic tone designed for ease and accessibility  

---

## 📂 Core Architecture

`lib/`  
├── `claude-api.js` – Core Claude API integration with goal detection and custom logic  
├── `api-client.js` – Centralized API client with fallback handling  
└── `utils.js` – Utility functions  

---

## 🛠️ Error Handling

- Graceful fallback to mock responses when the Claude API is unavailable  
- User-friendly error messages for reliability  
- Automatic detection of invalid or incomplete responses  

---

## 💡 Example Usage

```js
import { generateActionPlan } from '@/lib/api-client';

const plan = await generateActionPlan("I want to transition into tech", {
  militaryBranch: "Army",
  yearsOfService: "6",
  currentLocation: "Tampa",
  targetIndustry: "cybersecurity"
});
```
## 🚀 Try It Out

🔗 [Live App](https://vetnavi.ai/)  
💻 [GitHub Repo](https://github.com/MsMetamorphosis/NextMission_Navigator)  

---

## 🌟 About the Creator

Created 100% solo by me, **Crystal Tubbs**, an AI strategist, engineer, and transformation-focused technologist with a background in blockchain, ethical AI development, and a deep commitment to veteran empowerment.

I developed the custom AI logic and knowledge base, structuring both the conversational and voice interfaces to consistently deliver highly relevant, goal-specific recommendations for each user. This ensures veterans receive actionable, personalized plans, never generic, off-topic AI responses.

With lived experience as both an Army veteran and military spouse, I built this project from the ground up; designing prompts, engineering AI outputs, integrating voice technology, refining UI/UX, and deploying a functional MVP, all while balancing entrepreneurship, motherhood, and life transitions.

NextMission Navigator is more than a pet project. It is proof of how purpose, grit, and belief in technology’s potential can drive real solutions.

---

## 🌐 Future Roadmap

✔ Optimize for mobile-first experience  
✔ Expand to serve military spouses, caregivers, and underserved communities  
✔ Enhance voice and chatbot interfaces for greater accessibility  
✔ Develop partnerships with veteran organizations to fund and scale access  
✔ Advance toward commercialization with ethical AI, data privacy, and user trust at the core  
✔ Launch the Veterans Community Hub, providing mentorship opportunities where veterans can mentor or be mentored during their transition  
✔ Build premium features behind a paywall allowing veterans to upload their JST (Joint Services Transcript), redacted DD214, service records, college transcripts, and job postings of interest  
✔ Use AI to analyze transferable skills, identify skill gaps, and generate a personalized, one-of-a-kind action plan tailored to each veteran’s unique goals  

---

## 🔒 Legal Notice

© 2025 Crystal Tubbs | Metamorphic Curations | All rights reserved.  

This project, including all source code, designs, branding, and intellectual property, is the exclusive property of the creator.  

Unauthorized use, reproduction, or distribution is prohibited.  
Commercial use, modification, or sublicensing requires explicit written permission.  
NextMission Navigator™ and related branding are protected under applicable laws.  
This project is shared for demonstration and evaluation purposes only and is not currently licensed for public or commercial use.  

---

## 🔗 Connect

🌐 [Metamorphic Curations](https://metamorphiccurations.com)  
💼 [LinkedIn - Crystal Tubbs](https://linkedin.com/in/crystaltubbs)  
🐦 [Twitter/X - @itsallajourney](https://twitter.com/itsallajourney)  

_For every veteran wondering what’s next, this navigator was built to help you find it._  
