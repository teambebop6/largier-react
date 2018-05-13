import React from 'react';

import { Menu, Popup, Icon } from 'semantic-ui-react';

import './TopLeftLinks.less';

export default () => (
  (
    <Menu secondary inverted className="topLeftLinksMenu">
      <Menu.Item icon>
        <Popup
          trigger={
            <a href="mailto:info@chantallargier.com">
              <Icon name="mail" />
            </a>
          }
          hoverable
        >
          <p>click me to send an email!</p>
        </Popup>
      </Menu.Item>
      <Menu.Item icon>
        <Popup
          trigger={<Icon name="wechat" />}
          hoverable
        >
          <p>Wechat Id: chantallargier</p>
        </Popup>
      </Menu.Item>
      <Menu.Item icon>
        <Popup
          trigger={<Icon name="facebook" />}
          hoverable
        >
          <p><a href="http://facebook.com/chantallargier">http://facebook.com/chantallargier</a></p>
        </Popup>
      </Menu.Item>

    </Menu>
  )
);
