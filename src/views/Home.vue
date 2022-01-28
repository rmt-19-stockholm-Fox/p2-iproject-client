<template>
    <div class="" data-aos="fade-up" data-aos-delay="100">
        
      <div v-if="getstatstart!==false && getstatstart2===false">
          <form @submit.prevent="getmydays" class="rojust">
            <div class="form-group">
         <label for="country">Country:</label>
         <input list="countryname" id="country" name="country" class="form-control text-muted" v-model="country" placeholder="The country you live in (this will determine your national holidays).">
         <datalist id="countryname">
              <option v-for="x in storecount" :key="x">{{x}}</option>
          </datalist>
           <small class="form-text text-muted">*)Required</small>
            </div>
            <br>
            <div class="form-group">
        <label for="year">Year:</label>
         <input type="number" id="year" name="year" class="form-control text-muted" v-model="year" min="2020"><br>
                </div>
                <div class="form-group">
        <label for="pleave">Paid-leaves:</label>
         <input type="number" id="pleave" name="pleave" class="form-control text-muted" v-model="forcednum" min="0" placeholder="Number of paid-leaves you are willing to make.">
         <small class="form-text text-muted">*)Must only contain numbers, default: 0</small>
                </div>
                <br>
                <div class="form-group">
        <label class="form-check-label">Weekly day-off(s):</label>
        <br>
        <label class="form-check-label" for="exampleCheck1">MON:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="Mon" id="exampleCheck1">
         <label class="form-check-label" for="exampleCheck2">.  TUE:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff" value="Tue" id="exampleCheck2">
         <label class="form-check-label" for="exampleCheck3">.  WED:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="Wed" id="exampleCheck3">
         <label class="form-check-label" for="exampleCheck4">.  THU:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="Thu" id="exampleCheck4">
         <label class="form-check-label" for="exampleCheck5">.  FRI:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="Fri" id="exampleCheck5"> 
         <label class="form-check-label" for="exampleCheck6">.  SAT:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="Sat" id="exampleCheck6"> 
         <label class="form-check-label" for="exampleCheck7">.  SUN:</label>
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="Sun" id="exampleCheck7">
                </div><br><br><br>
                <button v-if="getperftime===false" type="submit" class="btn btn-primary">Submit</button>
                 <button v-else type="submit" class="btn btn-primary">Change My Inputs</button><br><br><br><br><br>
          </form> 
        </div>
      
      <div v-if="getperftime!==false&&getstatstart2===false">
      <h1 v-if="getperftime!==false&&getstatstart2===false">Here are your possible streaks:</h1>
        <div class="container2 column icon-boxes">
        <div v-for="mama in getperftime" :key="mama.dates[0]" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <div  v-for="anak in mama" :key="anak[0]">
            <p v-for="cucu in anak" :key="cucu">{{cucu}}</p>
             <button @click="start2(anak)" v-show="getperftime!==false" type="button" class="btn btn-get-started scrollto">Go to next step with these dates</button>
             </div>
          </div>
        </div>
      </div>
      </div>

      <div v-if="getstatstart2===true">
        <h1>HERE'S YOUR HOLIDAY</h1>
        <div class="container2 column icon-boxes">

        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <div>
             <h4 class="title">Your Dates:</h4>
            <p v-for="er in this.selecteddates" :key="er">{{er}}</p>
            </div>
          </div>
        </div>

        <div v-if="getstatstart3!==false" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <h4 class="title">Place you'd like to visit:</h4>
            <p>{{selectedplace.wikipedia_extracts.text}}</p>
            <a :href="selectedplace.wikipedia">Read more on Wikipedia</a>
          </div>
        </div>

        <div v-if="done===true" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <img :src="selectedhotel.optimizedThumbUrls.srpDesktop">
            <h4 class="title">{{selectedhotel.name}}</h4>
            <p>{{selectedhotel.address.streetAddress}}</p>
            <p>Star: {{selectedhotel.starRating}}</p>
            <p>Guest score: {{selectedhotel.guestReviews.rating}}</p>
          </div>
        </div>

      </div>
      </div>
                <br>
                 <br>
                  <br>


       <form @submit.prevent="getmyplaces" class="rojust" v-if="getstatstart2!==false && getstatstart3===false">
            <div class="form-group">
         <label for="place">City: </label>
         <input type="text" id="place" name="place" class="form-control text-muted" v-model="place" placeholder="Where you would like to spend your holidays in.">
          <small class="form-text text-muted">*)Required</small><br>
            </div>
            <div class="form-group">
        <label for="mdist">Max Travel Distance:</label>
         <input type="number" id="mdist" name="mdist" class="form-control text-muted" v-model="mdist" min="0" placeholder="from outside your chosen city (in Kilometers).">
         <small class="form-text text-muted">*)Must only contain numbers, default: 0</small><br><br>

                </div>
                <button v-if="getperftime!==false&&getperfplace===false" type="submit" class="btn btn-primary">Submit</button>
                 <button v-if="getperftime!==false&&getperfplace!==false" type="submit" class="btn btn-primary">Find Me Another Place</button>
          </form>
          
