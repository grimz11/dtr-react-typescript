
import UserStore from './userStore';


export default function initializeStores() {
  return {
    userStore: new UserStore(),

  };
}
