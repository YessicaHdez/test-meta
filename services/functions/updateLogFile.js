import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
        dataElement: event.pathParameters.myid, 
    },
    UpdateExpression: "SET #cat = :val1",
    ExpressionAttributeValues:{
      ":val1": data.catalog,
    },
    ExpressionAttributeNames:{
      "#cat": "catalog"
    },
    
  };

  await dynamoDb.update(params);

  return { status: true };
});