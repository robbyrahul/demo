import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';

export default function ProductRegister(){
    const [image, setImage] = useState({ preview: "", data: "" });
    const [pname,setpn]=useState("");
    const [category,setcategory]=useState("")
    const [price,setprice]=useState("");
    const [stock,setstock]=useState("");
    const formdata = new FormData();

    const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleData = (e) => {
    formdata.append("pname",pname);
    formdata.append("price",price);
    formdata.append("category",category)
    formdata.append("stock",stock);
    formdata.append('file', image.data);
    AXIOS.post('http://localhost:9000/uploadform', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
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
        <h1>productor register</h1>
        <Row>
          <Col>
            <Form >
            <Form.Group>
                <Form.Label> Product Name</Form.Label>
                <Form.Control type="text"
                 name="pname"  
                 onChange={(e)=>{
                            setpn(e.target.value)}}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="Price"     onChange={(e)=>{
                            setprice(e.target.value)

                    }}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock"   onChange={(e)=>{
                            setstock(e.target.value)

                    }} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control type="number" name="category"   onChange={(e)=>{
                            setcategory(e.target.value)

                    }} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Upload photo</Form.Label>
                <Form.Control type="file" name="file"  required onChange={handleFile}/>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" onClick={()=>{handleData()}} >Submit</Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
          {image.preview && <img src={image.preview} style={{ width: '450px', height: '250px' }}  alt="hello" />}
        
          </Col>
        </Row>
      </Container>
    </>
   )
}