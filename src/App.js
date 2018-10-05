import React, { Component } from 'react';
import './App.css';
import List from './Components/List';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import { Grid, Row, Col, Button, FormControl, FormGroup, ControlLabel, Well } from 'react-bootstrap';

// We use the uuid in order to produce unique keys for the list items.
// we could just use the index of the iteration, but as we want to delete list items too, using the index, would lead to recalculate the index for the rest of the items.
const uuidv4 = require('uuid/v4'); 

const isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

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
 
  /** Function to calculate a new unique id.
  * @returns {Number} the new unique id
  */
  generateUniqueId () {
    let tmpuuidv4 = uuidv4();
    return tmpuuidv4;
  }

  // Function to handle the change of the input field. When run, it sets the state, changing the 'term' to the new value
  onChange = (event) => {
    this.setState({ term: event.target.value });
  } 

  /* Use this function to validate the input
   * @returns {String} 'error', 'success', or null
  */
  getValidationState() {
    if(this.state.term.length === 0) {
      return null;
    }
    if (!isOk.test(this.state.term)) {
      return 'error';
    }
    else if (isOk.test(this.state.term)) {
      return 'success';
    }
  }

  // Submit handler for the form. Firstly it checks for posible validation issues and then saves the new state.
  onSubmit = (event) => {
    event.preventDefault();
    let validationState = this.getValidationState(); 
    if (validationState === null || validationState === 'error') return false;   //Do not proceed if there is any validation issue
    let newItem = {
      term: this.state.term,
      id: this.generateUniqueId()   //Create a unique id for each item
    };
    this.setState({
      term: '',
      items: [...this.state.items, newItem]
    });
  }

  // Function to handle the delete action. It searches of the item to me deleted based on the unique id, delete it and save the new state
  deleteItem = (i) => {
    let editMode = this.state.editMode;
    let items = [...this.state.items];
    let newItems = items.filter((item) => {
      return item.id !== i
    });

    if (newItems.length === 0) {
      editMode = false;
    }
    this.setState({
        items: newItems,
        editMode
    });
  }

  // Function to be run when the user clicks the edit button on the list items.
  // It finds the item to be edited, and displays it's copy on the input field.
  editItem = (i) => {
    this.setState({
      editMode: true,
      itemToEdit : i
    })
    let items = [...this.state.items];
    let item = items.filter((item) => {
      return item.id === i
    });

    this.setState({ term: item[0].term });
  }


  //Function to handle the update action on an item. It saves the new value of the input field to the appropriate list item of the colors list.
  updateItem = (event) => {
    event.preventDefault();
    
    let validationState = this.getValidationState(); 
    if (validationState === null || validationState === 'error') return false;   //Do not proceed if there is any validation issue

    let items = [...this.state.items];
    let i = this.state.itemToEdit;

    items.forEach((item) => {
      if (item.id === i) {
        item.term = this.state.term
      }
    });

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
        <div className="header">
          <h1>Color Management App</h1>
        </div>
        <div className="color-gradient-bar"></div>
        <Grid>
          <Row>
            <Col sm={6} md={4} smOffset={3} mdOffset={4}>
              <Well>
                <form className="App" onSubmit={this.onSubmit}>

                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel>Please enter a HEX color</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.term}
                      placeholder="#ffffff"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  {
                    !this.state.editMode ?
                      <Button bsStyle="primary" type="submit" className={(this.state.term.length === 0 || this.getValidationState() === 'error') ? 'disabled': '' }>Add</Button>
                    :
                      <Button bsStyle="primary" onClick={this.updateItem} className={(this.state.term.length === 0 || this.getValidationState() === 'error') ? 'disabled': '' }>Edit</Button>
                  }
                </form>
              </Well>
            </Col>
          </Row>

          <Row>
            <Col sm={6} md={4} smOffset={3} mdOffset={4}>
              <List items={this.state.items} deleteItem={this.deleteItem} editItem={this.editItem} />    
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}