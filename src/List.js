import React, { Component } from 'react';

class List extends Component {
    render (){
        return (
        <ul>
          {
            this.props.items.map((item, index) => <li key={index}><a href="javscript:void(0);" onclick={ this.handleDelete }>Delete</a> {item}</li>)
          }
        </ul>
      );
    }
}

export default List;