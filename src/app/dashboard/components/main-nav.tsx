'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, FileText } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'My Documents',
      icon: <LayoutDashboard />,
    },
    {
        href: '/dashboard/admin',
        label: 'Admin',
        icon: <Users />,
    }
  ];

  return (
    <SidebarMenu>
      {menuItems.map(item => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
