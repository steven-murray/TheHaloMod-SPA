<template>
  <md-app id="create" md-mode="fixed">
    <md-app-toolbar>
      <span class="md-title">{{model_metadata.model_name}}</span>
      <div class="md-toolbar-section-end">
          <md-button class="md-primary" @click="handleSave">
            Save
          </md-button>
          <md-button href="/" class="md-primary">
            Close
          </md-button>
        </div>
    </md-app-toolbar>
    <md-app-drawer
      md-permanent="full"
      class="md-primary"
      md-fixed
    >
      <scrollactive
        active-class="router-link-active"
        ref="scrollactive"
        :click-to-scroll="true"
        :highlight-first-item="true"
        :scroll-on-start="true"
        scroll-container-selector="md-app-scroller"
      >
        <md-list>
          <md-list-item v-for="(form, index) in forms" :key="index">
              <a :href="`#${form.props ? form.props.id : form.component.id}`"
                :md-ripple="true"
                v-on:click="() => highlight = index"
                :class="`${highlight == index ? 'router-link-active' : ''}
                md-list-item-link md-list-item-container md-button-clean`">
                <div class="md-list-item-content md-ripple">
                  {{form.props ? form.props.title : form.component.title}}
                </div>
              </a>
          </md-list-item>
        </md-list>
      </scrollactive>
    </md-app-drawer>
    <md-app-content class="scroll-container">
      <section :id="`${form.props ? form.props.id : form.component.id}`"
        v-for="(form, index) in forms" :key="index"
        class="form scrollactive-item">
        <h2 class="md-title">{{form.props ? form.props.title : form.component.title}}</h2>
        <component v-if="form.isMeta"
          :is="form.component"
          :parent_model="model_metadata"
          @onChange="updateModelMetaData"
        />
        <component v-else
          v-bind="form.props"
          :is="form.component"
          v-model="params[form.model]"/>
      </section>
    </md-app-content>
  </md-app>
</template>

<script>
import clonedeep from 'lodash.clonedeep';
import Concentration from '@/components/Concentration.vue';
import HaloExclusion from '@/components/HaloExclusion.vue';
import BiasForm from '@/components/BiasForm.vue';
import HMFForm from '@/components/HMFForm.vue';
import HODForm from '@/components/HODForm.vue';
import Profile from '@/components/Profile.vue';
import ModelMetadataForm from '@/components/ModelMetadataForm.vue';
import CosmologyForm from '@/components/CosmologyForm.vue';
import MassDefinitionForm from '@/components/MassDefinitionForm.vue';
import GrowthForm from '@/components/GrowthForm.vue';
import HaloModelForm from '@/components/HaloModelForm.vue';
import FilterForm from '@/components/FilterForm.vue';
import TransferForm from '@/components/TransferForm.vue';
import scrollactive from '@/utils/Scrollactive/scrollactive.vue';
import INITIAL_STATE from '@/constants/initial_state.json';

export default {
  name: 'Create',
  components: {
    Concentration,
    HaloExclusion,
    HODForm,
    BiasForm,
    Profile,
    MassDefinitionForm,
    GrowthForm,
    HaloModelForm,
    FilterForm,
    TransferForm,
    scrollactive,
  },
  data: () => ({
    showDialog: true,
    highlight: 0,
    loading: true,
    params: clonedeep(INITIAL_STATE),
    model_metadata: {
      model_name: 'New Model',
      fig_type: 'dndm',
    },
    forms: [
      {
        component: ModelMetadataForm,
        isMeta: true,
      },
      {
        component: MassDefinitionForm,
        model: 'mass_definition',
      },
      {
        component: Concentration,
        model: 'tracer_concentration',
        props: {
          modelName: 'tracer_concentration_model',
          paramsName: 'tracer_concentration_params',
          title: 'Tracer Concentration',
          id: 'tracer-concentration',
          defaultModel: 'Bullock01',
        },
      },
      {
        component: Concentration,
        model: 'halo_concentration',
        props: {
          modelName: 'halo_concentration_model',
          paramsName: 'halo_concentration_params',
          title: 'Halo Concentration',
          id: 'halo-concentration',
          defaultModel: 'Duffy08',
        },
      },
      {
        component: HaloExclusion,
        model: 'exclusion',
      },
      {
        component: BiasForm,
        model: 'bias',
      },
      {
        component: HMFForm,
        model: 'hmf',
      },
      {
        component: HODForm,
        model: 'hod',
      },
      {
        component: Profile,
        model: 'tracer_profile',
        props: {
          title: 'Tracer Profile',
          id: 'tracer_profile',
        },
      },
      {
        component: Profile,
        model: 'halo_profile',
        props: {
          title: 'Halo Profile',
          id: 'Halo_profile',
        },
      },
      {
        component: CosmologyForm,
        model: 'cosmo',
      },
      {
        component: HaloModelForm,
        model: 'halo_model',
      },
      {
        component: GrowthForm,
        model: 'growth',
      },
      {
        component: FilterForm,
        model: 'filter',
      },
      {
        component: TransferForm,
        model: 'transfer',
      },
    ],
  }),
  async mounted() {
    if (this.$route.name === 'Edit') {
      this.model_metadata.model_name = this.$route.params.id;
      this.params = await this.$store.getModel(this.model_metadata.model_name);
    }
    console.log(this.params, INITIAL_STATE);
    this.$forceUpdate();
    this.loading = false;
  },
  methods: {
    updateModelMetaData(updatedMetaData) {
      this.$emit('update-metadata', updatedMetaData);
    },
    setScrollactiveItems(event, currentItem, lastActiveItem) {
      // not working
      console.log(this.$refs.scrollactive, event, currentItem, lastActiveItem);
      this.$refs.scrollactive.setScrollactiveItems();
    },
    async handleSave() {
      this.loading = true;
      console.log(this.params);
      if (this.$route.name === 'Edit') {
        await this.$store.updateModel(this.$route.params.id, this.params);
        if (this.model_metadata.model_name !== this.$route.params.id) {
          await this.$store.cloneModel(this.$route.params.id, this.model_metadata.model_name);
          await this.$store.deleteModel(this.$route.params.id);
        }
      } else {
        await this.$store.createModel(this.params, this.model_metadata.model_name);
      }
      this.loading = false;
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  #create {
    height: 94vh;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .form {
    padding: 10px;
  }
</style>
