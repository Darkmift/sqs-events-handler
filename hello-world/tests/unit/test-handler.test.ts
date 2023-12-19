// Mock the module at the top of your test file
jest.mock('../../clients/graphql/client', () => ({
    __esModule: true, // This is required for ES6 modules
    moveHelpRequesterBackToRawList: mockMoveHelpRequesterBackToRawList,
    getHelpRequesterInfo: mockGetHelpRequesterInfo,
    getVolunteersGroupedBy: mockGetVolunteersGroupedBy,
    setRequesterMultipleValues: mockSetRequesterMultipleValues,
    setVolunteerMultipleValues: mockSetVolunteerMultipleValues,
}));
import mockedGQLMethods, {
    mockGetHelpRequesterInfo,
    mockGetVolunteersGroupedBy,
    mockHelpRequesterResponse,
    mockMoveHelpRequesterBackToRawList,
    mockSetRequesterMultipleValues,
    mockSetVolunteerMultipleValues,
} from '../mocks/client/index.mock';
import { lambdaHandler } from '../../app';
import { expect, describe, it, jest, beforeEach } from '@jest/globals';
import { incomingEventMock } from '../mocks/events/assign-volunteer.mock';

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
        // Call your Lambda handler function
        const result = await lambdaHandler(mockAwsEventClone);

        // Verify the response status code and body
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ message: 'events processed' }));
    });
});
