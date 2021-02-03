import './index.less';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';

import * as React from 'react';

import { Dropdown, Menu } from 'antd';
import Icon from '@ant-design/icons';

import classNames from 'classnames';



class LanguageSelect extends React.Component<any> {
  // get languages() {
  //   return abp.localization.languages.filter((val: any) => {
  //     return !val.isDisabled;
  //   });
  // }

  // async changeLanguage(languageName: string) {
  //   await this.props.userStore!.changeLanguage(languageName);

  //   abp.utils.setCookieValue(
  //     'Abp.Localization.CultureName',
  //     languageName,
  //     new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
  //     abp.appPath
  //   );

  //   window.location.reload();
  // }

  
  render() {
    const langMenu = (
      <Menu className={'menu'}>
       
      </Menu>
    );

    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <Icon type="global" className={classNames('dropDown', 'className')} title={'Languages'} />
      </Dropdown>
    );
  }
}

export default LanguageSelect;
