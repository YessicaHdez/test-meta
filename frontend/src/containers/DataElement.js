import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import "./NewDataElement.css";

import { useAppContext } from "../lib/ContextLib";

export default function DataElement() {
  
  const nav = useNavigate();
  const [order, setOrder] = useState(""); //logfile
  const [elenemt, setElement] = useState("");
  const [catalog, setCatalog] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
       await  API.get("metadata", "/dataElement/LogFile").then((response) => {
        const items = response;
        setOrder(items.catalog); //get logfile data
        })
        .catch((error) => {
            console.log(error.response);
        });
        
      } catch (e) {
        console.log(e);
      }
      try {

        API.get("metadata", `/dataElement/${id}`).then((response) => {
        const items = response;
        setCatalog(items.catalog); //catalog
        setElement(items.dataElement);
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
  }, [isAuthenticated,id]);

  async function handleDelete(event){    
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) {
    return;
    }
    setIsDeleting(true);
    try {
        await API.put("metadata", "/dataElement/update/LogFile",{body: {"catalog":order,"dataElement":"LogFile"}});
        await API.del("metadata", `/dataElement/delete/${id}`);
        nav("/home");
      } catch (e) {
        console.log(e);
        setIsDeleting(false);
      }

}
  function validateForm() {
    return catalog.length > 0;
    //setIsLoading(true);
  }


async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await API.put("metadata", `/dataElement/update/${id}`,{body: {"catalog":catalog,"dataElement":elenemt}})
      

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
            
          />
        </Form.Group>
        <Form.Label>Catalog</Form.Label>
        <Form.Group controlId="catalog">
          <Form.Control
            value={catalog}
            as="textarea"
            placeholder="value1,value2,value3"
            onChange={(e) => setCatalog(e.target.value)}
            
          />
        </Form.Group>
        <LoaderButton
          block="true"
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}>
          Edit
        </LoaderButton>
        <br></br>
        <Form.Label>Order-Update LogFile order - ALTER BEFORE DELETE </Form.Label>
        <Form.Group controlId="order">
          <Form.Control
            value={order}
            as="textarea"
            placeholder="TestNetwork_Testsetup_Model_Firmware_Testcase_Timestamp.txt"
            onChange={(e) => setOrder(e.target.value)}
            
          />
        </Form.Group>
        <LoaderButton
          block="true"
          size="lg"
          variant="danger"
          onClick={handleDelete}
          isLoading={isDeleting}>
          
          DELETE
        </LoaderButton>
        
      </Form>
    </div>
  );
}