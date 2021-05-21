<template>
<div class="signup signlogin">







   
<form @submit.prevent="signup" >

  <div class="input-container">
    <i class="fa fa-user icon"></i>
    <input class="input-field" type="text" placeholder="Username" name="username" v-model="username">
  </div>

  <div class="input-container">
    <i class="fa fa-envelope icon"></i>
    <input class="input-field" type="text" placeholder="Email" name="email" v-model="email">
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


export default {
  name: "SignUp",
  components :{
    
  },
  data() {
    return {
    
        username: null,
        email: null,
        password: null,
    
      msg: ""
    };
  },

  methods: {

   

    signup() {

      const data =  { username: this.username, email: this.email , password: this.password}
      
      store.dispatch('signup',data)
      
       
      
    }
  }
};
</script>

<style lang="scss" scoped>


</style>