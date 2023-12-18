import 'dotenv/config';
import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';
import logger from './utils/logger-winston';
import tryParse from './utils/tryparse';
import { IAssignVolunteerEvent } from './types';
import eventHandler from './eventHandler';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    const response = {
        statusCode: 200,
        body: '{}',
    };

    try {
        for await (const record of event.Records) {
            logger.log(`Processing record: ${record.messageId}`);

            try {
                // Extract the receipt handle and event source ARN

                const eventBody = tryParse<IAssignVolunteerEvent>(record.body);
                logger.log(`eventBody:`, eventBody);

                const eventType = eventBody.body.event.type;
                logger.log('🚀 ~ file: app.ts:37 ~ lambdaHandler ~ eventType:', { eventType });

                const mondayEvent = eventBody.body.event;

                const operationResult = await eventHandler(mondayEvent);
                console.log('🚀 ~ file: app.ts:43 ~ lambdaHandler ~ response:', { response: operationResult, record });
                if (!operationResult.statusCode || operationResult.statusCode !== 200) {
                    throw new Error('Error processing event');
                }

                /**
                 * determine event type
                 */
            } catch (error) {
                console.error('Error processing record:', record, error);
                // You might want to implement additional error handling here
                response.statusCode = 500;
                response.body = JSON.stringify({
                    message: 'some error happened',
                });
            }
        }

        response.body = JSON.stringify({ message: 'events processed' });
        return response;
    } catch (err) {
        console.log(err);

        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'some error happened',
        });
        return response;
    }
};
