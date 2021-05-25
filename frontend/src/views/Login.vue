<template>
<div>






<div class="signup  signlogin">






   
<form @submit.prevent="Login" >

    <div class="input-container">
    <i class="fa fa-user icon"></i>
    <input class="input-field" type="text" placeholder="Username" name="username" v-model="username">
  </div>

 
  
  <div class="input-container">
    <i class="fa fa-key icon"></i>
    <input class="input-field" type="password" placeholder="Password" name="password" v-model="password">
  </div>
<p v-if="message" class="message">{{message}}</p>
  <button type="submit" class="btn">Login</button>
  
  
</form>

      
 </div>
</div>
    
</template>

<script>
import store from '../store';
import Vuex from "vuex"
const sch  = require('./../schemas/Schema')
export default {
  name: "Login",
  store : store , 
  data : () => {
    return {
    
       username : null,
        
        password: null,
        message: null,
    
      

    };
  },
  computed : {
   
    ...Vuex.mapGetters(['getUser','isAuth'])

  },
  mounted() {
    if (store.getters.getUser.isAuth) {

      this.$router.replace("/wall")
    }

    

  },
  
  updated : () => {
    console.log("login updated")

  },
 
  methods: {

    
     async Login() {



    try {
      const  valide_username =  sch.username.validate({username : this.username})
      if (valide_username.error) throw new Error("mauvais username")
    
      const  valide_pass =  sch.password.validate({password : this.password})
      if (valide_pass.error) throw new Error("mauvais passeword")
      const data  = { username : this.username , password : this.password}
      await  store.dispatch('login',data)

      this.message = "utilisateur connecté"
      



    } catch (e) {

      this.message = e.message




    }

      
     


      
      
 
    
      
    }
  }
};
</script>

<style lang="scss" scoped >





</style>