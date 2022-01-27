<template>
  <div id="app">
    <section id="hero" class="d-flex align-items-center">
    <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">
      <button v-show="getstatstart!==false" class="btn btn-dark" @click="reset">go back</button> <br> <br> <br>
      <div v-show="getstatstart === false" class="row justify-content-center">
        <div class="col-xl-7 col-lg-9 text-center">
          <h1>PlanMeMyHoliday</h1>
          <h2>Because time is precious and we all need a break</h2>
        </div>
      </div>
      <div v-show="getstatstart === false" class="text-center">
        <a @click="start" class="btn-get-started scrollto" type="button">Get Started</a>
        

        
      </div>
       <router-view />

      <div class="container2 row icon-boxes" v-if="getstatstart===false">
        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="ri-stack-line"></i></div>
            <h4 class="title">You will know the perfect dates for a long deserved holiday</h4>
            <p class="description">We provide lists of all holiday streaks that are available for you in a year</p>
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
  </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    start(){
      this.$store.commit(`CHANGE_START`, true)
      localStorage.started = `yes`
    },
    reset(){
      this.$store.commit(`CHANGE_START`, false)
      this.$store.commit(`CHANGE_PERFTIME`, false)
      this.$store.commit(`CHANGE_START2`, false)
      this.$store.commit(`CHANGE_PERFPLACE`, false)
      localStorage.clear()
    }
  },
  computed: {
    getstatstart() {
      return this.$store.state.start
    },
    getperftime() {
      return this.$store.state.perftime
    }
  },
  created(){
    if (localStorage.started) {
      this.start()
    }
  }
    
}
</script>


<style>
body {
  font-family: "Open Sans", sans-serif;
  color: #444444;
  overflow: scroll;
}

a {
  color: #2487ce;
  text-decoration: none;
}

a:hover {
  color: #469fdf;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Raleway", sans-serif;
}


#hero {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  position: relative;
}

#hero .container {
  padding-top: 80px;
}

#hero h1 {
  margin: 0;
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;
  color: #45ac7c;
  font-family: "Poppins", sans-serif;
}
#hero h2 {
  color: #5e5e5e;
  margin: 10px 0 0 0;
  font-size: 22px;
}
#hero .btn-get-started {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.5px;
  display: inline-block;
  padding: 14px 50px;
  border-radius: 5px;
  transition: 0.5s;
  margin-top: 30px;
  color: #fff;
  background: #aaafac;
}
#hero .btn-get-started:hover {
  background: #61e4a7;
}
#hero .icon-boxes {
  margin-top: 100px;
}
#hero .icon-box {
  padding: 50px 30px;
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 25px 0 rgba(18, 66, 101, 0.08);
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  z-index: 1;
}
#hero .icon-box .title {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
  color: #474c4a;
  transition: 0.3s;
}

#hero .icon-box .description {
  font-size: 15px;
  line-height: 28px;
  margin-bottom: 0;
}
#hero .icon-box .icon {
  margin-bottom: 20px;
  padding-top: 10px;
  display: inline-block;
  transition: all 0.3s ease-in-out;
  font-size: 36px;
  line-height: 1;
  color: #474c4a;
}

#hero .icon-box .title {
  margin-bottom: 35px;
}

#hero .icon-box:hover {
  transform: scale(1.05);
}
#hero .icon-box:hover .title {
  color: #45ac7c;
}

section {
  padding: 50px 0;
  overflow: hidden;
}

.section-bg {
  background-color: #f8fbfe;
}

.section-title {
  text-align: center;
  padding-bottom: 30px;
}
.section-title h2 {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
  padding-bottom: 0;
  color: #124265;
}
.section-title p {
  margin-bottom: 0;
  font-size: 14px;
  color: #919191;
}

</style>
