<template>
  <b-card class="mt-5" id="forumCard">
            <b-col md="3">
              <p class="cardIdentification">
                <b-icon
                  style="color: #0077b6"
                  icon="chat-left-fill"
                  aria-hidden="true"
                ></b-icon>
                Forum
              </p>
            </b-col>
            <b-col md="12">
              <b-row>
                <b-col class="fw-bolder" md="8">
                  {{forum.titulo}}<b-badge
                    id="badgeNotification"
                    class="ml-3"
                    variant="danger"
                    >4</b-badge
                  >
                  <b-col class="text-muted mt-2" md="12">
                    <p class="participants">Numero de participantes 4</p>
                  </b-col>
                </b-col>
                <b-col md="4">
                  <div class="d-flex justify-content-end">
                    <b-button
                      id="btnOpenForum"
                      href="#"
                      variant="primary"
                      @click="$router.push({ name: 'forum_detalhes', params: { forum: forum } })"
                      >Abrir</b-button
                    >
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-card>
</template>
<script>
export default {
  name: "CardForum",
  props: {
    forum: Object,
  },
  data() {
    return {
      
    };
  },
  computed: {},
  created() {
    try {
      console.log(this.forum)
      this.$store.dispatch("fetchUserById",this.propCard.id_prof_orientador);
    } catch (error) {
        console.log(error);
        this.content =(error.response && error.response.data) ||  error.message || error.toString();
      }
  },
};
</script>
<style scoped></style>
