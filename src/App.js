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
    console.log(tmpuuidv4);
    return tmpuuidv4;
  }

  // Function to handle the change of the input field. When run, it sets the state, changing the 'term' to the new value
  onChange = (event) => {
    this.setState({ term: event.target.value });
  } 


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

  onSubmit = (event) => {
    event.preventDefault();
    let validationState = this.getValidationState(); 
    if (validationState === null || validationState === 'error') return false;
    let newItem = {
      term: this.state.term,
      id: this.generateUniqueId()
    };
    this.setState({
      term: '',
      items: [...this.state.items, newItem]
    });
  }

  deleteItem = (i) => {
    let items = [...this.state.items];
    let newItems = items.filter((item) => {
      return item.id !== i
    });

    this.setState({
        items: newItems
    });
  }

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

  updateItem = (event) => {
    event.preventDefault();
    let items = [...this.state.items];
    let i = this.state.itemToEdit;

    items.map((item) => {
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