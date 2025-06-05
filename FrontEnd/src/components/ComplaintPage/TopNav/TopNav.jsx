import UserDropdown from '../Dropdown/Dropdown';
import './TopNav.scss';

function TopNav({ activeTab, switchTab, showUserDropdown, toggleUserDropdown, closeUserMenu }) {
  return (
    <div className="top-nav">
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => switchTab('timeline')}
        >
          Página Inicial
        </div>
        <div
          className={`tab ${activeTab === 'my-posts' ? 'active' : ''}`}
          onClick={() => switchTab('my-posts')}
        >
          Meus Posts
        </div>
      </div>
    </div>
  );
}

export default TopNav;