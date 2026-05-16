import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from "../layout/MainLayout.vue";
import TicketsPage from "../pages/TicketsPage.vue";
import TicketExaminationPage from "../pages/TicketExaminationPage.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'tickets-list',
          component: TicketsPage
        },
        {
          path: 'ticket/:id',
          name: 'ticket-examination',
          component: TicketExaminationPage,
          props: true
        }
      ]
    },
  ]
})

export default router
