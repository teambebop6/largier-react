import React from 'react';

import { Grid, Icon, Menu, Popup } from 'semantic-ui-react';

import { I18n } from 'react-i18next';

const scrollTo = (id) => {
  const element = document.getElementById(id);
  console.log(element);
  if (element) {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

export default () => (
  (
    <Grid className="page sticky top fixed nav-grid">
      <Grid.Row>
        <Grid.Column>
          <Menu className="main-menu">
            <Menu.Item link onClick={() => scrollTo('about')}>
              <I18n>{t => t('about')}</I18n>
            </Menu.Item>
            <Menu.Item link onClick={() => scrollTo('concerts')}>
              <I18n>{t => t('concerts')}</I18n>
            </Menu.Item>
            <Menu.Item link onClick={() => scrollTo('media')}>
              <I18n>{t => t('media')}</I18n>
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item icon>
                <Popup
                  trigger={
                    <a href="mailto:info@chantallargier.com" style={{ color: 'rgba(0,0,0,0.87)' }}>
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

            </Menu.Menu>
          </Menu>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
);
