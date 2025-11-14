import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.scss';
import AboutPageAdmin from './components/AboutPageAdmin';
import AtvPageAdmin from "./components/AtvPageAdmin.jsx";

function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('atvs');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      
      // Load user data
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
    setCheckingAuth(false);
  }, [navigate]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false); // Close sidebar when tab is selected
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (checkingAuth) {
    return <div>Loading...</div>; // prevents flicker before redirect
  }

  if (!isAuthenticated) {
    return null; // or a spinner
  }

  const menuItems = [
    { id: 'atvs', label: 'Menagjimi i ATV', icon: '🏍️' },
    { id: 'about', label: 'Rreth Nesh', icon: '📄' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'atvs':
        return <AtvPageAdmin />;
      case 'about':
        return <AboutPageAdmin />;
      default:
        return '';
    }
  };

  return (
    <div className="admin-panel">
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon modal-icon--warning">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="modal-title">Konfirmo Daljen</h3>
              <p className="modal-description">Jeni të sigurt që dëshironi të dilni nga paneli i administrimit?</p>
            </div>
            <div className="modal-actions">
              <button className="modal-btn modal-btn--secondary" onClick={() => setShowLogoutModal(false)}>
                Anulo
              </button>
              <button className="modal-btn modal-btn--danger" onClick={confirmLogout}>
                Po, Dil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="brand-icon">🏍️</div>
            <div className="brand-text">
              <h2 className="brand-title">ATV Admin</h2>
              <p className="brand-subtitle">Control Panel</p>
            </div>
          </div>
          <button 
            className="sidebar__close"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="sidebar__nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'nav-item--active' : ''}`}
              onClick={() => handleTabChange(item.id)}
            >
              <span className="nav-item__icon">{item.icon}</span>
              <span className="nav-item__label">{item.label}</span>
              {activeTab === item.id && <span className="nav-item__indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="user-profile">
            <div className="user-profile__avatar">
              <span>{user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}</span>
            </div>
            <div className="user-profile__info">
              <p className="user-profile__name">{user?.name || user?.email || 'Administrator'}</p>
              <p className="user-profile__role">{user?.role || 'Admin'}</p>
            </div>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Dil</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <button 
            className="topbar__menu-btn"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <div className="topbar__title">
            <h1>{menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}</h1>
          </div>

          <div className="topbar__actions">
            <button className="topbar__action" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-pill stat-pill--blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span className="stat-pill__value">4</span>
            <span className="stat-pill__label">Faqe</span>
          </div>

          <div className="stat-pill stat-pill--green">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span className="stat-pill__value">3</span>
            <span className="stat-pill__label">ATV</span>
          </div>

          <div className="stat-pill stat-pill--purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span className="stat-pill__value">8</span>
            <span className="stat-pill__label">Imazhe</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
