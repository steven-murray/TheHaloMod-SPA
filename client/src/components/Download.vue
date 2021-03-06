<template>
  <div>
  <md-toolbar class="md-large">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">Download</h3>
      </div>
    </div>
    <div class="download-container">
      <md-field class='download-select'>
        <md-select v-model="downloadChoice" id="downloadChoices">
          <md-option
            v-for="choice in downloadChoices"
            :key="choice.name"
            :value="choice.name"
          >
            {{choice.displayName}}
          </md-option>
        </md-select>
      </md-field>
      <md-button
        class="md-icon-button download-button md-raised md-primary"
        @click="handleClick"
        id="download-button"
      >
        <md-icon>download</md-icon>
      </md-button>
    </div>
    <a id="download-element"/>
  </md-toolbar>
  <md-dialog v-if="loading"
    :md-active.sync="loading"
    :md-close-on-esc="false"
    :md-click-outside-to-close="false">
    <md-dialog-title>{{loadingTitle}}</md-dialog-title>
    <md-dialog-content><md-progress-bar md-mode="indeterminate"/></md-dialog-content>
  </md-dialog>
  <md-dialog v-if="asciiDialogVisible"
    :md-active.sync="asciiDialogVisible">
    <md-dialog-title>ASCII data will download soon...</md-dialog-title>
    <md-button @click="asciiDialogVisible = false">Close</md-button>
  </md-dialog>
  </div>
</template>

<script>
import baseUrl from '@/env';

const downloadChoiceObjs = {
  plotImage: {
    displayName: 'Image of Plot',
    name: 'plotImage',
    downloadName: 'PlotImage',
    loadingTitle: 'Creating plot image...',
  },
  ascii: {
    displayName: 'ASCII',
    name: 'ascii',
    downloadName: 'AllData.zip',
    loadingTitle: 'Retrieving ASCII data...',
  },
  paramVals: {
    displayName: 'Parameter Values',
    name: 'paramVals',
    downloadName: 'ParameterValues.json',
    loadingTitle: 'Loading parameter values...',
  },
};
export default {
  name: 'Download',
  data() {
    return {
      downloadChoices: Object.values(downloadChoiceObjs),
      downloadChoice: Object.values(downloadChoiceObjs)[0].name,
      loading: false,
      loadingTitle: '',
      asciiDialogVisible: false,
    };
  },
  methods: {
    async handleClick() {
      const downloadNode = document.getElementById('download-element');
      const { downloadName, name, loadingTitle } = downloadChoiceObjs[this.downloadChoice];
      this.loadingTitle = loadingTitle;
      this.loading = true;
      const href = await this[`download_${name}`]();
      downloadNode.setAttribute('href', href);
      downloadNode.setAttribute('download', downloadName);
      downloadNode.click();
      this.loading = false;
    },
    async download_plotImage() {
      await this.$store.createPlot();
      return this.$store.state.plot;
    },
    async download_ascii() {
      this.asciiDialogVisible = true;
      return `${baseUrl}/ascii`;
    },
    async download_paramVals() {
      const modelsJsonString = JSON.stringify(await this.$store.getAllModels(), null, 2);
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(modelsJsonString)}`;
      return dataStr;
    },
  },
};
</script>

<style>
.download-container {
  margin-bottom: 16px;
  padding: 0 8px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.download-button {
  margin-left: 16px;
}
#download-element {
  display: none;
}
</style>
