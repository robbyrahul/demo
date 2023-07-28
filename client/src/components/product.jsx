import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AXIOS from 'axios';

export default function ProductRegister() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [pname, setPname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [existingCategories, setExistingCategories] = useState([]);
  const formdata = new FormData();

  useEffect(() => {
    // Fetch existing categories from the backend on component mount
    AXIOS.get('http://localhost:9000/getcategories')
      .then((res) => {
        setExistingCategories(res.data.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleData = (e) => {
    formdata.append("pname", pname);
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("stock", stock);
    formdata.append('file', image.data);
    AXIOS.post('http://localhost:9000/productform', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((error) => {
        console.error(error);
      });
    //........................
  };

  return (
    <>
      <Container>
        <h1>Product Register</h1>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pname"
                  onChange={(e) => {
                    setPname(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {existingCategories.map((existingCategory) => (
                    <option key={existingCategory} value={existingCategory}>
                      {existingCategory}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Upload photo</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  required
                  onChange={handleFile}
                />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" onClick={handleData}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>{image.preview && <img src={image.preview} style={{ width: '450px', height: '250px' }} alt="hello" />}</Col>
        </Row>
      </Container>
    </>
  );
}
