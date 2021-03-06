<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <DoubleField
        :param="'lnk_min'"
        v-model="model.lnk_min"
        :min="Math.log(1 * Math.pow(10, -10))"
      />
      <DoubleField
        :param="'lnk_max'"
        v-model="model.lnk_max"
        :max="Math.log(2 * Math.pow(10, 6))"
      />
      <DoubleField
        :param="'dlnk'"
        :min="0.005"
        :max="0.5"
        v-model="model.dlnk"
      />
      <md-checkbox v-model="model.takahashi">
        Use Takahashi (2012) nonlinear P(k)?
      </md-checkbox>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label for="transferChoices">Transfer Model</label>
            <md-select
              v-model="model.transfer_model"
              id="transferChoices"
              name="transferChoice">
              <md-option
                v-for="(value, key) in choices"
                :key="key"
                :value="key">
                {{value}}
              </md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item">
          <DoubleField v-for="(value, key) in model.transfer_params"
            :key = "key"
            :value = "value"
            :step="1"
            :param = "key"
            v-model = model.transfer_params[key]
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoubleField from '@/components/DoubleField.vue';
import BACKEND_CONSTANTS from '@/constants/backend_constants';
import clonedeep from 'lodash.clonedeep';

const transferChoices = {
  CAMB: 'CAMB',
  EH_BAO: 'Eisenstein-Hu (1998) (with BAO)',
  EH_NoBAO: 'Eisenstein-Hu (1998) (no BAO)',
  BBKS: 'BBKS (1986)',
  BondEfs: 'Bond-Efstathiou',
};

export default {
  name: 'TransferForm',
  model: {
    prop: 'transferData',
    event: 'updateTransfer',
  },
  props: ['init'],
  data() {
    return {
      choices: transferChoices,
      model: clonedeep(this.init),
      allTransferData: {
        ...clonedeep(BACKEND_CONSTANTS.TransferComponent_params),
      },
    };
  },
  watch: {
    'model.transfer_model': function updateOptions(newValue, oldValue) {
      this.allTransferData[oldValue] = { ...clonedeep(this.model.transfer_params) };
      this.model.transfer_params = this.allTransferData[newValue];
    },
  },
  activated() {
    this.model = clonedeep(this.init);
  },
  updated() {
    this.$emit('updateTransfer', clonedeep(this.model));
  },
  components: {
    DoubleField,
  },
};

</script>

<style>
</style>
