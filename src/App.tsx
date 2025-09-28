
import React, { useState, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MissionView from './components/MissionView';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { User, View, LeaderboardData } from './types';
import { LEADERBOARD_DATA } from './constants';
import './auth.css';

const App: React.FC<Record<string, never>> = (): React.ReactElement => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    uid: '123',
    name: 'Eco-Learner',
    ecoPoints: 0,
    completedMissions: [],
  });

  const startMission = useCallback((missionId: string): void => {
    setActiveMissionId(missionId);
    setCurrentView(View.MISSION);
  }, []);

  const completeMission = useCallback((missionId: string): void => {
    if (!user.completedMissions.includes(missionId)) {
      setUser((prevUser: User): User => ({
        ...prevUser,
        ecoPoints: prevUser.ecoPoints + 25,
        completedMissions: [...prevUser.completedMissions, missionId]
      }));
    }
    setActiveMissionId(null);
    setCurrentView(View.DASHBOARD);
  }, [user.completedMissions]);

  const navigateTo = useCallback((view: View): void => {
    setCurrentView(view);
  }, []);
  
  const renderView = (): React.ReactElement => {
    switch (currentView) {
      case View.MISSION:
        return activeMissionId ? (
          <MissionView 
            missionId={activeMissionId} 
            onMissionComplete={completeMission}
            onExit={() => navigateTo(View.DASHBOARD)}
          />
        ) : <Dashboard user={user} onStartMission={startMission} onNavigate={navigateTo} />;
      case View.LEADERBOARD: {
        const leaderboardWithUser: LeaderboardData[] = LEADERBOARD_DATA.map(item => 
          item.name === 'You' ? {...item, points: user.ecoPoints} : item)
          .sort((a, b) => b.points - a.points);
        return <Leaderboard leaderboardData={leaderboardWithUser} onNavigate={() => navigateTo(View.DASHBOARD)} />;
      }
      case View.DASHBOARD:
      default:
        return <Dashboard user={user} onStartMission={startMission} onNavigate={navigateTo} />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <div key={currentView} className="animate-fade-in-up">
                {renderView()}
              </div>
            } />
            <Route path="*" element={<Navigate to="/hackathon-final/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;