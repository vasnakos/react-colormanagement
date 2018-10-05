import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
class List extends Component {

    handleDelete (index) {
        console.log(index)
    }

    render (){
        return (
        <ListGroup>
          {
            this.props.items.map((item, index) => <ListGroupItem key={index}><a href="#" onClick={() => this.props.editItem(index)}>Edit</a> <a href="#" onClick={() => this.props.deleteItem(index) }>Delete</a> {item}</ListGroupItem>)
          }
        </ListGroup>
      );
    }
}

export default List;