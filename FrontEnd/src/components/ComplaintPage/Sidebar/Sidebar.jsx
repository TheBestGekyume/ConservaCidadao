import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import "./Sidebar.scss";

const topLocations = [
  { id: 1, name: 'Teste', complaints: 24 },
  { id: 2, name: 'Teste2', complaints: 18 },
];

const locationReports = [
  { id: 1, name: 'Teste', lastReport: 'Falta de iluminação' },
];

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </button>
      
      {sidebarOpen && (
        <>
          <div className="sidebar-section">
            <h3>Locais Mais Denunciados</h3>
            <div className="top-locations">
              {topLocations.map(location => (
                <div key={location.id} className="location-item">
                  <span className="location-name">{location.name}</span>
                  <span className="location-complaints">{location.complaints} denúncias</span>
                  <span className={`location-trend ${location.trend}`}>
                   
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Últimos Relatórios</h3>
            <div className="reports-list">
              {locationReports.map(report => (
                <div key={report.id} className="report-item">
                  <div className="report-location">{report.name}</div>
                  <div className="report-text">{report.lastReport}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;