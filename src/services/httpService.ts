import AppConsts from '../utils/appconst';
import { Modal } from 'antd';
import axios from 'axios';

const qs = require('qs');

const http = axios.create({
  baseURL: AppConsts.appBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});



http.interceptors.request.use(
  function (config) {
    // if (config.url === AppConsts.directlineRefreshTokenUrl) {
    //   config.headers.common['Authorization'] = 'Bearer ' + abp.auth.directline;
    // }

    // if (!!abp.auth.getToken() && config.url !== AppConsts.directlineRefreshTokenUrl) {
    //   config.headers.common['Authorization'] = 'Bearer ' + abp.auth.getToken();
    // }

    // config.headers.common['.AspNetCore.Culture'] = abp.utils.getCookieValue('Abp.Localization.CultureName');
    // config.headers.common['Abp.TenantId'] = abp.multiTenancy.getTenantIdCookie();

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => { 

    console.log('http error', {error});
    if(error.response.status == 400){
      Modal.error({
        title: error.response.statusText, 
        content: error.response.data.message[0].messages[0].message,
      });
    }
    else if (error.response.status == 500 && error.response.config.url == "api/TokenAuth/Authenticate") {
      Modal.error({
        title: error.response.data.error.message === 'Login failed' ? 'Uh-Oh' : error.response.data.error.message,
        content:
          error.response.data.error.message === 'Login failed!'
            ? 'It seems that you have entered an incorrect user name, email, or password. Please try again.'
            : error.response.data.error.details,
      });
    }else if (error.response.status == 500) { 
        alert('Your session has timed out. Please login again.');
        window.location.href = '/user/login';
    } else if (!error.response) {
        if (axios.isCancel(error)) {
        } else {
          Modal.error({ content: 'UnknownError'});
        }
    }
    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
