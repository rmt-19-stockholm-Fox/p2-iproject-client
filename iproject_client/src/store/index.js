import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    registrationStatus: false,
    username: "",
    chats: [],
    userData: {},
    diaryList: {},
    userList: {},
  },
  mutations: {
    CHANGE_USERDATA(state, payload) {
      state.userData = payload;
    },
    CHANGE_REGISTRATION_STATUS(state, payload) {
      state.registrationStatus = payload;
    },
    CHANGE_DIARY_LIST(state, payload) {
      state.diaryList = payload;
    },
    CHANGE_USERNAME(state, payload) {
      state.username = payload;
    },
    CHANGE_USERLIST(state, payload) {
      state.userList = payload;
    },
    SOCKET_RECEIVEMESSAGEFROMSERVER(state, payload) {
      state.chats = payload;
    },
  },
  actions: {
    socket_connect() {
      console.log("connected", this._vm.$socket);
    },
    socket_disconnect() {
      console.log("disconnected", this._vm.$socket);
    },
    socket_customEventFromServer(_, payload) {
      console.log("customEventFromServer", payload);
    },
    sendCustomEventToServer(_, payload) {
      this._vm.$socket.client.emit("customEventFromClient", payload);
    },
    async setUsername({ commit }, payload) {
      commit("CHANGE_USERNAME", payload);
      await this._vm.$socket.client.emit("setUsername", payload);
    },
    async sendMessage(_, payload) {
      let messsages = "";
      if (payload !== "") {
        messsages += payload;
      }
      await this._vm.$socket.client.emit("sendMessageToServer", {
        user: localStorage.getItem("userName"),
        message: messsages,
      });
      console.log(messsages, ">>>>>>>>>>>");
    },
    async login(context) {
      try {
        const userData = context.state.userData;
        const login = await axios({
          url: "http://localhost:3000/login",
          method: "post",
          data: {
            email: userData.email,
            password: userData.password,
          },
        });
        localStorage.setItem("access_token", login.data.access_token);
        localStorage.setItem("userId", login.data.userId);
        localStorage.setItem("userName", login.data.userName);
      } catch (err) {
        console.log(err.response);
      }
    },
    async registration(context) {
      try {
        const userData = context.state.userData;
        const registerUser = await axios({
          url: "http://localhost:3000/register",
          method: "post",
          data: {
            name: userData.name,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          },
        });
        console.log(registerUser);
        context.commit("CHANGE_REGISTRATION_STATUS", true);
      } catch (err) {
        console.log(err.response.data);
      }
    },
    async getDiary(context) {
      try {
        const diaryList = await axios.get(`http://localhost:3000/diaries`, {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.commit("CHANGE_DIARY_LIST", diaryList.data);
      } catch (err) {
        console.log(err.response);
      }
    },
    async searchUser(context) {
      try {
        const findUsername = context.state.username;
        const findUser = await axios.get(
          `http://localhost:3000/findUser?username=${findUsername}`,
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        console.log("masuk", findUser);
        context.commit("CHANGE_USERLIST", findUser.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
