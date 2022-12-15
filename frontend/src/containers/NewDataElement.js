import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import config from "../config";
import "./NewDataElement.css";

export default function NewDataElement() {
  
  const nav = useNavigate();

  const [order, setOrder] = useState("");
  const [elenemt, setElement] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
    setIsLoading(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
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
        <Form.Label>Values</Form.Label>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
            placeholder="value1,value2,value3"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Label>Order-Update LogFile order </Form.Label>
        <Form.Group controlId="order">
          <Form.Control
            value={order}
            as="textarea"
            placeholder="TestNetwork_Testsetup_Model_Firmware_Testcase_Timestamp.txt"
            onChange={(e) => setOrder(e.target.value)}
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