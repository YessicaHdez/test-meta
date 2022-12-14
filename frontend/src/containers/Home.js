import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/ContextLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        API.get("metadata", "/dataElement").then((response) => {
        const items = response;
        setItems(items);
        })
        .catch((error) => {
            console.log(error.response);
        });
        
      } catch (e) {
        console.log(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
 

  function renderItemsList(items) {
    return (
      <>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
           
            <span className="ml-2 font-weight-bold">Create a new </span>
          </ListGroup.Item>
        </LinkContainer>
        {items.map(({ catalog, dataElement }) => (
          
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {dataElement}
              </span>
              <br />
              <span className="font-weight-bold">
                {catalog}
              </span>
              
            </ListGroup.Item>
          
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">myapp</p>
      </div>
    );
  }

  function renderItems() {
    return (
      <div className="items">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">METADATA DICTIONARY</h2>
        <ListGroup>{!isLoading && renderItemsList(items)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderItems() : renderLander()}
    </div>
  );
}