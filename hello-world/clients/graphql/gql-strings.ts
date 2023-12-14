import { gql } from 'graphql-request';

export const MOVE_HELPREQUESTER_BACK_TO_RAWLIST_GROUP = gql`
    mutation ChangeColumnValue($helpRequesterId: ID!, $groupId: String!) {
        move_item_to_group(group_id: $groupId, item_id: $helpRequesterId) {
            id
        }
        complexity {
            before
            after
            reset_in_x_seconds
        }
    }
`;

export const GET_HELP_REQUESTER_DATA = gql`
    query GetHelpRequesterData($helpRequesterId: ID!) {
        complexity {
            before
            after
            reset_in_x_seconds
        }
        items(ids: [$helpRequesterId]) {
            name
            column_values {
                id
                value
            }
        }
    }
`;

export const GET_VOLUNTEERS_GROUPED_BY_LANGUAGE = gql`
    query GetVolunteersGroupedByCanSpeakLanguage(
        $boardId: ID!
        $langColId: ID!
        $capacityColId1: String!
        $capacityColId2: ID!
        $limit: Int
    ) {
        complexity {
            before
            after
            reset_in_x_seconds
        }
        boards(ids: [$boardId]) {
            items_page(
                limit: $limit
                query_params: {
                    rules: [
                        { column_id: $langColId, compare_value: [null], operator: is_not_empty }
                        { column_id: $capacityColId2, compare_value: [8], operator: lower_than }
                    ]
                    order_by: [{ column_id: $capacityColId1, direction: asc }]
                }
            ) {
                items {
                    id
                    name
                }
            }
        }
    }
`;

export const SET_REQUESTER_MULTIPLE_VALUES = gql`
    mutation SetRequesterMultipleValues($itemId: ID!, $boardId: ID!, $groupId: String!, $columnValues: JSON!) {
        complexity {
            before
            after
            reset_in_x_seconds
        }
        change_multiple_column_values(item_id: $itemId, board_id: $boardId, column_values: $columnValues) {
            id
        }
        move_item_to_group(group_id: $groupId, item_id: $itemId) {
            id
        }
    }
`;
