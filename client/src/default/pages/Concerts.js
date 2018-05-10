/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import { get } from '../../common/helpers/api';
// Common components
import ConcertBlock from '../../common/components/ConcertBlock';
// Resources
import './Home.less';
import Logo from '../../res/images/logo.png';

import i18n from '../../i18n';


const selectLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      upcoming_concerts: [],
      past_concerts: [],
    };
  }


  componentDidMount() {
    get('/api/concerts').then((res) => {
      this.setState(res.data);
      console.log(this.state);
    }).catch((err) => {
      console.log(err);
    });
    selectLanguage('en');
  }

  render() {
    return (
      <div>

        <Grid className="page">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button as={Link} to="/" floated="left">
                <I18n>{t => t('back')}</I18n>
              </Button>
              <Image src={Logo} centered />
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid className="page footer-grid">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <p>
                <span>&copy;2018 chantallargier.com | </span>
                <Link to="/admin">admin</Link>
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
