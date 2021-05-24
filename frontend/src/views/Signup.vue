<template>
  <div class="signup signlogin">
    <form @submit.prevent="signup">
      <div class="input-container">
        <i class="fa fa-user icon"></i>
        <input
          class="input-field"
          type="text"
          placeholder="Username"
          name="username"
          v-model="username"
        />
      </div>

      <div class="input-container">
        <i class="fa fa-envelope icon"></i>
        <input
          class="input-field"
          type="text"
          placeholder="Email"
          name="email"
          v-model="email"
        />
      </div>

      <div class="input-container">
        <i class="fa fa-key icon"></i>
        <input
          class="input-field"
          type="password"
          placeholder="Password"
          name="password"
          v-model="password"
        />
      </div>
      <p class="message">{{ message }}</p>
      <button type="submit" class="btn">SignUp</button>
    </form>
  </div>
</template>

<script>
const sch  = require("../schemas/Schema")

export default {
  name: "SignUp",
  components :{

  },
  data() {
    return {

        username: null,
        email: null,
        password: null,

      message: ""
    };
  },

  methods: {



    signup() {

      try {
  const data = { email: this.email, password: this.password, username : this.username}

const valid = sch.SignUp.validate(data)

if(valid.error) throw new Error("erreur de saisie")



      } catch (e) {


        this.message = e.message


      }


  }
  }


};
</script>

<style lang="scss" scoped></style>
