/**
 * tb6
 * basic crud template
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import TopBar from '../../common/components/TopBar';
import { get } from '../../../common/helpers/api';

import DeleteItemModal from './common/components/DeleteItemModal';
import ListItemRow from './common/components/ListItemRow';

import { apiBasePath } from './common/globals';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      deleteItemId: null,
      deleteModalOpen: false,
    };

    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  deleteItem(item) {
    this.setState({
      deleteModalOpen: true,
      deleteItemId: item._id,
    });
  }

  loadItems() {
    get(apiBasePath, {
      headers: {
        Authorization: this.props.authorization,
      },
    }).then((data) => {
      if (!data) return;
      this.setState({ items: data });
    });
  }

  render() {
    return (
      <div>
        <TopBar />

        <DeleteItemModal
          itemId={this.state.deleteItemId}
          modalOpen={this.state.deleteModalOpen}
          close={() => {
            this.setState({ deleteModalOpen: false });
          }}
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
                  <th>Link</th>
                  <th>Date</th>
                  <th>Visible?</th>
                  <th width="10%">Aktionen</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.items.map(item =>
                    (
                      <ListItemRow
                        key={item._id}
                        item={item}
                        deleteItem={this.deleteItem}
                      />
                    ))
                }
              </tbody>
            </Table>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
});

List.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(List);
