import { routers } from '../components/Router/router.config';
import Cookies from "universal-cookie";

var cookies:any = new Cookies();

class Utils {
  getRoute = (path: string): any => {
    return routers.filter(route => route.path === path)[0];
  };
  getPageTitle = (pathname: string): any => {
    const route = routers.filter(route => route.path === pathname);
    const localizedAppName = 'AppName';
    if (!route || route.length === 0) {
      return localizedAppName;
    }

    return route[0].title + ' | ' + localizedAppName;
  };
  setCookie = (name:string, param:any) => {
    cookies.set(name, param);
    return;
  }
  // setToken = (jwt: string): void => {
  //   cookies.set("access_token", jwt);
  // }
  getCookie = (name:string): string => {
    return cookies.get(name);
  }
  removeToken = (): void => {
    cookies.remove("access_token");
    cookies.remove("id");
  }
}

export default new Utils();