<template>
  <div class="createpost">
    <p class="message">{{ message }}</p>
    <form @submit.prevent="createPost">
      <div class="block">
        <textarea
          id="publication"
          rows=""
          class="text-input"
          type="text"
          v-model="FormData.texte"
        />

        <input
          type="file"
          id="file"
          class="file"
          name="file"
          @change="fileLoader"
        />
        <label for="file"><i class="fas fa-image file-img"></i></label>
      </div>
      <button class="publish" type="submit">Publier</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";

export default {
  name: "CreatePost",
  data() {
    return {
      message: null,
      FormData: {
        texte: null,
        image: null,
      },
    };
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  mounted() {},
  methods: {
    async createPost() {
      try {
        if (this.FormData.image === null && this.FormData.texte === null) {
          throw new Error("rien a ajouter");
        }
        if (this.FormData.texte  && this.FormData.texte.length < 5) {
          throw new Error("merci de mettre au moins 5 lettre");
        }

        const fd = new FormData();
        fd.append("inputFile", this.FormData.image);
        fd.append("content", this.FormData.texte);
        (this.FormData.image = null), (this.FormData.texte = null);
        await store.dispatch("addPost", fd).catch(() => {
          throw new Error("impossible de creer la resource");
        });

        this.message = null;
      } catch (e) {
        this.message = e.message;
      }
    },
    fileLoader(e) {
      console.log(e);
      this.FormData.image = e.target.files[0] || e.dataTransfer.files;
    },
  },
};
</script>

<style scoped lang="scss">
.text-input {
  width: 80%;
  margin: auto;
  border-radius: 20px;
  height: 40px;
  padding: 20px;
}

.createpost {
  padding: 20px;
  margin-bottom: 100px;
}

#file {
  display: none;
}

.file-img {
  margin-left: 20px;
  margin-right: 10px;
}

.publish {
  border-radius: 20px;
  padding: 10px;
  border: none;
  box-shadow: 0 0px 4px 0px rgba(0, 0, 0, 0.28);

  margin: 10px;
  margin-left: 0;

  background-color: var(--main-bg-color);
  color: white;
}

#publication {
  overflow: hidden;
  padding: 10px;
  resize: none;
}
</style>
