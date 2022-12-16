import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
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
      try {
        API.get("metadata", "/dataElement/LogFile").then((response) => {
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
      await API.put("metadata", "/dataElement/update/LogFile",{body: {"catalog":order,"dataElement":"LogFile"}});
      await API.post("metadata", "/dataElement",{body: {"catalog":catalog,"dataElement":elenemt}});

      nav("/home");
      
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  return (
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