'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

type UserRole = 'admin' | 'user';

export function MainNav() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole') as UserRole;
      setUserRole(role);
    }
  }, []);

  const menuItems = [
    {
      href: '/dashboard',
      label: 'My Documents',
      icon: <LayoutDashboard />,
      roles: ['admin', 'user'],
    },
    {
        href: '/dashboard/admin',
        label: 'Admin',
        icon: <Users />,
        roles: ['admin'],
    }
  ];

  const filteredMenuItems = menuItems.filter(item => userRole && item.roles.includes(userRole));

  return (
    <SidebarMenu>
      {filteredMenuItems.map(item => (
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
