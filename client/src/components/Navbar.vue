<template>
  <div id="nav" class="">

    <img id="logo" src="../assets/E-Bon.png" alt="Logo">


    <ul id="navbar-options">
      <li class="text-2xl">Home</li>
      <li>My Products</li>
      <li>Order History</li>
    </ul>

    <div class="dropdown">
    <button class="dropbtn">My Profile 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Edit Profile</a>
      <a href="#">Sign Out</a>
    </div>
  </div> 


  </div>

</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style>
#nav {
  color: var(--primary);
  width: 100%;
  height: 100px;
  background-color: rgba(245, 245, 245, 0.918) ;
  box-shadow: 0 0 15px black;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#logo {
  margin-left: 40px;
  border-radius: 15%;
  width: 80px;
  height: 80px;
}
#navbar-options{
  list-style-type: none;
  display: flex;
}

#navbar-options li{
  font-size: 23px;
  margin: 0 20px;
  padding: 36.5px;
}

#navbar-options li:hover{
  background-color: var(--primary);
  color: whitesmoke;
  cursor: pointer;
}



.dropdown {
  font-size: 23px;
  margin-right: 50px;
  overflow: hidden;
}

.dropdown .dropbtn {
  padding: 36.5px 20px 36.5px 12px;
  font-size: 23px;  
  border: none;
  outline: none;
  color: var(--primary);
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover, .dropdown:hover .dropbtn {
  background-color: var(--primary);
  color: whitesmoke;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding:  28px 20px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}


</style>