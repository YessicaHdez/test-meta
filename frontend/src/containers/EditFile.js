import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./NewDataElement.css";
import { useNavigate } from "react-router-dom";


export default function EditFile() {
  
  const [order, setOrder] = useState([]);
  const [dict, setDict] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [items, setItems] =useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function onLoad() {
      
      try {
        await API.get("metadata", "/dataElement").then((response) => {
        const dict = response;
        setDict(dict);
        const itemsToRemove = ['LogFile'];
        const arr1 = dict.filter(obj => !itemsToRemove.includes(obj.dataElement));
        setDict(arr1);
        
        })
        .catch((error) => {
            console.log(error.response);
        });
        
      } catch (e) {
        console.log(e);
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
      setIsLoading(false);
      
    }
    onLoad();
  }, []);  

  function setName(){
    var newName= ""
    const actualName=id.split('_');
    //console.log(actualName);
    const newOrder =order.split('_');
    //console.log("antes de los for");
    for(var i=0; i<newOrder.length;i++){
      for(var x=0; x<dict.length;x++){
          if(dict[x].dataElement===newOrder[i]){
            newName+= items[x];
            if( i !== newOrder.length-2 ){
              newName+='_';
            } else if(i === newOrder.length-2 ){
              newName+= '_';
              newName+= actualName[actualName.length-1];
              ////ewName+='.txt';
            }
          }
      }
      
    }
    //console.log(newName);
    return newName;
  }


async function handleSubmit(event) {
    event.preventDefault();
    //setIsLoading(true);
    const name= setName();
    try{
      await API.put("metadata", `/updatefile/${id}`,{body: {"newName":name}});
      await API.del("metadata", `/files/${id}`);
      nav("/files");
    }
    catch(e){}
    //console.log(name);
    //console.log(items);
    //setIsLoading(false);

  }

  function handlechanges(value,index) {
    const clonedSelectState = JSON.parse(JSON.stringify(items));
    //const newChanges = items.map((c, i) => {
     // if (i === e.target.key) {
     //   return e.target.value;
    //  } else {
     //   return c;
     // }
     clonedSelectState[index] = value;
     setItems(clonedSelectState);
    
  }
  
  
  return (

    <div className="NewDataElement">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">EDIT FILES</h2>
        <Form.Group controlId="element">
        <br></br>
        <Form.Label>Actual name:</Form.Label><br></br>
        <Form.Label>{id}</Form.Label><br></br>
        </Form.Group>
      <Form onSubmit={handleSubmit}>
      
        <Form.Label>Catalog</Form.Label>
        <br></br>
        {dict.map((val,index) => (
        <>
          <Form.Label>{val.dataElement}</Form.Label> <br></br>
          <DropdownList key={index}
            data={val.catalog}
            defaultValue={val.dataElement}
            filter={false}
            value={items[index]}
            onChange={(value)=> {handlechanges(value,index)}}
            />
        </>
         ))}
        <br></br>
        <LoaderButton
          block="true"
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}>
          Edit
        </LoaderButton>
      </Form>
    </div>
  );
}