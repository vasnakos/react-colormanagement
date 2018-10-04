import React, { Component } from 'react';
import './App.css';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
      editMode: false,
      itemToEdit: null
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  deleteItem = (i) => {
    let items = this.state.items.slice();
    items.splice(i, 1);
    this.setState({
        items
    });
  }

  editItem = (i) => {
    this.setState({
      editMode: true,
      itemToEdit : i
    })
    let item = this.state.items[i];
    this.setState({ term: item });
  }

  updateItem = (event) => {
    event.preventDefault();
    let items = [...this.state.items];
    let i = this.state.itemToEdit;
    items[i] = this.state.term;
    this.setState({
      editMode:false,
      itemToEdit: null,
      term: '',
      items: [...items]
    });
  }

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange}  />
          {
            !this.state.editMode ?
              <button>Add</button>
            :
              <button onClick={this.updateItem}>Edit</button>
          }
          
        </form>
        <List items={this.state.items} deleteItem={this.deleteItem} editItem={this.editItem} />
      </div>
    );
  }
}