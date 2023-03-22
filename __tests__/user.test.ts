import { handler } from '../lambda/user'
process.env.TABLE_NAME="userTable"
let mockReq={
    httpMethod:"GET",
    pathParameters:{userId:"1"},
    body:JSON.stringify({"id":5,"name":"test5","email":"test@gmail.com"})
}

jest.mock('aws-sdk',()=>({
    DynamoDB:{   
        DocumentClient: jest.fn().mockImplementation(()=> ({
        get: jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValue([[{id:"1","name":"test"}]]),
        })),
        put:jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValue([[{statusCode:200,body:"data updated/inserted successfully"}]]),
        })),
        delete:jest.fn().mockImplementation(() => ({
            promise: jest.fn().mockResolvedValue([[{statusCode:200,body:"data deleted successfully"}]]),
        })),
    }))}
}))

describe("check user crud", () => {
    it("check get scenario", async() => {
        let getMockFunc= await handler(mockReq)
       expect(getMockFunc).toEqual({"body": "[[{\"id\":\"1\",\"name\":\"test\"}]]", "statusCode": 200})
       
    });

    it("check delete scenario", async() => {
        mockReq.httpMethod="DELETE"
        let deleteMockFunc= await handler(mockReq)
       expect(deleteMockFunc).toEqual({"body": "\"data deleted successfully\"", "statusCode": 200})
    });

    it("check post scenario", async() => {
        mockReq.httpMethod="POST"
        let postMockFunc= await handler(mockReq)
       expect(postMockFunc).toEqual({
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `data inserted successfully`
    })
    });
  });

