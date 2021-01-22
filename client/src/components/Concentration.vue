<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50">
      <md-field>
        <label>{{title}}</label>
        <md-select v-model="model[modelName]">
          <md-option
            v-for="(value, key) in options"
            :key="key"
            :value="key">
            {{value}}
          </md-option>
        </md-select>
      </md-field>
    </div>
    <div class="md-layout-item md-size-25">
      <div v-for="(value, key) in model[paramsName]" :key="key">
        <md-field v-if="key === 'sample'">
          <label>{{key}}</label>
          <md-select v-model="model[paramsName].sample">
            <md-option value="relaxed">relaxed</md-option>
            <md-option value="full">full</md-option>
          </md-select>
        </md-field>
        <DoubleField
          v-model="model[paramsName][key]"
          v-else
          :value="value"
          :param="key"
          range=false
          :placeholder="value"
        />
      </div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash.clonedeep';

import DoubleField from '@/components/DoubleField.vue';
import CONSTANTS from '@/constants/backend_constants';

const params = clonedeep(CONSTANTS.CMRelation_params);

export default {
  name: 'concentration',
  id: 'concentration',
  components: {
    DoubleField,
  },
  props: ['defaultModel', 'title', 'modelName', 'paramsName'],
  model: {
    event: 'onChange',
    prop: 'parent_model',
  },
  data() {
    return {
      options: CONSTANTS.CMRelation_options,
      model: {
        [this.modelName]: this.defaultModel,
        [this.paramsName]: params[this.defaultModel],
      },
    };
  },
  created() {
    this.$emit('onChange', this.model);
  },
  watch: {
    model: {
      deep: true,
      handler() {
        this.model[this.paramsName] = params[
          this.model[this.modelName]
        ];
        this.$emit('onChange', this.model);
      },
    },
  },
};
</script>
