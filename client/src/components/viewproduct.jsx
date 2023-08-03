import { useState } from 'react';
import AXIOS from 'axios';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table'; 
import { Button } from 'react-bootstrap';
export default function  Viewproduct(){
  const handleDelete = (productId) => {
    AXIOS.delete(`http://localhost:9000/deleteproduct/${productId}`)
      .then(() => {
        // After successful deletion, update the user state to reflect the changes
        setuser((prevUsers) => prevUsers.filter((user) => user._id !== productId));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
    const[user,setuser]=useState([])
    useEffect(() => {
        // Immediately-invoked function expression (IIFE) to handle async behavior
        (async () => {
          try {
            const response = await AXIOS.get("http://localhost:9000/viewproduct");
            setuser(response.data.result);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        })();
      }, []);
      
    return(
        <>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>product name</th>
          <th>category</th>
          <th>price</th>
          <th>stock</th>
          <th>fileurl</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
        
    user.map(
        (ls)=>{
            return(<tr>
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
   <td><a href={`/edit/${ls._id}`} className='btn btn-success'> Update </a>
    
    
    
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

            </tr>)
        }
    )
}
        
        </tbody>
        </Table>
        </>
)
}




  