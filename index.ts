import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { encode, decode } from './decode'

interface functionEvent extends APIGatewayEvent {
    cipherText?: string,
    plainText?: string
}

export const handler = async (event: functionEvent, context: Context): Promise<APIGatewayProxyResult> => {
    if (event.cipherText) {
        // decode cipher text
        try {
            return makeResponse(decode(event.cipherText), 200);
        } catch (error) {
            return makeResponse(JSON.stringify(error), 500);
        }
    } else if (event.plainText) {
        // encode plain text
        try {
            return makeResponse(encode(event.plainText), 200);
        } catch (error) {
            return makeResponse(JSON.stringify(error), 500);
        }
    }
    return makeResponse("No text", 500)
};

function makeResponse(text: string, statusCode: number): APIGatewayProxyResult {
    return {
        statusCode: statusCode,
        body: text
    }
}