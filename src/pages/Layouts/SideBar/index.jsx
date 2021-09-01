import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Menu, Button } from 'antd';
import routes, { sideBarList } from '@routes';
import { useHistory, useLocation } from 'umi';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

const myRoutes = sideBarList || [];
myRoutes.splice(0, 1);

const SideBar = (props) => {
  const myHistory = useHistory();
  const myLocation = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  // const [ defaultSelectedKeys, setDefaultSelectedKeys ] = useState([myLocation.pathname]);
  const [selectedKeys, setSelectedKeys] = useState([myLocation.pathname]);
  const [openKeys, setOpenKeys] = useState([myLocation.pathname]);
  const handleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    // console.log(item, key, keyPath, selectedKeys, domEvent , 'handleSelect')
    myHistory.replace(key);
  };

  useEffect(() => {
    // alert(666)
    console.log(6666);
    const { pathname } = myLocation;
    // const keys = []
    // keys.push(pathname)
    // console.log(pathname, 'pathname', [pathname])
    // setDefaultSelectedKeys(keys)
    setSelectedKeys([pathname]);
    setOpenKeys([pathname]);
  }, [myLocation]);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        mode="inline"
        theme="light"
        onSelect={handleSelect}
        inlineCollapsed={collapsed}
      >
        {!!myRoutes.length &&
          myRoutes.map((item, idnex) => {
            return (
              <Menu.Item key={item.path} icon={<PieChartOutlined />}>
                {item.title}
              </Menu.Item>
            );
          })}

        {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <Menu.Item key="3" icon={<ContainerOutlined />}>
                    Option 3
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu> */}
      </Menu>
    </div>
  );
};

export default SideBar;
