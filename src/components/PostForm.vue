<template>
  <form @submit.prevent="createPost" class="text-left mb-5">
    <div class="form-group">
      <DelayedInput
        v-model="location" :delay="550"
        class="form-control" placeholder="location..." autocomplete="off"
        @blur="isTypingLocation = false"
        @focus="isTypingLocation = true"
      />
      <div style="width: 100%; position: relative;">
        <div v-show="isTypingLocation" class="place-suggestions">
          <PlaceSuggestion v-for="place in slicedPlaces" :key="place.place_id" 
            :place="place"
            @click="pickPlace"
          ></PlaceSuggestion>
        </div>
      </div>
    </div>
    <div class="form-group">
      <textarea
        v-model="postContent"
        class="form-control"
        rows="3"
        placeholder="write something new..."
      ></textarea>
    </div>
    <b-form-file
      v-model="selectedPostImage"
      :state="Boolean(selectedPostImage)"
      id="file-input" class="mb-3 d-none"
    ></b-form-file>
    <div id="images-list" class="d-flex flex-wrap justify-content-center mb-5">
      <div id="image-box-1"
        @click="selectImage(1)"
        class="image-box">
        <img width="140" height="140" style="border-radius: 5px;" />
        <div class="image-placeholder">
          <div>
            <font-awesome-icon :icon="['fas', 'plus']"
              style="font-size: 2.25rem; margin-bottom: 5px;"
            />
          </div>
          <div style="font-size: 0.8rem;">add image</div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-2 w-25">Send</button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import DelayedInput from './DelayedInput.vue';
import PlaceSuggestion from './PlaceSuggestion.vue';

export default {
  name: "PostForm",
  components: { DelayedInput, PlaceSuggestion },
  data() {
    return {
      postContent: "",
      selectedPostImage: null,
      selectedImageNum: 1,
      postImages: [],
      location: '',
      selectedPlace: null,
      isTypingLocation: false
    };
  },
  computed: {
    ...mapState(['places']),
    slicedPlaces() {
      return this.places.length > 5
        ? this.places.slice(0, 5)
        : this.places;
    }
  },
  watch: {
    selectedPostImage(value) {
      if (value) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const currentImageBox = document.getElementById(`image-box-${this.selectedImageNum}`);
          const currentImg = currentImageBox.getElementsByTagName('img')[0];
          const currentPlaceholder = currentImageBox.getElementsByTagName('div')[0];
          currentImageBox.classList.add('filled');

          currentImg.setAttribute('src', e.target.result);
          currentPlaceholder.style.display = 'none';

          if (this.selectedImageNum > this.postImages.length) {
            const newImageNum = this.selectedImageNum + 1;
            const newImageBox = this.ELEMENT_IMAGE_BOX.cloneNode(true);

            newImageBox.setAttribute('id', `image-box-${newImageNum}`);
            newImageBox.onclick = () => this.selectImage(newImageNum);
            document.getElementById("images-list").appendChild(newImageBox);

            this.postImages.push(this.selectedPostImage);
          } else {
            this.$store.commit('IMAGE_PREVIEW_IN', currentImg.src);
            this.postImages[this.selectedImageNum-1] = this.selectedPostImage;
          }
          
          this.selectedPostImage = null;
        };

        reader.readAsDataURL(value);
      }
    },
    '$store.state.createdPost'() {
      this.$store.dispatch('fetchPosts')
        .then(() => Promise.resolve(this.resetForm()))
        .catch(console.log);
    },
    location(value) {
      this.$store.dispatch('searchPlaces', value);
    }
  },
  methods: {
    pickPlace(place) {
      this.location = place.name;
      this.selectedPlace = place;
    },
    async createPost() {
      try {
        await this.$store.dispatch('createPost', {
          content: this.postContent,
          images: [ ...this.postImages ]
        });
      } catch (err) {
        console.log(err);
      }
    },
    selectImage(imageNum) {
      document.getElementById(`image-box-${this.selectedImageNum}`)
        .classList.remove('selected');

      this.selectedImageNum = imageNum;
      this.selectedPostImage = null;

      if (imageNum > this.postImages.length) {
        document.getElementById('file-input').click();
      } else {
        const box = document.getElementById(`image-box-${imageNum}`);
        const img = box.getElementsByTagName('img')[0];
        
        this.$store.commit('IMAGE_PREVIEW_IN', img.src);
        this.$store.commit('SET_IMAGE_VIEWER', {
          onChange: () => {
            document.getElementById('file-input').click();
          },
          onDiscard: () => this.discardImage()
        });
      }
    },
    discardImage() {
      const discarded = document.getElementById(`image-box-${this.selectedImageNum}`);
      const imagesList = document.getElementById("images-list");
      const imageBoxes = imagesList.children;

      imagesList.removeChild(discarded);
      this.postImages.splice(this.selectedImageNum-1, 1);

      for (let i = 0; i < imageBoxes.length; i++) {
        const num = Number(imageBoxes[i].id.split('-')[2]);
        
        if (num > this.selectedImageNum) {
          imageBoxes[i].setAttribute('id', `image-box-${num-1}`);
          imageBoxes[i].onclick = () => this.selectImage(num-1);
        }
      }

      this.$store.commit('IMAGE_PREVIEW_OUT');
    },
    resetForm() {
      this.postContent = '';
      this.selectedPostImage = null;
      this.selectedImageNum = 1;
      this.postImages = [];

      const newImageBox = this.ELEMENT_IMAGE_BOX.cloneNode(true);
      newImageBox.setAttribute('id', `image-box-${1}`);
      newImageBox.onclick = () => this.selectImage(1);
      document.getElementById("images-list").innerHTML = '';
      document.getElementById("images-list").appendChild(newImageBox);
    }
  },
  mounted() {
    this.ELEMENT_IMAGE_BOX = document
      .getElementById('image-box-1')
      .cloneNode(true);
    
  },
};
</script>

<style scoped lang="scss">
.place-suggestions {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  border-radius: 0 0 7px 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.image-box {
  position: relative;
  margin: 4px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: transform 0.4s ease-out;

  &.filled {
    &:hover {
      transform: scale(1.2);
      border: 1px solid rgba($color: black, $alpha: 0.2);
      z-index: 50;
    }
  }

  &.selected {
    outline: 3px solid rgba($color: blue, $alpha: 0.5);
  }
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #555;

  &:hover {
    outline: 2px solid #555;
    color: #333;
  }
}
</style>
