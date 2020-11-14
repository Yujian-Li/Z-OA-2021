module.exports = {
  list: () => {
    return 'https://yujian.zendesk.com/api/v2/tickets.json';
  },
  ticket: (id) => {
    return `https://yujian.zendesk.com/api/v2/tickets/${id}.json`;
  },
  listBySize: (perPage) => {
    return `https://yujian.zendesk.com/api/v2/tickets.json?page[size]=${perPage}`;
  },
  listByPageAndSize: (pageNum, perPage) => {
    return `https://yujian.zendesk.com/api/v2/tickets.json?page=${pageNum}&per_page=${perPage}`;
  },
  count: () => {
    return 'https://yujian.zendesk.com/api/v2/tickets/count.json';
  },
};
