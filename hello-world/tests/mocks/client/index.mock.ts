import { jest } from '@jest/globals';
// clientMocks.ts
import mockGroupedVolunteers from '../groupedVolunteers.mock';
import mockAssignedVolunteerResult from '../assignVolunteer.mock';
import { mockHelpRequester } from '../helprequester.mock';

export const mockHelpRequesterResponse = {
    items: [mockHelpRequester],
};

// Mock for moveHelpRequesterBackToRawList
export const mockMoveHelpRequesterBackToRawList = jest.fn(async (options) => {
    return mockAssignedVolunteerResult;
});

// Mock for getHelpRequesterInfo
export const mockGetHelpRequesterInfo = jest.fn(async (helpRequesterId) => {
    return mockHelpRequester;
});

// Mock for getVolunteersGroupedBy
export const mockGetVolunteersGroupedBy = jest.fn(async (variables) => {
    return mockGroupedVolunteers;
});

// Mock for setRequesterMultipleValues
export const mockSetRequesterMultipleValues = jest.fn(async (variables) => {
    return mockAssignedVolunteerResult;
});

// Export all mocks
export default {
    mockMoveHelpRequesterBackToRawList,
    mockGetHelpRequesterInfo,
    mockGetVolunteersGroupedBy,
    mockSetRequesterMultipleValues,
};
