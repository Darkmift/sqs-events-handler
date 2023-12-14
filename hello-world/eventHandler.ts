import logger from './utils/logger-winston';
import { ICheckedValue, LinkedPulses, MondayEvent } from './types';
import {
    getHelpRequesterInfo,
    getVolunteersGroupedBy,
    // moveHelpRequesterBackToRawList,
    setRequesterMultipleValues,
} from './clients/graphql/client';
import { APIGatewayProxyResult } from 'aws-lambda';
import {
    COLUMN_ASSIGN_VOLUNTEER_TO_REQUESTER,
    COLUMN_CAPACITY,
    GROUP_AWAITING_CALL_FROM_VOLUNTEER,
    GROUP_RAW_LIST,
    VOLUNTEER_BOARD_ID,
    languageMap,
} from './config/consts';
import tryParse from './utils/tryparse';
import getTimeForNotifyVolunteer from './utils/getTimeForNotifyVolunteer';

const eventHandler = async (mondayEvent: MondayEvent): Promise<APIGatewayProxyResult> => {
    /**
     * response body to return
     */
    const responseBody: {
        success: boolean;
        reason: string;
        meta: unknown;
        challenge: string;
    } = {
        success: true,
        reason: 'init',
        meta: mondayEvent,
        challenge: mondayEvent.challenge || 'no challenge in event body from monday',
    };

    const output: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };

    try {
        logger.log(`Monday move_pulse_into_group event: ${mondayEvent}`);

        const helpRequesterId = mondayEvent.pulseId as number;
        const helpRequesterBoardId = mondayEvent.boardId as number;

        // get help requester info
        const helpRequesterData = await getHelpRequesterInfo(helpRequesterId);
        if (!helpRequesterData) {
            throw new Error('No help requester data found');
        }

        const { complexity, items } = helpRequesterData;
        // TODO factor complexity logic here
        const helpRequester = items[0];
        logger.log('🚀 ~ file: eventHandler.ts:42 ~ eventHandler ~ helpRequester:', { helpRequester, complexity });

        const assignedVolunteerData = helpRequester.column_values.find(
            (c) => c.id === COLUMN_ASSIGN_VOLUNTEER_TO_REQUESTER,
        );
        logger.log('🚀 ~ file: eventHandler.ts:55 ~ eventHandler ~ assignedVolunteerData:', { assignedVolunteerData });

        // if already has volunteer assigned
        const linkedVolunteers = tryParse<LinkedPulses>(assignedVolunteerData?.value);
        logger.log('🚀 ~ file: eventHandler.ts:58 ~ eventHandler ~ linkedVolunteers:', { linkedVolunteers });

        if (linkedVolunteers?.linkedPulseIds?.length > 0) {
            responseBody.success = false;
            responseBody.reason = 'Already assigned';
            responseBody.meta = { helpRequester, linkedVolunteers };
            logger.info('🚀 ~ Already assigned:', { responseBody });
            output.body = JSON.stringify(responseBody);

            // TODO verify event is returned to quese in said case

            // moveHelpRequesterBackToRawList({
            //     helpRequesterId,
            //     groupId: GROUP_RAW_LIST,
            // });
            throw new Error('Already assigned');
        }

        /**
         * We get the volunteers information
         */

        const langColId = Object.keys(languageMap).reduce((acc, lang) => {
            if (acc?.length) return acc;

            const colData = helpRequester.column_values.find((c) => c.id === languageMap[lang].helpRequesterLangColId);
            if (!colData) return acc;

            const checkBoxValue = tryParse<ICheckedValue>(colData.value);
            if (!checkBoxValue?.checked) return acc;
            return languageMap[lang].volunteerLangColId;
        }, null as string | null);
        logger.log('🚀 ~ file: eventHandler.ts:88 ~ langColId ~ langColId:', { langColId });

        if (!langColId) {
            throw new Error('No language column found');
        }

        const volunteersData = await getVolunteersGroupedBy({
            boardId: VOLUNTEER_BOARD_ID,
            langColId,
            capacityColId: COLUMN_CAPACITY,
        });
        logger.log('🚀 ~ file: eventHandler.ts:98 ~ eventHandler ~ volunteersData:', { volunteersData });

        const availableVolunteer = volunteersData?.boards[0]?.items_page?.items[0];

        if (!availableVolunteer) {
            throw new Error('No volunteer found');
        }

        // get notify time
        const nextHour = getTimeForNotifyVolunteer();
        const dateString = nextHour.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        const timeString = nextHour.toISOString().split('T')[1].split(':')[0] + ':00:00'; // Format time to HH:00:00

        const updateValues = JSON.stringify({
            connect_boards5: { linkedPulseIds: [{ linkedPulseId: parseInt(availableVolunteer.id) }] },
            date42: { date: dateString, time: timeString },
        });

        const response = await setRequesterMultipleValues({
            itemId: helpRequesterId,
            boardId: helpRequesterBoardId,
            groupId: GROUP_AWAITING_CALL_FROM_VOLUNTEER,
            columnValues: updateValues,
        });
        logger.log('🚀 ~ file: app.ts:162 ~ lambdaHandler ~ response:', response);
        responseBody.meta = response;
        responseBody.success = true;
        responseBody.reason = 'Successfully assigned';
        output.body = JSON.stringify(responseBody);
        return output;
    } catch (error) {
        logger.error('🚀 ~ file: eventHandler.ts:142 ~ error:', error as Error);
        logger.error('Error processing record:', { mondayEvent, error });
        output.statusCode = 500;
        responseBody.success = false;
        responseBody.reason = 'Error processing record: ' + (error as Error)?.message;
        responseBody.meta = error;
        output.body = JSON.stringify(responseBody);
        return output;
    }
};

export default eventHandler;
