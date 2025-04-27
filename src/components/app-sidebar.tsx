'use client'
import * as React from 'react'
import {
  Chats,
  EnvelopeSimpleOpen,
  House,
  Package,
  SignOut,
  TreeStructure,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

const data = {
  navMain: [
    {
      icon: <House size={28} weight="duotone" className="text-lime-600" />,
      title: 'Dashboard',
      id: 'dashboard',
    },
    {
      icon: (
        <TreeStructure size={28} weight="duotone" className="text-lime-600" />
      ),
      title: 'Products',
      id: 'products',
    },
    {
      icon: <Package size={28} weight="duotone" className="text-lime-600" />,
      title: 'Suppliers',
      id: 'suppliers',
    },
    {
      icon: <Chats size={28} weight="duotone" className="text-lime-600" />,
      title: 'Chat',
      id: 'chat',
    },
  ],
}

export function AppSidebar({
  onSidebarSelect,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onSidebarSelect: (id: string) => void
}) {
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => onSidebarSelect(item.id)}
                  className="flex items-center gap-2 font-medium hover:bg-lime-100 text-lime-700"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem className="cursor-pointer flex items-center justify-center mt-16">
              <SignOutButton>
                <SignOut size={16} className="text-lime-700" />
              </SignOutButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
