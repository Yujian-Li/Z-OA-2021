import { mount } from '@vue/test-utils';
import TicketList from './../src/components/TicketList.vue';
import Vue from 'vue';
import BoostrapVue from 'bootstrap-vue';

Vue.use(BoostrapVue);

describe('Mounted TicketList', () => {
  const wrapper = mount(TicketList);
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('has data', () => {
    expect(typeof TicketList.data).toBe('function');
  });

  it('renders correctly with different data', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Updated At');
  });
});
