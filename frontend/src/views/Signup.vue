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
const sch = require("../schemas/Schema");
import store from "./../store/index";
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      username: null,
      email: null,
      password: null,

      message: "",
    };
  },

  methods: {
    async signup() {
      try {
        const valide_username = sch.username.validate({
          username: this.username,
        });
        if (valide_username.error) throw new Error("mauvais username");
        const valide_mail = sch.email.validate({ email: this.email });
        if (valide_mail.error) throw new Error("adresse mail fausse");
        const valide_pass = sch.password.validate({ password: this.password });
        if (valide_pass.error)
          throw new Error(
            "mauvais passeword 1 majuscule 1 caractere special et 1 lettre minimum et plus de 8 caractere"
          );
        const data = {
          username: this.username,
          password: this.password,
          email: this.email,
        };
        await store.dispatch("signup", data).catch(() => {
          throw new Error(
            "impossible de s' enregistrer l' utilisateur existe surement"
          );
        });

        this.message = "utilisateur enregistré";
      } catch (e) {
        this.message = e.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
