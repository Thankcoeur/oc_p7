<template>
  <div class="user">


 <h1>Votre Compte</h1>

<h2>email :  {{email}}</h2>
<h2> pseudo : {{pseudo }}</h2>
<button class="btn">suprimer Votre compte</button>
    
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "User",
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    deleteAccount() {
      axios
        .delete("http://localhost:3000/api/user/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          localStorage.clear()
          location.replace("#/login")
          
        })
        .catch(error => console.log(error));
    },
  
 
  },
  mounted() {
    this.$store.dispatch("getUserInfos");
  }
};
</script>

<style lang="scss" scoped>

.user  {

  max-width:900px;
  padding : 50px ;
  margin: auto;background-color: white;


}
h1 {

font-size: 18px
}

h2 {

  font-size:16px
}
.btn {



}
</style>