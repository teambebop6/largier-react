import React, { Component } from 'react'
import { connect } from 'react-redux';
import EditItemForm from './common/components/EditItemForm'
import { get, post } from '../../../common/helpers/api';
import { apiBasePath } from './common/globals';
import path from 'path';

class Modify extends Component{
  constructor(props){
    super(props)

    this.state = {
      item: {
        '_id': '',
        'title': '',
        'detail': '',
        'visible': false,
        'avatar': null
      }
    }

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    get(path.join(apiBasePath, `/item/${this.props.match.params.id}`))
      .then(res => {
        this.setState({item: res})
      })
  }

  // Form submit
  submit (formData) {

    let history = this.props.history;

    // Update
    post(path.join(apiBasePath, '/item/'+this.state.item._id), formData, {
      autoHeaders: true,
      Authorization: this.props.authorization,
    })
      .then((res) => {
        if(res.ok){
          history.push("../");
        }else{ console.log(res); }
      })
      .catch((err) => { console.log(err); });
  }


  render(){
    return(
      <EditItemForm
        item={this.state.item}
        submit={this.submit}
        title="Modify event"
      />
    )
  }

}

const mapStateToProps = state => {
  return {
    authorization: `Bearer ${state.auth.token}`,
  }
};

export default connect(mapStateToProps)(Modify);