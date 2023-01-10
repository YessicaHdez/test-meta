import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/ContextLib";
import "./Home.css";
import { API, Auth } from "aws-amplify";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from "react-router-dom";

export default function Files() {
  
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  

  //const { state: { myEmail } = {} } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
     
     
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      
      try{
        const user =  await Auth.currentAuthenticatedUser();
        getFiles(user.attributes.email);
        
        }catch(e){console.log(e);}
      

      setIsLoading(false);
    }
    
     onLoad();
         
  }, [isAuthenticated]);

   const getFiles = (email) => {
    API.get("metadata", "/files",{headers:{"key":email}})
      .then((response) => {
        setItems(response);
      });
    
    
  }


    const deleteFile = Key => {
      API.del("metadata", "/filesDel",{headers:{"key":Key}})
        .then((response) => {
          getFiles(Key.split("/")[0]); 
        }) 
  }

  const nextPath = (Key)=>{
    nav(`/filesEdit`,{state: {fileID:{"key":Key}}});
  }

  function renderItemsList(items) {
    return (
      <>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Logfile</th>
          <th>Actions</th>
        </tr>
      </thead>
        <tbody>
          {items.map(({Key, Owner}) => (
            <tr key={Key}>
              <td>{Key.split("/")[0]}</td>
              <td>{Key}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <Button variant="primary" onClick={() => nextPath(Key)}> Edit </Button>
                  <Button variant="danger" onClick={() => deleteFile(Key)}>Delete</Button>
                  <Button variant="success" disabled>Parse</Button>
                </Stack>
              </td>
            </tr>
          ))}       
        </tbody>
      </Table>
      </>
    )
  }


  function renderLander() {
    return (
      <div className="lander">
        {isAuthenticated ? <h1>There are no logs to parse </h1> : <h1>Metadata Management </h1>}
        
      </div>
    );
  }

  function renderItems() {
    return (
      <div className="items">
        <ListGroup>{!isLoading && renderItemsList(items)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Staging Logs</h2>
      {isAuthenticated && items != null  ? renderItems() : renderLander()}
    </div>
  );
}