/* eslint-disable no-await-in-loop, no-restricted-syntax, no-continue */

import { mount, createLocalVue } from '@vue/test-utils';
import MassDefinitionForm from '@/components/forms/MassDefinitionForm';
import BACKEND_CONSTANTS from '@/constants/backend_constants';
import INITIAL_STATE from '@/constants/initial_state';

describe('Mounted MassDefinitionForm', () => {
  const localVue = createLocalVue();
  const wrapper = mount(MassDefinitionForm, {
    propsData: { init: INITIAL_STATE.mass_definition },
    localVue,
  });

  const options = Object.keys(BACKEND_CONSTANTS.MassDefinition_params);

  test('has correct default model', () => {
    expect(wrapper.vm.model.mdef_model).toBe('SOMean');
  });

  test('changes model parameters when model is changed', async () => {
    for (const option of options) {
      if (wrapper.vm.model.mdef_model === option) continue;
      const oldParams = wrapper.vm.model.mdef_params;
      wrapper.vm.$data.model.mdef_model = option;
      await localVue.nextTick();
      await localVue.nextTick();
      const newParams = wrapper.vm.model.mdef_params;
      expect(oldParams).not.toBe(newParams);
    }
  });

  test('renders correct fields for each model selection', async () => {
    for (const option of options) {
      wrapper.vm.$data.model.mdef_model = option;
      await localVue.nextTick();
      await localVue.nextTick();
      const params = Object.keys(BACKEND_CONSTANTS.MassDefinition_params[option]);
      for (const param of params) {
        expect(wrapper.html()).toEqual(expect.stringMatching(new RegExp(`.*${param}.*`)));
      }
    }
  });

  test('emits onChange event whenever model selection is changed', async () => {
    const emitted = wrapper.emitted();
    wrapper.vm.$emit('onChange');
    await localVue.nextTick();
    let prevCount = 0;
    for (const option of options) {
      if (wrapper.vm.model.mdef_model === option) continue;
      prevCount = emitted.onChange.length;
      wrapper.vm.$data.model.mdef_model = option;
      await localVue.nextTick();
      await localVue.nextTick();
      expect(emitted.onChange.length).toBeGreaterThan(prevCount);
      prevCount = emitted.onChange.length;
    }
  });

  test('emits onChange event whenever the values of model params have changed', async () => {
    const emitted = wrapper.emitted();
    wrapper.vm.$emit('onChange');
    await localVue.nextTick();
    let prevCount = emitted.onChange.length;
    const params = Object.keys(wrapper.vm.model.mdef_params);
    for (const param of params) {
      wrapper.vm.$data.model.mdef_params[param] += 0.01;
      await localVue.nextTick();
      await localVue.nextTick();
      expect(emitted.onChange.length).toBeGreaterThan(prevCount);
      prevCount = emitted.onChange.length;
    }
  });
});
