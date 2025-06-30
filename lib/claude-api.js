// Claude API integration for NextMission Navigator

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are NextMission AI, a specialized assistant for U.S. military veterans transitioning to civilian life. Your primary function is to analyze veteran goals and provide ONLY relevant, actionable guidance.

CRITICAL INSTRUCTIONS:
1. ANALYZE the user's goal to determine the primary category (Housing, Healthcare, Education, Career, Disability Benefits, Financial, etc.)
2. ONLY provide steps related to that specific goal - do NOT include unrelated advice
3. ALWAYS respond with valid JSON in this exact format:

{
  "categories": [
    {
      "name": "Category Name (must match the user's goal type)",
      "steps": [
        {
          "title": "Specific action step title",
          "description": "Clear, actionable description in plain language",
          "link": "Trusted resource link with markdown formatting [Link Text](URL)",
          "timeframe": "Realistic timeframe (e.g., '1-2 weeks', 'Ongoing', 'Immediate')",
          "priority": "high | medium | low"
        }
      ]
    }
  ],
  "follow_up": "Personalized follow-up question based on their specific goal"
}

GOAL DETECTION RULES:
- Housing/VA Loan goals → Focus ONLY on housing, loans, real estate
- Disability/Benefits goals → Focus ONLY on VA disability, compensation, appeals
- Career/Job goals → Focus ONLY on employment, skills, networking
- Education goals → Focus ONLY on GI Bill, schools, certifications
- Healthcare goals → Focus ONLY on VA healthcare, mental health, medical

FOLLOW-UP QUESTION RULES:
- Housing: Ask about timeline, location, credit concerns, or first-time buyer status
- Disability: Ask about current rating, specific conditions, or appeal status
- Career: Ask about target industry, role level, or skills gaps
- Education: Ask about degree type, timeline, or career goals
- Healthcare: Ask about specific care needs or current VA enrollment

TRUSTED RESOURCES TO PRIORITIZE:
- VA.gov official resources
- Military.com resources
- Veteran service organizations (.org sites)
- Government agencies (.gov sites)

Remember: Stay strictly focused on the user's stated goal. Do not provide generic career advice unless they specifically ask for career help.`;

