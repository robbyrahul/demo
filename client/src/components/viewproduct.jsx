import { useState } from 'react';
import AXIOS from 'axios';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table'; 
export default function  Viewproduct(){
    const[user,setuser]=useState([])
    useEffect(() => {
        // Immediately-invoked function expression (IIFE) to handle async behavior
        (async () => {
          try {
            const response = await AXIOS.get("http://localhost:9000/viewproduct");
            setuser(response.data.result);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle any potential errors here
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
                <td ><img src={`http://localhost:9000/+ls.url`}/></td>
            </tr>)
        }
    )
}
        
        </tbody>
        </Table>
        </>
)
}




