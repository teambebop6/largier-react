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

import { get } from '../../common/helpers/api';
// Common components
import TopLeftLinks from '../../common/components/TopLeftLinks';
import TopRightLinks from '../../common/components/TopRightLinks';
import Nav from '../../common/components/Nav';
import ConcertBlock from '../../common/components/ConcertBlock';
// Resources
import './Home.less';
import Logo from '../../res/images/logo.png';
import Avatar from '../../res/images/avatar.jpg';
import Header from '../../res/images/headerChurch.png';

import i18n from '../../i18n';

// const selectLanguage = (lng) => {
//   i18n.changeLanguage(lng);
// };

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
      console.log(this.state);
    }).catch((err) => {
      console.log(err);
    });

    i18n.changeLanguage('en');
  }

  render() {
    return (
      <div>

        <Nav />

        <div className="headerPicture" style={{ backgroundImage: `url(${Header})` }}>
          <div className="headerFrame" />
          <div className="headerContent">
            <TopLeftLinks />
            <TopRightLinks />
            <Image className="logo" src={Logo} centered />
            <Grid className="page">
              <Grid.Row centered>
                <Grid.Column textAlign="center" width="7">
                  <I18n>
                    {
                      t => (
                        <p className="chantalDescription">
                          <strong>{t('swisspianist')}</strong> {t('intro')}
                        </p>
                      )
                    }
                  </I18n>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>

        { /*  BIO */ }

        <Grid className="page default-grid" id="bioAnchor">
          <div className="paragraphTitle">
            <p className="leftContainer title">Bio</p>
            <div className="rightContainer">
              <Image size="medium" src={Avatar} style={{ marginTop: '8rem' }} />
            </div>
          </div>
          <Grid.Row centered>
            <Grid.Column width="7">
              <p>
                <I18n>{t => t('bio1')}</I18n>
              </p>
              <p>
                <I18n>{t => <div dangerouslySetInnerHTML={{ __html: t('bio2') }} /> }</I18n>
              </p>
            </Grid.Column>
          </Grid.Row>
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
              <iframe
                title="Video 1"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1VgdOcGl-q8"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen=""
              />
              <iframe
                title="Video 2"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/oqXjA0Uh38c"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen=""
              />
              <iframe
                title="Video 3"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/cnhkhJmc__I"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen=""
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

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
