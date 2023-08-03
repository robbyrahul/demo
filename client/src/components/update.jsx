/*
import React, { useState, useEffect } from 'react';
import AXIOS from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

export default function Updateproduct() {
  const [user, setUser] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    // Immediately-invoked function expression (IIFE) to handle async behavior
    (async () => {  
      try {
        const response = await AXIOS.get('http://localhost:9000/viewproduct');
        setUser(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const handleDelete = (productId) => {
    AXIOS.delete(`http://localhost:9000/deleteproduct/${productId}`)
      .then(() => {
        setUser((prevUsers) => prevUsers.filter((user) => user._id !== productId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    AXIOS.put(`http://localhost:9000/updatebyId/${selectedProduct._id}`, selectedProduct)
      .then((response) => {
        // Update the user state to reflect the changes
        setUser((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedProduct._id ? response.data.data : user
          )
        );
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error('Error updating the product:', error);
      });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Product name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>File URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((ls) => (
            <tr key={ls._id}>
              <td>{ls.pname}</td>
              <td>{ls.category}</td>
              <td>{ls.price}</td>
              <td>{ls.stock}</td>
              <td>
                {ls.fileurl && (
                  <img
                    src={`http://localhost:9000/${ls.fileurl}`}
                    alt={ls.pname}
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <Button type="button" name="update" variant="secondary" onClick={() => handleSelectProduct(ls._id)}>
                  Update
                </Button>
                <p></p>
                <Button
                  type="button"
                  variant="primary"
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(ls._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={selectedProduct?.pname || ''}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({ ...prevProduct, pname: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={selectedProduct?.category || ''}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({ ...prevProduct, category: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={selectedProduct?.price || ''}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({ ...prevProduct, price: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={selectedProduct?.stock || ''}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({ ...prevProduct, stock: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="fileurl">
              <Form.Label>File URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter file URL"
                value={selectedProduct?.fileurl || ''}
                onChange={(e) =>
                  setSelectedProduct((prevProduct) => ({ ...prevProduct, fileurl: e.target.value }))
                }
              />
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
*/
  