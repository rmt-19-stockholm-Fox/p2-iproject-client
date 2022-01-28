import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: `http://localhost:3000/`,
    start: false,
    start2: false,
    start3: false,
    perftime: false,
    perfplace: false,
    perfhotel: false,
    done: false,
    country: [
      `Afghanistan`,
      `Albania`,
      `Algeria`,
      `Argentina`,
      `Australia`,
      `Austria`,
      `Bangladesh`,
      `Belgium`,
      `Bhutan`,
      `Bolivia`,
      `Botswana`,
      `Brazil`,
      `Brunei`,
      `Bulgaria`,
      `Cambodia`,
      `Canada`,
      `Chile`,
      `China`,
      `Colombia`,
      `Congo`,
      `Croatia`,
      `Cuba`,
      `Czech Republic`,
      `Denmark`,
      `Dominica`,
      `Ecuador`,
      `Egypt`,
      `Estonia`,
      `Ethiopia`,
      `Finland`,
      `France`,
      `Gabon`,
      `Georgia`,
      `Germany`,
      `Gibraltar`,
      `Greece`,
      `Greenland`,
      `Guatemala`,
      `Haiti`,
      `Hong Kong`,
      `Hungary`,
      `Iceland`,
      `India`,
      `Indonesia`,
      `Iran`,
      `Iraq`,
      `Ireland`,
      `Israel`,
      `Italy`,
      `Jamaica`,
      `Japan`,
      `Kazakhstan`,
      `Kenya`,
      `Kuwait`,
      `Kyrgyzstan`,
      `Laos`,
      `Latvia`,
      `Lebanon`,
      `Libya`,
      `Lithuania`,
      `Madagascar`,
      `Malaysia`,
      `Maldives`,
      `Mexico`,
      `Mongolia`,
      `Montenegro`,
      `Morocco`,
      `Myanmar`,
      `Namibia`,
      `Nepal`,
      `Netherlands`,
      `New Zealand`,
      `Nigeria`,
      `North Korea`,
      `North Macedonia`,
      `Norway`,
      `Pakistan`,
      `Panama`,
      `Paraguay`,
      `Peru`,
      `Philippines`,
      `Poland`,
      `Portugal`,
      `Puerto Rico`,
      `Qatar`,
      `Romania`,
      `Russia`,
      `Samoa`,
      `Saudi Arabia`,
      `Serbia`,
      `Singapore`,
      `Slovakia`,
      `Somalia`,
      `South Africa`,
      `South Korea`,
      `Spain`,
      `Sri Lanka`,
      `Sweden`,
      `Switzerland`,
      `Syria`,
      `Taiwan`,
      `Tanzania`,
      `Thailand`,
      `Turkey`,
      `Uganda`,
      `Ukraine`,
      `United Kingdom`,
      `United States`,
      `Uruguay`,
      `Uzbekistan`,
      `Venezuela`,
      `Vietnam`,
      `Yemen`,
      `Zambia`,
      `Zimbabwe`,
    ],
    selecteddates: [],
    selectedplace: {},
    selectadd: "",
    selectedhotel: {},
  },
  mutations: {
    CHANGE_START(state, plod) {
      state.start = plod;
    },
    CHANGE_START2(state, plod) {
      state.start2 = plod;
    },
    CHANGE_START3(state, plod) {
      state.start3 = plod;
    },
    CHANGE_DONE(state, plod) {
      state.done = plod;
    },
    CHANGE_PERFTIME(state, plod) {
      state.perftime = plod;
    },
    CHANGE_PERFPLACE(state, plod) {
      state.perfplace = plod;
    },
    CHANGE_PERFHOTEL(state, plod) {
      state.perfhotel = plod;
    },
    CHANGE_SELECTEDD(state, plod) {
      state.selecteddates = plod;
    },
    CHANGE_SELECTEDP(state, plod) {
      if (plod == {}) {
        state.selectedplace = plod;
      } else {
        state.selectedplace = plod;
      }
    },
    CHANGE_SELECTEDH(state, plod) {
      if (plod == {}) {
        state.selectedhotel = plod;
      } else {
        state.selectedhotel = plod;
      }
    },
    CHANGE_ADD(state, plod) {
      state.selectadd = plod;
    },
  },
  actions: {
    async getmydays(context, plod) {
      try {
        console.log(plod);
        const resu = await axios.post(`${this.state.server}findtime`, plod);
        context.commit(`CHANGE_PERFTIME`, resu.data.output);
      } catch (error) {
        Vue.swal({
          icon: "error",
          title: "Something went wrong!",
          text: "Please make sure you have filled the forms correctly.",
        });
      }
    },
    async getmyplaces(context, plod) {
      try {
        console.log(plod);
        const resu = await axios.post(`${this.state.server}findplace`, plod);
        console.log(resu.data);
        context.commit(`CHANGE_PERFPLACE`, resu.data);
      } catch (error) {
        Vue.swal({
          icon: "error",
          title: "Something went wrong!",
          text: "Make sure you have filled the forms correctly.",
        });
      }
    },
    async getmyhotel(context, plod) {
      try {
        console.log(plod);
        const resu = await axios.post(`${this.state.server}findhotel`, plod);
        console.log(resu.data);
        context.commit(`CHANGE_PERFHOTEL`, resu.data);
      } catch (error) {
        Vue.swal({
          icon: "error",
          title: "Something went wrong!",
          text: "Make sure you have filled the forms correctly.",
        });
      }
    },
  },
  modules: {},
});
