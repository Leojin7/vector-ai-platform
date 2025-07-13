import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-green-400 text-sm">+5%</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">876</div>
              <p className="text-red-400 text-sm">-2%</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15%</div>
              <p className="text-green-400 text-sm">+1%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Engagement */}
      <div>
        <h2 className="text-xl font-semibold mb-4">User Engagement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>User Activity Over Time</CardTitle>
              <div className="text-2xl font-bold text-green-400">+12%</div>
              <p className="text-sm text-gray-400">Last 30 Days +12%</p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for chart */}
              <div className="h-48 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-400">Chart Placeholder</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <div className="text-2xl font-bold text-red-400">-5%</div>
              <p className="text-sm text-gray-400">Last 30 Days -5%</p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for chart */}
              <div className="h-48 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-400">Chart Placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
