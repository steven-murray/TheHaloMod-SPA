/* eslint-disable no-await-in-loop, no-restricted-syntax, no-continue */
import { mount, createLocalVue } from '@vue/test-utils';
import HaloModelForm from '@/components/forms/HaloModelForm';
// import BACKEND_CONSTANTS from '@/constants/backend_constants';
import INITIAL_STATE from '@/constants/initial_state';

describe('Mounted HaloModelForm', () => {
  const localVue = createLocalVue();
  const wrapper = mount(HaloModelForm, {
    propsData: { init: INITIAL_STATE.halo_model },
    localVue,
  }); 

  // const options = Object.keys(BACKEND_CONSTANTS.halo_model_params);

  test('has correct default model', () => {
    expect(wrapper.vm.model.hc_spectrum).toBe('linear');
  });
});
