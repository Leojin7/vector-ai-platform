import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function UserPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* Profile Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-2">Edit Profile</h3>
                <p className="text-gray-400 text-sm">Manage your personal information and preferences.</p>
                <Button variant="outline" className="mt-4">Edit</Button>
              </div>
              <div className="w-32 h-32 bg-orange-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">User</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
        <div className="space-y-4">
          {[
            { title: 'Two-Factor Authentication', desc: 'Enable or disable two-factor authentication for enhanced security.', hasToggle: true },
            { title: 'API Keys', desc: 'Manage your API keys for accessing the platform\'s functionalities.' },
            { title: 'Subscription & Billing', desc: 'View and manage your current subscription plan and billing details.' },
            { title: 'Notifications', desc: 'Manage your notification preferences for platform updates and alerts.' },
            { title: 'Privacy', desc: 'View and manage your data privacy settings and preferences.' },
            { title: 'Account', desc: 'Manage your account settings, including password and email.' }
          ].map((setting, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{setting.title}</h3>
                    <p className="text-gray-400 text-sm">{setting.desc}</p>
                  </div>
                  <div>
                    {setting.hasToggle ? (
                      <Switch />
                    ) : (
                      <Button variant="outline">Manage</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
