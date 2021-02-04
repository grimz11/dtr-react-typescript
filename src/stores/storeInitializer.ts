
import AccountAuthStore from './accountAuthStore';
import UserStore from './userStore';


export default function initializeStores() {
  return {
    userStore: new UserStore(),
    accountAuthStore: new AccountAuthStore()
  };
}
