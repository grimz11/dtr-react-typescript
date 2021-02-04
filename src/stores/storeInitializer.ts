
import AccountAuthStore from './accountAuthStore';
import RecordStore from './recordStore';
import UserStore from './userStore';


export default function initializeStores() {
  return {
    userStore: new UserStore(),
    accountAuthStore: new AccountAuthStore(),
    recordStore: new RecordStore()
  }
}
