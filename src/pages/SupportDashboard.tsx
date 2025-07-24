import { useQuery } from '@tanstack/react-query'
import { dataService } from '../services/dataService'
import { Escalation, DashboardMetrics } from '../types'
import { 
  HeadphonesIcon, 
  TrendingUp, 
  Users, 
  Smile,
  Frown,
  Meh,
  Star,
  CheckCircle
} from 'lucide-react'
import { format } from 'date-fns'

export default function SupportDashboard() {
  const { data: escalations, isLoading: escalationsLoading } = useQuery<Escalation[]>({
    queryKey: ['escalations'],
    queryFn: dataService.getEscalations,
    refetchInterval: 60000
  })

  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboardMetrics'],
    queryFn: dataService.getDashboardMetrics,
    refetchInterval: 30000
  })

  if (escalationsLoading || metricsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const activeEscalations = escalations?.filter(e => e.status === 'In Progress') || []
  const resolvedEscalations = escalations?.filter(e => e.status === 'Resolved') || []

  // Mock sentiment analysis data
  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10
  }

  const satisfactionTrends = [
    { month: 'Jan', score: 4.2 },
    { month: 'Feb', score: 4.3 },
    { month: 'Mar', score: 4.4 },
    { month: 'Apr', score: 4.5 },
    { month: 'May', score: 4.6 },
    { month: 'Jun', score: 4.7 }
  ]

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <Smile className="h-4 w-4 text-success-600" />
      case 'negative':
        return <Frown className="h-4 w-4 text-danger-600" />
      default:
        return <Meh className="h-4 w-4 text-warning-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Support</h1>
        <p className="text-gray-600">Monitor customer satisfaction and support team performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{metrics?.customerSatisfaction}/5</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <Star className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+0.2</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">{activeEscalations.length}</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <HeadphonesIcon className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Avg resolution: 4.2h</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved This Month</p>
              <p className="text-2xl font-bold text-gray-900">{resolvedEscalations.length}</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-success-600 font-medium">98.5%</span>
            <span className="text-gray-500 ml-1">SLA compliance</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Support Team</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">78% utilization</span>
          </div>
        </div>
      </div>

      {/* Customer Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Sentiment</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Smile className="h-5 w-5 text-success-600 mr-3" />
                <span className="text-sm font-medium">Positive</span>
              </div>
              <span className="text-sm font-medium">{sentimentData.positive}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: `${sentimentData.positive}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Meh className="h-5 w-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium">Neutral</span>
              </div>
              <span className="text-sm font-medium">{sentimentData.neutral}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: `${sentimentData.neutral}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Frown className="h-5 w-5 text-danger-600 mr-3" />
                <span className="text-sm font-medium">Negative</span>
              </div>
              <span className="text-sm font-medium">{sentimentData.negative}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-danger-600 h-2 rounded-full" style={{ width: `${sentimentData.negative}%` }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfaction Trends</h3>
          <div className="space-y-3">
            {satisfactionTrends.map((trend) => (
              <div key={trend.month} className="flex items-center justify-between">
                <span className="text-sm font-medium">{trend.month}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(trend.score) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{trend.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance Issues</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Configuration</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connectivity</span>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Other</span>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">First Response</span>
              <span className="text-sm font-medium text-success-600">2.1h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Resolution</span>
              <span className="text-sm font-medium text-success-600">4.2h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Follow-up</span>
              <span className="text-sm font-medium text-success-600">24h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">SLA Compliance</span>
              <span className="text-sm font-medium text-success-600">98.5%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cases per Engineer</span>
              <span className="text-sm font-medium">3.2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Resolution Time</span>
              <span className="text-sm font-medium">4.2h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Customer Rating</span>
              <span className="text-sm font-medium">4.6/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Utilization</span>
              <span className="text-sm font-medium text-success-600">78%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Customer Feedback */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customer Feedback</h3>
        <div className="space-y-4">
          {activeEscalations.slice(0, 5).map((escalation) => (
            <div key={escalation.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{escalation.customerName}</h4>
                    <div className="flex items-center">
                      {getSentimentIcon(escalation.customerSentiment.includes('frustrated') ? 'negative' : 
                        escalation.customerSentiment.includes('satisfied') ? 'positive' : 'neutral')}
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(escalation.created), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    "{escalation.customerSentiment}"
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Priority: {escalation.priority}</span>
                    <span>Status: {escalation.status}</span>
                    <span>Engineer: {escalation.assignedEngineer}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(4.2) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Team Workload */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Team Workload</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Senior Engineers</span>
              <span className="text-sm font-medium text-success-600">Available</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">4/5</div>
            <div className="text-xs text-gray-500">Avg 4.2 cases each</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Mid-level Engineers</span>
              <span className="text-sm font-medium text-warning-600">Busy</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">6/8</div>
            <div className="text-xs text-gray-500">Avg 3.1 cases each</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Junior Engineers</span>
              <span className="text-sm font-medium text-success-600">Available</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">3/4</div>
            <div className="text-xs text-gray-500">Avg 2.0 cases each</div>
          </div>
        </div>
      </div>
    </div>
  )
} 