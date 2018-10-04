import React, { Component } from 'react';

class List extends Component {

    handleDelete (index) {
        console.log(index)
    }

    render (){
        return (
        <ul>
          {
            this.props.items.map((item, index) => <li key={index}><a href="#" onClick={() => this.props.editItem(index) }>Edit</a> <a href="#" onClick={() => this.props.deleteItem(index) }>Delete</a> {item}</li>)
          }
        </ul>
      );
    }
}

export default List;