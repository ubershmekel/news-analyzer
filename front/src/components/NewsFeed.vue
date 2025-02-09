<script setup lang="ts">
import type { FrontPageSummaries } from "@news-analyzer/shared/serverTypes";
import { onMounted, ref } from 'vue';

const data = ref<FrontPageSummaries>({
  "createdAt": "2025-02-08T07:59:45.758Z",
  "summaries": [
    {
      "daysBack": 1,
      "name": "Today",
      "items": []
    },
    {
      "daysBack": 3,
      "name": "3 days",
      "items": [],
    }
  ]
});

const newsJsonUrl = "https://storage.googleapis.com/uberbuck/news-analyzer/news.json"

onMounted(async () => {
  const response = await fetch(newsJsonUrl)
  const newsData = await response.json()
  data.value = newsData
  console.log("fetched news data", data)
})
const activeSummaryId = ref(0);

</script>

<template>
  <div>
    <h1>News Since When</h1>
    <div>
      <button v-for="(summary, index) in data.summaries" :key="summary.name" @click="activeSummaryId = index"
        :class="{ active: activeSummaryId === index }">{{
          summary.name }}</button>
    </div>
    <div class="news-feed">
      <!-- <h2>{{ summaries[activeSummaryId].name }}</h2> -->
      <ul>
        <li v-for="item in data.summaries[activeSummaryId].items" :key="item.title">
          <p>{{ item.title }}
            <span class="links-list">
              (<span class="news-link" v-for="(link, linkIndex) in item.links" :key="linkIndex">
                <span v-if="linkIndex != 0">, </span><a :href="link.url">{{ linkIndex + 1 }}</a>
              </span>)
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1.5rem;
}

button.active {
  /* background-color: #4CAF50; */
  background-color: #9b5d00;
  border-color: #ff8c00;
}

.links-list a {
  text-decoration: none;
  color: #efefef;
}

.links-list a:hover {
  text-decoration: underline;
}
</style>