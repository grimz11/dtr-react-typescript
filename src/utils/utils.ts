import { routers } from '../components/Router/router.config';
import Cookies from "universal-cookie";

var cookies:any = new Cookies();

class Utils {
  getRoute = (path: string): any => {
    return routers.filter(route => route.path === path)[0];
  };
  getPageTitle = (pathname: string): any => {
    const route = routers.filter(route => route.path === pathname);
    const localizedAppName = 'Hyperstacks';
    if (!route || route.length === 0) {
      return localizedAppName;
    }

    return localizedAppName  + ' :: ' +  route[0].title;
  };
  setCookie = (name:string, param:any) => {
     cookies.set(name, param);
    return;
  }

  getCookie =  (name:string) => {
    const res =  cookies.get(name);
    return res;
  }
  removeToken = async () => {
    await cookies.remove("access_token");
    await cookies.remove("id");
  }
}

export default new Utils();