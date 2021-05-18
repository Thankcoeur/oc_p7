import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import base from './../../config'



Vue.use(Vuex)

const state =  {

user : {
  token : localStorage.getItem("token") ,
  isAdmin :localStorage.getItem("isAdmin") ,
  isAuth : localStorage.getItem("isAuth") 


},
posts : []



}








const mutations = {
init : (state , param) => {

  state.user.token = param[0] ,
  state.user.isAuth = param[1] ,
  state.user.isAdmin = param[2]



},
postinit : ( state , newPost) => {

state.posts = newPost

},
addPost : (state,newPost) => {


  state.posts.push(newPost)
  console.log(store)

},
deletePost : (state,id)  => {

 state.posts = state.posts.filter( item => item.id !== id) 




}



}

const getters = {

  getUser : (state) => {
    return state.user
  },
  isAuth : (state) => {
    return  state.user.isAuth


  },
  getPosts : (state) => {
    console.log(state.posts)

    return state.posts

  }





}



const actions = {
  
login :   (state ,  data) =>  {
  

  axios.post(base.url + "user/login", data)
  .then((user) => {
    
    store.commit('init',[ user.data.token , true,user.data.isAdmin
    ])

    localStorage.setItem("token",user.data.token)
    localStorage.setItem("isAdmin",user.data.isAdmin)
    localStorage.setItem("isAuth",true)

    





  })




}

,

signup : (state , data ) => {

  axios.post(base.url + "user/signup", data)
  .then(() => {
    alert("utilisateur inscrit")
  })


},
disconnected : ( ) => {
store.commit('init',["",false,false])
localStorage.clear()


},
getPosts : () => {
  const token = localStorage.getItem("token")


 axios.get(base.url +"post/",{ headers: {
  'Authorization': `Basic ${token}` 
}
  
 }).then((response) => {

 store.commit("postinit",response.data)

 })


},

addPost : (state , data  )=> {
 
 const token = state.state.user.token
 console.log(token)

  axios.post(base.url +"post/add",data,{ headers: {
    'Authorization': `Basic ${token}` 
  }
    
   }).then((response) => {
     console.log(response.data)
  
   store.commit("addPost",response.data)
  
   })








},
deletePost : (state , id  )=> {
 
  const token = state.state.user.token
  
 
   axios.delete(base.url +"post/delete",{ headers: {
     'Authorization': `Basic ${token}` 
   },data : {id : id}}
   
     
    ).then(() => {
      store.commit('deletePost',id)
   
    
   
    })
 
 
 
 
 
 
 
 
 }



}


const store = new Vuex.Store({
 
  state : state,
   mutations:mutations,
   getters : getters,
   actions:actions
  
  
  
  })



export default store 
