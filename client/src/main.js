import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import App from './App.vue';
import router from './router';
import Store from './utils/Store';

Sentry.init({
  Vue,
  dsn: 'https://7a99f3aaaa144241960d3857a1f4dee9@o516709.ingest.sentry.io/5623500',
  integrations: [new Integrations.BrowserTracing()],
  tracingOptions: {
    trackComponents: true,
  },
});

(async () => {
  const store = new Store();
  await store.init();
  Vue.config.productionTip = false;
  Vue.prototype.$store = store;

  new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app');
})();
