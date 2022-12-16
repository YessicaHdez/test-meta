import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/ContextLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

export default function Files() {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      
      getFiles();
   
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);

   const getFiles = () => {
    API.get("metadata", "/files")
      .then((response) => {
        setItems(response)
      })
  }

    const deleteFile = Key => {
      API.del("metadata", "/files/"+ Key)
        .then((response) => {
          getFiles(); 
        }) 
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
              <td>{Owner.DisplayName}</td>
              <td>{Key}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <Button variant="primary">Edit</Button>
                  <Button variant="danger"  onClick={() => deleteFile(Key)}>Delete</Button>
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
        <h1>There are no logs to parse </h1>
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