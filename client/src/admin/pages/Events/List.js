/**
 * tb6
 * basic crud template
 */
import React, { Component } from 'react';
import { Grid, Table } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import TopBar from '../../common/components/TopBar';
import { get } from '../../../common/helpers/api';

import DeleteItemModal from './common/components/DeleteItemModal';
import ListItemRow from './common/components/ListItemRow';

import { apiBasePath } from './common/globals';

export default class List extends Component {
  constructor(props){
    super(props)

    this.state = {
      items: [],
      deleteItemId: null,
      deleteModalOpen: false
    };

    this.loadItems = this.loadItems.bind(this);
  }

  deleteItem = (item) => {
    this.setState({
      deleteModalOpen: true, 
      deleteItemId: item._id
    })
  }

  loadItems(){
    get(apiBasePath)
      .then((data) => {
        this.setState({ items: data })
      })
  }

  componentDidMount() {
    this.loadItems();
  }

  render() {
    return (
      <div>
        <TopBar/>

        <DeleteItemModal
          itemId={this.state.deleteItemId}
          modalOpen={this.state.deleteModalOpen}
          close={() => {this.setState({deleteModalOpen: false})}}
          itemDeleted={this.loadItems}
        />

      <Grid className="page">
        <Grid.Row>
          <h3>Events</h3>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link className="ui button" to="./add">Create new element</Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table fluid="true">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Visible?</th>
                <th width="10%">Aktionen</th>
              </tr>
            </thead>

            <tbody>

              {
                this.state.items.map((item) =>
                  <ListItemRow 
                    key={item._id}
                    item={item}
                    deleteItem={this.deleteItem}
                  />
                )
              }
            </tbody>
          </Table>
        </Grid.Row>
      </Grid>
    </div>
    )
  }
}
