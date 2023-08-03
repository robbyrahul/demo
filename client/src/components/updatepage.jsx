import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AXIOS from 'axios';
import { useParams } from 'react-router-dom';

function Updatepage(){
    
    const handleData = (e) => {
        e.preventDefault();
        formdata.append('idnum', idnum);
        formdata.append("pname", pname);
        formdata.append("price", price);
        formdata.append("category", category);
        formdata.append("stock", stock);
        formdata.append('file', image.data);
        AXIOS.post('http://localhost:9000/updatebyId/',{
            idnum:idnum,
            pname:pname,
            price:price,
            category:category,
            stock:stock,
            

        }, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
           alert(res.data.msg)
          })
          .catch((error) => {
            console.error(error); 
          });
      };

    
    const [image, setImage] = useState({ preview: "", data: "" });
    const [pname, setPname] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [idnum,setIdnum]=useState("")
    const [existingCategories, setExistingCategories] = useState([]);
    const [prd,setUser]=useState([])
    const formdata = new FormData();
    const param=useParams()

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


    useEffect(() => {
        // Immediately-invoked function expression (IIFE) to handle async behavior
        (async () => {
          try {
               
            const res = await AXIOS.get(`http://localhost:9000/getById/${param.id}`).then((res)=>{
                setUser(res.data.result);
                const ls=res.data.result[0];
                setPname(ls.pname)
                setPrice(ls.price)
                setStock(ls.stock)
                setIdnum(ls._id)
                setCategory(ls.category)
                const img = {
                    preview:`http://localhost:9000/${ls.fileurl}`,
                    data:ls.fileurl,
                  };
                  setImage(img);

            });
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        })();
      }, []);
    const handleFile = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        };
        setImage(img);
      };
    return(
        <>
        
              <Container>
        <h1>Product Register</h1>
        <Row>
          <Col>
          
            <Form  onSubmit={handleData}>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pname"
                  value={pname}
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
                  value={price}
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
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
                 <Form.Control
                  type="text"
                  name="idnum"
                  value={idnum}
                  onChange={(e) => {
                    setIdnum(e.target.value);
                  }}
                  hidden
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
                <Button bsStyle="primary" type='submit' >
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Col>
          {image.preview}
          <Col>{image.preview && <img src={image.preview} style={{ width: '450px', height: '250px' }} alt="hello" />}</Col>
        </Row>
      </Container>
        </>
    )
}
export default Updatepage;