<br><br>

           <div v-if="getperfplace!==false&&getstatstart3===false">
        <div class="container2 column icon-boxes">
        <div v-for="ayo in getperfplace" :key="ayo.xid" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <h4 class="title">{{ayo.name}}</h4>
            <p>{{ayo.wikipedia_extracts.text}}</p>
            <a :href="ayo.wikipedia">Read more on Wikipedia</a>
             <button @click="start3(ayo)" type="button" class="btn btn-get-started scrollto">Find hotels near this place</button>
          </div>
        </div>
      </div>
      </div>

      <form @submit.prevent="getmyhotel" class="rojust" v-if="getstatstart3===true&&done===false">
            <div class="form-group">
        <label for="star">Hotel star rating:</label>
         <input type="number" id="star" name="star" class="form-control text-muted" v-model="star" placeholder="1 to 6, if empty this will be defaulted to any stars.">
          <small class="form-text text-muted">*)Must only contain numbers, default: 3</small><br><br>
         <label for="mgrating">Minimum guest ratings:</label>
         <input type="number" id="mgrating" name="mgrating" class="form-control text-muted" v-model="mgrating" placeholder="1 to 10, also accepts up to one decimal">
          <small class="form-text text-muted">*)Must only contain numbers, default: 5</small><br><br>
         <label for="maxprice">Maximum price:</label>
         <input type="number" id="maxprice" name="maxprice" class="form-control text-muted" v-model="maxprice" placeholder="for a room for 1 person. (in USD)"> 
         <small class="form-text text-muted">*)Must only contain numbers, default: 500</small><br><br>

                </div>
                <button v-if="getstatstart3!==false&&getperfhotel===false" type="submit" class="btn btn-primary">Submit</button>
                 <button v-if="getstatstart3!==false&&getperfhotel!==false" type="submit" class="btn btn-primary">Change My Inputs</button>
          </form>

          <div v-if="perfhotel!==false&&done===false">
            <br>
            <br>
            <br>
            <br>
            <h1>Select your prefered hotel to finalize your choises</h1>
        <div class="container2 column icon-boxes">
        <div v-for="kemon in perfhotel" :key="kemon.id" class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <img :src="kemon.optimizedThumbUrls.srpDesktop">
            <h4 class="title">{{kemon.name}}</h4>
            <p>{{kemon.address.streetAddress}}</p>
            <p>Star: {{kemon.starRating}}</p>
            <p>Guest score: {{kemon.guestReviews.rating}}</p>
             <button @click="start4(kemon)" type="button" class="btn btn-get-started scrollto">Select</button>
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
      nmdayoff: [`Sat`, `Sun`],
      mdist: "",
      place: "",
      maxprice: "",
      mgrating: "",
      star: "",
      last: {}
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
    start2(anak){
      this.$store.commit(`CHANGE_SELECTEDD`, anak)
      this.$store.commit(`CHANGE_START2`, true)
      localStorage.dates = anak
    },
    start3(ayo){
      this.$store.commit(`CHANGE_SELECTEDP`, ayo)
      this.$store.commit(`CHANGE_START3`, true)
      localStorage.placesjs = ayo
      if (ayo.address.pedestrian) {
       localStorage.places = ayo.address.pedestrian
       this.$store.commit(`CHANGE_ADD`, ayo.address.pedestrian) 
      }else if (ayo.address.city) {
        localStorage.places = ayo.address.city
       this.$store.commit(`CHANGE_ADD`, ayo.address.city) 
      }else {
        localStorage.places = ayo.address.state
       this.$store.commit(`CHANGE_ADD`, ayo.address.state) 
      }
    },
    start4(nyem){
       this.$store.commit(`CHANGE_SELECTEDH`, nyem)
      this.$store.commit(`CHANGE_DONE`, true)
    },
    async getmyplaces(){
      const plod = {
        goingto: this.place,
        maxdistance: this.mdist,
      }
      await this.$store.dispatch(`getmyplaces`, plod)
    },
    async getmyhotel(){
      const plod = {
        maxprice:this.maxprice,
        mgrating:this.mgrating,
        star:this.star,
        strname:this.selectadd
      }
      await this.$store.dispatch(`getmyhotel`, plod)
    },
  },
  computed: {
    getstatstart() {
      return this.$store.state.start
    },
    getstatstart2() {
      return this.$store.state.start2
    },
    getstatstart3() {
      return this.$store.state.start3
    },
    getperftime() {
      return this.$store.state.perftime
    },
    getperfplace() {
      return this.$store.state.perfplace
    },
    getperfhotel() {
      return this.$store.state.perfhotel
    },
    storecount() {
      return this.$store.state.country
    },
    selecteddates(){
      return this.$store.state.selecteddates
    },
    selectedplace(){
      return this.$store.state.selectedplace
    },
    selectedhotel(){
      return this.$store.state.selectedhotel
    },
    selectadd(){
      return this.$store.state.selectadd
    },
    perfhotel(){
return this.$store.state.perfhotel
    },
    done(){
return this.$store.state.done
    },
  } 
}
</script>


<style>

.container2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

</style>