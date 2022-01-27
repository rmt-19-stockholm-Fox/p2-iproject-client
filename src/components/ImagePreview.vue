<template>
  <div id="previewer" v-if="isPreviewingImage">
    <Overlay @click.native="exit"></Overlay>
    <div class="exit">
      <span @click.self="exit">✕</span>
    </div>  
    <div class="image-wrapper">
      <div style="width: 100%; flex: 1 1 auto;">
        <div class="img" 
          :style="{ 'background-image': `url('${previewedImage}')` }" >
        </div>
      </div>
      <div class="control" style="width: 100%; padding: 15px 0;">
        <button @click.self="imageViewer.onDiscard" class="btn btn-danger">Discard</button>
        <button @click.self="imageViewer.onChange" class="btn btn-primary">Change</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Overlay from './Overlay.vue';

export default {
  name: 'ImagePreview',
  components: { Overlay },
  computed: {
    ...mapState([
      'isPreviewingImage',
      'previewedImage',
      'imageViewer'
    ])
  },
  methods: {
    exit() {
      this.$store.commit('IMAGE_PREVIEW_OUT');
    }
  }
}
</script>

<style scoped lang="scss">
#previewer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    z-index: 199;
  }

  .control {
    position: relative;
    z-index: 199;
    
    button {
      margin: 0 7px;
    }
  }
}

.exit {
  width: 100%;
  height: 50px;
  padding: 7px 25px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.75rem;
  text-align: right;
  color: #aaa;
  z-index: 199;

  span {
    cursor: pointer;

    &:hover {
      color: white;
      font-weight: bold;
    }
  }
}
</style>
