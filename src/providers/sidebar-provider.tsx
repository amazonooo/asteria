'use client'

import { createContext, ReactNode, useState } from 'react'

const initialValue = { isCollapsed: false, toggleSidebarButton: () => {} }

export const SidebarContext = createContext(initialValue)

export function SidebarProvider({children}: {children: ReactNode | ReactNode[]}) {
  const [isCollapsed, setIsCollapded] = useState<boolean>(false)

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