'use client'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Workflow Builder</h1>
        <p className="text-gray-400">Design and automate your AI workflows with a drag-and-drop interface.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for nodes or connections"
          className="pl-10 bg-gray-800 border-gray-700"
        />
      </div>

      {/* Workflow Canvas */}
      <div className="min-h-96 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center space-y-4 p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Drag and drop nodes here to start building your workflow</h3>
          <p className="text-gray-400 mb-4">
            Explore the node library on the left to find the components you need.<br />
            Connect nodes to define the flow of data and processing.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Open Node Library
          </Button>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="fixed bottom-6 right-6">
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
          AI Assistant
        </Button>
      </div>
    </div>
  )
}
