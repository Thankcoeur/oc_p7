<template>
  <div class="createpost">
      <form @submit.prevent="createPost" >

 <h3>Créer un post</h3>
      <div class="block">

        <input class="text-input" type="text" v-model="FormData.texte">

      <input type="file" id="file" class="file" name="file" @change="fileLoader">
      <label for="file"><i class="fas fa-image file-img"></i>image</label>
      </div>
       <button class="publish" type="submit">Publier</button>
  




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

<style scoped lang="scss">

.text-input {
  width:80%;
  margin : auto;
  border-radius: 20px;
  height:40px;
  padding: 20px

}

.createpost {
  margin-bottom: 100px ;
}

#file  {
  

  display : none
}

.file-img {
  margin-left: 20px;
  margin-right:10px
}

.publish  {

border-radius : 20px;
padding : 10px ;
margin : 10px;
margin-left:  0;
@include gradiant-image;
color :white


}


</style>