export interface Customer {
  id: string
  name: string
  industry: string
  annualRevenue: number
  employeeCount: number
  status: 'active' | 'inactive' | 'prospect'
}

export interface Escalation {
  id: string
  customerId: string
  customerName: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'In Progress' | 'Resolved' | 'Escalated'
  created: string
  escalated?: string
  issueDescription: string
  rootCauseAnalysis: string[]
  technicalDetails: {
    affectedTable?: string
    hotShard?: string
    dataDistribution?: string
    queryPattern?: string
    indexIssues?: string
  }
  impactAssessment: {
    businessImpact: 'High' | 'Medium' | 'Low'
    affectedUsers?: number
    revenueImpact?: number
    slaViolation?: boolean
  }
  actionPlan: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
  currentStatus: string
  customerSentiment: string
  escalationLevel: string
  assignedEngineer: string
  customerContact: string
}

export interface SalesOpportunity {
  accountId: string
  accountName: string
  accountType: string
  industry: string
  annualRevenue: number
  employeeCount: number
  rating: 'Hot' | 'Warm' | 'Cold'
  status: string
  salesStage: string
  expectedContractValue: number
  databaseRequirements: string[]
  currentDatabase?: string
  deploymentType?: string
  nextSteps: string
  notes: string
  customerSince: string
  lastActivityDate: string
  accountOwner: string
  leadSource: string
}

export interface DashboardMetrics {
  totalCustomers: number
  activeEscalations: number
  resolvedEscalations: number
  averageResolutionTime: number
  customerSatisfaction: number
  totalRevenue: number
  pipelineValue: number
  partnerOpportunities: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface TimeSeriesData {
  date: string
  value: number
  category?: string
} 