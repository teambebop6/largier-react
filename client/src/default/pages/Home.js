/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { Player, ControlBar } from 'video-react';

import { get } from '../../common/helpers/api';
// Common components
import TopLeftLinks from '../../common/components/TopLeftLinks';
import TopRightLinks from '../../common/components/TopRightLinks';
import Nav from '../../common/components/Nav';
import SimpleSlider from '../../common/components/Slider';
import ConcertBlock from '../../common/components/ConcertBlock';
// Resources
import './Home.less';
import Logo from '../../res/images/logoWhite.svg';
import Avatar from '../../res/images/avatar.jpg';
import Header from '../../res/images/headerChurch.jpg';
import Video from '../../res/images/largier.mp4';

import i18n from '../../i18n';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming_concerts: [],
      past_concerts: [],
    };
  }

  componentDidMount() {
    get('/api/concerts?limit=5').then((res) => {
      this.setState(res.data);
    }).catch(err => err);

    i18n.changeLanguage('en');
  }

  render() {
    return (
      <div>

        <Nav />
        <div className="headerFrame" />

        <div className="headerPicture" style={{ backgroundImage: `url(${Header})` }}>
          <div className="headerContent">
            <TopLeftLinks />
            <TopRightLinks />
            <Player
              fluid="false"
              height="100vh"
              playsInline
              autoPlay
              muted
              loop
              poster="headerChurch.png"
              src={Video}
            >
              <ControlBar disabled />
            </Player>
            <div className="headerTextContent">
              <Image className="logo" src={Logo} centered />
              <I18n>
                {
                  t => (
                    <p className="chantalDescription">
                      <strong>{t('swisspianist')}</strong> {t('intro')}
                    </p>
                  )
                }
              </I18n>
            </div>
          </div>
        </div>

        { /*  BIO */ }

        <Grid className="page default-grid" id="bioAnchor">
          <div className="sectionTitle">
            <h2 className="title">Bio</h2>
          </div>
          <div className="bioParagraph col-2">
            <p><I18n>{t => t('bio3')}</I18n></p>
            <p><I18n>{t => t('bio4')}</I18n></p>
            <p><I18n>{t => t('bio5')}</I18n></p>
            <p><I18n>{t => t('bio6')}</I18n></p>
            <p><I18n>{t => t('bio7')}</I18n></p>
            { /* <p><I18n>{t => t('bio1')}</I18n></p>
            <p><I18n>{t => <div dangerouslySetInnerHTML={{ __html: t('bio2') }} /> }</I18n></p>
            */
            }

          </div>
          <div className="largierAvatar col-2">
            <Image src={Avatar} />
          </div>
        </Grid>

        { /* CONCERTS */ }


        <Grid className="page default-grid concertsBlock" id="concerts">
          <Grid.Row>
            <Grid.Column>
              <h2 className="title">Concerts</h2>
              <h3>
                <I18n>{t => t('upcoming-concerts')}</I18n>
              </h3>
              <ConcertBlock
                concerts={this.state.upcoming_concerts}
              />
              <h3>
                <I18n>{t => t('past-concerts')}</I18n>
              </h3>
              <ConcertBlock
                concerts={this.state.past_concerts}
              />
              <a href="/concerts" className="link">
                <I18n>{t => t('show-all-concerts')}</I18n>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid className="page default-grid" id="media">
          <Grid.Row>
            <Grid.Column>
              <h2 className="title">Media</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className="mediaSection">
          <SimpleSlider />
        </div>

        <Grid className="page default-grid">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <p>
                <span>&copy;2018 chantallargier.com | </span>
                <Link to="/admin" className="link">admin</Link>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path || '/login'),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Home);
