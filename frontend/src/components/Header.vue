<template>
  <nav>
    <div class="">
      <router-link to="/"> <div class="titre"> <img height="40px" src="../assets/icon.svg" alt="">  Groupomania</div> </router-link>
    </div>

    <ul>
      <li v-if="isAuth" class="my-btn">
        <router-link to="/wall"> <i class="fas fa-home"></i></router-link>
      </li>
      <li v-if="!isAuth">
        <router-link to="/signup">Sign Up</router-link>
      </li>
      <li v-if="!isAuth">
        <router-link to="/">Log In</router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/user" class="my-btn">
          <i class="user-icon fas fa-user"></i>
        </router-link>
      </li>
      <li v-if="isAuth" class="my-btn">
        <button type="" @click="disconnected">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vuex from "vuex";
import store from "../store";
export default {
  data: () => {
    return {};
  },
  mounted() {},
  computed: {
    ...Vuex.mapGetters(["isAuth"]),
  },

  methods: {
    notify() {},
    disconnected() {
      store.dispatch("disconnected");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixin";

nav {
  background-color: var(--main-bg-color);
  position: fixed;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.titre {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2rem;
}

ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

a {
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  text-decoration: none;
}

li {
  margin-left: 10px;
}

.smania {
  @include gradiant-texte;
  font-size: 30px;
}
</style>
