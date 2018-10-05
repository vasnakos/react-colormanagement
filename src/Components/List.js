import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

class List extends Component {
    render (){
        return (
        <ListGroup>
          {
            this.props.items.map((item) => {
              return (<ListGroupItem key={item.id} className="clearfix">
                
                <h4 className="pull-left">{item.term}</h4>

                <ButtonGroup className="pull-right">
                  <Button onClick={() => this.props.editItem(item.id)}><Glyphicon glyph="edit" />Edit</Button>
                  <Button onClick={() => this.props.deleteItem(item.id)}><Glyphicon glyph="remove"/>Remove</Button>
                </ButtonGroup>
              </ListGroupItem>);
            })
          }
        </ListGroup>
      );
    }
}

List.propTypes = {
  items: PropTypes.array,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func
};

export default List;