// API client for handling all external API calls
// This provides a centralized way to manage API interactions

import { ClaudeAPI, getClaudeAPIKey, handleClaudeError } from './claude-api.js';

class APIClient {
  constructor() {
    this.claudeAPI = null;
    this.initializeClaudeAPI();
  }

  initializeClaudeAPI() {
    const apiKey = getClaudeAPIKey();
    if (apiKey) {
      this.claudeAPI = new ClaudeAPI(apiKey);
    } else {
      console.warn('Claude API key not found. AI features will use mock responses.');
    }
  }

  async generateActionPlan(goal, userContext = {}) {
    if (!this.claudeAPI) {
      return this.getMockActionPlan(goal);
    }

    try {
      return await this.claudeAPI.generateActionPlan(goal, userContext);
    } catch (error) {
      console.error('Claude API error:', error);
      // Fallback to mock response
      return this.getMockActionPlan(goal);
    }
  }

  async sendChatMessage(message, conversationHistory = []) {
    if (!this.claudeAPI) {
      return this.getMockChatResponse(message);
    }

    try {
      return await this.claudeAPI.chatWithClaude(message, conversationHistory);
    } catch (error) {
      console.error('Claude API error:', error);
      return this.getMockChatResponse(message);
    }
  }

  getMockActionPlan(goal) {
    // Enhanced mock responses based on goal analysis
    const goalLower = goal.toLowerCase();
    
    // Housing/VA Loan Mock
    if (this.containsHousingKeywords(goalLower)) {
      return {
        categories: [
          {
            name: 'Housing & VA Loans',
            steps: [
              {
                title: 'Check VA Loan Eligibility',
                description: 'Verify your eligibility for VA home loan benefits and obtain your Certificate of Eligibility (COE).',
                link: '[VA Home Loan Eligibility](https://va.gov/housing-assistance/home-loans/eligibility/)',
                timeframe: '1-2 weeks',
                priority: 'high'
              },
              {
                title: 'Get Pre-approved for VA Loan',
                description: 'Contact VA-approved lenders to get pre-approved and understand your budget.',
                link: '[Find VA-Approved Lenders](https://va.gov/housing-assistance/home-loans/lender-directory/)',
                timeframe: '2-3 weeks',
                priority: 'high'
              },
              {
                title: 'Find a VA-Experienced Real Estate Agent',
                description: 'Work with an agent familiar with VA loan processes and requirements.',
                link: '[VA Real Estate Resources](https://va.gov/housing-assistance/)',
                timeframe: '1 week',
                priority: 'medium'
              }
            ]
          }
        ],
        follow_up: 'Are you looking to buy your first home, or have you used VA loan benefits before? Also, what\'s your target timeline for purchasing?'
      };
    }

    // Disability Benefits Mock
    if (this.containsDisabilityKeywords(goalLower)) {
      return {
        categories: [
          {
            name: 'Disability Benefits',
            steps: [
              {
                title: 'Gather Medical Documentation',
                description: 'Collect all medical records, service records, and evidence related to your condition.',
                link: '[VA Disability Claims Evidence](https://va.gov/disability/how-to-file-claim/evidence-needed/)',
                timeframe: '2-4 weeks',
                priority: 'high'
              },
              {
                title: 'File Your Disability Claim',
                description: 'Submit your claim online through VA.gov or with help from a VSO.',
                link: '[File a Disability Claim](https://va.gov/disability/how-to-file-claim/)',
                timeframe: '1-2 weeks',
                priority: 'high'
              },
              {
                title: 'Attend C&P Examination',
                description: 'Complete your Compensation & Pension exam when scheduled by the VA.',
                link: '[C&P Exam Information](https://va.gov/disability/va-claim-exam/)',
                timeframe: 'As scheduled',
                priority: 'high'
              }
            ]
          }
        ],
        follow_up: 'Do you currently have a VA disability rating, or is this your first claim? What specific conditions are you looking to claim?'
      };
    }

    // Career Transition Mock
    if (this.containsCareerKeywords(goalLower)) {
      return {
        categories: [
          {
            name: 'Career Transition',
            steps: [
              {
                title: 'Translate Military Skills',
                description: 'Use military skills translators to identify civilian job equivalents for your MOS/rating.',
                link: '[Military Skills Translator](https://va.gov/careers-employment/)',
                timeframe: '1-2 weeks',
                priority: 'high'
              },
              {
                title: 'Build Professional Network',
                description: 'Connect with veterans in your target industry through LinkedIn and veteran organizations.',
                link: '[Corporate Gray](https://corporategray.com/)',
                timeframe: 'Ongoing',
                priority: 'medium'
              },
              {
                title: 'Optimize Resume for Civilian Jobs',
                description: 'Create a civilian-focused resume that highlights transferable skills and achievements.',
                link: '[Resume Builder](https://va.gov/careers-employment/)',
                timeframe: '1 week',
                priority: 'high'
              }
            ]
          }
        ],
        follow_up: 'What specific industry or type of role are you targeting? Also, what was your military occupation/MOS?'
      };
    }

    // Default fallback
    return {
      categories: [
        {
          name: 'General Guidance',
          steps: [
            {
              title: 'Clarify Your Specific Goal',
              description: 'Let\'s break down your goal into more specific, actionable steps.',
              link: '[Veteran Resources](https://va.gov/)',
              timeframe: 'Immediate',
              priority: 'high'
            },
            {
              title: 'Connect with Veteran Support',
              description: 'Reach out to a Veteran Service Organization for personalized guidance.',
              link: '[Find Local VSO](https://va.gov/vso/)',
              timeframe: '1 week',
              priority: 'medium'
            }
          ]
        }
      ],
      follow_up: 'Can you provide more details about what specific outcome you\'re trying to achieve?'
    };
  }

