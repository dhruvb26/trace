'use client'
import AiSidebar from '@/components/ai-sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { RightSidebar } from '@/components/right-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selectedSidebar, setSelectedSidebar] = useState<string | null>(null)

  const renderRightSidebar = () => {
    switch (selectedSidebar) {
      case 'dashboard':
        return redirect('/dashboard')
      case 'products':
        return redirect('/flow')
      case 'suppliers':
        return <RightSidebar />
      case 'chat':
        return (
          <AiSidebar mcpServerUrl="https://8c19-164-67-70-232.ngrok-free.app/mcp" />
        )
      default:
        return null
    }
  }

  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar onSidebarSelect={setSelectedSidebar} />
      <SidebarInset className={selectedSidebar ? 'pr-[420px]' : ''}>
        {children}
      </SidebarInset>
      {renderRightSidebar()}
    </SidebarProvider>
  )
}
