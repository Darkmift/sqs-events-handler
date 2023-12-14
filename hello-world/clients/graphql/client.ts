import request from 'graphql-request';
import config from '../../config';
import { MONDAY_API_URL } from '../../config/consts';
import {
    GET_HELP_REQUESTER_DATA,
    GET_VOLUNTEERS_GROUPED_BY_LANGUAGE,
    MOVE_HELPREQUESTER_BACK_TO_RAWLIST_GROUP,
    SET_REQUESTER_MULTIPLE_VALUES,
} from './gql-strings';
import {
    GetVolunteersGroupedByLanguageVariables,
    IComplexity,
    IMatchingVolunteers,
    IRequestHelper,
    MoveHelpRequesterBackToRawListGroupVariables,
    SetRequesterMultipleValuesVariables,
} from '../../types';

export const _makeGQLRequest = async <T = unknown>(
    query: string,
    variables: Record<string, unknown>,
): Promise<T | null> => {
    try {
        return await request(MONDAY_API_URL, query, variables, {
            'Content-Type': 'application/json',
            Authorization: config.MONDAY_API_KEY,
            'API-Version': '2023-10',
        } as HeadersInit);
    } catch (error) {
        console.log('🚀 ~ file: client.ts:17 ~ makeGQLRequest ~ error:', error);
        return null;
    }
}; // TODO we export oly for tests

// move help requester back to raw list

export const moveHelpRequesterBackToRawList = async (options: MoveHelpRequesterBackToRawListGroupVariables) =>
    await _makeGQLRequest<{ id: string; complexity: IComplexity }>(MOVE_HELPREQUESTER_BACK_TO_RAWLIST_GROUP, options);

// get help requester info
export const getHelpRequesterInfo = async (helpRequesterId: number): Promise<IRequestHelper | null> => {
    return await _makeGQLRequest<IRequestHelper>(GET_HELP_REQUESTER_DATA, {
        helpRequesterId,
    });
};

// get volunteers filtered by language grouped by capacity
export const getVolunteersGroupedBy = async ({
    boardId,
    langColId,
    capacityColId,
    limit = 1,
}: GetVolunteersGroupedByLanguageVariables): Promise<IMatchingVolunteers | null> => {
    return await _makeGQLRequest(GET_VOLUNTEERS_GROUPED_BY_LANGUAGE, {
        boardId,
        langColId,
        capacityColId1: capacityColId,
        capacityColId2: capacityColId, // wierd gql issue on monday end
        limit,
    });
};

// set multiple values for help requester (volunteer,date for call back,move to group)
export const setRequesterMultipleValues = async ({
    itemId,
    boardId,
    groupId,
    columnValues,
}: SetRequesterMultipleValuesVariables): Promise<void> => {
    await _makeGQLRequest(SET_REQUESTER_MULTIPLE_VALUES, {
        itemId,
        boardId,
        groupId,
        columnValues,
    });
};
