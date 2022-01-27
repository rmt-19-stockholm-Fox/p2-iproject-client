import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import swal from "sweetalert";
import axios from "axios";

Vue.use(Vuex);
let baseUrl = "https://igaragewebapp.herokuapp.com";

export default new Vuex.Store({
  state: {
    products: null,
    oneProduct: null,
    isLoggedIn: false,
    isCustomer: true,
    myProducts: null,
    bookmarks: null,
    categories: null,
    isBookmarkPage: false,
    query: "",
    filterQuery: "",
    messages: [],
    status: "",
  },
  mutations: {
    GETALLPRODUCTS(state, data) {
      state.products = data;
    },
    GETONEPRODUCT(state, data) {
      state.oneProduct = data;
    },
    MYPRODUCT(state, data) {
      state.myProducts = data;
    },
    GETALLBOOKMARK(state, data) {
      state.bookmarks = data;
    },
    CATEGORIES(state, data) {
      state.categories = data;
    },
    QUERY(state, url) {
      state.query = url;
    },
    FILTERQUERY(state, url) {
      state.filterQuery = url;
    },
    LOGIN(state, data) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      swal({
        title: `Welcome back ${data.username}`,
        icon: "success",
        button: "Ok",
      });
      state.isLoggedIn = true;
      if (data.role !== "Customer") {
        state.isCustomer = false;
      }
    },
    LOGOUT(state) {
      localStorage.clear();
      state.isLoggedIn = false;
      state.isCustomer = true;
      swal({
        title: "Logout success",
        icon: "success",
        button: "Ok",
      });
      router.push({ name: "Home" }).catch(() => {});
    },
    ISLOGGEDIN(state) {
      state.isLoggedIn = true;
    },
    NOTCUSTOMER(state) {
      state.isCustomer = false;
    },
    ISBOOKMARKPAGE(state) {
      state.isBookmarkPage = true;
    },
    NOTBOOKMARKPAGE(state) {
      state.isBookmarkPage = false;
    },
    CLEARALL(state) {
      state.oneProduct = null;
      state.myProducts = null;
    },
    SOCKET_GOTMESSAGE(state, payload) {
      state.messages = payload;
    },
    SOCKET_USERSTATUS(state, payload) {
      state.status = payload.status;
    },
  },
  actions: {
    getAllProducts(context) {
      let query = context.state.query;

      if (context.state.filterQuery) {
        query += "&" + context.state.filterQuery;
      }

      console.log(query);

      axios({
        url: `${baseUrl}/?${query}`,
        method: "get",
      })
        .then((result) => {
          context.commit("GETALLPRODUCTS", result.data.rows);
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    getOneProduct(context, id) {
      axios({
        url: `${baseUrl}/${id}`,
        method: "get",
      })
        .then((result) => {
          context.commit("GETONEPRODUCT", result.data);
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    login(context, input) {
      axios({
        url: `${baseUrl}/user/login`,
        method: "post",
        data: input,
      })
        .then((result) => {
          context.commit("LOGIN", result.data);
          this._vm.$socket.client.emit("user", result);
          router.push({ name: "Home" }).catch(() => {});
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    registerCust(context, input) {
      axios({
        url: `${baseUrl}/user/register/customer`,
        method: "post",
        data: input,
      })
        .then(() => {
          router.push({ name: "Login" });
        })
        .catch((err) => {
          if (Array.isArray(err.response.data.message)) {
            let errMsgs = "";
            err.response.data.message.forEach((element) => {
              errMsgs += element + "\n";
            });
            swal(errMsgs);
          } else {
            swal(err.response.data.message);
          }
        });
    },
    registerSeller(context, input) {
      axios({
        url: `${baseUrl}/user/register/seller`,
        method: "post",
        data: input,
      })
        .then(() => {
          router.push({ name: "Login" });
        })
        .catch((err) => {
          if (Array.isArray(err.response.data.message)) {
            let errMsgs = "";
            err.response.data.message.forEach((element) => {
              errMsgs += element + "\n";
            });
            swal(errMsgs);
          } else {
            swal(err.response.data.message);
          }
        });
    },
    myProduct(context) {
      axios({
        url: `${baseUrl}/myProduct`,
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          router.push({ name: "MyProduct" }).catch(() => {});
          context.commit("MYPRODUCT", result.data);
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    addBookmark(context, id) {
      const ProductId = id;

      axios({
        url: `${baseUrl}/bookmark`,
        method: "post",
        data: { ProductId },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          swal({
            title: "Added to your bookmark",
            icon: "success",
            button: "Ok",
          });
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    getAllBookmark(context) {
      axios({
        url: `${baseUrl}/bookmark`,
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit("GETALLBOOKMARK", result.data);
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    getAllCategories(context) {
      axios({
        url: `${baseUrl}/categories`,
        method: "get",
      })
        .then((result) => {
          context.commit("CATEGORIES", result.data);
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    addProduct(context, input) {
      const name = input.name;
      const description = input.description;
      const price = input.price;
      const quantity = input.quantity;
      const summary = input.summary;
      const ProductImage = [];
      const CategoriesId = input.CategoriesId;
      ProductImage.push(input.files[0], input.files[1], input.files[2]);

      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("price", price);
      data.append("quantity", quantity);
      data.append("summary", summary);
      data.append("ProductImage", ProductImage[0]);
      data.append("ProductImage", ProductImage[1]);
      data.append("ProductImage", ProductImage[2]);
      data.append("CategoriesId", CategoriesId);

      axios({
        url: `${baseUrl}/`,
        method: "post",
        headers: {
          access_token: localStorage.access_token,
        },
        data: data,
        contentType: false,
        processData: false,
      })
        .then(() => {
          context.dispatch("getAllProducts");
          router.push({ name: "MyProduct" }).catch(() => {});
          swal({
            title: "Product Added",
            icon: "success",
            button: "Ok",
          });
        })
        .catch((err) => {
          if (Array.isArray(err.response.data.message)) {
            let errMsgs = "";
            err.response.data.message.forEach((element) => {
              errMsgs += element + "\n";
            });
            swal(errMsgs);
          } else {
            swal(err.response.data.message);
          }
        });
    },
    editProduct(context, input) {
      const name = input.name;
      const description = input.description;
      const price = input.price;
      const quantity = input.quantity;
      const summary = input.summary;
      const ProductImage = [];
      const image1 = input.image1;
      const image2 = input.image2;
      const image3 = input.image3;
      const CategoriesId = input.CategoriesId;
      ProductImage.push(input.files[0], input.files[1], input.files[2]);

      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("price", price);
      data.append("quantity", quantity);
      data.append("summary", summary);
      data.append("image1", image1);
      data.append("image2", image2);
      data.append("image3", image3);
      data.append("ProductImage", ProductImage[0]);
      data.append("ProductImage", ProductImage[1]);
      data.append("ProductImage", ProductImage[2]);
      data.append("CategoriesId", CategoriesId);

      axios({
        url: `${baseUrl}/${input.id}`,
        method: "put",
        headers: {
          access_token: localStorage.access_token,
        },
        data: data,
        contentType: false,
        processData: false,
      })
        .then((result) => {
          context.dispatch("getAllProducts");
          router.push({ name: "MyProduct" }).catch(() => {});
          swal(result.data.message);
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    deleteProduct(context, id) {
      axios({
        url: `${baseUrl}/${id}`,
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          context.dispatch("myProduct");
          swal({
            title: "Delete Success",
            icon: "success",
            button: "Ok",
          });
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    deleteBookmark(context, id) {
      axios({
        url: `${baseUrl}/bookmark/${id}`,
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          context.dispatch("getAllBookmark");
          swal({
            title: "Delete Success",
            icon: "success",
            button: "Ok",
          });
        })
        .catch((err) => {
          swal(err.response.data.message);
        });
    },
    socket_connect() {
      console.log("connected", this._vm.$socket);
    },
    socket_disconnect() {
      console.log("disconnected", this._vm.$socket);
    },
    socket_customEventServer(context, payload) {
      console.log("customEventServer", payload);
    },
    customEventServer(context, payload) {
      this._vm.$socket.client.emit("customEventClient", payload);
    },
    sendChatMsg(context, payload) {
      this._vm.$socket.client.emit("sendingChatMsg", {
        username: localStorage.getItem("username"),
        message: payload.trim(),
      });
    },
    socket_userStatus(context, payload) {
      context.commit("SOCKET_USERSTATUS", payload);
    },
    socket_gotMessage(context, payload) {
      context.commit("SOCKET_GOTMESSAGE", payload);
    },
  },
  modules: {},
});
