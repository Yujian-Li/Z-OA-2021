const app = require('../index');
const nock = require('nock');
const request = require('supertest');

test('get tickect by id given valid id', async () => {
  const successRes = {
    ticket: {
      url: 'https://yujian.zendesk.com/api/v2/tickets/1.json',
      id: 1,
      external_id: null,
      via: {
        channel: 'sample_ticket',
        source: {
          from: {},
          to: {},
          rel: null,
        },
      },
      created_at: '2020-11-07T14:10:14Z',
      updated_at: '2020-11-07T14:10:14Z',
      type: 'incident',
      subject: 'Sample ticket: Meet the ticket',
      raw_subject: 'Sample ticket: Meet the ticket',
      description:
        "Hi Yujian,\n\nThis is your first ticket. Ta-da! Any customer request sent to your supported channels (email, chat, voicemail, web form, and tweet) will become a Support ticket, just like this one. Respond to this ticket by typing a message above and clicking Submit. You can also see how an email becomes a ticket by emailing your new account, support@yujian.zendesk.com. Your ticket will appear in ticket views.\n\nThat's the ticket on tickets. If you want to learn more, check out: \nhttps://support.zendesk.com/hc/en-us/articles/203691476\n",
      priority: 'normal',
      status: 'open',
      recipient: null,
      requester_id: 425847558234,
      submitter_id: 425847553414,
      assignee_id: 425847553414,
      organization_id: null,
      group_id: 360015938854,
      collaborator_ids: [],
      follower_ids: [],
      email_cc_ids: [],
      forum_topic_id: null,
      problem_id: null,
      has_incidents: false,
      is_public: true,
      due_at: null,
      tags: ['sample', 'support', 'zendesk'],
      custom_fields: [],
      satisfaction_rating: null,
      sharing_agreement_ids: [],
      fields: [],
      followup_ids: [],
      brand_id: 360005899374,
      allow_channelback: false,
      allow_attachments: true,
    },
  };

  nock('https://yujian.zendesk.com')
    .get('/api/v2/tickets/1.json')
    .reply(200, successRes);
  const res = await request(app).get('/tickets/ticket/1');
  expect(res.status).toBe(200);
  expect(res.body).toEqual(successRes);
});

test('get ticket by id given invalid id', async () => {
  const invalidIdRes = {
    error: 'Request failed with status code 400',
  };
  nock('https://yujian.zendesk.com')
    .get('/api/v2/tickets/1aaaa.json')
    .reply(400, invalidIdRes);
  const res = await request(app).get('/tickets/ticket/1aaaa');
  expect(res.status).toBe(400);
  expect(res.body).toEqual(invalidIdRes);
});

test('get tickets by page size given perPage less than upperlimit 100', async () => {
  const successRes = {
    tickets: [
      {
        url: 'https://yujian.zendesk.com/api/v2/tickets/1.json',
        id: 1,
        external_id: null,
        via: {
          channel: 'sample_ticket',
          source: {
            from: {},
            to: {},
            rel: null,
          },
        },
        created_at: '2020-11-07T14:10:14Z',
        updated_at: '2020-11-07T14:10:14Z',
        type: 'incident',
        subject: 'Sample ticket: Meet the ticket',
        raw_subject: 'Sample ticket: Meet the ticket',
        description:
          "Hi Yujian,\n\nThis is your first ticket. Ta-da! Any customer request sent to your supported channels (email, chat, voicemail, web form, and tweet) will become a Support ticket, just like this one. Respond to this ticket by typing a message above and clicking Submit. You can also see how an email becomes a ticket by emailing your new account, support@yujian.zendesk.com. Your ticket will appear in ticket views.\n\nThat's the ticket on tickets. If you want to learn more, check out: \nhttps://support.zendesk.com/hc/en-us/articles/203691476\n",
        priority: 'normal',
        status: 'open',
        recipient: null,
        requester_id: 425847558234,
        submitter_id: 425847553414,
        assignee_id: 425847553414,
        organization_id: null,
        group_id: 360015938854,
        collaborator_ids: [],
        follower_ids: [],
        email_cc_ids: [],
        forum_topic_id: null,
        problem_id: null,
        has_incidents: false,
        is_public: true,
        due_at: null,
        tags: ['sample', 'support', 'zendesk'],
        custom_fields: [],
        satisfaction_rating: null,
        sharing_agreement_ids: [],
        followup_ids: [],
        brand_id: 360005899374,
        allow_channelback: false,
        allow_attachments: true,
      },
      {
        url: 'https://yujian.zendesk.com/api/v2/tickets/2.json',
        id: 2,
        external_id: null,
        via: {
          channel: 'sample_ticket',
          source: {
            from: {},
            to: {},
            rel: null,
          },
        },
        created_at: '2020-11-07T14:10:26Z',
        updated_at: '2020-11-11T15:01:34Z',
        type: 'incident',
        subject: 'I need help',
        raw_subject: 'I need help',
        description:
          'Hello,\nSomething dramatic happened and I could really use your help.\nThanks in advance,\nCustomer\n',
        priority: 'normal',
        status: 'closed',
        recipient: null,
        requester_id: 425847558234,
        submitter_id: 425847553414,
        assignee_id: 425847553414,
        organization_id: null,
        group_id: 360015938854,
        collaborator_ids: [],
        follower_ids: [],
        email_cc_ids: [],
        forum_topic_id: null,
        problem_id: null,
        has_incidents: false,
        is_public: true,
        due_at: null,
        tags: ['sample', 'support', 'zendesk'],
        custom_fields: [],
        satisfaction_rating: null,
        sharing_agreement_ids: [],
        followup_ids: [],
        brand_id: 360005899374,
        allow_channelback: false,
        allow_attachments: true,
      },
    ],
    meta: {
      has_more: true,
      after_cursor: 'eyJvIjoibmljZV9pZCIsInYiOiJhUUlBQUFBQUFBQUEifQ==',
      before_cursor: 'eyJvIjoibmljZV9pZCIsInYiOiJhUUVBQUFBQUFBQUEifQ==',
    },
    links: {
      prev:
        'https://yujian.zendesk.com/api/v2/tickets.json?page%5Bbefore%5D=eyJvIjoibmljZV9pZCIsInYiOiJhUUVBQUFBQUFBQUEifQ%3D%3D&page%5Bsize%5D=2',
      next:
        'https://yujian.zendesk.com/api/v2/tickets.json?page%5Bafter%5D=eyJvIjoibmljZV9pZCIsInYiOiJhUUlBQUFBQUFBQUEifQ%3D%3D&page%5Bsize%5D=2',
    },
  };

  const query = new URLSearchParams({ 'page[size]': 2 });
  nock('https://yujian.zendesk.com')
    .get(`/api/v2/tickets.json`)
    .query(query)
    .reply(200, successRes);
  const res = await request(app).get('/tickets/pagebysize?perPage=2');
  expect(res.status).toBe(200);
  expect(res.body.tickets.tickets).toHaveLength(2);
});

test('get tickets by page size given perPage exceed upperlimit 100', async () => {
  const invalidParamRes = {
    error: 'Request failed with status code 400',
  };
  const query = new URLSearchParams({ 'page[size]': 150 });
  nock('https://yujian.zendesk.com')
    .get(`/api/v2/tickets.json`)
    .query(query)
    .reply(400, invalidParamRes);
  const res = await request(app).get('/tickets/pagebysize?perPage=150');
  expect(res.status).toBe(400);
  expect(res.body).toEqual(invalidParamRes);
});
