import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import '../helpers/axios';
import storage from '../helpers/storage';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    createdPost: null,
    isPreviewingImage: false,
    previewedImage: '',
    imageViewer: {
      onChange: null,
      onDiscard: null
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user != null;
    }
  },
  mutations: {
    LOG_IN(state, user) {
      state.user = user;
    },
    LOG_OUT(state) {
      state.user = null;
    },
    SET_PROFILE_PICTURE(state, pictureUrl) {
      state.user = {
        ...state.user,
        pictureUrl
      }
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_CREATED_POST(state, post) {
      state.createdPost = post;
    },
    IMAGE_PREVIEW_IN(state, imageSrc) {
      state.isPreviewingImage = true;
      state.previewedImage = imageSrc;
    },
    IMAGE_PREVIEW_OUT(state) {
      state.isPreviewingImage = false;
    },
    SET_IMAGE_VIEWER(state, listeners) {
      state.imageViewer = listeners;
    }
  },
  actions: {
    async loginGoogle(context, token) {
      try {
        const { data } = await axios.post('/login-google', {
          token
        });

        storage.accessToken.set(data.access_token);
        context.dispatch('fetchUser', data.access_token);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUser(context, token) {
      try {
        const { data } = await axios.post('/user', null, {
          headers: { access_token: token }
        });

        context.commit('LOG_IN', data);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchDefaultProfilePicture(context) {
      try {
        const url = await getDownloadURL(ref(getStorage(), 'avatar-1.jpg'));

        if (url) {
          context.commit('SET_PROFILE_PICTURE', url);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async createPost(context, postContent) {
      try {
        const { data } = await axios.post('/posts', {
          content: postContent
        }, {
          headers: { access_token: storage.accessToken.value() }
        });

        context.commit('SET_CREATED_POST', data);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchPosts(context) {
      try {
        const { data } = await axios.get('/posts', {
          headers: { access_token: storage.accessToken.value() }
        });

        context.commit('SET_POSTS', data);
      } catch (err) {
        console.log(err);
      }
    }
  },
  modules: {
  }
})
