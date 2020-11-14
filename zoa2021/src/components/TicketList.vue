<template>
  <div class="overflow-auto ticket-list">
    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="rows"
      aria-controls="tickets-table"
      limit="10"
    >
    </b-pagination>

    <b-table
      id="tickets-table"
      :items="getPageTickets"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(id)="id">
        <span>{{ id.value }}</span>
      </template>
      <template #cell()="row">
        <a :href="'/tickets/' + row.item.id">{{ row.item.subject }}</a>
      </template>
      <template #cell(updated_at)="updated_at">
        <span>{{ updated_at.value }}</span>
      </template>
      <template #cell(priority)="priority">
        <span>{{ priority.value }}</span>
      </template>
      <template #cell(status)="status">
        <b-badge
          :variant="
            status.value === 'open'
              ? 'danger'
              : status.value === 'pending'
              ? 'primary'
              : 'success'
          "
          >{{ status.value }}</b-badge
        >
      </template>
    </b-table>
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
      links: null,
      perPage: 25,
      currentPage: 1,
      previousPage: null,
      updating: false,
      rows: null,
      fields: [
        {
          key: "id",
        },
        {
          key: "subject",
        },
        {
          key: "updated_at",
          formatter: (value) => {
            return moment(value).calendar();
          },
        },
        {
          key: "priority",
        },
        {
          key: "status",
        },
      ],
    };
  },

  mounted() {
    this.getTotal();
  },

  methods: {
    async getTotal() {
      const total = (await api.get("/tickets/count")).data.count;
      if (total.refreshed_at === null) {
        this.rows = total.value;
        this.updating = true;
        //not sure
        setTimeout(this.getTotal, 10000);
      } else {
        if (this.updating) {
          // show snackbar
        }
        this.rows = total.value;
        this.updating = false;
      }
    },
    async getFirstPage() {
      const res = (
        await api.get("/tickets/pagebysize", {
          perPage: this.perPage,
        })
      ).data.tickets;
      return res;
    },
    async getPageTickets(context) {
      const page = context.currentPage;
      let res = null;
      if (this.previousPage === null) {
        res = await this.getFirstPage();
      } else if (
        page - this.previousPage === -1 &&
        this.links &&
        this.links.prev
      ) {
        res = (await api.get("/tickets/neighbor", { url: this.links.prev }))
          .data.tickets;
      } else if (
        page - this.previousPage === 1 &&
        this.links &&
        this.links.next
      ) {
        res = (await api.get("/tickets/neighbor", { url: this.links.next }))
          .data.tickets;
      } else {
        res = (
          await api.get("/tickets/page", {
            pageNum: page,
            perPage: this.perPage,
          })
        ).data.tickets;
      }
      this.links = res.links;
      this.previousPage = page;
      return res.tickets;
    },
  },
};
</script>
<style scoped>
.ticket-list {
  margin: 1em 2em;
}
</style>