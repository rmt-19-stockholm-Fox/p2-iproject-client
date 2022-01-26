<template>
  <div id="shop-register">

    <h2><i class="fas fa-store" style="font-size:35px"></i>  Let's set up your shop!</h2>
    <form action="" id="form-set-up-shop">
      <input type="text" placeholder="Shop Name">
      <input type="text" placeholder="Address">
      <input type="text" placeholder="Shop Image/Logo Url">
      <input type="text" placeholder="Motto">
      <input type="text" placeholder="Category">
      <div style="display:flex; width: 40%; justify-content: space-between;">
        <button type="submit" class="submit-shop">Submit</button>
        <button type="submit" class="setuplater-shop">Set up later</button>
      </div>
      
    </form>
    
  </div>
</template>

<script>
export default {
  name: "ShopRegister"
}
</script>

<style>
#shop-register{
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
#form-set-up-shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 400px;
  width: 100%;
}
#form-set-up-shop input {
  border-radius: 5px;
  padding: 2px 8px;
  width: 75%;
  height: 35px;
  font-size: 15px;
}

#form-set-up-shop input:hover{
  border: 1px solid var(--primary);
}

#form-set-up-shop button {
  padding: 10px;
  font-size: 17px;
  border-radius: 20%;
  color: whitesmoke;
  border: none;
  height: 50px;
  width: fit-content;
  margin-top: 10px;
}

.submit-shop {
  background-color: green;
}


.submit-shop:hover {
  background-color: rgb(0, 163, 0);
}

.setuplater-shop {
  background-color: red;
}

.setuplater-shop:hover {
  background-color: rgb(255, 60, 60);
}

</style>