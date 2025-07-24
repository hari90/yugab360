# YugabyteDB Customer Support & Sales Dashboard

## Architecture Overview

This is a comprehensive dashboard system for managing YugabyteDB customer support escalations and sales pipeline data. The system provides real-time insights into customer issues, support metrics, and sales opportunities.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Sources  │    │  Amazon Bedrock │    │  React Dashboard│
│                 │    │                 │    │                 │
│ • customers.txt │───▶│ • Data Processing│───▶│ • /status       │
│ • on_call/*.txt │    │ • AI Analysis   │    │ • /tech         │
│ • sfdc/*.csv    │    │ • Every 10 min  │    │ • /support      │
│ • sfdc/*.json   │    │                 │    │ • /pipeline     │
└─────────────────┘    └─────────────────┘    │ • /partner      │
                                              └─────────────────┘
```

## Data Flow

1. **Data Ingestion**: Customer data is collected from multiple sources:
   - Customer list (`customers.txt`)
   - Customer escalations (`on_call/CE*.txt`)
   - Salesforce data (`sfdc/customers_sample_data.*`)

2. **Processing**: Amazon Bedrock processes data every 10 minutes:
   - Analyzes escalation patterns
   - Identifies trends and insights
   - Generates recommendations
   - Updates metrics and KPIs

3. **Dashboard**: React SPA displays processed data:
   - Real-time status updates
   - Interactive charts and graphs
   - Filterable data tables
   - Export capabilities

## Dashboard Sections

### `/status` - System Status Dashboard
- Overall system health
- Active escalations count
- Response time metrics
- SLA compliance status
- Recent activity feed

### `/tech` - Technical Support Dashboard
- Escalation details and progress
- Technical issue categorization
- Resolution time tracking
- Engineer workload distribution
- Hot shard analysis

### `/support` - Customer Support Dashboard
- Customer satisfaction metrics
- Support ticket trends
- Escalation patterns
- Customer sentiment analysis
- Support team performance

### `/pipeline` - Sales Pipeline Dashboard
- Sales opportunity tracking
- Revenue projections
- Deal stage progression
- Customer engagement metrics
- Sales team performance

### `/partner` - Partner Management Dashboard
- Partner performance metrics
- Joint customer opportunities
- Partner enablement status
- Co-selling activities
- Partner ecosystem health

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Data Fetching**: React Query
- **Charts**: Recharts
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier

## Data Structure

### Customer Escalations (CE*.txt)
- Customer information
- Issue description and priority
- Root cause analysis
- Technical details
- Impact assessment
- Action plan and status
- Customer sentiment

### Salesforce Data
- Account information
- Contact details
- Business metrics
- Sales pipeline data
- Database requirements
- Deal progression

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_BEDROCK_ENDPOINT=https://bedrock-runtime.us-east-1.amazonaws.com
VITE_DATA_REFRESH_INTERVAL=600000
```

## Deployment

The dashboard is designed for deployment on:
- AWS S3 + CloudFront
- Vercel
- Netlify
- Docker containers

## Monitoring & Analytics

- Real-time data refresh
- Performance monitoring
- Error tracking
- User analytics
- Custom event tracking

## Security Considerations

- API key management
- Data encryption
- Access control
- Audit logging
- GDPR compliance
