import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
  };

  const result = await dynamoDb.getall(params);
  if (!result.Items) {
    throw new Error("Item not found.");
  }
  //console.log(result)
  //console.log(result.Items)
  // Return the retrieved item
  return result.Items;
});



