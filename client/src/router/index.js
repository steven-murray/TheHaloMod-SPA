import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  MdButton,
  MdContent,
  MdTabs,
  MdToolbar,
  MdAvatar,
  MdElevation,
  MdField,
  MdMenu,
  MdDrawer,
  MdList,
  MdApp,
  MdCheckbox,
  MdSubheader,
  MdDivider,
  MdDialog,
  MdProgress,
  MdCard,
  MdTooltip,
} from 'vue-material/dist/components';
import VueObserveVisibility from 'vue-observe-visibility';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { SliderPlugin } from '@syncfusion/ej2-vue-inputs';
import VueScrollactive from 'vue-scrollactive';

import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.use(VueObserveVisibility);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdToolbar);
Vue.use(MdAvatar);
Vue.use(MdElevation);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdDrawer);
Vue.use(MdApp);
Vue.use(MdCheckbox);
Vue.use(MdSubheader);
Vue.use(MdDivider);
Vue.use(MdDialog);
Vue.use(MdProgress);
Vue.use(MdCard);
Vue.use(SliderPlugin);
Vue.use(MdTooltip);
Vue.use(VueScrollactive);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/create',
    name: 'Create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
