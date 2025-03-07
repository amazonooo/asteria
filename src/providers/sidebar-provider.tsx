'use client'

import { createContext, ReactNode, useState } from 'react'

const initialValue = { isCollapsed: true, toggleSidebarButton: () => {} }

export const SidebarContext = createContext(initialValue)

export function SidebarProvider({children}: {children: ReactNode | ReactNode[]}) {
  const [isCollapsed, setIsCollapded] = useState<boolean>(true)

  const toggleSidebarButton = () => {
    setIsCollapded(prev => !prev)
  }

  return (
		<SidebarContext.Provider
			value={{ isCollapsed, toggleSidebarButton }}
		>
      {children}
    </SidebarContext.Provider>
	)
}