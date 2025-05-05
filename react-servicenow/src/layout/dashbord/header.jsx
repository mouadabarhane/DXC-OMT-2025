import Avatarj from "@assets/sunday.jpg";
import { Badge, Dropdown, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../features/auth/authActions';
import SearchButton from '../../components/SearchButton/SearchButton'; // Assuming you have a SearchButton component

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const cleanupClientStorage = () => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
          });
        }
      };

      cleanupClientStorage();
      const result = await dispatch(userLogout());
      if (userLogout.fulfilled.match(result)) {
        message.success('Logged out successfully');
      }
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Logged out locally (API failed)');
      navigate('/login', { replace: true });
    }
  };

  const items = [
    {
      label: <Link to="/profile" className="text-md text-gray-800 hover:text-blue-600"><i className="ri-user-line mr-2"></i> Profile</Link>,
      key: 'profile',
    },
    {
      label: <Link to="/settings" className="text-md text-gray-800 hover:text-blue-600"><i className="ri-settings-3-line mr-2"></i> Settings</Link>,
      key: 'settings',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div className="text-md text-gray-800 hover:text-red-600" onClick={handleLogout}>
          <i className="ri-shut-down-line mr-2"></i> Logout
        </div>
      ),
      key: 'logout',
    },
  ];

  return (
    <header className="p-5 pb-2 sticky top-0 shadow-md flex justify-between items-center bg-white z-50">
      <SearchButton placeholder="Search..." onSearch={() => {}} className="mr-5 max-w-xs flex-1 sm:flex-none" />
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Badge count={5} offset={[-2, 5]} className="absolute top-0 right-0 z-10">
            <i className="ri-notification-3-line text-3xl text-gray-700 hover:text-blue-600 cursor-pointer transition duration-200"></i>
          </Badge>
        </div>

        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
            <Space align="center">
              <div className="h-12 w-12 flex justify-center items-center rounded-full bg-orange-100 overflow-hidden">
                <img src={Avatarj} alt="User avatar" className="h-full w-full object-cover" />
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
