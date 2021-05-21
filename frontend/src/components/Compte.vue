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

button {

  background-color:rgb(93, 10, 10);
  padding : 10px;
  color : white;
  border-radius : 20px;
}


</style>