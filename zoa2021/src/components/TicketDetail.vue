<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item href="/tickets">Ticket List</b-breadcrumb-item>
      <b-breadcrumb-item active
        >{{ ticketId }}
        <b-badge :variant="ticket.status === 'open' ? 'danger' : 'success'">{{
          ticket.status
        }}</b-badge></b-breadcrumb-item
      >
    </b-breadcrumb>
    <h3>{{ ticket.subject }}</h3>
    <span>Via: {{ ticket.via.channel }}</span>
    <div>{{ ticket.description }}</div>
    <div>{{ ticket.updated_at }}</div>

    <h5>
      <b-badge
        class="tag"
        variant="info"
        v-for="(tag, index) in ticket.tags"
        :key="index"
      >
        {{ tag }}
      </b-badge>
    </h5>
    <div>Piority: {{ ticket.priority }}</div>
  </div>
</template>

<script>
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  data() {
    return {
      ticketId: "",
      ticket: null,
    };
  },

  props: ["id"],

  mounted() {
    this.getTicketDetail(this.id);
  },

  methods: {
    async getTicketDetail(id) {
      this.ticket = (await api.get("/tickets/" + id)).data.ticket;
      this.ticketId = "Ticket #" + this.id;
    },
  },
};
</script>
<style scoped>
.tag {
  margin-right: 1em;
}
</style>