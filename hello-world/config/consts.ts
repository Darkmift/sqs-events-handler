import { LanguageMap } from '../types';

export const languageMap: LanguageMap = {
    hebrew: {
        volunteerLangColId: 'checkbox4',
        helpRequesterLangColId: 'checkbox',
    },
    russian: {
        volunteerLangColId: 'checkbox',
        helpRequesterLangColId: 'check',
    },
};

export const MONDAY_API_URL = 'https://api.monday.com/v2';

/**
 * group raw list to move requesters who were not assigned
 */
export const GROUP_RAW_LIST = 'topics';

/**
 * This is the group id in the volunteer board
 * where volunteers are grouped for active assignment
 */
export const COLUMN_ASSIGN_REQUESTER_TOVOLUNTEER = 'board_relation';
/**
this is the column in the requesters board
 where the assign volunteer id is listed as board_relation
 */
export const COLUMN_ASSIGN_VOLUNTEER_TO_REQUESTER = 'connect_boards5';
/**
 * the id of the volunteers board
 */
export const VOLUNTEER_BOARD_ID = 1316808337;
/**
 * column id for capacity
 */
export const COLUMN_CAPACITY = 'numbers2';
/**
 * group id to assign the request helper to
 */
export const GROUP_AWAITING_CALL_FROM_VOLUNTEER = 'new_group73364';
/**
 * column id in volunteer board for board relation to help requesters board
 */
export const COLUMN_ASSIGEND_PULSES_TO_VOLUNTEER = 'board_relation';
