import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '@assets/nbg-e-omt.svg';

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const handleLogout = async (e) => {
    e.preventDefault();
    // Your logout logic
  };

  const toggleExpand = (path) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  const isChildActive = (children) => {
    return children.some(child =>
      location.pathname.toLowerCase().startsWith(child.path.toLowerCase())
    );
  };

  const navItems = [
    {
      path: '/dashboard',
      icon: 'dashboard-line',
      text: 'Dashboard',
      children: [
        { path: '/dashboard/overview', icon: 'bar-chart-line', text: 'Overview' },
        { path: '/dashboard/analytics', icon: 'pie-chart-line', text: 'Analytics' },
        { path: '/dashboard/insights', icon: 'lightbulb-line', text: 'Insights' }
      ]
    },
    {
      path: '/portfolio',
      icon: 'briefcase-line',
      text: 'Portfolio',
      children: [
        { path: '/portfolio/services', icon: 'service-line', text: 'Services' },
        { path: '/portfolio/offerings', icon: 'gift-line', text: 'Offerings' },
        { path: '/portfolio/catalog', icon: 'book-line', text: 'Catalog' }
      ]
    },
    {
      path: '/dashboard/products',
      icon: 'shopping-bag-line',
      text: 'Products',
      children: [
        { path: '/dashboard/products/list', icon: 'archive-line', text: 'Product List' },
        { path: '/dashboard/products/categories', icon: 'folder-line', text: 'Categories' },
        { path: '/dashboard/products/specs', icon: 'file-settings-line', text: 'Specifications' }
      ]
    },
    {
      path: '/customers',
      icon: 'user-line',
      text: 'Customers',
      children: [
        { path: '/customers/accounts', icon: 'account-circle-line', text: 'Accounts' },
        { path: '/customers/segments', icon: 'group-line', text: 'Segments' },
        { path: '/customers/feedback', icon: 'feedback-line', text: 'Feedback' }
      ]
    },
    {
      path: '/orders',
      icon: 'shopping-cart-line',
      text: 'Orders',
      children: [
        { path: '/orders/list', icon: 'file-list-3-line', text: 'Order List' },
        { path: '/orders/status', icon: 'exchange-line', text: 'Order Status' },
        { path: '/orders/history', icon: 'time-line', text: 'History' }
      ]
    },
    {
      path: '/operations',
      icon: 'task-line',
      text: 'Operations',
      children: [
        { path: '/operations/tasks', icon: 'file-search-line', text: 'Tasks' },
        { path: '/operations/logs', icon: 'file-search-line', text: 'Logs' },
        { path: '/operations/integrations', icon: 'links-line', text: 'Integrations' }
      ]
    },
    {
      path: '/itil',
      icon: 'stack-line',
      text: 'ITIL Management',
      children: [
        { path: '/itil/service-catalog', icon: 'book-open-line', text: 'Service Catalog' },
        { path: '/itil/cmdb', icon: 'database-line', text: 'CMDB' },
        { path: '/itil/changes', icon: 'exchange-box-line', text: 'Change Management' }
      ]
    },
    {
      path: '/releases',
      icon: 'rocket-line',
      text: 'Releases',
      children: [
        { path: '/releases/planning', icon: 'calendar-event-line', text: 'Planning' },
        { path: '/releases/versions', icon: 'code-s-slash-line', text: 'Versions' },
        { path: '/releases/deployments', icon: 'cloud-upload-line', text: 'Deployments' }
      ]
    },
    {
      path: '/support',
      icon: 'lifebuoy-line',
      text: 'Support',
      children: [
        { path: '/support/tickets', icon: 'ticket-line', text: 'Tickets' },
        { path: '/support/kb', icon: 'book-2-line', text: 'Knowledge Base' },
        { path: '/support/chat', icon: 'message-3-line', text: 'Live Chat' }
      ]
    },
    {
      path: '/billing',
      icon: 'wallet-line',
      text: 'Billing',
      children: [
        { path: '/billing/invoices', icon: 'file-text-line', text: 'Invoices' },
        { path: '/billing/payments', icon: 'bank-card-line', text: 'Payments' },
        { path: '/billing/plans', icon: 'price-tag-line', text: 'Plans' }
      ]
    },
    {
      path: '/settings',
      icon: 'settings-line',
      text: 'Settings',
      children: [
        { path: '/settings/users', icon: 'user-settings-line', text: 'Users' },
        { path: '/settings/roles', icon: 'shield-user-line', text: 'Roles' },
        { path: '/settings/preferences', icon: 'sliders-line', text: 'Preferences' }
      ]
    },
    {
      path: '/reports',
      icon: 'file-chart-line',
      text: 'Reports',
      children: [
        { path: '/reports/sales', icon: 'bar-chart-line', text: 'Sales' },
        { path: '/reports/usage', icon: 'pie-chart-line', text: 'Usage' },
        { path: '/reports/audits', icon: 'file-lock-line', text: 'Audits' }
      ]
    }
  ];

  return (
    <>
      <aside className="z-30 h-lvh fixed bg-white inset-y-0 py-4 px-4 shadow-md overflow-hidden w-[15rem] shadow-xl/30">
        <div className="mb-20 mt-3 h-4">
          <Link to="/" className="max-w-24">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="h-[calc(100vh-180px)] overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isItemActive = isActive(item.path) || (hasChildren && isChildActive(item.children));
              const isExpanded = expandedItems[item.path];

              return (
                <li key={item.path}>
                  <div className="flex flex-col overflow-hidden">
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        if (hasChildren) {
                          e.preventDefault();
                          toggleExpand(item.path);
                        }
                      }}
                      className={`flex items-center px-2 py-3 hover:bg-cyan-100 hover:text-cyan-600 ${
                        isItemActive ? 'bg-cyan-600 text-cyan-50' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <i className={`ri-${item.icon} mr-3 text-lg`} />
                      <span className="font-medium flex-1">{item.text}</span>
                      {hasChildren && (
                        <i className={`ri-arrow-right-s-line transition-transform ${
                          isExpanded ? 'transform rotate-90' : ''
                        }`} />
                      )}
                    </Link>

                    {hasChildren && isExpanded && (
                      <ul className="mt-1 space-y-1 max-w-full">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className={`flex items-center px-2 py-3 text-sm hover:bg-cyan-100 hover:text-cyan-600 ${
                                isActive(child.path) ? 'bg-cyan-600 text-cyan-50' : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <i className={`ri-${child.icon} mr-3 text-lg`} />
                              <span className="font-medium">{child.text}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="group absolute bottom-0 left-0 right-0 border-t-2 border-cyan-600 py-2 pl-2 bg-white text-cyan-700 hover:bg-cyan-700 hover:text-white transition-all duration-150">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 cursor-pointer"
          >
            <i className="ri-shut-down-line mr-3 text-lg shake" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="ml-60" />
    </>
  );
};

export default Sidebar;
