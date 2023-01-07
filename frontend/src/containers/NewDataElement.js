import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { API,Auth } from "aws-amplify";
import "./NewDataElement.css";

import { useAppContext } from "../lib/ContextLib";

export default function NewDataElement() {
  
  const nav = useNavigate();
  const [order, setOrder] = useState("");
  const [elenemt, setElement] = useState("");
  const [catalog, setCatalog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      await Auth.currentAuthenticatedUser().then((user) =>{
        
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];//regresa todos sus grupos y es nullo o undefined si no encuentra nada
        if (groups ==null) {
           nav('/unautho');
           return;

        }
      });
      try {
        API.get("metadata", "/dataElement/Logfile").then((response) => {
        const items = response;
        setOrder(items.catalog);
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


  function validateForm() {
    return catalog.length > 0;
    //setIsLoading(true);
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await API.put("metadata", "/dataElement/update/Logfile",{body: {"catalog":order,"dataElement":"Logfile"}});
      await API.post("metadata", "/dataElement",{body: {"catalog":catalog,"dataElement":elenemt}});

      nav("/home");
      
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  function renderForm(){
    return(     
    <div className="NewDataElement">
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="element">
      <Form.Label>Data Element</Form.Label>
        <Form.Control
          value={elenemt}
          as="textarea"
          placeholder="Data Element"
          onChange={(e) => setElement(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Label>Catalog</Form.Label>
      <Form.Group controlId="catalog">
        <Form.Control
          value={catalog}
          as="textarea"
          placeholder="value1,value2,value3"
          onChange={(e) => setCatalog(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Label>Order-Update LogFile order </Form.Label>
      <Form.Group controlId="order">
        <Form.Control
          value={order}
          as="textarea"
          placeholder="TestNetwork_Testsetup_Model_Firmware_Testcase_Timestamp.txt"
          onChange={(e) => setOrder(e.target.value)}
          required
        />
      </Form.Group>
      <LoaderButton
        block
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Create
      </LoaderButton>
    </Form>
  </div>
  );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1> Metadata Management - No Authorization</h1>
        <p className="text-muted"></p>
      </div>
    );
  }
  
  return (
    <div className="Home">
      {isAuthenticated ? renderForm() : renderLander()}
    </div>
  );
  
}