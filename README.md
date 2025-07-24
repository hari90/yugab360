# YugabyteDB Customer Support & Sales Dashboard

A modern, real-time dashboard for managing YugabyteDB customer support escalations and sales pipeline data. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 📊 Dashboard Sections
- **Status Dashboard** - System health, active escalations, and performance metrics
- **Tech Support** - Technical escalations, hot shard analysis, and engineer workload
- **Customer Support** - Customer satisfaction, sentiment analysis, and support trends
- **Sales Pipeline** - Opportunity tracking, revenue projections, and deal progression
- **Partner Management** - Partner ecosystem, joint opportunities, and enablement programs

### 🎨 Modern UI/UX
- Responsive design with mobile-first approach
- Beautiful, modern interface with Tailwind CSS
- Real-time data updates with React Query
- Interactive charts and visualizations
- Dark/light mode support (ready for implementation)

### 📈 Data Integration
- Amazon Bedrock integration for AI-powered insights
- Real-time data processing every 10 minutes
- Customer escalation tracking
- Salesforce data integration
- Partner performance monitoring

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier

## 📁 Project Structure

```
yugab360/
├── data/                    # Data sources
│   ├── customers.txt        # Customer list
│   ├── on_call/            # Customer escalations
│   └── sfdc/               # Salesforce data
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Dashboard pages
│   ├── services/           # Data services
│   ├── types/              # TypeScript definitions
│   └── App.tsx             # Main application
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yugab360
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run tests

# Type Checking
npm run type-check   # Check TypeScript types
```

## 📊 Dashboard Overview

### Status Dashboard (`/status`)
- System health monitoring
- Active escalation count
- Response time metrics
- SLA compliance status
- Recent activity feed

### Tech Support (`/tech`)
- Escalation details and progress
- Technical issue categorization
- Hot shard analysis
- Engineer workload distribution
- Resolution time tracking

### Customer Support (`/support`)
- Customer satisfaction metrics
- Support ticket trends
- Customer sentiment analysis
- Support team performance
- Response time analytics

### Sales Pipeline (`/pipeline`)
- Sales opportunity tracking
- Revenue projections
- Deal stage progression
- Customer engagement metrics
- Sales team performance

### Partner Management (`/partner`)
- Partner performance metrics
- Joint customer opportunities
- Partner enablement status
- Co-selling activities
- Partner ecosystem health

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_BEDROCK_ENDPOINT=https://bedrock-runtime.us-east-1.amazonaws.com
VITE_DATA_REFRESH_INTERVAL=600000
```

### Tailwind Configuration

The project includes a custom Tailwind configuration with:
- Custom color palette for YugabyteDB branding
- Responsive design utilities
- Custom animations and transitions
- Component-specific styles

## 📈 Data Sources

### Customer Escalations
- Stored in `data/on_call/CE*.txt` files
- Contains detailed escalation information
- Includes technical analysis and action plans
- Customer sentiment tracking

### Salesforce Data
- Customer information and demographics
- Sales pipeline data
- Revenue projections
- Partner opportunities

### Real-time Processing
- Amazon Bedrock processes data every 10 minutes
- AI-powered insights and recommendations
- Automated metric calculations
- Trend analysis and forecasting

## 🎨 Customization

### Adding New Dashboard Sections

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update the navigation in `src/components/Layout.tsx`
4. Add corresponding data types in `src/types/index.ts`

### Styling Customization

The project uses Tailwind CSS with custom utilities:
- `.card` - Standard card component
- `.metric-card` - Metric display cards
- `.status-badge` - Status indicators
- `.btn-primary` / `.btn-secondary` - Button styles

### Data Integration

To integrate with real data sources:
1. Update `src/services/dataService.ts`
2. Replace mock data with API calls
3. Configure authentication and endpoints
4. Add error handling and loading states

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `src/README.md`

## 🔮 Roadmap

- [ ] Real-time WebSocket integration
- [ ] Advanced charting with D3.js
- [ ] Export functionality (PDF, Excel)
- [ ] User authentication and roles
- [ ] Mobile app version
- [ ] Advanced analytics and ML insights
- [ ] Multi-language support
- [ ] Dark mode implementation

---

Built with ❤️ for the YugabyteDB community 