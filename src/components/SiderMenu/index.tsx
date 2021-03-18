import "./index.less";

import { Layout, Menu, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { appRouters } from "../../components/Router/router.config";
import utils from "../../utils/utils";

const { Sider } = Layout;
const { confirm } = Modal;

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
    <Sider
      trigger={null}
      breakpoint="lg"
      collapsedWidth="80"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="site-layout-background-dark-theme-sider-menu"
    >
      <div className="logo">
        <img
          src="https://hyperstacksinc.com/assets/icons/hyperstacks-logo-orange.svg"
          alt="Hyperstacks Inc."
        />
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentRoute ? currentRoute.path : ""]}
        defaultSelectedKeys={["1"]}
      >
        {appRouters
          .filter((item: any) => !item.isLayout && item.showInMenu)
          .map((route: any, index: number) => {
            if (route.permission) return null;
            return (
              <Menu.Item
                key={route.path}
                onClick={() => {
                  if (route.path !== "/logout") {
                    history.push(route.path);
                  } else {
                    confirm({
                      title: "Are you sure you want to logout?",
                      icon: <ExclamationCircleOutlined />,
                      content: "You can login again if you want.",
                      okText: "Yes",
                      okType: "danger",
                      onOk() {
                        history.push(route.path);
                      },
                    });
                  }
                }}
              >
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
