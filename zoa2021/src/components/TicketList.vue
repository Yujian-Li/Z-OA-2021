<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tickets-table"
    ></b-pagination>

    <b-table
      id="tickets-table"
      :items="ticketList"
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
      <template #cell(updated)="updated">
        <span>{{ updated.value }}</span>
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
      tickets: [],
      ticketList: [],
      perPage: 25,
      currentPage: 1,
      fields: [
        {
          key: "id",
        },
        {
          key: "subject",
        },
        {
          key: "updated",
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
    //TODO: return first 200
    this.getTicketList();
  },
  computed: {
    rows() {
      return this.ticketList.length;
    },
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
  },
};
</script>