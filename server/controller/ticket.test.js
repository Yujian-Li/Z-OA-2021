const app = require('../index');
const nock = require('nock');
const request = require('supertest');

test('get tickect by id', async () => {
  const mockRes = {
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
    .reply(200, mockRes);
  const res = await request(app).get('/tickets/ticket/1');
  expect(res.status).toBe(200);
  expect(res.body).toEqual(mockRes);
});
