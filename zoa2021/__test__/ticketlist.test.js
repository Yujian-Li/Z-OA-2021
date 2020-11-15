import { mount } from '@vue/test-utils';
import TicketList from './../src/components/TicketList.vue';

describe('TicketList', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof TicketList.data).toBe('function');
  });
});
