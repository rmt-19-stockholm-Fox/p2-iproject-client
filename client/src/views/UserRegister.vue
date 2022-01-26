<template>
  <div>
    <div class="container-form">
      <img src="../assets/E-Bon.png" alt="">
    <h1>Register E-BON Account for free!</h1>
    <h3 style="margin: 0px 0">Please fill form</h3>

    <form id="register-form">
      <input type="text" placeholder="Email Address">
      <input type="number" placeholder="Phone Number">
      <input type="password" placeholder="Password">
      <button type="submit">Submit</button>
    </form>

    <p>Already have an Account? <a @click.prevent="moveToLogin" href="">Log in Here!</a></p>
    
  </div>
  </div>
</template>

<script>
export default {
  name: "UserRegister",
  methods:{
    moveToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.container-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: auto;
  margin-top: 5%;
  width: 600px;
  border-radius: 10%;
  background-color: white;
  padding: 30px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.349);
}
.container-form img {
  border-radius: 15%;
  width: 200px;
  height: 200px;
}

#register-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 280px;
}

#register-form input {
  border-radius: 5px;
  padding: 2px 6px;
  width: 75%;
  height: 35px;
  font-size: 15px;
}

#register-form input:hover{
  border: 1px solid var(--primary);
}

#register-form button {
  padding: 10px;
  font-size: 17px;
  background-color: var(--primary);
  border-radius: 20%;
  color: whitesmoke;
  border: none;
  height: 50px;
  width: fit-content;
  margin-top: 10px;
}
</style>