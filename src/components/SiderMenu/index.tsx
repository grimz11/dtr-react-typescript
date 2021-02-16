import './index.less';

import {Layout, Menu } from 'antd';
import logo from '../../assets/images/hyperstacks-logo.jpg';

import { appRouters } from '../../components/Router/router.config';
import utils from '../../utils/utils';

const { Sider } = Layout;

export interface ISiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: any;
  history: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
  const { collapsed, history, onCollapse } = props;
  const currentRoute = utils.getRoute(history.location.pathname);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">
            <img
              src="https://hyperstacksinc.com/assets/icons/hyperstacks-logo-orange.svg"
              alt="Hyperstacks Inc."
            />
          </div>

      <Menu theme="dark" mode="inline" selectedKeys={[currentRoute ? currentRoute.path : '']} defaultSelectedKeys={["1"]}>
        {appRouters
          .filter((item: any) => !item.isLayout && item.showInMenu)
          .map((route: any, index: number) => {
            if (route.permission) return null;
            return (
              <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                <route.icon />
                <span>{route.title}</span>
              </Menu.Item>
            );
          })}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;