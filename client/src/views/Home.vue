<template>
<div class="section p-2 vh-100" style='background-color: #FFDEE9;
        background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
        '>
    <div class="row">
      <div class="col-8 border border-5">
        <div class="row" style='background-color: #FFDEE9;
        background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
        '>
          <h1 class="bg-secondary">Travel Post</h1>
          <div class="card mx-auto m-1 border" style="width: 18rem;" v-for="travelPost in travelPosts" v-bind:key='travelPost.id'>
            <img v-bind:src="travelPost.imageUrl" class="card-img-top p-1" alt="">
            <div class="card-body">
              <h5 class="card-title">{{ travelPost.name }}</h5>
              <p class="card-text">{{ travelPost.summary }}</p>
              <a href="#" class="btn btn-primary" v-on:click.prevent='goDetailPage(travelPost.id)'>Details</a>
            </div>
          </div>
        </div>
        <div class="row bg-dark" v-if="role === 'customer'">
          <h1 class="bg-secondary">Your Booking</h1>
          <div class="card mx-auto m-1" style="width: 18rem;" v-for="booking in bookings" v-bind:key='booking.id'>
            <img v-bind:src="booking.TravelPost.imageUrl" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">{{ booking.TravelPost.name }}</h5>
              <p class="card-text">{{ booking.TravelPost.summary }}</p>
              <a href="#" class="btn btn-primary" v-on:click.prevent='goDetailPage(booking.TravelPost.id)'>Details</a>
            </div>
          </div>
      </div>
      </div>
      <div class="col-4 border border-5" style='background-color: #8BC6EC;
      background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
      '>
        <div id="wrapper">
            <div id="menu">
                <p class="welcome">Welcome, <b></b></p>
                <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
            </div>
            <div id="chatbox">
              <div v-for="chat in chats" v-bind:key="chat.id">
                <p class="text-end" v-if='email === chat.email'>{{ chat.email }}: {{ chat.message }}</p>
                <p class="text-start" v-else>{{ chat.email }}: {{ chat.message }}</p>
              </div>
            </div>
            <form name="message" action="">
                <input name="usermsg" type="text" id="usermsg" v-model="chatData.chatMessage"/>
                <button class="btn btn-primary btn-sm" id="btn-chat" v-on:click.prevent='sendMessage'>Send</button>
            </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      chatData: {
        access_token: localStorage.getItem('access_token'),
        chatMessage: ''
      },
      email: localStorage.getItem('email')
    }
  },
  created () {
    this.$store.dispatch('refresh')
    this.$store.dispatch('fetchTravels')
    this.$store.dispatch('fetchBookings')
    this.$store.dispatch('forRefresh')
  },
  methods: {
    goDetailPage (id) {
      this.$router.push({ path: `/travel/${id}` })
    },
    sendMessage () {
      this.$store.dispatch('sendMessage', this.chatData)
      this.chatData.chatMessage = ''
    }
  },
  computed: {
    role () {
      return this.$store.state.role
    },
    travelPosts () {
      return this.$store.state.travelPosts
    },
    bookings () {
      return this.$store.state.bookings
    },
    chats () {
      return this.$store.state.chats
    }
  }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
  }body {
    margin: 20px auto;
    font-family: "Lato";
    font-weight: 300;
  }form {
    padding: 15px 25px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }form label {
    font-size: 1.5rem;
    font-weight: bold;
  }input {
    font-family: "Lato";
  }a {
    color: #0000ff;
    text-decoration: none;
  }a:hover {
    text-decoration: underline;
  }#wrapper,
  #loginform {
    margin: 0 auto;
    padding-bottom: 25px;
    background: #eee;
    width: 600px;
    max-width: 100%;
    border: 2px solid #212121;
    border-radius: 4px;
  }#loginform {
    padding-top: 18px;
    text-align: center;
  }#loginform p {
    padding: 15px 25px;
    font-size: 1.4rem;
    font-weight: bold;
  }
  #chatbox {
    text-align: left;
    margin: 0 auto;
    margin-bottom: 25px;
    padding: 10px;
    background: #fff;
    height: 300px;
    width: 530px;
    border: 1px solid #a7a7a7;
    overflow: auto;
    border-radius: 4px;
    border-bottom: 4px solid #a7a7a7;
  }
  #usermsg {
    flex: 1;
    border-radius: 4px;
    border: 1px solid #ff9800;
  }
  #name {
    border-radius: 4px;
    border: 1px solid #ff9800;
    padding: 2px 8px;
  }
  #submitmsg,
  #enter{
    background: #ff9800;
    border: 2px solid #e65100;
    color: white;
    padding: 4px 10px;
    font-weight: bold;
    border-radius: 4px;
  }
  .error {
    color: #ff0000;
  }
  #menu {
    padding: 15px 25px;
    display: flex;
  }
  #menu p.welcome {
    flex: 1;
  }
  a#exit {
    color: white;
    background: #c62828;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
  }
  .msgln {
    margin: 0 0 5px 0;
  }
  .msgln span.left-info {
    color: orangered;
  }
  .msgln span.chat-time {
    color: #666;
    font-size: 60%;
    vertical-align: super;
  }
  .msgln b.user-name, .msgln b.user-name-left {
    font-weight: bold;
    background: #546e7a;
    color: white;
    padding: 2px 4px;
    font-size: 90%;
    border-radius: 4px;
    margin: 0 5px 0 0;
  }
  .msgln b.user-name-left {
    background: orangered;
  }
</style>
