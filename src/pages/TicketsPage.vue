<template>
  <q-page class="bg-grey-1 q-pa-lg flex flex-center">
    <div class="full-width" style="max-width: 1000px;">

      <div class="text-center q-mb-xl">
        <h1 class="text-h4 text-weight-bold text-grey-9 q-my-none">
          Панель тестирования
        </h1>
        <p class="text-subtitle1 text-grey-6 q-mt-sm">
          Выберите один из 20 билетов для начала проверки знаний
        </p>
      </div>

      <div class="row q-col-gutter-md justify-center">
        <div
            v-for="ticketNum in 20"
            :key="ticketNum"
            class="col-xs-6 col-sm-4 col-md-3 col-lg-2.4"
        >
          <q-card
              flat
              bordered
              class="ticket-card cursor-pointer text-center relative-position q-hoverable"
              @click="goToTicket(ticketNum)"
          >
            <q-focus-helper />

            <q-card-section class="q-py-xl">
              <div class="text-h6 text-weight-bold text-grey-8">
                Билет №{{ ticketNum }}
              </div>
              <div class="text-caption text-primary q-mt-xs text-weight-medium">
                Начать тест →
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTicket = (id) => {
  router.push({
    name: 'ticket-examination',
    params: { id: id }
  })
}
</script>

<style scoped>
.ticket-card {
  transition: all 0.25s ease-in-out;
  border-radius: 8px;
  background: #ffffff;
}

.ticket-card:hover {
  transform: translateY(-4px);
  border-color: var(--q-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
