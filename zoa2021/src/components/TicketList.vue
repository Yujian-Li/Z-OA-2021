<template>
  <div class="overflow-auto ticket-list">
    <b-pagination
      v-if="rows"
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
        <router-link
          :to="{
            name: 'Ticket Detail',
            params: { currentPage, id: row.item.id },
          }"
          >{{ row.item.subject }}</router-link
        >
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

    <b-modal v-model="showModal" hide-footer>
      <div v-for="(err, index) in error" :key="index">
        <h5>{{ err }}</h5>
      </div>
      <b-button class="mt-3" variant="outline-primary" href="/tickets"
        >Try Again</b-button
      >
    </b-modal>

    <b-toast
      id="update"
      variant="warning"
      toaster="b-toaster-bottom-center"
      solid
      :no-close-button="false"
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">New Tickets Available!</strong>
        </div>
      </template>
      <b-button variant="outline-danger" @click="$bvToast.hide('update')"
        >Dismiss</b-button
      >
      <b-button class="ml-3" variant="success" href="/tickets"
        >Refresh</b-button
      >
    </b-toast>
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
      previousPage: null,
      updating: false,
      rows: null,
      error: [],
      showModal: false,
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
      currentPage: this.currentPageProp || 1,
    };
  },

  props: ["currentPageProp", "test"],

  mounted() {
    this.getTotal();
  },

  methods: {
    async getTotal() {
      const response = (await api.get("/tickets/count")).data;
      if (response.error) {
        this.error.append(response.error);

        //If tickets are updating, check every 10 seconds to see if update is finished
      } else if (response.count.refreshed_at === null) {
        this.rows = response.count.value;
        this.updating = true;
        setTimeout(this.getTotal, 10000);
      } else {
        if (this.updating) {
          this.$bvToast.show("update");
        }
        this.rows = response.count.value;
        this.updating = false;
      }
    },
    async getFirstPage() {
      return await api.get("/tickets/pagebysize", {
        perPage: this.perPage,
      });
    },
    async getSpecificPage(page) {
      return await api.get("/tickets/page", {
        pageNum: page,
        perPage: this.perPage,
      });
    },
    async getPageTickets(context) {
      const page = context.currentPage;
      let res = null;

      //Use curse pagination if possible, otherwise use offset pagination
      if (this.previousPage === null) {
        if (page === 1) {
          res = await this.getFirstPage();
        } else {
          res = await this.getSpecificPage(page);
        }
      } else if (
        page - this.previousPage === -1 &&
        this.links &&
        this.links.prev
      ) {
        res = await api.get("/tickets/neighbor", { url: this.links.prev });
      } else if (
        page - this.previousPage === 1 &&
        this.links &&
        this.links.next
      ) {
        res = await api.get("/tickets/neighbor", { url: this.links.next });
      } else {
        res = await this.getSpecificPage(page);
      }

      if (res.error) {
        this.error.append(res.error);
      } else {
        res = res.data.tickets;
        this.links = res.links;
      }

      if (this.error.length) {
        this.showModal = true;
      }

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