<template>
  <div id="add-product-form">
    <h2><i class="far fa-plus-square" style="font-size:35px;"></i>   Fill the form to add your Products!</h2>
    <form action="" id="form-add-product">
      <input type="text" placeholder="Product Name">
      <input type="text" placeholder="Product Brand">
      <input type="text" placeholder="Product Image Url">
      <div id="price-container">
        <input type="number" placeholder="Price">
        <input type="number" placeholder="Bulk Price">
      </div>
      <div id="text-area-container">
        <label for="">Product Description:</label>
        <textarea name="" id=""></textarea>
      </div>
      <div style="display:flex; width: 40%; justify-content: space-between;">
        <button type="submit" class="submit-shop">Submit</button>
        <button type="submit" class="cancel-add-from">Cancel</button>
      </div>
      
    </form>
  </div>
</template>

<script>
export default {
  name: "AddProductPage"
}
</script>

<style>
#add-product-form{
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
#form-add-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 550px;
  width: 100%;
}
#form-add-product input{
  border-radius: 5px;
  padding: 2px 8px;
  width: 75%;
  height: 35px;
  font-size: 15px;
}

#form-add-product input:hover{
  border: 1px solid var(--primary);
}

#form-add-product button{
  padding: 10px;
  font-size: 17px;
  border-radius: 20%;
  color: whitesmoke;
  border: none;
  height: 50px;
  width: fit-content;
  margin-top: 10px;
}

.submit-shop{
  background-color: green;
}

.submit-shop:hover{
  background-color: rgb(0, 163, 0);
}

.cancel-add-from{
  background-color: red;
}

.cancel-add-from:hover{
  background-color: rgb(255, 60, 60);
}

#text-area-container {
  width: 75%;
}

#text-area-container textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
}

#text-area-container label {
  font-weight: 600;
}

#price-container {
  display: flex;
  width: 85%;
  justify-content: space-evenly;
  align-items: center;
}

#price-container input {
  width: 39%;
  margin: 0 10px;
}

</style>