<template>
  <div class="compte">
      


      

        <div scope="row">{{compte.email}}</div>
        <div>{{compte.username }}</div>
        <div>      <button @click="deleteAcount(compte.id)">suprimer</button> </div>


  
     
    </div>
  
</template>

<script>

export default {
  name: "Compte",
  props : ["compte","deleteAcount"]
  
};
</script>

<style scoped lang="scss">

.compte {
  margin: 20px;
  
 
}

h2 {
  font-size: 16px;
}

button {
  margin-top: 10px;

  background-color:rgb(179, 40, 40);
  padding : 10px;
  color : white;
  border-radius: 10px;
 
}


</style>