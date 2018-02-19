/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';

import ConcertBlock from '../../common/components/ConcertBlock';

import { get } from '../../common/helpers/api';

class Home extends Component {

  state = {
    upcoming_concerts: [],
    past_concerts: [],
  }

  componentDidMount(){
    get('/api/concerts').then(res => {
      this.setState(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Grid className="page logo-grid">
          <Grid.Row>
            <Grid.Column>
              <Image src="/assets/images/logo.png" size="medium" />
            </Grid.Column>
          </Grid.Row>
        </Grid>       

        <Grid className="page intro-grid">
          <Grid.Row>
            <Grid.Column width="seven">
              <p>
                Swiss Pianist Chantal Largier is a talented, versatile and admired artist, who knows how to impress and fascinate the audience through her interpretation and real passion for music. Her goal is to find the true spirit of music and to share it with her audience.
              </p>
            </Grid.Column>  
            <Grid.Column width="two"></Grid.Column>
            <Grid.Column width="seven">
              <p>
                Die Schweizer Pianistin Chantal Largier ist eine ausdrucksstarke, vielseitige und hoch geschätzte Künstlerin, die durch ihre Interpretation und Leidenschaft zur Musik berühren und faszinieren kann. Ihr Ziel ist es, Musik auf verschiedenster Art und Weise zum Ausdruck zu bringen.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid className="page flower-grid">
          <Grid.Row>
            <Grid.Column>
              <Image 
                centered 
                className="flower" 
                src="/assets/images/flower.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Grid className="page bio-grid">
          <Grid.Row columns="two">
            <Grid.Column>
              <p>Chantal grew up in Switzerland and in Japan. She got her first lesson and started to build up her career at the age of six. She won the '14th Youth Music Harmony Competition' in Tokyo. In 2014 she moved to China and teached piano classes for piano students at the Zhaoqing University. Until 2017 she gave 100 concerts throughout China.</p>
            </Grid.Column>        
            <Grid.Column>
              <p>
                Chantal, aufgewachsen in der Schweiz und in Japan, erhielt ihren ersten Klavierunterricht mit zarten sechs Jahren und beginnt somit ihre Laufbahn als Pianistin. Sie gewann den in Tokio angesehen Klavierwettbewerb „14th Youth Music Harmony Competition“. Im 2014 zog sie nach China, unterrichtete Klavier-Studierende an der Zhaoqing Universität und konzertierte bis 2017, 100 Konzerte in ganz China.
              </p>
            </Grid.Column>        
          </Grid.Row> 
          <Grid.Row columns="two">
            <Grid.Column>
              <p>
                She performed in prestigious Concert Halls such as the <i>Great Hall of People</i> in China, <i>Oriental Art Center</i> in Shanghai, the <i>Shanghai Symphony Hall</i> and the <i>Guotai Arts Center</i> in Chongqing.
              </p>
            </Grid.Column>        
            <Grid.Column>
              <p>Sie spielte in berühmten und hoch anerkannten Konzerthallen, wie die <i>Grosse Halle des Volkes in Peking</i>, das <i>Oriental Art Center</i> in Shanghai und die <i>Shanghai Symphony Hall</i>, sowie das <i>Guotai Arts Center</i> in Chongqing.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Grid className="page concerts-grid">
          <Grid.Row className="title-row">
            <h2>Concerts</h2>
          </Grid.Row>  
          <Grid.Row>
            <Grid.Column>
              <h3>Upcoming / Kommende</h3>
              <ConcertBlock
                concerts={this.state.upcoming_concerts}
              />
              <h3>Past / Vergangene</h3>
              <ConcertBlock
                concerts={this.state.past_concerts}
              />
              <a href="/concerts">alle Konzerte anzeigen</a>
            </Grid.Column>
          </Grid.Row>
        </Grid> 

        <Grid className="page media-grid">
          <Grid.Row className="title-row">
            <h2>Media</h2>
          </Grid.Row>
          <Grid.Row className="title-row">
            <iframe 
              title='Video 1'
              width='560' 
              height='315' 
              src='https://www.youtube.com/embed/1VgdOcGl-q8'
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen=''
            />
            <iframe 
              title='Video 2'
              width='560' 
              height='315' 
              src='https://www.youtube.com/embed/oqXjA0Uh38c'
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen=''
            />
            <iframe 
              title='Video 3'
              width='560'
              height='315'
              src='https://www.youtube.com/embed/cnhkhJmc__I'
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen=''
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path || '/login')
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Home)
