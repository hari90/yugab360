import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import StatusDashboard from './pages/StatusDashboard'
import TechDashboard from './pages/TechDashboard'
import SupportDashboard from './pages/SupportDashboard'
import PipelineDashboard from './pages/PipelineDashboard'
import PartnerDashboard from './pages/PartnerDashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StatusDashboard />} />
        <Route path="/status" element={<StatusDashboard />} />
        <Route path="/tech" element={<TechDashboard />} />
        <Route path="/support" element={<SupportDashboard />} />
        <Route path="/pipeline" element={<PipelineDashboard />} />
        <Route path="/partner" element={<PartnerDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App 