export const assignVolunteerMockEvent = {
    body: {
        event: {
            app: 'monday',
            type: 'move_pulse_into_group',
            triggerTime: '2023-12-12T09:52:08.206Z',
            subscriptionId: 15619605,
            userId: 52133869,
            originalTriggerUuid: null,
            boardId: 1317064001,
            pulseId: 1331232325,
            sourceGroupId: 'topics',
            destGroupId: 'new_group',
            destGroup: {
                id: 'new_group',
                title: 'מוכן לשיבוץ',
                color: '#FF158A',
                is_top_group: false,
            },
            triggerUuid: 'c445460e881defbab255211861c9fcfa',
        },
    },
    headers: {
        accept: '*/*',
        'accept-encoding': 'gzip,deflate',
        'content-type': 'application/json',
        Host: 'j5ghvp9yxj.execute-api.us-east-1.amazonaws.com',
        traceparent: '00-4b2afa0234c0c2182ee5f4a20747863a-0a4027622db36af6-01',
        'User-Agent': 'node-fetch/1.0 (https://github.com/bitinn/node-fetch)',
        'X-Amzn-Trace-Id': 'Root=1-65782d48-4f1b52b24b8fa12c2ef48ea5',
        'X-Forwarded-For': '185.66.202.6',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https',
    },
};

export const incomingEventMock = {
    Records: [
        {
            messageId: 'bb2c6131-cfea-4731-9cc0-8a19d49b19ea',
            receiptHandle:
                'AQEBAC07j2PCO0W+p0qRi6IeUDd4reAVd4ReFp1pHOLj12EDT9xcgMjt4JdL/iKQLVIah/I6yl77zTJrz6cMjxRoImF8EcV828Yr3FhZXhR7wkFfJB+oq9+BKWtENPktXuvMEUvax0yU9m6MYIVWZUAisDaZrXUwEhwDSHmnKu355Poee+XajvLMzKgrK5WUWI1BJwI4nTPzx/9J1fBZ46Vu08VlH1wPpJDu4qRMh8g6oiG1URgrzAZnQ5MjI4Po0ZKeKnVThvG4Me1CfidEiyyS4m/NGHtRoq4bDeBJUTosZM0=',
            body: JSON.stringify(assignVolunteerMockEvent),
            attributes: {
                ApproximateReceiveCount: '1',
                AWSTraceHeader: 'Root=1-65782d48-4f1b52b24b8fa12c2ef48ea5;Parent=12a22651bd786346;Sampled=1',
                SentTimestamp: '1702374728653',
                SequenceNumber: '18882552004244719872',
                MessageGroupId: '52017d23-d336-4b8b-9ab7-97729be71c38',
                SenderId: 'AROAVKHTWD4DZYDLNJNKC:BackplaneAssumeRoleSession',
                MessageDeduplicationId: '52017d23-d336-4b8b-9ab7-97729be71c38',
                ApproximateFirstReceiveTimestamp: '1702374728653',
            },
            messageAttributes: {},
            md5OfBody: '8d64b445e65fdb535edd51575b91d0a4',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:365583277831:assign-volunteer.fifo',
            awsRegion: 'us-east-1',
        },
    ],
};
