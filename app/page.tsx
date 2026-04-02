'use client'

import { useState, useEffect } from 'react'
import { MobileShell } from '@/components/mobile-shell'
import { BottomNav } from '@/components/bottom-nav'
import { LoginScreen } from '@/components/screens/login-screen'
import { HomeScreen } from '@/components/screens/home-screen'
import { MorososScreen } from '@/components/screens/morosos-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { TeamDetailScreen } from '@/components/screens/team-detail-screen'

type TabId = 'inicio' | 'morosos' | 'perfil'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)

  // Check if user is logged in (simulated with localStorage)
  useEffect(() => {
    const logged = localStorage.getItem('equipopago_logged_in')
    if (logged === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem('equipopago_logged_in', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('equipopago_logged_in')
    setIsLoggedIn(false)
  }

  const handleNavigateToTeam = (teamId: string) => {
    setSelectedTeamId(teamId)
  }

  const handleBackFromTeam = () => {
    setSelectedTeamId(null)
  }

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab)
    setSelectedTeamId(null)
  }

  return (
    <MobileShell>
      <div className="relative h-full">
        {!isLoggedIn ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <>
            {/* Team detail view */}
            {selectedTeamId ? (
              <TeamDetailScreen 
                teamId={selectedTeamId} 
                onBack={handleBackFromTeam} 
              />
            ) : (
              <>
                {/* Tab content */}
                {activeTab === 'inicio' && (
                  <HomeScreen onNavigateToTeam={handleNavigateToTeam} />
                )}
                {activeTab === 'morosos' && <MorososScreen />}
                {activeTab === 'perfil' && <ProfileScreen onLogout={handleLogout} />}
              </>
            )}

            {/* Bottom navigation */}
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </>
        )}
      </div>
    </MobileShell>
  )
}
