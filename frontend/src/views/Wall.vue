<template>
  <div id="wall" class="wall">
    <CreatePost />
    <Post v-for="post in getPosts" v-bind:key="post.id" :post="post"  />
    
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import Vuex from "vuex"
import store from '../store';
export default {
  name: "Mur",
  components: {
    CreatePost,
    Post,
    
  },
  mounted() {
    console.log(store.getters.getPosts)
   
if( store.getters.getPosts.length == 0)  store.dispatch("getPosts")



  
    



    


  },
  computed :  {
...Vuex.mapGetters(['getPosts'])


  },
  data() {
    return {
      allPosts : null
      
    };
  },
  methods: {
   
  },
   
};
</script>

<style lang="scss" scoped>
.wall {
  
max-width: 900px;
margin: auto;
padding-top: 100px;
}

</style>