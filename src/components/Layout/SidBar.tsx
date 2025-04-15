import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { sidebarMenuItems } from '../../utils/sidebarMenuItems';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SidBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    navigate(key);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ width: 250, height: '100vh', borderRight: '1px solid #eee' }}
        onClick={handleClick}
      >
        {sidebarMenuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
