<script setup lang="ts">
import { timeSince } from "@/utils/time";
import type { FrontPageSummaries } from "@news-analyzer/shared/serverTypes";
import { onMounted, ref } from 'vue';

const data = ref<FrontPageSummaries>({
  "createdAt": "",
  "summaries": [
    {
      "daysBack": 1,
      "name": "Today",
      "items": []
    }
  ]
});

const bucketUrl = "https://storage.googleapis.com/uberbuck/news-analyzer/"
const newsJsonUrl = bucketUrl + "news.json"

onMounted(async () => {
  const response = await fetch(newsJsonUrl)
  const newsData = await response.json()
  data.value = newsData
  console.log("fetched news data", data)
  const initialHash = window.location.hash;
  if (initialHash) {
    console.log("initialHash", initialHash);
    const daysBack = parseInt(initialHash.slice(1));
    for (const [index, summary] of data.value.summaries.entries()) {
      if (summary.daysBack === daysBack) {
        activeSummaryId.value = index;
      }
    }
  }

})
const activeSummaryId = ref(0);

function onClickDaysBack(summaryIndex: number) {
  activeSummaryId.value = summaryIndex;
  const summary = data.value.summaries[summaryIndex];
  window.location.hash = summary.daysBack.toString();
}

</script>

<template>
  <div>
    <h1>News Since When</h1>
    <p class="tagline">News sites refresh faster than I visit them. I made this page to keep up by clicking
      the button for how long I haven't read any news. The data comes from the US and world news feeds of NYTimes, BBC,
      and Fox news. See source on
      <a href="https://github.com/ubershmekel/news-analyzer">github</a>. <span v-if="data.createdAt"
        :title="data.createdAt">Refreshed {{
          timeSince(data.createdAt)
        }}</span>.
    </p>
    <div>
      <button v-for="(summary, index) in data.summaries" :key="summary.name" @click="onClickDaysBack(index)"
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
  <p>
    <a class="debug-link" :href="bucketUrl + 'question-' + data.summaries[activeSummaryId].daysBack + '.txt'">debug</a>
  </p>
</template>

<style>
h1 {
  font-size: 2.5rem;
  margin-bottom: 0;
  line-height: 0.95;
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

.tagline {
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 2rem;
}

.debug-link {
  color: #efefef;
}
</style>