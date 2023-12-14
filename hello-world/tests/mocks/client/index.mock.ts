import { jest } from '@jest/globals';
import {
    GET_HELP_REQUESTER_DATA,
    GET_VOLUNTEERS_GROUPED_BY_LANGUAGE,
    MOVE_HELPREQUESTER_BACK_TO_RAWLIST_GROUP,
    SET_REQUESTER_MULTIPLE_VALUES,
} from '../../../clients/graphql/gql-strings';
import { mockHelpRequester } from '../helprequester.mock';
import mockVolunteerColumns from '../volunteerColumns.mock';
import mockGroupedVolunteers from '../groupedVolunteers.mock';
import mockAssignedVolunteerResult from '../assignVolunteer.mock';
import logger from '../../../utils/logger-winston';

export const mockHelpRequesterResponse = {
    items: [mockHelpRequester],
};

export const mockMakeGQLRequest = jest.fn(
    async (query: string, variables: Record<string, unknown>): Promise<unknown> => {
        logger.log('🚀 ~ file: index.mock.ts:12 ~ { query, variables }:', { query, variables });

        switch (query) {
            case GET_HELP_REQUESTER_DATA:
                return mockHelpRequesterResponse;
            case GET_VOLUNTEERS_GROUPED_BY_LANGUAGE:
                return mockGroupedVolunteers;
            case MOVE_HELPREQUESTER_BACK_TO_RAWLIST_GROUP:
                return mockAssignedVolunteerResult;
            case SET_REQUESTER_MULTIPLE_VALUES:
                return mockAssignedVolunteerResult;
            default:
                return {};
        }
    },
);
