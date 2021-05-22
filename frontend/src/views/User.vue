<template>
  <div class="user">
    <Compte
      
      :compte="compte"
      v-for="compte in comptes"
      v-bind:key="compte.id"
      :deleteAcount="deleteAcount"
    />

    <Compte v-if="compte !== null" :compte="compte" :deleteAcount="deleteAcount" />
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
          localStorage.clear();
          this.$router.replace("/login");
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    console.log(store.getters.getUser.isAdmin);
    if (store.getters.getUser.isAdmin) {
      axios
        .get("http://localhost:3000/api/user/getUsers", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((user) => {
          console.log(user)
          this.comptes = user.data;
        })
        .catch((error) => console.log(error));
        return
    }

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
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: white;
}

.content {
  margin-top: 150px;
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