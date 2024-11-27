import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'
import sidebarlogo from '/imgs/sidebar logo.png'

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleNavigation = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={sidebarlogo} alt="sidebarlogo" />
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>대실마을</h2>
        </div>
        <button onClick={onClose}>&times;</button>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-group">
          <button 
            className={`nav-item dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>이동형 배터리</span>
            <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
          </button>
          <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <button 
              className={`nav-item sub-item ${currentPath === '/' ? 'active' : ''}`}
              onClick={() => handleNavigation('/')}
            >
              위치 추적
            </button>
            <button 
              className={`nav-item sub-item ${currentPath === '/management' ? 'active' : ''}`}
              onClick={() => handleNavigation('/management')}
            >
              배터리 관리
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar