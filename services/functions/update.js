import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const transform = getData();
  function getData(){
    if(event.pathParameters.dataelementid !== 'Logfile') {return data.catalog.split(",")}else{ return data.catalog }
  }
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
        dataElement: event.pathParameters.dataelementid, 
    },
    UpdateExpression: "SET #cat = :val1",
    ExpressionAttributeValues:{
      ":val1": transform,
    },
    ExpressionAttributeNames:{
      "#cat": "catalog"
    },
    
  };

  await dynamoDb.update(params);

  return { status: true };
});