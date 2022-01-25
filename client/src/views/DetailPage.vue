<template>
  <div class="container p-2">
      <div class="row border">
        <div class="col-6">
            <div class="row p-2 border">
                <img :src="detailProduct.imageUrl" alt="">
            </div>
            <div class="row p-2 border">
                <ul class="list-group">
                  <li class="list-group-item">Price: {{ rupiahFormater(totalPrice) }}</li>
                  <li class="list-group-item">Description: {{ detailProduct.summary }}</li>
                  <li class="list-group-item">Date: {{ detailProduct.date }}</li>
                  <li class="list-group-item"><button type="button" class="btn btn-primary col-12" v-on:click="bookNow">Book Now</button></li>
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
                    <td>{{ event.schedule }}</td>
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
              <button v-if='isAdd === false' v-on:click="addClick" variant="primary" class="btn btn-primary col-12">
                Add Event <b-icon icon="plus" aria-hidden="true"></b-icon>
              </button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {
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
    this.$store.dispatch('fetchDetailTravel', this.$route.params.id)
  },
  computed: {
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
    }
  },
  methods: {
    bookNow () {
      this.$store.dispatch('bookNow', this.totalPrice)
        .then(data => {
          window.snap.pay(data.token)
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
    }
  }
}
</script>

<style>

</style>
