<template>
<div class="signup  signlogin">


<div class="infos">


  <h1 class="login-h1">SmaNia</h1>
  <h2>by Groupomania</h2>
</div>



   
<form @submit.prevent="Login" >

    <div class="input-container">
    <i class="fa fa-user icon"></i>
    <input class="input-field" type="text" placeholder="Username" name="username" v-model="username">
  </div>

 
  
  <div class="input-container">
    <i class="fa fa-key icon"></i>
    <input class="input-field" type="password" placeholder="Password" name="password" v-model="password">
  </div>

  <button type="submit" class="btn">Register</button>
  

</form>

      
 
</div>
    
</template>

<script>
import store from '../store';
import Vuex from "vuex"
import log from "../schemas/Schema"
export default {
  name: "Login",
  store : store , 
  data : () => {
    return {
    
       username : null,
        
        password: null,
    
      

    };
  },
  computed : {
   
    ...Vuex.mapGetters(['getUser','isAuth'])

  },
  
  updated : () => {
    console.log("login updated")

  },
 
  methods: {

    
    
    Login() {

      try  { 
         const data = {username : this.username , password : this.password}


  const  valid =  log.validate(data)
  console.log(valid.error)
  if(valid.error) throw new Error(valid.error)

     
 store.dispatch('login',data)



      } catch(e) {

        console.log(e)
      }
     


      
      
 
    
      
    }
  }
};
</script>

<style lang="scss" scoped >





</style>