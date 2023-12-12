export interface IAssignVolunteerEvent {
    body: Body;
    headers: Headers;
    level: string;
    message: string;
    timestamp: Date;
}

export interface Body {
    event: Event;
}

export interface Event {
    app: string;
    type: string;
    triggerTime: Date;
    subscriptionId: number;
    userId: number;
    originalTriggerUuid: null;
    boardId: number;
    pulseId: number;
    sourceGroupId: string;
    destGroupId: string;
    destGroup: DestGroup;
    triggerUuid: string;
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
