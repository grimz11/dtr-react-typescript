import { DashboardOutlined, LogoutOutlined, ProfileOutlined, RadarChartOutlined, TeamOutlined } from "@ant-design/icons";
import LoadableComponent from "./../Loadable/index";

export const userRouter: any = [
  {
    path: "/user",
    name: "user",
    title: "User",
    component: LoadableComponent(
      () => import("../../components/Layout/UserLayout")
    ),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: "/user/login",
    name: "login",
    title: "LogIn",
    component: LoadableComponent(() => import("../../scenes/Login")),
    showInMenu: false,
  },
];

export const appRouters: any = [
  {
    path: "/",
    exact: true,
    name: "home",
    permission: "",
    title: "Home",
    icon: "home",
    component: LoadableComponent(
      () => import("../../components/Layout/AppLayout")
    ),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    permission: "",
    title: "Dashboard",
    icon: DashboardOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import("../../scenes/Dashboard")),
  },
  {
    path: "/admin",
    name: "admin",
    permission: "",
    title: "Employee",
    icon: TeamOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import("../../scenes/Employee")),
  },
  {
    path: "/profile",
    name: "profile",
    permission: "",
    title: "Profile",
    icon: ProfileOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import("../../scenes/Profile")),
  },
  {
    path: "/profile/:id",
    name: "profile",
    permission: "",
    title: "Profile",
    icon: ProfileOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import("../../scenes/Profile")),
  },
  {
    path: "/performance",
    name: "performance",
    permission: "",
    title: "Performance",
    icon: RadarChartOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import("../../scenes/Performance")),
  },

  {
    path: "/logout",
    permission: "",
    title: "Logout",
    name: "logout",
    icon: LogoutOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import("../../components/Logout")),
  },
  {
    path: "/exception?:type",
    permission: "",
    title: "exception",
    name: "exception",
    icon: "info-circle",
    showInMenu: false,
    component: LoadableComponent(() => import("../../scenes/Exception")),
  },
];

export const routers = [...userRouter, ...appRouters];
