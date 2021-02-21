import Loading from "./../Loading/index";
import Loadable from "react-loadable";

const LoadableComponent = (component: any) =>
  Loadable({
    loader: component,
    loading: Loading,
  });

export default LoadableComponent;
