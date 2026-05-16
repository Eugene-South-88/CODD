<template>
  <q-page class="bg-grey-1 flex flex-center q-pa-md">
    <div class="full-width" style="max-width: 600px;">

      <div v-if="isLoading" class="text-center q-pa-xl">
        <q-spinner-dots color="primary" size="40px" />
        <div class="text-grey-6 q-mt-md text-body1">Загрузка вопросов билета...</div>
      </div>

      <q-card v-else-if="isFinished" flat bordered class="result-card text-center q-pa-xl text-grey-9">
        <q-icon name="check_circle" color="positive" size="64px" class="q-mb-md" />
        <h2 class="text-h4 text-weight-bold q-my-none">Тест завершен!</h2>
        <p class="text-subtitle1 text-grey-6 q-mt-md">Ваши ответы отправлены на проверку.</p>

        <q-separator class="q-my-lg" />

        <q-btn
            color="primary"
            outline
            label="Вернуться к билетам"
            icon="arrow_back"
            no-caps
            @click="router.push({ name: 'tickets-list' })"
        />
      </q-card>

      <div v-else-if="currentQuestion">
        <div class="row justify-between items-center q-mb-sm text-grey-7 text-weight-medium">
          <div>Билет №{{ ticketId }}</div>
          <div>Вопрос {{ currentQuestionIndex + 1 }} из {{ questions.length }}</div>
        </div>
        <q-linear-progress :value="progress" color="primary" class="q-mb-xl" rounded size="8px" />

        <q-card flat bordered class="question-card q-pa-lg q-mb-md">
          <q-card-section class="q-pa-none">
            <div class="text-h6 text-grey-9 text-weight-medium line-height-md">
              {{ currentQuestion.text }}
            </div>
          </q-card-section>
        </q-card>

        <div class="column q-gutter-y-sm">
          <q-btn
              v-for="answer in currentQuestion.answers"
              :key="answer.id"
              flat
              align="left"
              class="answer-btn text-weight-regular text-grey-9 q-py-md q-px-lg"
              :class="{ 'answer-btn--selected': selectedAnswerId === answer.id }"
              no-caps
              @click="selectAnswer(answer.id)"
          >
            <div class="row items-center no-wrap full-width">
              <q-radio
                  v-model="selectedAnswerId"
                  :val="answer.id"
                  color="primary"
                  keep-color
                  class="q-mr-md pointer-events-none"
              />
              <div class="text-body1 text-left line-height-sm">{{ answer.text }}</div>
            </div>
          </q-btn>
        </div>

        <div class="row justify-end q-mt-lg">
          <q-btn
              :color="isLastQuestion ? 'positive' : 'primary'"
              :label="isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'"
              :icon-right="isLastQuestion ? 'done' : 'chevron_right'"
              :disabled="!selectedAnswerId || isSubmitting"
              :loading="isSubmitting"
              size="large"
              no-caps
              class="q-px-lg text-weight-medium shadow-2 rounded-borders"
              @click="handleNext"
          />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const ticketId = route.params.id

const isLoading = ref(true)
const isSubmitting = ref(false)
const isFinished = ref(false)

const questions = ref([])
const currentQuestionIndex = ref(0)
const selectedAnswerId = ref(null)

const userAnswers = ref({})
const serverResult = ref(null)

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)
const progress = computed(() => (currentQuestionIndex.value + 1) / questions.value.length)


