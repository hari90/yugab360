import { useQuery } from '@tanstack/react-query'
import { dataService } from '../services/dataService'
import { SalesOpportunity, DashboardMetrics } from '../types'
import { 
  TrendingUp, 
  DollarSign, 
  Target,
  CheckCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react'

export default function PipelineDashboard() {
  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery<SalesOpportunity[]>({
    queryKey: ['salesOpportunities'],
    queryFn: dataService.getSalesOpportunities,
    refetchInterval: 60000
  })

  const { isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboardMetrics'],
    queryFn: dataService.getDashboardMetrics,
    refetchInterval: 30000
  })

  if (opportunitiesLoading || metricsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const totalPipelineValue = opportunities?.reduce((sum, opp) => sum + opp.expectedContractValue, 0) || 0
  const hotOpportunities = opportunities?.filter(opp => opp.rating === 'Hot') || []
  const warmOpportunities = opportunities?.filter(opp => opp.rating === 'Warm') || []
  const coldOpportunities = opportunities?.filter(opp => opp.rating === 'Cold') || []

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Hot':
        return 'bg-danger-100 text-danger-800'
      case 'Warm':
        return 'bg-warning-100 text-warning-800'
      case 'Cold':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'proposal':
        return 'bg-primary-100 text-primary-800'
      case 'discovery':
        return 'bg-warning-100 text-warning-800'
      case 'negotiation':
        return 'bg-success-100 text-success-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
        <p className="text-gray-600">Track sales opportunities and revenue projections</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">${(totalPipelineValue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+15%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{opportunities?.length || 0}</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <Target className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Avg deal size: ${(totalPipelineValue / (opportunities?.length || 1) / 1000).toFixed(0)}K</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hot Leads</p>
              <p className="text-2xl font-bold text-gray-900">{hotOpportunities.length}</p>
            </div>
            <div className="p-2 bg-danger-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-danger-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-danger-600 font-medium">High priority</span>
            <span className="text-gray-500 ml-1">needs attention</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+5%</span>
            <span className="text-gray-500 ml-1">from last quarter</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prospecting</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Opportunities</span>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value</span>
              <span className="text-sm font-medium">$2.4M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conversion</span>
              <span className="text-sm font-medium text-success-600">25%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discovery</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Opportunities</span>
              <span className="text-sm font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value</span>
              <span className="text-sm font-medium">$1.8M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conversion</span>
              <span className="text-sm font-medium text-success-600">40%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposal</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Opportunities</span>
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value</span>
              <span className="text-sm font-medium">$1.2M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conversion</span>
              <span className="text-sm font-medium text-success-600">60%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Negotiation</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Opportunities</span>
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value</span>
              <span className="text-sm font-medium">$800K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conversion</span>
              <span className="text-sm font-medium text-success-600">80%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Quality Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Quality</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-danger-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Hot</span>
              </div>
              <span className="text-sm font-medium">{hotOpportunities.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-danger-600 h-2 rounded-full" style={{ width: `${(hotOpportunities.length / (opportunities?.length || 1)) * 100}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-warning-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Warm</span>
              </div>
              <span className="text-sm font-medium">{warmOpportunities.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: `${(warmOpportunities.length / (opportunities?.length || 1)) * 100}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Cold</span>
              </div>
              <span className="text-sm font-medium">{coldOpportunities.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${(coldOpportunities.length / (opportunities?.length || 1)) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Technology</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Financial Services</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Healthcare</span>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Other</span>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quota Achievement</span>
              <span className="text-sm font-medium text-success-600">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Deal Size</span>
              <span className="text-sm font-medium">$450K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sales Cycle</span>
              <span className="text-sm font-medium">45 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Close Rate</span>
              <span className="text-sm font-medium text-success-600">68%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Opportunities */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Opportunities</h3>
          <button className="btn-secondary text-sm">View All</button>
        </div>
        
        <div className="space-y-4">
          {opportunities?.map((opportunity) => (
            <div key={opportunity.accountId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{opportunity.accountName}</h4>
                    <span className={`status-badge ${getRatingColor(opportunity.rating)}`}>
                      {opportunity.rating}
                    </span>
                    <span className={`status-badge ${getStageColor(opportunity.salesStage)}`}>
                      {opportunity.salesStage}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Industry:</span>
                      <span className="ml-1 font-medium">{opportunity.industry}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Deal Value:</span>
                      <span className="ml-1 font-medium">${(opportunity.expectedContractValue / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Owner:</span>
                      <span className="ml-1 font-medium">{opportunity.accountOwner}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {opportunity.notes}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-500">Requirements:</span>
                        <span className="ml-1 font-medium">{opportunity.databaseRequirements.slice(0, 2).join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Steps:</span>
                        <span className="ml-1 font-medium">{opportunity.nextSteps}</span>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Projections */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Projections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">Q1 2024</div>
            <div className="text-3xl font-bold text-primary-600 mb-1">$2.5M</div>
            <div className="text-sm text-gray-500">Projected Revenue</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">Q2 2024</div>
            <div className="text-3xl font-bold text-primary-600 mb-1">$3.2M</div>
            <div className="text-sm text-gray-500">Projected Revenue</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">Q3 2024</div>
            <div className="text-3xl font-bold text-primary-600 mb-1">$3.8M</div>
            <div className="text-sm text-gray-500">Projected Revenue</div>
          </div>
        </div>
      </div>
    </div>
  )
} 