  containsHousingKeywords(text) {
    const keywords = ['house', 'home', 'va loan', 'mortgage', 'buy', 'purchase', 'real estate'];
    return keywords.some(keyword => text.includes(keyword));
  }

  containsDisabilityKeywords(text) {
    const keywords = ['disability', 'compensation', 'rating', 'claim', 'appeal', 'benefits'];
    return keywords.some(keyword => text.includes(keyword));
  }

  containsCareerKeywords(text) {
    const keywords = ['job', 'career', 'work', 'employment', 'transition'];
    return keywords.some(keyword => text.includes(keyword));
  }

  getMockChatResponse(message) {
    const messageLower = message.toLowerCase();
    
    // Goal-specific responses
    if (this.containsHousingKeywords(messageLower)) {
      return {
        message: 'I can help you navigate the VA home loan process! The VA loan benefit is one of the most valuable benefits you\'ve earned. Would you like me to create a step-by-step action plan for buying a home with your VA loan?',
        usage: { input_tokens: 0, output_tokens: 0 }
      };
    }

    if (this.containsDisabilityKeywords(messageLower)) {
      return {
        message: 'I understand you\'re looking for help with VA disability benefits. This process can be complex, but I\'m here to guide you through it. Would you like me to create a personalized action plan for filing or appealing a disability claim?',
        usage: { input_tokens: 0, output_tokens: 0 }
      };
    }

    if (this.containsCareerKeywords(messageLower)) {
      return {
        message: 'Career transition is one of the biggest challenges veterans face, but your military experience is incredibly valuable to employers. Let me help you create a targeted plan for your career transition. What industry or type of role interests you most?',
        usage: { input_tokens: 0, output_tokens: 0 }
      };
    }

    // Default responses
    const responses = [
      'I\'m here to help you navigate your transition. What specific goal would you like to work on today? I can help with housing, career, education, healthcare, or disability benefits.',
      'Thank you for your service. I specialize in helping veterans achieve their civilian goals. What area would you like to focus on - housing, career transition, education, or something else?',
      'I understand the challenges of military transition. Let me help you create a personalized action plan. What specific outcome are you trying to achieve?'
    ];
    
    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      usage: { input_tokens: 0, output_tokens: 0 }
    };
  }
}

// Create a singleton instance
export const apiClient = new APIClient();

// Export individual functions for easier use
export const generateActionPlan = (goal, userContext) => 
  apiClient.generateActionPlan(goal, userContext);

export const sendChatMessage = (message, history) => 
  apiClient.sendChatMessage(message, history);