
const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: 'bi-house' },
    { name: 'Me', icon: 'bi-person-circle' },
    { name: 'Inbox', icon: 'bi-inbox' },
    { name: 'My Team', icon: 'bi-people' },
    { name: 'My Finances', icon: 'bi-wallet2' },
    { name: 'Org', icon: 'bi-diagram-3' },
    { name: 'Engage', icon: 'bi-chat-left-dots' },
    { name: 'Performance', icon: 'bi-speedometer2' },
     { name: 'Project', icon: 'bi-kanban' },
    { name: 'Time', icon: 'bi-clock' }
  ];

  return (
    <div
      className="nav-bg text-white d-flex.sidebar-container  "
      style={{ width: '130px', minHeight: "auto",
        overflowY: "auto",}}
    >
      <ul className="nav flex-column flex-sm-column flex-row text-center px-2 w-100 justify-content-around">
  {menuItems.map((item) => (
    <li className="nav-item my-3 sidebar-item text-nowrap" key={item.name}>
      <i className={`bi ${item.icon} fs-4 d-block mb-1`}></i>
      <a href="#" className="nav-link p-0 small sidebar-text">{item.name}</a>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Sidebar;
