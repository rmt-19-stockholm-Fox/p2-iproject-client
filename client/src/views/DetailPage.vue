<template>
<div class="wraper vh-100" style='background-color: #FFDEE9;
background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
'>
  <div class="container p-2">
    <h1>{{ detailProduct.name }}</h1>
      <div class="row border">
        <div class="col-6 border">
            <div class="row p-2 border">
                <img :src="detailProduct.imageUrl" alt="">
            </div>
            <div class="row p-2">
                <ul class="list-group">
                  <li class="list-group-item">Total Price: {{ rupiahFormater(totalPrice) }}</li>
                  <li class="list-group-item">Description: {{ detailProduct.summary }}</li>
                  <li class="list-group-item">Date: {{ dateFormating(detailProduct.date) }}</li>
                  <li class="list-group-item"><button v-if="!isBooked && role === 'customer'" type="button" class="btn btn-primary col-12" v-on:click="bookNow">Book Now</button></li>
                  <li class="list-group-item"><button v-if="isBooked && role === 'customer'" type="button" class="btn btn-primary col-12" disabled>Already Booked</button></li>
                </ul>
            </div>
        </div>
        <div class="col-6">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Destination</th>
                    <th scope="col">Image</th>
                    <th scope="col">Schedule</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='event in detailProduct.Events' v-bind:key='event.id'>
                    <th scope="row">{{ event.destination }}</th>
                    <td><img class="flex" :src="event.imageUrl" alt="" style="width:150px;"/></td>
                    <td>{{ dateFormating(event.schedule) }}</td>
                    <td>{{ rupiahFormater(event.price) }}</td>
                    </tr>
                </tbody>
            </table>
                    <form class='row p-2' v-if='isAdd === true' v-on:submit.prevent='submitEvents'>
                      <input type='text' class='p-2 m-1' placeholder='Destination' v-model='formAddEvent.destination'/>
                      <input type='text' class='p-2 m-1' placeholder='ImageUrl' v-model='formAddEvent.imageUrl'/>
                      <input type='date' class='p-2 m-1' placeholder='Schedule' v-model='formAddEvent.schedule'/>
                      <input type='number' class='p-2 m-1' placeholder='Price' v-model='formAddEvent.price'/>
                      <button v-if='isAdd === true' v-on:click="addClick" variant="primary" class="btn btn-primary col-12">
                        Submit
                      </button>
                    </form>
              <button v-if="isAdd === false  && role === 'admin'" v-on:click="addClick" variant="primary" class="btn btn-primary col-12 mb-3">
                Add Event <b-icon icon="plus" aria-hidden="true"></b-icon>
              </button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {
      isBooked: false,
      isAdd: false,
      formAddEvent: {
        destination: '',
        imageUrl: '',
        schedule: '',
        price: ''
      }
    }
  },
  created () {
    this.$store.dispatch('refresh')
    this.checkBooked()
    this.$store.dispatch('fetchBookings')
    this.$store.dispatch('fetchDetailTravel', this.$route.params.id)
  },
  computed: {
    role () {
      return this.$store.state.role
    },
    detailProduct () {
      return this.$store.state.detailTravel
    },
    totalPrice () {
      let totalPrice = 0
      if (this.detailProduct.Events !== undefined) {
        this.detailProduct.Events.forEach(e => {
          totalPrice = totalPrice + e.price
        })
      }
      return totalPrice
    },
    bookings () {
      return this.$store.state.bookings
    }
  },
  methods: {
    bookNow () {
      this.$store.dispatch('bookNow', this.totalPrice)
        .then(data => {
          window.snap.pay(data.token)
          this.$store.dispatch('bookSuccess', this.$route.params.id)
        })
    },
    rupiahFormater (price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    },
    addClick () {
      this.isAdd = true
    },
    submitEvents () {
      const payload = { formAddEvent: this.formAddEvent, postId: this.$route.params.id }
      this.$store.dispatch('submitEvents', payload)
        .then(data => {
          this.isAdd = false
          this.formAddEvent.destination = ''
          this.formAddEvent.imageUrl = ''
          this.formAddEvent.schedule = ''
          this.formAddEvent.price = ''
          this.$store.dispatch('fetchDetailTravel', this.$route.params.id)
        })
    },
    dateFormating (input) {
      const date = new Date(input)
      const day = (date.getDate())
      const month = (date.getMonth())
      const year = (date.getFullYear())
      return `${day}-${month + 1}-${year}`
    },
    checkBooked () {
      if (this.bookings === undefined) {
        this.bookings.forEach(e => {
          if (e.postId === +this.$route.params.id) this.isBooked = true
        })
      }
    }
  }
}
</script>

<style>

</style>
