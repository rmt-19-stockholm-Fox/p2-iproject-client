<template>
    <div class="" data-aos="fade-up" data-aos-delay="100">
        <div>
          <form @submit.prevent="getmydays" class="rojust">
            <div class="form-group">
         <label for="country">Country:</label>
         <input type="text" id="country" name="country" class="form-control text-muted" :value="country" placeholder="The country you live in (this will determine your national holidays)"><br>
            </div>
            <div class="form-group">
        <label for="year">Year:</label>
         <input type="number" id="year" name="year" class="form-control text-muted" :value="year" min="2020" placeholder="2020"><br>
                </div>
                <div class="form-group">
        <label for="pleave">Paid-leaves:</label>
         <input type="number" id="pleave" name="pleave" class="form-control text-muted" :value="forcednum" min="0" placeholder="Number of paid-leaves you are willing to make for the perfect holiday"><br>
                </div>
                <div class="form-group">
        <label class="form-check-label">Weelly Day-off(s):</label>
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
         <input type="checkbox" class="form-check-input" v-model="nmdayoff"  value="sun" id="exampleCheck7"><br>
                </div>
                <button type="submit" class="btn btn-get-started scrollto">Submit</button>
          </form> 
        </div>


      <div class="container2 row icon-boxes">
        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <h4 class="title">You will know the perfect dates for a long deserved holiday</h4>
            <p class="description">We provide lists of holiday streaks that are possble for you in a year</p>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="300">
          <div class="icon-box">
            <div class="icon"><i class="ri-palette-line"></i></div>
            <h4 class="title">Know interesting landmarks to visit in your chosen place to spend a holiday</h4>
            <p class="description">We provide a random sortsment of interesting landmarks in the place you'd like to spend your holiday in</p>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="400">
          <div class="icon-box">
            <div class="icon"><i class="ri-command-line"></i></div>
            <h4 class="title">And know the perfect place to stay in comfortably with your prefered price</h4>
            <p class="description">We provide lists of Hotels nearby the place you would love to visit</p>
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
      year: "",
      forcednum: "",
      nmdayoff: [`sat`, `sun`]
    }
  },
  methods: {
    getmydays(){
      const plod = {
        country: this.country,
        year: this.year,
        forcednum: this.forcednum,
        nmdayoff: this.nmdayoff
      }
      this.$store.dispatch(`getmydays`, plod)
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
}

.container2 {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

</style>