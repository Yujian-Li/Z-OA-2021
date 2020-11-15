<template>
  <div class="ticket-detail">
    <b-breadcrumb>
      <b-breadcrumb-item
        :to="{
          name: 'Tickets',
          params: { currentPageProp: currentPage, test: 'Hello' },
        }"
        >Ticket List
      </b-breadcrumb-item>
      <b-breadcrumb-item active
        >{{ ticketId }}
        <b-badge
          :variant="
            ticket.status === 'open'
              ? 'danger'
              : ticket.status === 'pending'
              ? 'primary'
              : 'success'
          "
          >{{ ticket.status }}</b-badge
        ></b-breadcrumb-item
      >
    </b-breadcrumb>
    <h3>{{ ticket.subject }}</h3>
    <span class="text-muted" v-if="!error"
      >Via: {{ ticket.via && ticket.via.channel }}</span
    >
    <div class="description">{{ ticket.description }}</div>
    <div class="text-muted ticket-row" v-if="!error">
      Last Updated: {{ ticket.updated_at }}
    </div>

    <div class="ticket-row" v-if="!error">
      Tags:
      <span>
        <b-badge
          class="tag"
          variant="info"
          v-for="(tag, index) in ticket.tags"
          :key="index"
        >
          {{ tag }}
        </b-badge>
      </span>
    </div>
    <div class="ticket-row" v-if="!error">Piority: {{ ticket.priority }}</div>

    <b-modal v-model="showModal" hide-footer>
      <h4>{{ error }}</h4>
      <b-button class="mt-3" variant="outline-primary" href="/tickets"
        >Back</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import moment from "moment";

export default {
  data() {
    return {
      ticketId: "",
      ticket: {},
      error: null,
      showModal: false,
    };
  },

  props: ["id", "currentPage"],

  mounted() {
    this.getTicketDetail(this.id);
  },

  methods: {
    async getTicketDetail(id) {
      const response = (await api.get("/tickets/ticket/" + id)).data;
      if (response.error) {
        this.error = response.error;
        this.showModal = true;
      } else {
        this.ticket = response.ticket;
        this.ticketId = "Ticket #" + this.id;
        this.ticket.updated_at = moment(this.ticket.updated_at).calendar();
      }
    },
  },
};
</script>
<style scoped>
.ticket-detail {
  margin: 1em 2em;
}
.tag {
  margin-right: 1em;
  font-size: 1em;
}
.description {
  margin: 1em 0;
}
.ticket-row {
  margin-top: 1em;
}
</style>