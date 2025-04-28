import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink } from "react-router";
import "./index.less";

const { Sider } = Layout;

const Navigation = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    // <nav>
    //   <NavLink className="nav" to="/">Home</NavLink>
    //   <NavLink className="nav" to="/AboutView">About</NavLink>
    // </nav>
    <Sider width={200} style={{ background: colorBgContainer }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={[
          {
            key: 'sub1',
            label: 'Navigation One',
            icon: <MailOutlined />,
            children: [
              {
                key: 'g1',
                label: 'Item 1',
                type: 'group',
                children: [
                  { key: '1', label: <NavLink className="nav" to="/">Home</NavLink> },
                  { key: '2', label: <NavLink className="nav" to="/AboutView">About</NavLink> },
                ],
              },
              {
                key: 'g2',
                label: 'Item 2',
                type: 'group',
                children: [
                  { key: '3', label: 'Option 3' },
                  { key: '4', label: 'Option 4' },
                ],
              },
            ],
          },
          {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
              { key: '5', label: 'Option 5' },
              { key: '6', label: 'Option 6' },
              {
                key: 'sub3',
                label: 'Submenu',
                children: [
                  { key: '7', label: 'Option 7' },
                  { key: '8', label: 'Option 8' },
                ],
              },
            ],
          },
          {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <SettingOutlined />,
            children: [
              { key: '9', label: 'Option 9' },
              { key: '10', label: 'Option 10' },
              { key: '11', label: 'Option 11' },
              { key: '12', label: 'Option 12' },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default Navigation;