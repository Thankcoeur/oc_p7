<template>
  <div class="compte">
      <h2> email : {{compte.email }}</h2>
      <h2>pseudo :  {{compte.username }}</h2>
      <button @click="deleteAcount(compte.id)">suprimer</button>
     
    </div>
  
</template>

<script>

export default {
  name: "Compte",
  props : ["compte","deleteAcount"]
  
};
</script>

<style scoped lang="scss">

h2 {
  font-size: 16px;
}

button {
  margin-top: 10px;

  background-color:rgb(182, 0, 0);
  padding : 10px;
  color : white;
 
}


</style>