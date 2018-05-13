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


        <div className="headerPicture" style={{ backgroundImage: `url(${Header})` }}>
          <div className="headerFrame">
            <TopLeftLinks />
            <TopRightLinks />
          </div>
          <Nav />
          <Image src={Logo} centered />
        </div>

        <Grid centered className="page default-grid intro-grid" id="about">
          <Grid.Row columns="two">
            <Grid.Column location="center">
              <I18n>
                {
                  t => (
                    <p>
                      <strong>{t('swisspianist')}</strong> {t('intro')}
                    </p>
                  )
                }
              </I18n>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid centered className="page bio-grid default-grid">
          <Grid.Row columns="two">
            <Grid.Column>
              <h2>Bio</h2>
              <p>
                <I18n>{t => t('bio1')}</I18n>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="two">
            <Grid.Column>
              <p>
                <I18n>
                  {
                    t => <div dangerouslySetInnerHTML={{ __html: t('bio2') }} />
                  }
                </I18n>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Grid className="page concerts-grid" id="concerts">
          <Grid.Row className="title-row">
            <h2>
              <I18n>{t => t('concerts')}</I18n>
            </h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
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

        <Grid className="page media-grid" id="media">
          <Grid.Row className="title-row">
            <h2>
              <I18n>{t => t('media')}</I18n>

            </h2>
          </Grid.Row>
          <Grid.Row className="title-row">
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
          </Grid.Row>
        </Grid>

        <Grid className="page footer-grid">
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
