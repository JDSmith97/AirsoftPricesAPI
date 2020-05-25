import React, { Component } from 'react'
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap'
// import './index.scss'

class Item extends Component {

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
	        <Col className="text-center">
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
	        </Col>
	        <Col className="text-center"></Col>
	      </Row>
      </Container>
    );
  }
}

export default Item