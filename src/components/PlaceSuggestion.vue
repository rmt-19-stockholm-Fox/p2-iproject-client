<template>
  <div @click="handleClick" class="place-suggestion">
    <div class="place-image-wrapper">
      <div class="place-image"
        :style="{
          'background-image': `url('${photo.src}')`,
          width: photo.width,
          height: photo.height
        }"
      ></div>
    </div>
    <div class="place-identity">
      <div class="name">{{ place.name }}</div>
      <div class="address">{{ place.formatted_address }}</div>
    </div>
    <div class="place-action">
      <span @click.self="visitPlacePage">
        view <br />
        <font-awesome-icon :icon="['fas', 'braille']" 
          style="font-size: 0.9rem;"
        />
      </span>
    </div>
  </div>
</template>

<script>
import storage from '../helpers/storage';

export default {
  name: 'PlaceSuggestion',
  props: ['place'],
  data() {
    return {
      photo: {
        src: '',
        width: '75px',
        height: '75px'
      }
    }
  },
  methods: {
    visitPlacePage() {
      console.log('visiting page', this.place.name);
    },
    handleClick() {
      this.$emit('click', {
        id: this.place.place_id,
        name: this.place.name,
      });
    }
  },
  created() {
    if (this.place.photos) {
      this.photo.src = `${storage.apiHost}/places/photo?ref=${this.place.photos[0].photo_reference}`;
    } else {
      this.photo = {
        src: this.place.icon,
        width: '25px',
        height: '25px'
      };
    }
  }
}
</script>

<style scoped lang="scss">
.place-suggestion {
  padding: 7px 10px;
  position: relative;
  z-index: 60;
  display: flex;
  background-color: white;
  border-radius: 7px;

  &:hover {
    background-color: #eee;
  }

  .place-image-wrapper {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 75px;
    min-height: 75px;
    max-width: 75px;;
    margin-right: 10px;
  }
  
  .place-image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .place-identity {
    padding: 0 10px;
    box-sizing: border-box;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      text-transform: capitalize;
    }

    .address {
      font-size: 0.75rem;
      color: #777;
    }
  }

  .place-action {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    text-align: center;

    span {
      padding: 5px 10px;
      color: rgba($color: green, $alpha: 0.78);
      font-weight: bold;
      font-size: 0.8rem;
      cursor: pointer;

      &:hover {
        color: rgba($color: green, $alpha: 1);
      }
    }
  }
}
</style>
