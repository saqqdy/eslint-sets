import type { ReactNode } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'

export interface Tab {
  content: ReactNode
  disabled?: boolean
  id: string
  label: string
}

export interface TabsProps {
  defaultTab?: string
  onChange?: (tabId: string) => void
  tabs: Tab[]
}

interface TabsContextValue {
  activeTab: string
  setActiveTab: (tabId: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

export function Tabs({ defaultTab, onChange, tabs }: TabsProps) {
  const [activeTab, setActiveTabState] = useState(defaultTab ?? tabs[0]?.id ?? '')

  const setActiveTab = useCallback(
    (tabId: string) => {
      setActiveTabState(tabId)
      onChange?.(tabId)
    },
    [onChange],
  )

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  const contextValue = useMemo(
    () => ({ activeTab, setActiveTab }),
    [activeTab, setActiveTab],
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="tabs" style={{ width: '100%' }}>
        <div
          className="tabs-list"
          role="tablist"
          style={{
            borderBottom: '1px solid #ddd',
            display: 'flex',
            gap: '0',
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #42b883' : 'none',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                opacity: tab.disabled ? 0.5 : 1,
                padding: '10px 20px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className="tabs-content"
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={activeTab}
          style={{ padding: '20px 0' }}
        >
          {activeTabData?.content}
        </div>
      </div>
    </TabsContext.Provider>
  )
}

export function TabPanel({ children }: { children: ReactNode }) {
  return <div className="tab-panel">{children}</div>
}
