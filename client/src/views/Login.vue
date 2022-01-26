<template>
  <div class="container-form">
    <img src="../assets/E-Bon.png" alt="">
    <h1>Welcome to E-BON!</h1>
    <h3 style="margin: 0px 0">Log In to continue</h3>

    <form id="login-form">
      <input type="email" placeholder="Email Address">
      <input type="password" placeholder="Password">
      <button type="submit">Log In</button>
    </form>

    <p>Don't have an account? <a @click.prevent="moveToRegister" href="">Register here!</a></p>
    
  </div>
</template>

<script>
export default {
  name: "Login",
  methods:{
    moveToRegister() {
      this.$router.push('/user/register')
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

#login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 200px;
}
/* #login-form label {
  font-size: 15px;
  align-self: flex-start;
  margin-left: 12%;
} */
#login-form input {
  border-radius: 5px;
  padding: 2px 6px;
  width: 75%;
  height: 35px;
  font-size: 15px;
}

#login-form input:hover{
  border: 1px solid var(--primary);
}

#login-form button {
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