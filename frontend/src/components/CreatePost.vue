<template>
  <div>
      <form @submit.prevent="createPost" >

 <h3>Créer un post</h3>
      <input type="text" v-model="FormData.texte">

      <input type="file" @change="fileLoader">
      
       <button type="submit">send</button>




      </form>
     
     
    </div>
  
</template>

<script>
import { mapState } from "vuex";
import store from '../store';

export default {
  name: "CreatePost",
  data() {
    return {
      FormData: {
        texte: null,
        image: null
      },
      msgError: ""
    };
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  methods: {
    createPost() {
      

      const fd = new FormData();
      fd.append("inputFile", this.FormData.image);
      fd.append("content", this.FormData.texte);
      store.dispatch('addPost',fd )
       
       
      
    },
    fileLoader(e) {
      console.log(e);
      this.FormData.image = e.target.files[0] || e.dataTransfer.files;
      
    }
  }
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>