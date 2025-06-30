# NextMission Navigator - Claude API Integration

This application integrates with Anthropic's Claude API to provide AI-powered assistance for military veterans transitioning to civilian life.

## API Setup

### 1. Get Claude API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key

### 2. Environment Configuration
1. Copy `.env.example` to `.env.local`
2. Add your Claude API key:
   ```
   CLAUDE_API_KEY=your_actual_api_key_here
   ```

### 3. API Features

#### Action Plan Generator
- **File**: `components/ActionPlanGenerator.jsx`
- **API**: `lib/claude-api.js` - `generateActionPlan()`
- **Features**:
  - Personalized action plans based on veteran's goals
  - Context-aware responses using military background
  - Structured JSON responses with categories and steps
  - Follow-up questions for plan refinement

#### Chatbot
- **File**: `components/Chatbot.jsx`
- **API**: `lib/claude-api.js` - `chatWithClaude()`
- **Features**:
  - Real-time conversation with Claude
  - Conversation history maintenance
  - Veteran-specific system prompts
  - Error handling and fallback responses

### 4. API Architecture

```
lib/
├── claude-api.js          # Core Claude API integration
├── api-client.js          # Centralized API client with fallbacks
└── utils.js               # Utility functions
```

#### Key Components:

1. **ClaudeAPI Class** (`lib/claude-api.js`)
   - Handles direct communication with Claude API
   - Manages authentication and headers
   - Parses and structures responses
   - Includes veteran-specific system prompts

2. **APIClient** (`lib/api-client.js`)
   - Singleton pattern for consistent API access
   - Automatic fallback to mock responses
   - Error handling and retry logic
   - Centralized configuration management

3. **Error Handling**
   - Graceful degradation when API is unavailable
   - User-friendly error messages
   - Automatic fallback to mock responses
   - Rate limiting and quota management

### 5. System Prompts

The Claude API is configured with specialized system prompts for veteran assistance:

- Military-to-civilian transition expertise
- VA benefits and resources knowledge
- Education and career guidance
- Healthcare and mental health support
- Financial planning assistance

### 6. Response Formats

#### Action Plan Response:
```json
{
  "categories": [
    {
      "name": "Category Name",
      "steps": [
        {
          "title": "Step Title",
          "description": "Detailed description",
          "link": "Resource link with markdown",
          "timeframe": "Expected timeframe",
          "priority": "high|medium|low"
        }
      ]
    }
  ],
  "follow_up": "Follow-up question"
}
```

#### Chat Response:
```json
{
  "message": "AI response text",
  "usage": {
    "input_tokens": 100,
    "output_tokens": 150
  }
}
```

### 7. Security Considerations

- API keys should be stored in environment variables
- Never commit API keys to version control
- Consider using server-side API calls for production
- Implement rate limiting and usage monitoring
- Validate and sanitize all user inputs

### 8. Development vs Production

#### Development:
- Uses mock responses when API key is not available
- Client-side API calls for rapid development
- Detailed error logging

#### Production:
- Server-side API calls recommended
- Proper error handling and user feedback
- Usage monitoring and rate limiting
- Secure API key management

### 9. Testing

The API integration includes comprehensive fallback mechanisms:
- Mock responses when Claude API is unavailable
- Error simulation for testing error handling
- Conversation history testing
- Response parsing validation

### 10. Usage Examples

#### Generate Action Plan:
```javascript
import { generateActionPlan } from '@/lib/api-client';

const plan = await generateActionPlan(
  "I want to transition to cybersecurity",
  {
    militaryBranch: "army",
    yearsOfService: "8",
    targetIndustry: "technology"
  }
);
```

#### Send Chat Message:
```javascript
import { sendChatMessage } from '@/lib/api-client';

const response = await sendChatMessage(
  "How do I use my GI Bill benefits?",
  conversationHistory
);
```

## Support

For API-related issues:
1. Check your API key configuration
2. Verify network connectivity
3. Review error logs in browser console
4. Test with mock responses first

The application will automatically fall back to mock responses if the Claude API is unavailable, ensuring a consistent user experience.