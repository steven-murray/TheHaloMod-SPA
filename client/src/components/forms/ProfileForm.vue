<template>
  <form novalidate>
    <md-field>
      <label>{{title}}</label>
      <md-select v-model="model.profile_model">
        <md-option
          v-for="(value, choice) in choices"
          :key="choice"
          :value="value">
          {{choice}}
        </md-option>
      </md-select>
    </md-field>
    <div class="md-layout-item">
      <div v-for="(value, param) in model.profile_params"
        :key="param"
      >
      <md-checkbox
        v-if="typeof value === 'boolean'"
        class="md-primary"
        v-model="model.profile_params[param]"
      >
        {{param}}
      </md-checkbox>
      <double-field
        v-else
        :value="value"
        :param="param"
        range=false
        :placeholder="String(defaults[param])"
        v-model="model.profile_params[param]"/>

      </div>
    </div>
  </form>
</template>

<script>
import DoubleField from '@/components/DoubleField.vue';
import BACKEND_CONSTANTS from '@/constants/backend_constants';
import clonedeep from 'lodash.clonedeep';

const profileChoices = {
  'NFW (1997)': 'NFW',
  Hernquist: 'Hernquist',
  Moore: 'Moore',
  'Generalized NFW': 'GeneralizedNFW',
  Einasto: 'Einasto',
  'Cored NFW': 'CoredNFW',
};

export default {
  name: 'profile',
  model: {
    event: 'onChange',
    prop: 'parent_model',
  },
  props: ['parent_model', 'title'],
  data: () => ({
    profileChoices,
    model: {
      profile_model: 'NFW',
      profile_params: clonedeep(BACKEND_CONSTANTS.Profile_params).NFW,
    },
    defaults: clonedeep(BACKEND_CONSTANTS.Profile_params).NFW,
    choices: profileChoices,
  }),
  updated() {
    const payload = {};
    if (this.id === 'tracer-profile') {
      payload.tracer_profile_model = this.model.profile_model;
      payload.tracer_profile_params = this.model.profile_params;
    } else {
      payload.halo_profile_model = this.model.profile_model;
      payload.halo_profile_params = this.model.profile_params;
    }
    this.$emit('onChange', clonedeep(this.payload));
  },
  watch: {
    'model.profile_model': function updateOptions(val) {
      this.model.profile_params = null;
      this.$nextTick(function saveNewOptions() {
        this.model.profile_params = clonedeep(BACKEND_CONSTANTS.Profile_params)[val];
        this.defaults = clonedeep(BACKEND_CONSTANTS.Profile_params)[val];
      });
    },
  },
  components: {
    DoubleField,
  },
};
</script>
