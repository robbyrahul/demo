import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';

export default function CategoryRegister(){
    const [category,setcategory]=useState("")
    const formdata = new FormData();
  const handleData = (e) => {
    formdata.append("category",category)
    AXIOS.post('http://localhost:9000/categoryform', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
      alert(res.data.msg);
    })
    .catch((error) => {
      console.error(error);
    })
  }
   return(
   <>
      <Container>
        <h1>category register</h1>
        <Row>
          <Col>
            <Form >
              <Form.Group>
                <Form.Label>Category name</Form.Label>
                <Form.Control type="text" name="category"  onChange={(e)=>{
                            setcategory(e.target.value)

                    }}
                   
                    />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" onClick={()=>{handleData()}} >Submit</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
   )
}