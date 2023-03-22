import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();
import * as console from 'console'

export const createHandler =async (event:any) => {
        try {
            const body = JSON.parse(event.body);
            let params:any ={
                TableName: process.env.TABLE_NAME,
                Item:{
                    ...body
                }
            }
           await docClient.put(params).promise()
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: `data inserted successfully`
            }
        } catch (err) {
            console.log("posterr",err)
            return {
                statusCode: 500,
                body: JSON.stringify(err),
            };
        }
};

export const getHandler =async (event:any) => {
    try {
        const { userId } = event.pathParameters;
        const params:any = {
            TableName: process.env.TABLE_NAME,
            Key: {
                id: + userId
            }
        };
        const data = await docClient.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};
export const upadteHandler =async (event:any) => {
    try {
        const body = JSON.parse(event.body);
                let params:any ={
                TableName: process.env.TABLE_NAME,
                Item:{
                    ...body
                }
            }
        // Create record if not exists, Otherwise update
        await docClient.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify("data updated successfully"),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};
export const deleteHandler =async (event:any) => {
    try {
        const { userId } = event.pathParameters;
        const params:any = {
            TableName: process.env.TABLE_NAME,
            Key: {
                id: +userId
            }
        };
        await docClient.delete(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify("data deleted successfully"),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};