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
  
  const myItems = result.Items;
  //le quito el logfile
  var myItems2 = myItems.filter(function (obj) {
    return obj.dataElement !== 'Logfile';
  });
  //agarro el logfile
  var logFile = myItems.filter(function (obj) {
    return obj.dataElement === 'Logfile';
  });
  //console.log(logFile);
  //realizo el split del orden y limpio el ultimo 
  //const order2 =logFile[0].catalog[0].split('_'); si cambias este a lista
  const order2 =logFile[0].catalog.split('_');
  order2[order2.length-1]=order2[order2.length-1].split('.')[0];

  var itemsordened= [];
  for (let i = 0; i < order2.length; i += 1) {
    for (let a = 0; a < myItems2.length; a += 1) {
      if(order2[i] === myItems2[a].dataElement  ) {
        itemsordened.push(myItems2[a]);
      }     
    }
  }
  itemsordened.unshift(logFile[0]);
  
  return itemsordened;
});



