import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    //Key: {
    //  dataElement: event.pathParameters.dataElement, 
    //},
  };

  const result = await dynamoDb.getall(params);
  if (!result.Items) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Items;
});



