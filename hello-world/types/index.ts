export type LanguageMap = Record<
    string,
    { volunteerLangColId: string; helpRequesterLangColId: string; hCanSpeak?: boolean }
>;

export interface IAssignVolunteerEvent {
    body: Body;
    headers: Headers;
    level: string;
    message: string;
    timestamp: Date;
}

export interface Body {
    event: MondayEvent;
}

export interface MondayEvent {
    app: string;
    type: string;
    triggerTime: string; // of a date
    subscriptionId: number;
    userId: number;
    originalTriggerUuid: null;
    boardId: number;
    pulseId: number;
    sourceGroupId: string;
    destGroupId: string;
    destGroup: DestGroup;
    triggerUuid: string;
    challenge?: string;
}

export interface DestGroup {
    id: string;
    title: string;
    color: string;
    is_top_group: boolean;
}

export interface Headers {
    accept: string;
    'accept-encoding': string;
    'content-type': string;
    Host: string;
    traceparent: string;
    'User-Agent': string;
    'X-Amzn-Trace-Id': string;
    'X-Forwarded-For': string;
    'X-Forwarded-Port': string;
    'X-Forwarded-Proto': string;
}

// GQL query & mutation params

export type MoveHelpRequesterBackToRawListGroupVariables = {
    helpRequesterId: number;
    groupId: string;
};

export interface GetVolunteersGroupedByLanguageVariables {
    boardId: number;
    langColId: string;
    capacityColId: string;
    limit?: number;
}

export interface SetRequesterMultipleValuesVariables {
    itemId: number;
    boardId: number;
    groupId: string;
    columnValues: string; // JSON string
}

export interface SetVolunteerMultipleValuesVariables {
    itemId: number;
    boardId: number;
    columnValues: string; // JSON string
}

// Monday GQL Types

export interface IMatchingVolunteers {
    boards: {
        items_page: {
            items: {
                id: string;
                name: string;
                group: {
                    id: string;
                };
                column_values: ColumnValue[];
            }[];
        };
    }[];
}

export interface IRequestHelper {
    complexity: IComplexity;
    items: Item[];
}

export interface IComplexity {
    before: number;
    after: number;
    reset_in_x_seconds: number;
}

export interface Item {
    name: string;
    column_values: ColumnValue[];
}

export interface ColumnValue {
    id: string;
    value: null | string;
}

export interface LinkedPulses {
    changed_at?: Date;
    linkedPulseIds: LinkedPulseID[];
}

export interface LinkedPulseID {
    linkedPulseId: number;
}

export interface ICheckedValue {
    checked: boolean;
    changed_at: Date;
}
