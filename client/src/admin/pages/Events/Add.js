import React, { Component } from 'react'
import EditItemForm from './common/components/EditItemForm'
import { post } from '../../../common/helpers/api';
import { apiBasePath } from './common/globals';
import path from 'path';

export default class Add extends Component { 

  constructor(props){
    super(props)

    this.state = {
      item: {
        '_id': '',
        'title': '',
        'location': '',
        'type': '',
        'visible': false,
        'date': Date.Now,
        'avatar': null
      }
    }

    this.submit = this.submit.bind(this);
  }

  // Form submit
  submit (formData) {
    let history = this.props.history;
    
    post(path.join(apiBasePath, '/add'), formData, { autoHeaders: true })
      .then((res) => {
        if(res.ok){
          return history.push("./");
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render(){
    return(
      <EditItemForm
        submit={this.submit}
        title="Create new event"
        item={this.state.item}
      />
    )
  }

}
