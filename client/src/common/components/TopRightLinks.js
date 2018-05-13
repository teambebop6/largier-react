import React from 'react';

import { Menu } from 'semantic-ui-react';

import './TopRightLinks.less';

import i18n from '../../i18n';

const selectLanguage = (lng) => {
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
