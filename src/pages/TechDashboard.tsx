import { useQuery } from '@tanstack/react-query'
import { dataService } from '../services/dataService'
import { Escalation } from '../types'
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Database, 
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  ChevronRight
} from 'lucide-react'
import { format } from 'date-fns'

export default function TechDashboard() {
  const { data: escalations, isLoading } = useQuery<Escalation[]>({
    queryKey: ['escalations'],
    queryFn: dataService.getEscalations,
    refetchInterval: 60000
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const activeEscalations = escalations?.filter(e => e.status === 'In Progress') || []
  const highPriorityCount = activeEscalations.filter(e => e.priority === 'High').length
  const mediumPriorityCount = activeEscalations.filter(e => e.priority === 'Medium').length
  const lowPriorityCount = activeEscalations.filter(e => e.priority === 'Low').length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-danger-100 text-danger-800'
      case 'Medium':
        return 'bg-warning-100 text-warning-800'
      case 'Low':
        return 'bg-success-100 text-success-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'In Progress':
        return <Activity className="h-4 w-4 text-warning-600" />
      case 'Escalated':
        return <AlertTriangle className="h-4 w-4 text-danger-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Technical Support</h1>
        <p className="text-gray-600">Manage customer escalations and technical issues</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">{activeEscalations.length}</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Activity className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">-2</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{highPriorityCount}</p>
            </div>
            <div className="p-2 bg-danger-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-danger-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-danger-600" />
            <span className="text-danger-600 font-medium">+1</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
              <p className="text-2xl font-bold text-gray-900">4.2h</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <Clock className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">-0.8h</span>
            <span className="text-gray-500 ml-1">from last week</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engineers</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">78% utilization</span>
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-danger-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">High Priority</span>
              </div>
              <span className="text-sm font-medium">{highPriorityCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-warning-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Medium Priority</span>
              </div>
              <span className="text-sm font-medium">{mediumPriorityCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Low Priority</span>
              </div>
              <span className="text-sm font-medium">{lowPriorityCount}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connectivity</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Configuration</span>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Other</span>
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engineer Workload</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Senior Engineers</span>
              <span className="text-sm font-medium">4 cases avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mid-level Engineers</span>
              <span className="text-sm font-medium">3 cases avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Junior Engineers</span>
              <span className="text-sm font-medium">2 cases avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Available Capacity</span>
              <span className="text-sm font-medium text-success-600">22%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Escalations */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Escalations</h3>
          <button className="btn-secondary text-sm">View All</button>
        </div>
        
        <div className="space-y-4">
          {activeEscalations.map((escalation) => (
            <div key={escalation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{escalation.customerName}</h4>
                    <span className={`status-badge ${getPriorityColor(escalation.priority)}`}>
                      {escalation.priority}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      {getStatusIcon(escalation.status)}
                      <span className="ml-1">{escalation.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {escalation.issueDescription.substring(0, 200)}...
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-1 font-medium">{format(new Date(escalation.created), 'MMM d, yyyy')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Assigned:</span>
                      <span className="ml-1 font-medium">{escalation.assignedEngineer}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Level:</span>
                      <span className="ml-1 font-medium">{escalation.escalationLevel}</span>
                    </div>
                  </div>
                  
                  {escalation.technicalDetails.affectedTable && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Database className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Technical Details</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {escalation.technicalDetails.affectedTable && (
                          <div>
                            <span className="text-gray-500">Affected Table:</span>
                            <span className="ml-1 font-medium">{escalation.technicalDetails.affectedTable}</span>
                          </div>
                        )}
                        {escalation.technicalDetails.hotShard && (
                          <div>
                            <span className="text-gray-500">Hot Shard:</span>
                            <span className="ml-1 font-medium">{escalation.technicalDetails.hotShard}</span>
                          </div>
                        )}
                        {escalation.technicalDetails.dataDistribution && (
                          <div>
                            <span className="text-gray-500">Data Distribution:</span>
                            <span className="ml-1 font-medium">{escalation.technicalDetails.dataDistribution}</span>
                          </div>
                        )}
                        {escalation.technicalDetails.queryPattern && (
                          <div>
                            <span className="text-gray-500">Query Pattern:</span>
                            <span className="ml-1 font-medium">{escalation.technicalDetails.queryPattern}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-500">Impact:</span>
                        <span className={`ml-1 font-medium ${
                          escalation.impactAssessment.businessImpact === 'High' ? 'text-danger-600' :
                          escalation.impactAssessment.businessImpact === 'Medium' ? 'text-warning-600' :
                          'text-success-600'
                        }`}>
                          {escalation.impactAssessment.businessImpact}
                        </span>
                      </div>
                      {escalation.impactAssessment.affectedUsers && (
                        <div>
                          <span className="text-gray-500">Users:</span>
                          <span className="ml-1 font-medium">{escalation.impactAssessment.affectedUsers.toLocaleString()}</span>
                        </div>
                      )}
                      {escalation.impactAssessment.revenueImpact && (
                        <div>
                          <span className="text-gray-500">Revenue Impact:</span>
                          <span className="ml-1 font-medium">${escalation.impactAssessment.revenueImpact.toLocaleString()}</span>
                        </div>
                      )}
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

      {/* Hot Shard Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hot Shard Analysis</h3>
        <div className="space-y-4">
          <div className="bg-warning-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-warning-600 mr-2" />
              <span className="font-medium text-warning-900">Active Hot Shard Issues</span>
            </div>
            <p className="text-sm text-warning-700">
              {activeEscalations.filter(e => e.technicalDetails.hotShard).length} customers experiencing hot shard problems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Common Hot Shard Patterns</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Uneven data distribution (80/20 rule)</li>
                <li>• Missing composite indexes</li>
                <li>• Poor partitioning strategy</li>
                <li>• Time-based data skew</li>
              </ul>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Recommended Solutions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Implement tablet splitting</li>
                <li>• Add proper composite indexes</li>
                <li>• Optimize table partitioning</li>
                <li>• Use read replicas for hot data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 