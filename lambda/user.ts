import {createHandler,upadteHandler,deleteHandler,getHandler} from '../helper/user'
export const handler = async function (event: any) {
  let resultVal=null
  switch (event.httpMethod) {
    case "GET":
        resultVal= await getHandler(event)
      break;
    case "POST":
      resultVal= await createHandler(event)
      break;
    case "DELETE":
        resultVal= await deleteHandler(event)
      break;
    case "PUT":
        resultVal= await upadteHandler(event)
      break;
    default:
      break;
  }
  return resultVal;
};
