import React, { Component } from 'react';
import './App.css';
import List from './Components/List';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import { Grid, Row, Col, Button, FormControl, FormGroup, ControlLabel, Well } from 'react-bootstrap';


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
        <div className="App-header">
          <h1>Color Management App</h1>
        </div>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
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
            <Col>
              <List items={this.state.items} deleteItem={this.deleteItem} editItem={this.editItem} />    
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}