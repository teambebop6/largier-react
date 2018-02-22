import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { post } from '../../../../../common/helpers/api';
import { apiBasePath } from '../globals';
import path from 'path';

class DeleteItemModal extends Component{

  confirm(){
    console.log("Item id is:");
    console.log(this.props.itemId);

    post(path.join(apiBasePath, '/delete'), {
      id: this.props.itemId
    }, {
      headers: {
        Authorization: this.props.authorization,
      }
    }).then((res) =>{
      console.log(res)
      if(res.ok){
        console.log("Successfully deleted")
        this.props.itemDeleted()
      }
      this.props.close()

    }).catch((err) =>{
      console.log(err);
      this.props.close()
    });
  }

  deny(){
    this.props.close()
  }

  render(){
    return(
      <div>
        <Modal
          open={this.props.modalOpen}
          size='small'
        >
          <Header icon='delete' content="Delete item" />
          <Modal.Content>
            <p>
              Are you sure to delete this item?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.deny.bind(this)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={this.confirm.bind(this)}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authorization: `Bearer ${state.auth.token}`,
  }
};

export default connect(mapStateToProps)(DeleteItemModal);