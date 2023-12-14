// Mock the module at the top of your test file
jest.mock('../../clients/graphql/client', () => ({
    __esModule: true, // This is required for ES6 modules
    default: mockMakeGQLRequest,
}));
import { mockHelpRequesterResponse, mockMakeGQLRequest } from '../mocks/client/index.mock';
import { APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it, jest, beforeEach } from '@jest/globals';
import { incomingEventMock } from '../mocks/events/assign-volunteer.mock';
// import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
// import { mockClient } from 'aws-sdk-client-mock';

// const sqsMock = mockClient(SQSClient);

describe('Unit test for app handler', function () {
    let mockAwsEventClone = structuredClone(incomingEventMock);
    let mockHelpRequesterResponseClone = structuredClone(mockHelpRequesterResponse);

    beforeEach(() => {
        mockAwsEventClone = structuredClone(incomingEventMock);
        mockHelpRequesterResponseClone = structuredClone(mockHelpRequesterResponse);
        jest.clearAllMocks(); // Clear all mocks before each test
        // sqsMock.reset();
    });

    it('verifies successful response', async () => {
        // sqsMock.on(DeleteMessageCommand).resolves({});
        // Call your function that uses SQSClient here

        const result: APIGatewayProxyResult = await lambdaHandler(mockAwsEventClone);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ message: 'events processed' }));
        // expect(sqsMock.calls()).toHaveLength(1);
    });
});
