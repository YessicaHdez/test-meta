import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/ContextLib";
import "./Home.css";
import { API } from "aws-amplify";
//import { LinkContainer } from "react-router-bootstrap";

export default function Files() {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        API.get("metadata", "/files").then((response) => {
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
        {items.map(({ Key}) => (
          
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {Key}
              </span>
              <br />
              
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