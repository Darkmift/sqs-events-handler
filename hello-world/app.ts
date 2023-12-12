import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';

import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import logger from './utils/logger-winston';
import tryParse from './utils/tryparse';
import { IAssignVolunteerEvent } from './types';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const sqsClient = new SQSClient({ region: 'us-east-1' });

export const lambdaHandler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    const response = {
        statusCode: 200,
        body: '{}',
    };

    try {
        for (const record of event.Records) {
            logger.log(`Processing record: ${record.messageId}`);

            try {
                // Extract the receipt handle and event source ARN

                const eventBody = tryParse<IAssignVolunteerEvent>(record.body);
                logger.log(`eventBody:`, eventBody);

                const eventType = eventBody.body.event.type;
                logger.log('🚀 ~ file: app.ts:37 ~ lambdaHandler ~ eventType:', { eventType });

                const receiptHandle = record.receiptHandle;
                const queueUrl = record.eventSourceARN.replace(
                    /^arn:aws:sqs:[^:]+:\d+:/,
                    'https://sqs.us-east-1.amazonaws.com/',
                );

                // Create a DeleteMessageCommand
                const deleteParams = {
                    QueueUrl: queueUrl,
                    ReceiptHandle: receiptHandle,
                };

                logger.log(`Queue URL: ${queueUrl}, Receipt Handle: ${receiptHandle}`);

                // Delete the message from the queue
                await sqsClient.send(new DeleteMessageCommand(deleteParams));
                console.log('Message deleted:', receiptHandle);
            } catch (error) {
                console.error('Error processing record:', record, error);
                // You might want to implement additional error handling here
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
