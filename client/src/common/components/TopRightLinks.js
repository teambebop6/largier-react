import React from 'react';

import { Menu } from 'semantic-ui-react';

import moment from 'moment';
import '../../../node_modules/moment/locale/de';

import i18n from '../../i18n';

import './TopRightLinks.less';

const selectLanguage = (lng) => {
  moment.locale(lng);
  i18n.changeLanguage(lng);
};


export default () => (
  (
    <Menu secondary inverted className="topRightLinksMenu">
      <Menu.Item link onClick={() => selectLanguage('en')}>
        EN
      </Menu.Item>
      <Menu.Item link onClick={() => selectLanguage('de')}>
        DE
      </Menu.Item>
    </Menu>
  )
);
