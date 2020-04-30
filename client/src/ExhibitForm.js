import React from "react";
import ExhibitButton from "./ExhibitButton";
import Form from 'react-bootstrap/Form';


const innerStyle = {
  margin: "10px"
}

const outerStyle = {
  justifyContent:"center", 
  alignItems: "center"
}

class ExhibitForm extends React.Component {
  state = { id: null, startPrice: null, endPrice: null, duration: null };

  idHandleChange = (event) => {
    this.setState({ ...this.state, id: event.target.value });
  };

  startPriceHandleChange = (event) => {
    this.setState({ ...this.state, startPrice: event.target.value });
  };

  endPriceHandleChange = (event) => {
    this.setState({ ...this.state, endPrice: event.target.value });
  };

  durationHandleChange = (event) => {
    this.setState({ ...this.state, duration: event.target.value });
  };
  
  render() {
    return (
      <Form>
        <Form.Row style={outerStyle}>
          <Form.Group style={innerStyle}>
            <Form.Label>startPrice</Form.Label>
            <Form.Control type="number" onChange={this.startPriceHandleChange} />
          </Form.Group>
          <Form.Group style={innerStyle}>
            <Form.Label>endPrice</Form.Label>
            <Form.Control type="number" onChange={this.endPriceHandleChange} />
          </Form.Group>
          <Form.Group style={innerStyle}>
            <Form.Label>duration</Form.Label>
            <Form.Control type="number" onChange={this.durationHandleChange} />
          </Form.Group>
          <ExhibitButton index={this.props.selectedId} startPrice={this.state.startPrice} endPrice={this.state.endPrice} duration={this.state.duration} />
        </Form.Row>
      </Form>
    );
  }
}

export default ExhibitForm