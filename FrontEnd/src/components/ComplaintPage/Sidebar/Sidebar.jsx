import { FiChevronLeft, FiChevronRight, FiHome, FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../../contexts/useAuth';
import "./Sidebar.scss";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { usuarioNome, logout } = useAuth();
  
  // Dados simulados
  const notifications = [
    { id: 2, text: 'Sua denúncia foi resolvida', time: '1 hora', unread: true }
  ];

  const navItems = [
    { icon: <FiHome />, label: 'Início', active: true },
    { icon: <FiBell />, label: 'Notificações', active: false, count: notifications.filter(n => n.unread).length },
    { icon: <FiUser />, label: 'Perfil', active: false }
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>
        {sidebarOpen && <h2 className="logo"><img src="" alt="logo" /></h2>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button 
            key={item.label}
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {sidebarOpen && (
              <>
                <span className="nav-label">{item.label}</span>
                {item.count > 0 && <span className="nav-badge">{item.count}</span>}
              </>
            )}
          </button>
        ))}
      </nav>

      {sidebarOpen && (
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3>Notificações</h3>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                  <p>{notification.text}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        {sidebarOpen ? (
          <div className="user-profile">
            <div className="avatar">
              {usuarioNome ? usuarioNome.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-info">
              <span className="username">{usuarioNome || 'Usuário'}</span>
              <span className="user-status">Online</span>
            </div>
            <button className="logout-btn" onClick={logout} title="Sair">
              <FiLogOut />
            </button>
          </div>
        ) : (
          <button className="logout-btn" onClick={logout} title="Sair">
            <FiLogOut />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;