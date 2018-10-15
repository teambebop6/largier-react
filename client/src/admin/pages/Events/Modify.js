import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { bindActionCreators } from 'redux';
import EditItemForm from './common/components/EditItemForm';
import { get, post } from '../../../common/helpers/api';
import { apiBasePath } from './common/globals';
import { fetchEvent } from '../../modules/event';

class Modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        _id: '',
        title: '',
        detail: '',
        visible: false,
        avatar: null,
      },
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    get(path.join(apiBasePath, `/item/${this.props.match.params.id}`), {
      headers: {
        Authorization: this.props.authorization,
      },
    }).then((res) => {
      this.setState({ item: res.data });
    });
    // const { fetchEvent } = this.props;
    // fetchEvent(this.props.match.params.id);
  }

  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.item !== nextProps.item) {
  //     return true;
  //   } else {
  //     return super.shouldComponentUpdate(nextProps, nextState);
  //   }
  // }

  // Form submit
  submit(formData) {
    const { history } = this.props;

    // Update
    post(path.join(apiBasePath, `/item/${this.state.item._id}`), formData, {
      headers: {
        Authorization: this.props.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          history.push('../');
        }
      });
  }


  render() {
    return (
      <EditItemForm
        item={this.state.item}
        submit={this.submit}
        title="Modify event"
      />
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
  item: state.event.eventFetched,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modify);
