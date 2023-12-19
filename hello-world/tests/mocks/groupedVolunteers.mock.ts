import { IMatchingVolunteers } from '../../types';

const assignedHelpRequesters = {
    changed_at: '2023-12-02T17:12:40.270Z',
    linkedPulseIds: [{ linkedPulseId: 1331232256 }, { linkedPulseId: 1331232266 }],
};

const mockGroupedVolunteers: IMatchingVolunteers = {
    boards: [
        {
            items_page: {
                items: [
                    {
                        id: '1326247022',
                        name: 'אבי קניג',
                        group: {
                            id: 'topics',
                        },
                        column_values: [
                            {
                                id: 'board_relation',
                                value: JSON.stringify(assignedHelpRequesters),
                            },
                        ],
                    },
                ],
            },
        },
    ],
};

export default mockGroupedVolunteers;
