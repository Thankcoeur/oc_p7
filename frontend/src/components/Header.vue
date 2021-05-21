<template>
  <nav >
    <div class="">    <router-link to="/">
<h1 class="smania">SN</h1>    </router-link></div>


    
      <ul >
        <li v-if="isAuth" class="my-btn"> 
          <router-link  to="/">
          <i class="fas fa-home"></i></router-link>
        </li>
        <li  v-if="!isAuth">
          <router-link  to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!isAuth" >
          <router-link  to="/login">Log In</router-link>
        </li>
        <li  v-if="isAuth">
          <router-link  to="/user" class="my-btn">
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li  v-if="isAuth" class="my-btn" >
          <button  type=""  @click="disconnected"><i class="fas fa-sign-out-alt"></i></button>
        </li>
      </ul>
    
  </nav>
</template>

<script>

import Vuex from "vuex"
import store from '../store';
export default {
   
  data: () => { return {
    
    
  }},
  mounted() {
    
 


  },computed : {
    ...Vuex.mapGetters(['isAuth'])
    


  },

  methods: {
    notify() {


    },
    disconnected() {
      store.dispatch('disconnected')
      

      
    }
  }
};
</script>

<style lang='scss' scoped   >
@import "../scss/mixin";

nav { 

  display : flex ;
  align-items: center;
  justify-content : space-between;
  padding: 20px;
  
  
}

ul { 
display : flex;
justify-content : space-between;
list-style: none;

}


a { color : #0f002a;
font-weight: bold;
text-decoration : none;
font-size:14px}

a:hover { text-decoration : none}

li { 

  margin-left: 10px;
}


.smania { 
  @include gradiant-texte

}


 

</style>