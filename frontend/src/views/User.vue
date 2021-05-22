<template>
  <div class="user">


 <h1>Votre Compte</h1>

<Compte   :deleteAcount="deleteAcount"  :compte="compte"/>


<div class="admin">


<Compte  V />



</div>

    
  </div>
</template>

<script> 
import axios from "axios";
import { mapState } from "vuex";
import Compte from "./../components/Compte"
export default {
  name: "User",
  data() {
    return {
      compte : {}
      
    };
  },
  computed: {
    ...mapState(["user","getUser"])
  },
  components : {
      Compte
    
  },
  methods: {
   
    deleteAcount(id) {
     
      axios
        .delete("http://localhost:3000/api/user/delete/"+id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          localStorage.clear()
          this.$router.replace("/login")
          
          
        })
        .catch(error => console.log(error));
    },

 
  },
  mounted() {
    

    



      axios
        .get("http://localhost:3000/api/user/getUser/"+localStorage.getItem("id"), {
           headers: {
            Authorization: "Bearer " +localStorage.getItem("token")
          }
        })
        .then((user ) => {
          this.compte = user.data
          
          
          
        })
        .catch(error => console.log(error));
    }
  







    

}
    
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