export class ClaudeAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    };
  }

  async generateActionPlan(goal, userContext = {}) {
    try {
      const prompt = this.buildActionPlanPrompt(goal, userContext);

      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2500,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseActionPlanResponse(data.content[0].text);
    } catch (error) {
      console.error('Error generating action plan:', error);
      throw error;
    }
  }

  async chatWithClaude(message, conversationHistory = []) {
    try {
      const messages = [
        ...conversationHistory,
        {
          role: 'user',
          content: message
        }
      ];

      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        message: data.content[0].text,
        usage: data.usage
      };
    } catch (error) {
      console.error('Error in chat:', error);
      throw error;
    }
  }

  buildActionPlanPrompt(goal, userContext) {
    const { militaryBranch, yearsOfService, currentLocation, targetIndustry } = userContext;

    // Enhanced goal detection
    const goalAnalysis = this.analyzeGoal(goal);

    let contextualPrompt = `VETERAN'S GOAL: "${goal}"

GOAL ANALYSIS:
- Primary Category: ${goalAnalysis.category}
- Keywords Detected: ${goalAnalysis.keywords.join(', ')}
- Focus Area: ${goalAnalysis.focusArea}

VETERAN CONTEXT:
${militaryBranch ? `- Military Branch: ${militaryBranch}` : ''}
${yearsOfService ? `- Years of Service: ${yearsOfService}` : ''}
${currentLocation ? `- Current Location: ${currentLocation}` : ''}
${targetIndustry ? `- Target Industry: ${targetIndustry}` : ''}

INSTRUCTIONS:
Create a focused action plan for this ${goalAnalysis.category} goal. Include 3-5 specific, actionable steps with:
- Trusted resource links (prioritize .gov and .org sites)
- Realistic timeframes
- Priority levels
- Clear descriptions

${goalAnalysis.specificInstructions}

Respond ONLY with valid JSON in the required format. Do not include any text outside the JSON structure.`;

    return contextualPrompt;
  }

  analyzeGoal(goal) {
    const goalLower = goal.toLowerCase();
    
    // Housing/VA Loan Detection
    if (this.containsKeywords(goalLower, ['house', 'home', 'va loan', 'mortgage', 'buy', 'purchase', 'real estate', 'property'])) {
      return {
        category: 'Housing & VA Loans',
        keywords: this.extractKeywords(goalLower, ['house', 'home', 'va loan', 'mortgage', 'buy', 'purchase']),
        focusArea: 'Housing assistance and VA loan benefits',
        specificInstructions: 'Focus on VA loan process, eligibility, home buying steps, and housing resources. Ask about timeline, location, or credit concerns.'
      };
    }

    // Disability Benefits Detection
    if (this.containsKeywords(goalLower, ['disability', 'compensation', 'rating', 'claim', 'appeal', 'medical', 'injury', 'ptsd', 'benefits'])) {
      return {
        category: 'Disability Benefits',
        keywords: this.extractKeywords(goalLower, ['disability', 'compensation', 'rating', 'claim', 'appeal']),
        focusArea: 'VA disability compensation and benefits',
        specificInstructions: 'Focus on disability claims process, ratings, appeals, and medical documentation. Ask about current rating or specific conditions.'
      };
    }

    // Healthcare Detection
    if (this.containsKeywords(goalLower, ['health', 'medical', 'mental health', 'therapy', 'counseling', 'doctor', 'treatment', 'healthcare'])) {
      return {
        category: 'Healthcare & Wellness',
        keywords: this.extractKeywords(goalLower, ['health', 'medical', 'mental health', 'therapy', 'treatment']),
        focusArea: 'VA healthcare and mental health services',
        specificInstructions: 'Focus on VA healthcare enrollment, mental health resources, and medical services. Ask about specific care needs.'
      };
    }

    // Education Detection
    if (this.containsKeywords(goalLower, ['education', 'school', 'college', 'degree', 'gi bill', 'certification', 'training', 'learn'])) {
      return {
        category: 'Education & Training',
        keywords: this.extractKeywords(goalLower, ['education', 'school', 'degree', 'gi bill', 'certification']),
        focusArea: 'Education benefits and training programs',
        specificInstructions: 'Focus on GI Bill benefits, school selection, and certification programs. Ask about degree type or career goals.'
      };
    }

    // Career/Employment Detection
    if (this.containsKeywords(goalLower, ['job', 'career', 'work', 'employment', 'transition', 'resume', 'interview', 'skills'])) {
      return {
        category: 'Career Transition',
        keywords: this.extractKeywords(goalLower, ['job', 'career', 'work', 'employment', 'transition']),
        focusArea: 'Career transition and employment',
        specificInstructions: 'Focus on job search, skills translation, and career transition resources. Ask about target industry or role.'
      };
    }

    // Financial Detection
    if (this.containsKeywords(goalLower, ['money', 'financial', 'budget', 'debt', 'savings', 'investment', 'pension'])) {
      return {
        category: 'Financial Planning',
        keywords: this.extractKeywords(goalLower, ['money', 'financial', 'budget', 'debt', 'savings']),
        focusArea: 'Financial planning and assistance',
        specificInstructions: 'Focus on financial resources, budgeting, and veteran financial benefits. Ask about specific financial goals.'
      };
    }

    // Default to General Support
    return {
      category: 'General Support',
      keywords: ['transition', 'help', 'support'],
      focusArea: 'General veteran transition support',
      specificInstructions: 'Provide general transition guidance and ask clarifying questions to better understand their specific needs.'
    };
  }

  containsKeywords(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }

  extractKeywords(text, possibleKeywords) {
    return possibleKeywords.filter(keyword => text.includes(keyword));
  }

  parseActionPlanResponse(responseText) {
    try {
      // First, try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return this.validateAndEnhanceResponse(parsed);
      }
      
      // If no JSON found, try to parse structured text
      return this.parseStructuredTextResponse(responseText);
    } catch (error) {
      console.error('Error parsing action plan response:', error);
      return this.createFallbackResponse(responseText);
    }
  }

  validateAndEnhanceResponse(response) {
    // Ensure the response has the required structure
    if (!response.categories || !Array.isArray(response.categories)) {
      throw new Error('Invalid response structure: missing categories array');
    }

    // Validate each category
    response.categories.forEach(category => {
      if (!category.name || !category.steps || !Array.isArray(category.steps)) {
        throw new Error('Invalid category structure');
      }

      // Ensure each step has required fields
      category.steps.forEach(step => {
        if (!step.title || !step.description) {
          throw new Error('Invalid step structure: missing title or description');
        }
        
        // Set defaults for optional fields
        step.timeframe = step.timeframe || 'As needed';
        step.priority = step.priority || 'medium';
        step.link = step.link || '';
      });
    });

    // Ensure follow_up exists
    response.follow_up = response.follow_up || 'What specific aspect of this plan would you like me to elaborate on?';

    return response;
  }

  parseStructuredTextResponse(text) {
    const categories = [];
    const lines = text.split('\n');
    let currentCategory = null;
    let currentStep = null;

    for (const line of lines) {
      const trimmed = line.trim();

      // Category headers
      if (trimmed.startsWith('##') || (trimmed.startsWith('**') && trimmed.endsWith('**'))) {
        if (currentCategory) {
          categories.push(currentCategory);
        }
        currentCategory = {
          name: trimmed.replace(/[#*]/g, '').trim(),
          steps: []
        };
      }
      // Step items
      else if (trimmed.match(/^\d+\./) || trimmed.startsWith('-') || trimmed.startsWith('•')) {
        if (currentCategory) {
          const stepTitle = trimmed.replace(/^[\d.-•]\s*/, '');
          currentStep = {
            title: stepTitle,
            description: '',
            link: '',
            timeframe: 'As needed',
            priority: 'medium'
          };
          currentCategory.steps.push(currentStep);
        }
      }
      // Step descriptions
      else if (trimmed && currentStep && !trimmed.startsWith('http')) {
        currentStep.description += (currentStep.description ? ' ' : '') + trimmed;
      }
      // Links
      else if (trimmed.startsWith('http') && currentStep) {
        currentStep.link = `[Resource Link](${trimmed})`;
      }
    }

    if (currentCategory) {
      categories.push(currentCategory);
    }

    return {
      categories: categories.length > 0 ? categories : this.createDefaultCategory(),
      follow_up: "What specific aspect of this plan would you like me to elaborate on?"
    };
  }

  createDefaultCategory() {
    return [
      {
        name: "General Guidance",
        steps: [
          {
            title: "Contact Veteran Support",
            description: "Reach out to a veteran service representative for personalized assistance with your specific needs.",
            link: "[VA Contact Information](https://va.gov/contact-us/)",
            timeframe: "Immediate",
            priority: "high"
          }
        ]
      }
    ];
  }

  createFallbackResponse(text) {
    return {
      categories: [
        {
          name: "AI Response",
          steps: [
            {
              title: "Review Guidance",
              description: text.substring(0, 500) + (text.length > 500 ? '...' : ''),
              link: "",
              timeframe: "Immediate",
              priority: "high"
            }
          ]
        }
      ],
      follow_up: "How can I help you break this down into more specific, actionable steps?"
    };
  }
}

export function getClaudeAPIKey() {
  return process.env.NEXT_PUBLIC_CLAUDE_API_KEY || process.env.CLAUDE_API_KEY;
}

export class ClaudeAPIError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ClaudeAPIError';
    this.status = status;
    this.details = details;
  }
}

export function handleClaudeError(error) {
  if (error.status === 401) {
    return 'Invalid API key. Please check your Claude API configuration.';
  } else if (error.status === 429) {
    return 'Rate limit exceeded. Please try again shortly.';
  } else if (error.status >= 500) {
    return 'Claude API is temporarily unavailable. Please try again later.';
  } else {
    return 'An error occurred while processing your request. Please try again.';
  }
}