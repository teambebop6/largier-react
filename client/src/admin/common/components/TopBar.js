/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../../res/images/logo.png';
import { push } from "react-router-redux";


export default class TopBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout(){
    localStorage.removeItem('admin');
    push('/login');
  }

  constructor(){
    super();
    this.logout = this.logout.bind(this);
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="large" stackable>
        <Menu.Item>
          <Image size="small" src={Logo}/>
        </Menu.Item>

        <Menu.Item
          name='events'
          active={activeItem === 'events'}
          onClick={this.handleItemClick}
          as={Link}
          to={"/admin/events/"}
        >
          Events verwalten
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/"
          >
            <Icon name="home"/>
            Back to Homepage  
          </Menu.Item>
          <Menu.Item icon
            as={Link}
            to="#"
            onClick={this.logout}
          >
            <Icon name="sign out"/>

          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
