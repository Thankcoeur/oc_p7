<template>
  <div class="user">
    <div class="block"></div>
    <h1>{{ h1message }}</h1>
    <p v-if="message" class="message">{{ message }}</p>

    <Compte
      :compte="compte"
      v-for="compte in comptes"
      v-bind:key="compte.id"
      :deleteAcount="deleteAcount"
    />

    <Compte
      v-if="compte !== null"
      :compte="compte"
      :deleteAcount="deleteAcount"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Compte from "./../components/Compte";
import store from "../store";
export default {
  name: "User",
  data() {
    return {
      compte: null,
      comptes: null,
      h1message: null,
      message: null,
    };
  },
  computed: {
    ...mapState(["user", "getUser"]),
  },
  components: {
    Compte,
  },
  methods: {
    deleteAcount(id) {
      axios
        .delete("http://localhost:3000/api/user/delete/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.message = null;
          localStorage.clear();
          this.$router.replace("/");
        })
        .catch(() => {
          this.message = "accès impossible";
        });
    },
  },
  mounted() {
    console.log(store.getters.getUser.isAdmin);
    if (store.getters.getUser.isAdmin) {
      this.h1message = "Les Comptes";
      axios
        .get("http://localhost:3000/api/user/getUsers", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((user) => {
          console.log(user);
          this.message = null;
          this.comptes = user.data;
        })
        .catch(() => {
          this.message = "impossible de recuperer liste";
        });
    }
    this.h1message = "Votre Compte";

    axios
      .get(
        "http://localhost:3000/api/user/getUser/" + localStorage.getItem("id"),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((user) => {
        this.compte = user.data;
        this.message = null;
      })
      .catch(() => {
        this.message = "impossible de recuperer utilisateur";
      });
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: white;
}

.block {
  margin-top: 100px;
}

.user {
  max-width: 900px;
  padding: 50px;
  background-color: white;
}
h1 {
  font-size: 18px;
}

h2 {
  font-size: 16px;
}
</style>
