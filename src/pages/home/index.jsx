import React, { Component } from 'react'
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import './index.scss'

class Home extends Component {

	constructor() {
    super()
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      city: ''
    }
  }

	onFormSubmit() {
    if(!this.state.city){
    	console.log("nope")
    }
	}

  render() {
    return (
    	<Container>
	      <Row className="">
	        <Col className="text-center"></Col>
	        <Col className="text-center ">
	        	<Form onSubmit={this.onFormSubmit}>
	        		<FormGroup>
	        			<Label for="cityName" className="cityLabel">City Name</Label>
	        			<Input value={this.state.city} onChange={e => this.setState({ city: e.target.value })} type="city" name="city" id="cityName" placeholder="Enter a city" />
	        		</FormGroup>
	        		<Button outline className="weatherButton">Get Weather</Button>
	        	</Form>
	        </Col>
	        <Col className="text-center"></Col>
	      </Row>
      </Container>
    );
  }
}

export default Home