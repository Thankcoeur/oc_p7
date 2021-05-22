<template>
  <div class="post">
    <div class="top">
      <div class="image-profil gradient-box "><img class="img-profil" src="https://www.gabrielgorgi.com/wp-content/uploads/2019/12/01.jpg.webp" alt=""></div>
      <h2>{{user.username}}</h2>

    </div>
    <div class="content">


   <p>{{post.content}}</p>
  <a v-if="post.attachement" :href="post.attachement"><img class="img-content" :src="post.attachement" alt="..."  /></a> 
   



    </div>
   
   <div class="right">
     <ul>
       <li @click="deletePost(post.id)"> <i class="fas fa-trash-alt"></i></li>
       
     </ul>

   </div>

  </div>
</template>

<script>
import Axios from 'axios';
import { mapState } from "vuex";
import store from '../store';

export default {
  name: "Post",
  components: {},
  data() {
    return {
      user : {}
    };
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  props: ["post"], 
 
  mounted() {
    
   

    Axios
      .get(
        "http://localhost:3000/api/user/getUser/"+ this.post.UserId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((user) => {
        console.log(user.data)
        this.user = user.data;
      })
      .catch((error) => console.log(error));

  }
  ,
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
  color : rgb(44, 44, 44) ; 
  display: grid;
  grid-template-areas:
  
            "top top right"
            "content content right"
            ;

    grid-template-rows: auto auto ;
  grid-template-columns:  1fr auto;

  background-color: white;
  
  box-shadow: 0 0px 4px 0px rgba(0,0,0,.28);
  margin : auto;
  margin-bottom: 80px;
  margin-left: 10px;
  margin-right: 10px;
}
.top {
  font-size: 14px;
  color: rgb(66, 66, 66);
  grid-area: top;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  padding : 10px
  
}
.right {
  grid-area: right;
  background-color: #00b9ca ;
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
  padding : 10px;
  p {
    margin-bottom: 10px;
  }
}

.image-profil {

  img {
  
   max-width:100px;
  }

 

}

.img-content {


  max-width: 200px;}







</style>