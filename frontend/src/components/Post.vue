<template>
  <div class="post">
    <div class="top">
      <div class="image-profil gradient-box "><img class="img-profil" src="https://www.gabrielgorgi.com/wp-content/uploads/2019/12/01.jpg.webp" alt=""></div>
      <h2></h2>

    </div>
    <div class="content">


   <p>{{post.content}}</p>
  <a v-if="post.attachement" :href="post.attachement"><img class="img-content" :src="post.attachement" alt="..."  /></a> 
   



    </div>
   
   <div class="right">
     <ul>
       <li @click="deletePost(post.id)"> <i class="fas fa-trash-alt"></i></li>
       <li><bu
            class="dropdown-item modifPost"
            data-toggle="modal"
            data-target="#modalEditPost"
            type="button"
            @click="emitInfoPost();changeEditStyle('modify');"
          >Modifier</bu></li>
     </ul>

   </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import store from '../store';

export default {
  name: "Post",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    deletePost(id) {
      console.log(id)
 

      store.dispatch('deletePost',id)








    },
    
    changeEditStyle(value) {
      this.$store.dispatch("changeEditStyle", value);
    }
  }
};
</script>

<style lang="scss" scoped>

.post {
  border-radius: 20px;
  display: grid;
  grid-template-areas:
  
            "top top right"
            "content content right"
            ;

    grid-template-rows: auto auto ;
  grid-template-columns:  1fr 50px;

  background-color: white;
  
  box-shadow: 0 1px 46px -4px rgba(0,0,0,.28);
  margin : auto;
  margin-bottom: 80px;
  max-width : 700px
}
.top {
  grid-area: top;
  padding : 10px
  
}
.right {
  grid-area: right;
  background-color: rgb(13, 40, 65);
  ul { 
  list-style : none;
  display : grid;
  align-items : center;
  justify-items: center;
  padding :10px;
  
  li { 
    color : white
  }
  }
}

.content {
  grid-area: content;
  padding : 10px
}

.image-profil {

  img {
  
   max-width:100px;
  }

 

}

.img-content {


  max-width: 200px;}







</style>