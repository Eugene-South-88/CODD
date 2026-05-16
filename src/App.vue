<script setup>
import questions from "./api/questions.js";

</script>

<template>
  <div :class="$style.appContainer">
    <p :class="$style.titleBeta">Beta 0.001</p>
    <div :class="$style.titleWrapper">
      <h1 :class="$style.title">ЦОДД</h1>
      <hr>
    </div>

    <div :class="$style.wrapper">
      <div :class="$style.wrapperQuestion">
        <div v-for="item in 20"
             :key="item"
             :class="$style.question">
          <p>Билет: {{item}}</p>
        </div>
      </div>
    </div>

    <div :class="$style.questionBlock">
      <h2>Список всех вопросов, которые будут идти в билетах рандомно или каждый билет будет с определенным списком вопросов?</h2>
      <div v-for="item in questions" :key="item.id">
        {{item.id+1}}. {{ item.title }}
        <div v-for="item in questions" :key="item.id">
          {{ item.variables.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="css">
.titleWrapper {
  margin-bottom: 50px;
}
.questionBlock{
  margin-top: 50px;
}

.titleBeta{
  position: absolute;
  top: 0;
  right: 180px;
}

.title{
}
.wrapper{
  display: block;
}

.wrapperQuestion{
  display: flex;
  flex-wrap: wrap;
  margin: 10px;

}

.question{
  width: 80px;
  cursor: pointer;
  margin: 5px auto;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 14px;
}
</style>
