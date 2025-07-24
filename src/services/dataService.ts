import { Customer, Escalation, SalesOpportunity, DashboardMetrics } from '../types'

// Mock data based on the actual data files
const customers: Customer[] = [
  { id: '1', name: 'Veridian', industry: 'Technology', annualRevenue: 50000000, employeeCount: 250, status: 'active' },
  { id: '2', name: 'Sterling Group', industry: 'Financial Services', annualRevenue: 150000000, employeeCount: 1200, status: 'active' },
  { id: '3', name: 'Aegis', industry: 'Defense', annualRevenue: 75000000, employeeCount: 800, status: 'active' },
  { id: '4', name: 'Keystone', industry: 'Manufacturing', annualRevenue: 200000000, employeeCount: 1500, status: 'active' },
  { id: '5', name: 'Corbin', industry: 'Healthcare', annualRevenue: 30000000, employeeCount: 400, status: 'active' },
  { id: '6', name: 'Stratton', industry: 'Retail', annualRevenue: 80000000, employeeCount: 600, status: 'active' },
  { id: '7', name: 'Ironwood', industry: 'Energy', annualRevenue: 120000000, employeeCount: 900, status: 'active' },
  { id: '8', name: 'Vantage', industry: 'Telecommunications', annualRevenue: 180000000, employeeCount: 1100, status: 'active' },
  { id: '9', name: 'Reliance', industry: 'Insurance', annualRevenue: 95000000, employeeCount: 700, status: 'active' },
  { id: '10', name: 'Northgate', industry: 'Real Estate', annualRevenue: 45000000, employeeCount: 300, status: 'active' },
]

const escalations: Escalation[] = [
  {
    id: 'CE1000',
    customerId: '3',
    customerName: 'Aegis',
    priority: 'High',
    status: 'In Progress',
    created: '2024-01-15',
    escalated: '2024-01-16',
    issueDescription: 'Customer Aegis is experiencing severe performance degradation with their YugabyteDB cluster. Multiple queries are timing out and response times have increased by 300-500% over the past 48 hours.',
    rootCauseAnalysis: [
      'Hot Shard Issue: Table transactions has uneven data distribution',
      '80% of data concentrated in shard 3',
      'Other shards (1, 2, 4, 5) underutilized',
      'Causing network bottlenecks and increased latency'
    ],
    technicalDetails: {
      affectedTable: 'transactions',
      hotShard: 'shard_3 (UUID: 8f7a2b1c-3d4e-5f6g-7h8i-9j0k1l2m3n4o)',
      dataDistribution: '80% in shard_3, 20% across other shards',
      queryPattern: 'Range scans on timestamp column',
      indexIssues: 'Missing composite index on (customer_id, timestamp)'
    },
    impactAssessment: {
      businessImpact: 'High',
      affectedUsers: 10000,
      revenueImpact: 50000,
      slaViolation: true
    },
    actionPlan: {
      immediate: [
        'Implement query optimization with proper indexes',
        'Add connection pool tuning',
        'Enable query monitoring and alerting'
      ],
      shortTerm: [
        'Redistribute data across shards using tablet splitting',
        'Implement read replicas for hot data',
        'Optimize table partitioning strategy'
      ],
      longTerm: [
        'Implement proper sharding strategy',
        'Add monitoring and alerting for hot shards',
        'Document best practices for data distribution'
      ]
    },
    currentStatus: 'CE assigned to Senior Support Engineer. Customer provided cluster access and logs. Initial analysis completed. Action plan approved by customer. Implementation in progress.',
    customerSentiment: 'Customer is frustrated with the performance degradation. Technical team is cooperative but under pressure from business stakeholders. Customer appreciates the quick escalation and detailed analysis.',
    escalationLevel: 'Level 2',
    assignedEngineer: 'Senior Support Engineer',
    customerContact: 'Technical Lead - Aegis'
  },
  {
    id: 'CE1001',
    customerId: '2',
    customerName: 'Sterling Group',
    priority: 'Medium',
    status: 'In Progress',
    created: '2024-01-14',
    issueDescription: 'Database connection issues during peak trading hours causing intermittent failures.',
    rootCauseAnalysis: [
      'Connection pool exhaustion during high load',
      'Network latency spikes during market hours',
      'Insufficient connection timeout configuration'
    ],
    technicalDetails: {
      affectedTable: 'trades',
      queryPattern: 'High-frequency read/write operations'
    },
    impactAssessment: {
      businessImpact: 'Medium',
      affectedUsers: 5000,
      revenueImpact: 25000,
      slaViolation: false
    },
    actionPlan: {
      immediate: ['Increase connection pool size', 'Optimize connection timeout settings'],
      shortTerm: ['Implement connection monitoring', 'Add load balancing'],
      longTerm: ['Scale database infrastructure', 'Implement caching layer']
    },
    currentStatus: 'Configuration changes implemented. Monitoring performance improvements.',
    customerSentiment: 'Customer is satisfied with the quick response and solution implementation.',
    escalationLevel: 'Level 1',
    assignedEngineer: 'Support Engineer',
    customerContact: 'Database Administrator - Sterling Group'
  }
]

const salesOpportunities: SalesOpportunity[] = [
  {
    accountId: 'ACC001',
    accountName: 'Veridian',
    accountType: 'Enterprise',
    industry: 'Technology',
    annualRevenue: 50000000,
    employeeCount: 250,
    rating: 'Hot',
    status: 'Active',
    salesStage: 'Proposal',
    expectedContractValue: 500000,
    databaseRequirements: ['High Availability', 'Low Latency', 'Global Distribution'],
    currentDatabase: 'PostgreSQL',
    deploymentType: 'Cloud',
    nextSteps: 'Technical deep dive scheduled for next week',
    notes: 'Customer is very interested in our multi-region capabilities',
    customerSince: '2024-01-01',
    lastActivityDate: '2024-01-15',
    accountOwner: 'Sarah Johnson',
    leadSource: 'Website'
  },
  {
    accountId: 'ACC002',
    accountName: 'Sterling Group',
    accountType: 'Enterprise',
    industry: 'Financial Services',
    annualRevenue: 150000000,
    employeeCount: 1200,
    rating: 'Warm',
    status: 'Active',
    salesStage: 'Discovery',
    expectedContractValue: 750000,
    databaseRequirements: ['Compliance', 'High Availability', 'Real-time Analytics'],
    currentDatabase: 'Oracle',
    deploymentType: 'Hybrid',
    nextSteps: 'Follow up on compliance requirements',
    notes: 'Customer has strict regulatory requirements',
    customerSince: '2024-01-05',
    lastActivityDate: '2024-01-14',
    accountOwner: 'Mike Chen',
    leadSource: 'Partner Referral'
  }
]

const dashboardMetrics: DashboardMetrics = {
  totalCustomers: 20,
  activeEscalations: 8,
  resolvedEscalations: 45,
  averageResolutionTime: 4.2,
  customerSatisfaction: 4.6,
  totalRevenue: 2500000,
  pipelineValue: 8500000,
  partnerOpportunities: 12
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const dataService = {
  async getCustomers(): Promise<Customer[]> {
    await delay(500)
    return customers
  },

  async getEscalations(): Promise<Escalation[]> {
    await delay(800)
    return escalations
  },

  async getSalesOpportunities(): Promise<SalesOpportunity[]> {
    await delay(600)
    return salesOpportunities
  },

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    await delay(300)
    return dashboardMetrics
  },

  async getEscalationById(id: string): Promise<Escalation | null> {
    await delay(400)
    return escalations.find(e => e.id === id) || null
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    await delay(300)
    return customers.find(c => c.id === id) || null
  }
} 