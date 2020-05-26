import React, { Component } from 'react'
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardText, CardSubtitle, Table } from 'reactstrap'
import axios from 'axios'
// import './index.scss'

class Item extends Component {

  state = {
    item: [],
    itemPrices: []
  }

  componentDidMount() {
    axios.get(`https://3eg3r872u3.execute-api.eu-west-2.amazonaws.com/staging?id=38`)
      .then(res => {
        const itemInfo = res.data;
        console.log(itemInfo)
        this.setState({ item: itemInfo });
      })
  }

  render() {
    let itemPrices = []
    this.state.item.map(item => {
      if(!item.patrol_base_price == ""){
        itemPrices.push(
          <tr key="PatrolBase">
            <th scope="row" key="patrolBaseName">Patrol Base</th>
            <td key="patrolBasePrice">{item.patrol_base_price}</td>
            <td key="patrolBaseStock">{item.patrol_base_stock}</td>
          </tr>
        )
      }
      if(!item.surplus_store_price == ""){
        itemPrices.push(
          <tr key="SurplusStore">
            <th scope="row" key="surplusName">Surplus Store</th>
            <td key="surplusPrice">{item.surplus_store_price}</td>
            <td key="surplusStock">{item.surplus_store_stock}</td>
          </tr>
        )
      }
      console.log(itemPrices)
    })

    return (
      <React.Fragment>
        {this.state.item.map(item => (
          <Container>
            <Row className="">
              <Col className="text-center"></Col>
              <Col className="text-center ">
              <Table key={item.item_id}>
                <thead>
                  <tr>
                    <th>Airsoft Store</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {itemPrices}
                </tbody>
              </Table>
              </Col>
              <Col className="text-center"></Col>
            </Row>
          </Container>
        ))}
      </React.Fragment>
    );
  }
}

export default Item