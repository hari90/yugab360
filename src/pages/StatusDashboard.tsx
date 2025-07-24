import { useQuery } from '@tanstack/react-query'
import { dataService } from '../services/dataService'
import { DashboardMetrics, Escalation } from '../types'
import { 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { format } from 'date-fns'

export default function StatusDashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboardMetrics'],
    queryFn: dataService.getDashboardMetrics,
    refetchInterval: 30000 // Refresh every 30 seconds
  })

  const { data: escalations, isLoading: escalationsLoading } = useQuery<Escalation[]>({
    queryKey: ['escalations'],
    queryFn: dataService.getEscalations,
    refetchInterval: 60000 // Refresh every minute
  })

  if (metricsLoading || escalationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const activeEscalations = escalations?.filter(e => e.status === 'In Progress') || []
  const highPriorityEscalations = activeEscalations.filter(e => e.priority === 'High')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Status</h1>
        <p className="text-gray-600">Real-time overview of YugabyteDB customer support and sales metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{metrics?.totalCustomers}</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Escalations</p>
              <p className="text-2xl font-bold text-gray-900">{metrics?.activeEscalations}</p>
            </div>
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownRight className="h-4 w-4 text-danger-600" />
            <span className="text-danger-600 font-medium">-3</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-gray-900">{metrics?.averageResolutionTime}h</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <Clock className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownRight className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">-0.8h</span>
            <span className="text-gray-500 ml-1">from last week</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{metrics?.customerSatisfaction}/5</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+0.2</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Database Clusters</span>
              </div>
              <span className="text-sm text-gray-600">All Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">API Services</span>
              </div>
              <span className="text-sm text-gray-600">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warning-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Monitoring</span>
              </div>
              <span className="text-sm text-gray-600">Minor Issues</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Backup Systems</span>
              </div>
              <span className="text-sm text-gray-600">Normal</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activeEscalations.slice(0, 5).map((escalation) => (
              <div key={escalation.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {escalation.priority === 'High' ? (
                    <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                  ) : escalation.priority === 'Medium' ? (
                    <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {escalation.customerName} - {escalation.priority} Priority
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {escalation.issueDescription.substring(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-400">
                    Created {format(new Date(escalation.created), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Priority Alerts */}
      {highPriorityEscalations.length > 0 && (
        <div className="card border-l-4 border-l-danger-500">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-danger-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">High Priority Alerts</h3>
          </div>
          <div className="mt-4 space-y-3">
            {highPriorityEscalations.map((escalation) => (
              <div key={escalation.id} className="bg-danger-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-danger-900">{escalation.customerName}</h4>
                    <p className="text-sm text-danger-700 mt-1">
                      {escalation.issueDescription.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
                      {escalation.priority}
                    </span>
                    <p className="text-xs text-danger-600 mt-1">
                      Assigned: {escalation.assignedEngineer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Critical Issues</span>
              <span className="text-sm font-medium">2.1h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">High Priority</span>
              <span className="text-sm font-medium">4.2h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Medium Priority</span>
              <span className="text-sm font-medium">8.5h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Low Priority</span>
              <span className="text-sm font-medium">24.0h</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SLA Compliance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Critical SLA</span>
              <span className="text-sm font-medium text-success-600">98.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">High Priority SLA</span>
              <span className="text-sm font-medium text-success-600">96.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Medium Priority SLA</span>
              <span className="text-sm font-medium text-warning-600">94.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overall SLA</span>
              <span className="text-sm font-medium text-success-600">97.1%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Engineers Available</span>
              <span className="text-sm font-medium">12/15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Workload</span>
              <span className="text-sm font-medium">3.2 cases</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Utilization</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overtime Hours</span>
              <span className="text-sm font-medium">12.5h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 