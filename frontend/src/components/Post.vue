<template>
  <div class="post">
    <div class="top">
      <div class="image gradient-box "><img class="img-profil" src="https://www.gabrielgorgi.com/wp-content/uploads/2019/12/01.jpg.webp" alt=""></div>
      <h2></h2>

    </div>
   
   
   <p>{{post.content}}</p>
  <a :href="post.attachement"><img class="img-content" :src="post.attachement" alt="..."  /></a> 
   <div class="time">{{post.createdAt.split(' ')[0]}} à {{post.createdAt.split(' ')[1]}}</div>
   <div class="right">
     <ul>
       <li><button @click="deletePost(post.id)"><i class="fas fa-trash-alt"></i></button></li>
       <li><button
            class="dropdown-item modifPost"
            data-toggle="modal"
            data-target="#modalEditPost"
            type="button"
            @click="emitInfoPost();changeEditStyle('modify');"
          >Modifier</button></li>
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
  margin-bottom: 100px;

  
  margin : auto;
  padding: 50px;
  

  
  

  
}

.top {
  display: flex;
align-items: center;


}

.triangle {
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
}



.img-profil {
  max-width: 100px;
  max-height: 80px;
  
}

.img-content {

   max-width: 200px;
  max-height: 160px;




}


h2 {
  font-size: 22px;
  margin-left:50px;
}

p {
  min-height: 100px;
  color: rgb(34, 34, 34);
  font-size : 16px;
  padding: 20px;
}





</style>