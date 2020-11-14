<template>
  <div class="overflow-auto">
    <!-- //TODO show ... -->
    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="rows"
      aria-controls="tickets-table"
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
        <span>{{ status.value }}</span>
      </template>
    </b-table>
  </div>
</template>
<script>
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  data() {
    return {
      links: null,
      ticketList: [],
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
          //TODO: formate into calender time
          formatter: (value) => {
            return value;
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
    async getTicketList() {
      this.tickets = (await api.get("/tickets")).data.tickets;
      this.ticketList = this.tickets.map((ele) => {
        return {
          id: ele.id,
          via: ele.via,
          subject: ele.subject,
          description: ele.description,
          updated: ele.updated_at,
          priority: ele.priority,
          status: ele.status,
          tags: ele.tags,
        };
      });
    },
    async getTotal() {
      const total = (await api.get("/tickets/count")).data.count;
      if (total.refreshed_at === null) {
        this.rows = total.value;
        this.updating = true;
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