const fetchQuestions = async () => {
  isLoading.value = true
  try {
    // В реальном приложении здесь будет:
    // const res = await fetch(`/api/tickets/${ticketId}/questions`)
    // questions.value = await res.json()

    await new Promise(resolve => setTimeout(resolve, 1200))

    questions.value = [
      {
        id: "q1",
        text: "Какое максимальное допустимое значение сопротивления заземляющего устройства установлено для безопасной работы АПК фотовидеофиксации на металлических и железобетонных опорах?",
        answers: [
          { id: "a1_1", text: "Не более 4 Ом" },
          { id: "a1_2", text: "Не более 10 Ом" },
          { id: "a1_3", text: "Не более 30 Ом" },
          { id: "a1_4", text: "Не нормируется, если есть УЗО" }
        ]
      },
      {
        id: "q2",
        text: "Какой тип кабеля связи рекомендуется использовать для уличной прокладки от распределительного щита на опоре до IP-камеры АПК, чтобы минимизировать наводки от линий электропередач?",
        answers: [
          { id: "a2_1", text: "UTP (Unshielded Twisted Pair) категории 5e" },
          { id: "a2_2", text: "FTP / SFTP (Shielded Twisted Pair) уличный, с заземлением экрана" },
          { id: "a2_3", text: "КВК-В (Комбинированный коаксиальный кабель)" },
          { id: "a2_4", text: "ПВС 2х1.5" }
        ]
      },
      {
        id: "q3",
        text: "Для чего в шкафах автоматики АПК дорожных камер в обязательном порядке устанавливается промышленный инжектор PoE (или коммутатор с PoE) стандарта 802.3at/bt?",
        answers: [
          { id: "a3_1", text: "Только для передачи видеопотока на сервер" },
          { id: "a3_2", text: "Для одновременной передачи данных и питания повышенной мощности (включая обогрев камеры)" },
          { id: "a3_3", text: "Для защиты камеры от перенапряжения по сети 220В" },
          { id: "a3_4", text: "Для преобразования переменного тока в постоянный для лазерных радаров" }
        ]
      },
      {
        id: "q4",
        text: "При производстве работ по подключению питания АПК на опоре освещения, какое устройство должно быть установлено в щите учета (ВРУ) первым по ходу поступающей энергии 220В для защиты электроники от грозовых разрядов?",
        answers: [
          { id: "a4_1", text: "Дифференциальный автомат (АВДТ)" },
          { id: "a4_2", text: "УЗИП (Устройство защиты от импульсных перенапряжений) I или II класса" },
          { id: "a4_3", text: "Стабилизатор напряжения релейного типа" },
          { id: "a4_4", text: "Плавкий предохранитель на 100А" }
        ]
      },
      {
        id: "q5",
        text: "Что обязан сделать электромонтер перед юстировкой (настройкой ракурса) ИК-прожектора и камеры АПК, если работы проводятся вблизи действующей контактной сети трамвая или троллейбуса?",
        answers: [
          { id: "a5_1", text: "Ограничиться использованием диэлектрических перчаток без оформления наряда" },
          { id: "a5_2", text: "Убедиться в снятии напряжения с контактной сети, заземлить автовышку и получить наряд-допуск" },
          { id: "a5_3", text: "Выполнять работы только в темное время суток при выключенных светофорах" },
          { id: "a5_4", text: "Проверить камеру на отсутствие КЗ с помощью мультиметра" }
        ]
      }
    ]
  } catch (error) {
    console.error("Ошибка загрузки вопросов:", error)
  } finally {
    isLoading.value = false
  }
}


const selectAnswer = (id) => {
  selectedAnswerId.value = id
}

const handleNext = async () => {
  if (!selectedAnswerId.value) return

  const questionId = currentQuestion.value.id
  userAnswers.value[questionId] = selectedAnswerId.value

  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
    selectedAnswerId.value = null
  } else {
    await submitAnswersToServer()
  }
}

const submitAnswersToServer = async () => {
  isSubmitting.value = true
  try {
    // axios.post('/api/submit-test', { ticketId, userAnswers: userAnswers.value })

    await new Promise(resolve => setTimeout(resolve, 1500))


    serverResult.value = {
      score: 3,
      total: questions.value.length
    }

    isFinished.value = true
  } catch (error) {
    console.error("Ошибка отправки ответов:", error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchQuestions()
})
</script>

<style scoped>
.question-card {
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.answer-btn {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.2s ease;
  width: 100%;
}

.answer-btn:hover {
  background: #f9f9f9;
  border-color: #bdbdbd;
}

/* Стили для выбранного ответа */
.answer-btn--selected {
  border-color: var(--q-primary) !important;
  background: rgba(25, 118, 210, 0.04) !important; /* Легкая подсветка основным цветом Quasar */
}

.result-card {
  border-radius: 16px;
  background: #ffffff;
}

.line-height-sm {
  line-height: 1.4;
}
.line-height-md {
  line-height: 1.6;
}
.pointer-events-none {
  pointer-events: none; /* Чтобы клик обрабатывался всей кнопкой, а не только радио-точкой */
}
</style>
