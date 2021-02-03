import { routers } from '../components/Router/router.config';

class Utils {
  getRoute = (path: string): any => {
    return routers.filter(route => route.path === path)[0];
  };
  getPageTitle = (pathname: string) => {
    const route = routers.filter(route => route.path === pathname);
    const localizedAppName = 'AppName';
    if (!route || route.length === 0) {
      return localizedAppName;
    }

    return route[0].title + ' | ' + localizedAppName;
  };
}

export default new Utils();