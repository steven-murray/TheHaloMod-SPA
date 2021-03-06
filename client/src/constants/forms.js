import Concentration from '@/components/forms/ConcentrationForm.vue';
import HaloExclusion from '@/components/forms/HaloExclusionForm.vue';
import BiasForm from '@/components/forms/BiasForm.vue';
import HMFForm from '@/components/forms/HMFForm.vue';
import HODForm from '@/components/forms/HODForm.vue';
import Profile from '@/components/forms/ProfileForm.vue';
import CosmologyForm from '@/components/forms/CosmologyForm.vue';
import MassDefinitionForm from '@/components/forms/MassDefinitionForm.vue';
import GrowthForm from '@/components/forms/GrowthForm.vue';
import HaloModelForm from '@/components/forms/HaloModelForm.vue';
import FilterForm from '@/components/forms/FilterForm.vue';
import TransferForm from '@/components/forms/TransferForm.vue';

const FORMS = [
  {
    component: CosmologyForm,
    model: 'cosmo',
    title: 'Cosmology',
    id: 'cosmology',
  },
  {
    component: MassDefinitionForm,
    model: 'mass_definition',
    title: 'Mass Definition',
    id: 'mass_definition',
  },
  {
    component: TransferForm,
    model: 'transfer',
    title: 'Transfer',
    id: 'transfer',
  },
  {
    component: FilterForm,
    model: 'filter',
    title: 'Filter',
    id: 'filter',
  },
  {
    component: GrowthForm,
    model: 'growth',
    title: 'Growth',
    id: 'growth',
  },
  {
    component: HMFForm,
    model: 'hmf',
    title: 'HMF',
    id: 'hmf',
  },
  {
    component: HaloModelForm,
    model: 'halo_model',
    title: 'Halo Model',
    id: 'halo_model',
  },
  {
    component: HODForm,
    model: 'hod',
    title: 'HOD',
    id: 'hod',
  },
  {
    component: BiasForm,
    model: 'bias',
    title: 'Bias',
    id: 'bias',
  },
  {
    component: Concentration,
    model: 'halo_concentration',
    title: 'Halo Concentration',
    id: 'halo_concentration',
  },
  {
    component: Concentration,
    model: 'tracer_concentration',
    title: 'Tracer Concentration',
    id: 'tracer_concentration',
  },
  {
    component: Profile,
    model: 'halo_profile',
    title: 'Halo Profile',
    id: 'halo_profile',
  },
  {
    component: Profile,
    model: 'tracer_profile',
    title: 'Tracer Profile',
    id: 'tracer_profile',
  },
  {
    component: HaloExclusion,
    model: 'exclusion',
    title: 'Halo Exclusion',
    id: 'halo_exclusion',
  },
];

export default FORMS;
