import { useQuery } from '@tanstack/react-query'
import { dataService } from '../services/dataService'
import { DashboardMetrics } from '../types'
import { 
  HeartHandshake, 
  TrendingUp, 
  Users, 
  Globe,
  Award,
  Target,
  DollarSign,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

export default function PartnerDashboard() {
  const { isLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboardMetrics'],
    queryFn: dataService.getDashboardMetrics,
    refetchInterval: 30000
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Mock partner data
  const partnerData = {
    totalPartners: 45,
    activePartners: 38,
    certifiedPartners: 25,
    jointOpportunities: 12,
    partnerRevenue: 1800000,
    partnerGrowth: 22
  }

  const topPartners = [
    { name: 'TechCorp Solutions', revenue: 450000, deals: 8, status: 'Certified' },
    { name: 'DataFlow Systems', revenue: 380000, deals: 6, status: 'Certified' },
    { name: 'CloudBridge Partners', revenue: 320000, deals: 5, status: 'Active' },
    { name: 'InnovateTech Group', revenue: 280000, deals: 4, status: 'Certified' },
    { name: 'NextGen Solutions', revenue: 220000, deals: 3, status: 'Active' }
  ]

  const partnerCategories = [
    { category: 'System Integrators', count: 15, revenue: 850000 },
    { category: 'Consulting Firms', count: 12, revenue: 620000 },
    { category: 'Cloud Providers', count: 8, revenue: 480000 },
    { category: 'VARs', count: 10, revenue: 320000 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Partner Management</h1>
        <p className="text-gray-600">Monitor partner ecosystem and joint business opportunities</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{partnerData.totalPartners}</p>
            </div>
            <div className="p-2 bg-primary-100 rounded-lg">
              <HeartHandshake className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+{partnerData.partnerGrowth}%</span>
            <span className="text-gray-500 ml-1">from last year</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Partner Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(partnerData.partnerRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-success-600" />
            <span className="text-success-600 font-medium">+18%</span>
            <span className="text-gray-500 ml-1">from last quarter</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Joint Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{partnerData.jointOpportunities}</p>
            </div>
            <div className="p-2 bg-warning-100 rounded-lg">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Avg value: $150K per deal</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certified Partners</p>
              <p className="text-2xl font-bold text-gray-900">{partnerData.certifiedPartners}</p>
            </div>
            <div className="p-2 bg-success-100 rounded-lg">
              <Award className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-success-600 font-medium">85%</span>
            <span className="text-gray-500 ml-1">of active partners</span>
          </div>
        </div>
      </div>

      {/* Partner Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Partners</h3>
          <div className="space-y-4">
            {topPartners.map((partner, index) => (
              <div key={partner.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{partner.name}</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`status-badge ${
                        partner.status === 'Certified' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'
                      }`}>
                        {partner.status}
                      </span>
                      <span className="text-gray-500">{partner.deals} deals</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${(partner.revenue / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Categories</h3>
          <div className="space-y-4">
            {partnerCategories.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm font-medium">${(category.revenue / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{category.count} partners</span>
                  <span>Avg: ${(category.revenue / category.count / 1000).toFixed(0)}K per partner</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${(category.revenue / partnerData.partnerRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Ecosystem Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success-600 mr-3" />
                <span className="text-sm font-medium">Active Partners</span>
              </div>
              <span className="text-sm font-medium">{partnerData.activePartners}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: `${(partnerData.activePartners / partnerData.totalPartners) * 100}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium">Certified Partners</span>
              </div>
              <span className="text-sm font-medium">{partnerData.certifiedPartners}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(partnerData.certifiedPartners / partnerData.totalPartners) * 100}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-warning-600 mr-3" />
                <span className="text-sm font-medium">Inactive Partners</span>
              </div>
              <span className="text-sm font-medium">{partnerData.totalPartners - partnerData.activePartners}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: `${((partnerData.totalPartners - partnerData.activePartners) / partnerData.totalPartners) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">North America</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Europe</span>
              <span className="text-sm font-medium">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Asia Pacific</span>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: '15%' }}></div>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Satisfaction</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Rating</span>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">4.6</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(4.6) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Support Quality</span>
              <span className="text-sm font-medium text-success-600">4.8/5</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Training Programs</span>
              <span className="text-sm font-medium text-success-600">4.5/5</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Revenue Growth</span>
              <span className="text-sm font-medium text-success-600">+22%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Joint Opportunities */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Joint Opportunities</h3>
          <button className="btn-secondary text-sm">View All</button>
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            customer: `Customer ${i + 1}`,
            partner: topPartners[i]?.name || 'Partner Name',
            value: 150000 + (i * 25000),
            stage: ['Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Discovery'][i],
            probability: [25, 40, 60, 90, 30][i]
          })).map((opportunity) => (
            <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{opportunity.customer}</h4>
                    <span className="text-sm text-gray-500">with</span>
                    <span className="font-medium text-primary-600">{opportunity.partner}</span>
                    <span className={`status-badge ${
                      opportunity.stage === 'Closed Won' ? 'bg-success-100 text-success-800' :
                      opportunity.stage === 'Negotiation' ? 'bg-primary-100 text-primary-800' :
                      opportunity.stage === 'Proposal' ? 'bg-warning-100 text-warning-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.stage}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Deal Value:</span>
                      <span className="ml-1 font-medium">${(opportunity.value / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Probability:</span>
                      <span className="ml-1 font-medium">{opportunity.probability}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expected Close:</span>
                      <span className="ml-1 font-medium">Q2 2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">${(opportunity.value * opportunity.probability / 100 / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">Expected Value</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Enablement */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Enablement Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Training</h4>
            <p className="text-sm text-gray-600">Technical & Sales</p>
            <div className="mt-2 text-xs text-gray-500">85% completion rate</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-success-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Certification</h4>
            <p className="text-sm text-gray-600">Partner Programs</p>
            <div className="mt-2 text-xs text-gray-500">25 certified partners</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Co-Marketing</h4>
            <p className="text-sm text-gray-600">Joint Campaigns</p>
            <div className="mt-2 text-xs text-gray-500">12 active campaigns</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="h-6 w-6 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Global Reach</h4>
            <p className="text-sm text-gray-600">Market Expansion</p>
            <div className="mt-2 text-xs text-gray-500">15 countries</div>
          </div>
        </div>
      </div>
    </div>
  )
} 