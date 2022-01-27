<template>
    <div class="" data-aos="fade-up" data-aos-delay="100">
        
      <div v-if="getstatstart!==false && getstatstart2===false">
          <form @submit.prevent="getmydays" class="rojust">
            <div class="form-group">
         <label for="country">Country:</label>
         <input list="countryname" id="country" name="country" class="form-control text-muted" v-model="country" placeholder="The country you live in (this will determine your national holidays)">
         <datalist id="countryname">
              <option v-for="x in storecount" :key="x">{{x}}</option>
          </datalist>
           <small class="form-text text-muted">*)Required</small>
            </div>
            <br>
            <div class="form-group">
        <label for="year">Year:</label>
         <input type="number" id="year" name="year" class="form-control text-muted" v-model="year" min="2020" placeholder="2020"><br>
                </div>
                <div class="form-group">
        <label for="pleave">Paid-leaves:</label>
         <input type="number" id="pleave" name="pleave" class="form-control text-muted" v-model="forcednum" min="0" placeholder="Number of paid-leaves you are willing to make for the perfect holiday">
         <small class="form-text text-muted">*)Required</small>
                </div>
                <br>
                <div class="form-group">
        <label class="form-check-label">Weekly day-off(s):</label>
        <br>
        <label class="form-check-label" for="exampleCheck1">MON:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="mon" id="exampleCheck1">
         <label class="form-check-label" for="exampleCheck2">.  TUE:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff" value="tue" id="exampleCheck2">
         <label class="form-check-label" for="exampleCheck2">.  WED:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="wed" id="exampleCheck3">
         <label class="form-check-label" for="exampleCheck2">.  THU:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="thu" id="exampleCheck4">
         <label class="form-check-label" for="exampleCheck2">.  FRI:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="fri" id="exampleCheck5"> 
         <label class="form-check-label" for="exampleCheck2">.  SAT:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="sat" id="exampleCheck6"> 
         <label class="form-check-label" for="exampleCheck2">.  SUN:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="sun" id="exampleCheck7">
                </div><br><br><br>
                <button v-if="getperftime===false" type="submit" class="btn btn-primary">Submit</button>
                 <button v-else type="submit" class="btn btn-primary">Change My Inputs</button>
          </form> 
        </div>
      
      <div v-show="getperftime!==false">
        <div class="container2 column icon-boxes">
        <div v-for="mama in getperftime" :key="mama.dates[0][0]" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <h4 class="title">Holiday Streaks In</h4>
            <div  v-for="anak in mama" :key="anak[0]">
            <p v-for="cucu in anak" :key="cucu">{{cucu}}</p>
            </div>
          </div>
        </div>
        <button @click="start2" v-show="getperftime!==false" type="button" class="btn btn-get-started scrollto">Find me intersesting places to visit!</button>
      </div>
      </div>


       <form @submit.prevent="getmyplaces" class="rojust" v-if="getstatstart2!==false">
            <div class="form-group">
         <label for="place">Place:</label>
         <input type="text" id="place" name="place" class="form-control text-muted" v-model="place" placeholder="City or country you will spend your holidays in"><br>
            </div>
            <div class="form-group">
        <label for="mdist">Max Travel Distance:</label>
         <input type="number" id="mdist" name="mdist" class="form-control text-muted" v-model="mdist" min="0" placeholder="Maximum kilometer outside of the city you are willing to go through (not applicable if you choose country in the above form)"><br>
                </div>
                <button v-if="getperftime!==false&&getperfplace===false" type="submit" class="btn btn-primary">Submit</button>
                 <button v-if="getperftime!==false&&getperfplace!==false" type="submit" class="btn btn-primary">Find Me Another Place</button>
          </form>
          


           <div v-show="getperfplace!==false">
        <div class="container2 column icon-boxes">
        <div v-for="bapak in getperfplace" :key="bapak.xid" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <h4 class="title">{{bapak.name}}</h4>
            <p>{{bapak.wikipedia_extracts.texts}}</p>
            <img :src="bapak.image">
          </div>
        </div>
      </div>
      </div>


      
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      country : "",
      year: 2020,
      forcednum: "",
      nmdayoff: [`sat`, `sun`],
      mdist: "",
      place: ""
    }
  },
  methods: {
    async getmydays(){
      const plod = {
        country: this.country,
        year: this.year,
        forcednum: this.forcednum,
        nmdayoff: this.nmdayoff
      }
      await this.$store.dispatch(`getmydays`, plod)
    },
    start2(){
      this.$store.commit(`CHANGE_START2`, true)
    },
    async getmyplaces(){
      const plod = {
        goingto: this.place,
        maxdistance: this.mdist,
      }
      await this.$store.dispatch(`getmyplaces`, plod)
    },
  },
  computed: {
    getstatstart() {
      return this.$store.state.start
    },
    getstatstart2() {
      return this.$store.state.start2
    },
    getperftime() {
      return this.$store.state.perftime
    },
    getperfplace() {
      return this.$store.state.perfplace
    },
    storecount() {
      return this.$store.state.country
    }
  } 
}
</script>


<style>
.rowjust {
  width: 20vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.container2 {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

</style>