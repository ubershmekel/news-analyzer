<script setup lang="ts">
import { ref } from 'vue';

const data = {
  "createdAt": "2025-02-08T07:59:45.758Z",
  "summaries": [
    {
      "daysBack": 1,
      "name": "Today",
      "items": [
        {
          "title": "Trump's proposal for a United States takeover of Gaza raises significant concerns internationally, threatening the prospects of a two-state solution and drawing attention worldwide .",
          "links": [
            {
              "id": 2133,
              "url": "https://www.bbc.com/news/articles/c4g9xgj2429o"
            },
            {
              "id": 2134,
              "url": "https://www.bbc.com/news/articles/cqldpyn5ng6o"
            },
            {
              "id": 2179,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-gaza-two-state.html"
            },
            {
              "id": 2204,
              "url": "https://www.nytimes.com/2025/02/06/world/europe/trump-gaza-hamas-palestinians.html"
            },
            {
              "id": 2208,
              "url": "https://www.nytimes.com/2025/02/06/world/europe/sweden-shooting-scene.html"
            },
            {
              "id": 2209,
              "url": "https://www.nytimes.com/2025/02/06/world/middleeast/israel-military-gaza-palestinians-leave.html"
            },
            {
              "id": 2210,
              "url": "https://www.nytimes.com/2025/02/06/world/europe/grenfell-tower-uk-demolished-survivors.html"
            },
            {
              "id": 2211,
              "url": "https://www.nytimes.com/2025/02/06/world/middleeast/trump-gaza-war-hostages-cease-fire.html"
            },
            {
              "id": 2213,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-gaza-israel-annexation-palestinian.html"
            },
            {
              "id": 2228,
              "url": "https://www.nytimes.com/2025/02/05/us/politics/trump-gaza-takeover.html"
            }
          ]
        },
        {
          "title": "A US military surveillance plane crash in the Philippines, resulting in the death of four personnel, stirs debate over the safety of military aviation practices .",
          "links": [
            {
              "id": 2010,
              "url": "https://www.foxnews.com/world/us-military-surveillance-flight-crashes-philippines-killing-4"
            },
            {
              "id": 2170,
              "url": "https://www.bbc.com/news/videos/c20p2pqe47zo"
            },
            {
              "id": 2177,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/russell-vought-omb-senate-vote.html"
            },
            {
              "id": 2178,
              "url": "https://www.nytimes.com/2025/02/06/health/usaid-clinical-trials-funding-trump.html"
            },
            {
              "id": 2184,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/crash-army-helicopter-tracking.html"
            },
            {
              "id": 2185,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-faa-air-traffic-plane-crash.html"
            },
            {
              "id": 2191,
              "url": "https://www.nytimes.com/2025/02/06/us/topgun-navy-pilot-brain-injury.html"
            }
          ]
        },
        {
          "title": "Biden's administration faces accusations from a US ally for allegedly misusing USAID to meddle in domestic affairs, heightening geopolitical tensions .",
          "links": [
            {
              "id": 2008,
              "url": "https://www.foxnews.com/world/netanyahu-gifts-trump-controversial-item-helped-turned-tide-war-against-hezbollah"
            },
            {
              "id": 2009,
              "url": "https://www.foxnews.com/world/us-ally-accuses-biden-admin-using-usaid-tool-interfere-domestic-issues"
            },
            {
              "id": 2175,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/usaid-job-cuts.html"
            },
            {
              "id": 2176,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-national-prayer-breakfast.html"
            },
            {
              "id": 2178,
              "url": "https://www.nytimes.com/2025/02/06/health/usaid-clinical-trials-funding-trump.html"
            },
            {
              "id": 2189,
              "url": "https://www.nytimes.com/2025/02/06/business/panama-canal-ck-hutchison.html"
            },
            {
              "id": 2196,
              "url": "https://www.nytimes.com/2025/02/06/opinion/usaid-trump-samantha-power.html"
            },
            {
              "id": 2206,
              "url": "https://www.nytimes.com/2025/02/05/world/africa/congo-m23-rwanda-goma-burials.html"
            }
          ]
        },
        {
          "title": "House Representative Eli Crane's advocacy for therapy dogs at political hearings, following a joke, underscores the growing emphasis on mental health within US politics .",
          "links": [
            {
              "id": 2048,
              "url": "https://www.foxnews.com/media/aoc-tells-voters-worried-about-grocery-prices-just-wait-until-farms-empty-from-deportations"
            },
            {
              "id": 2049,
              "url": "https://www.foxnews.com/politics/house-rep-eli-crane-says-therapy-dogs-should-mandatory-hearings-joke-dems-mental-stability"
            },
            {
              "id": 2051,
              "url": "https://www.foxnews.com/sports/rep-jasmine-crockett-says-trumps-trans-athlete-ban-doesnt-protect-women-faces-intense-backlash"
            }
          ]
        },
        {
          "title": "Hezbollah's strategies are increasingly scrutinized as the organization navigates new political landscapes, particularly in the wake of controversial exchanges between Netanyahu and Trump .",
          "links": [
            {
              "id": 2008,
              "url": "https://www.foxnews.com/world/netanyahu-gifts-trump-controversial-item-helped-turned-tide-war-against-hezbollah"
            },
            {
              "id": 2013,
              "url": "https://www.foxnews.com/world/zelenskyy-wants-nukes-nato-trumps-special-envoy-kellogg-says-slim-none-chance"
            },
            {
              "id": 2095,
              "url": "https://www.bbc.com/news/articles/cp82pm3exz0o"
            },
            {
              "id": 2195,
              "url": "https://www.nytimes.com/2025/02/07/opinion/us-military-weapons-pentagon.html"
            }
          ]
        }
      ]
    },
    {
      "daysBack": 3,
      "name": "3 days",
      "items": [
        {
          "title": "Trump's proposal for a Gaza takeover draws international criticism, highlighting potential obstacles to a two-state solution and raising significant global legal concerns .",
          "links": [
            {
              "id": 2133,
              "url": "https://www.bbc.com/news/articles/c4g9xgj2429o"
            },
            {
              "id": 2134,
              "url": "https://www.bbc.com/news/articles/cqldpyn5ng6o"
            },
            {
              "id": 2179,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-gaza-two-state.html"
            },
            {
              "id": 2204,
              "url": "https://www.nytimes.com/2025/02/06/world/europe/trump-gaza-hamas-palestinians.html"
            },
            {
              "id": 2208,
              "url": "https://www.nytimes.com/2025/02/06/world/europe/sweden-shooting-scene.html"
            },
            {
              "id": 2209,
              "url": "https://www.nytimes.com/2025/02/06/world/middleeast/israel-military-gaza-palestinians-leave.html"
            },
            {
              "id": 2210,
              "url": "https://www.nytimes.com/2025/02/06/world/europe/grenfell-tower-uk-demolished-survivors.html"
            },
            {
              "id": 2211,
              "url": "https://www.nytimes.com/2025/02/06/world/middleeast/trump-gaza-war-hostages-cease-fire.html"
            },
            {
              "id": 2213,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-gaza-israel-annexation-palestinian.html"
            },
            {
              "id": 2228,
              "url": "https://www.nytimes.com/2025/02/05/us/politics/trump-gaza-takeover.html"
            }
          ]
        },
        {
          "title": "A US military surveillance plane crash in the Philippines, resulting in four casualties, brings military aviation safety into question .",
          "links": [
            {
              "id": 2010,
              "url": "https://www.foxnews.com/world/us-military-surveillance-flight-crashes-philippines-killing-4"
            },
            {
              "id": 2170,
              "url": "https://www.bbc.com/news/videos/c20p2pqe47zo"
            },
            {
              "id": 2177,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/russell-vought-omb-senate-vote.html"
            },
            {
              "id": 2178,
              "url": "https://www.nytimes.com/2025/02/06/health/usaid-clinical-trials-funding-trump.html"
            },
            {
              "id": 2184,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/crash-army-helicopter-tracking.html"
            },
            {
              "id": 2185,
              "url": "https://www.nytimes.com/2025/02/06/us/politics/trump-faa-air-traffic-plane-crash.html"
            },
            {
              "id": 2191,
              "url": "https://www.nytimes.com/2025/02/06/us/topgun-navy-pilot-brain-injury.html"
            }
          ]
        },
        {
          "title": "Philippine Vice President Sara Duterte is impeached, leading to a trial amid significant political turbulence in the country .",
          "links": [
            {
              "id": 1775,
              "url": "https://www.foxnews.com/world/philippine-vice-president-sara-duterte-impeached-house-faces-senate-trial-political-battle-rages"
            },
            {
              "id": 1957,
              "url": "https://www.nytimes.com/2025/02/05/world/asia/philippines-vice-president-duterte-impeached.html"
            },
            {
              "id": 2014,
              "url": "https://www.foxnews.com/world/philippine-vice-president-sara-duterte-impeached-house-faces-senate-trial-political-battle-rages"
            },
            {
              "id": 2248,
              "url": "https://www.nytimes.com/2025/02/05/world/asia/philippines-vice-president-duterte-impeached.html"
            }
          ]
        },
        {
          "title": "Mexico strongly objects to a US plan involving deported Mexican migrants being sent to Guantanamo Bay, citing human rights concerns .",
          "links": [
            {
              "id": 1783,
              "url": "https://www.foxnews.com/world/mexico-says-not-allow-us-send-mexican-migrants-guantanamo-bay"
            },
            {
              "id": 2022,
              "url": "https://www.foxnews.com/world/mexico-says-not-allow-us-send-mexican-migrants-guantanamo-bay"
            }
          ]
        },
        {
          "title": "An unprecedented January warmth alarms climate scientists, intensifying worries about accelerating global warming trends .",
          "links": [
            {
              "id": 1855,
              "url": "https://www.bbc.com/news/articles/cwyjk92w9k1o"
            },
            {
              "id": 1936,
              "url": "https://www.nytimes.com/2025/02/05/climate/earth-hottest-january.html"
            },
            {
              "id": 2227,
              "url": "https://www.nytimes.com/2025/02/05/climate/earth-hottest-january.html"
            }
          ]
        }
      ]
    },
    {
      "daysBack": 7,
      "name": "7 days",
      "items": [
        {
          "title": "Venezuela has released six American detainees following negotiations involving Trump's envoy Richard Grenell, marking a diplomatic achievement between Venezuela and the United States .",
          "links": [
            {
              "id": 1000,
              "url": "https://www.bbc.com/news/articles/cjw4yejwlpeo"
            },
            {
              "id": 1049,
              "url": "https://www.nytimes.com/2025/01/31/us/politics/us-prisoners-venezuela.html"
            },
            {
              "id": 1112,
              "url": "https://www.foxnews.com/world/trump-envoy-richard-grenell-secures-freedom-6-americans-following-meeting-maduro-venezuela"
            },
            {
              "id": 880,
              "url": "https://www.foxnews.com/world/trump-envoy-richard-grenell-secures-freedom-6-americans-following-meeting-maduro-venezuela"
            },
            { "id": 914 }
          ]
        },
        {
          "title": "In a tragic incident, a medical jet crashed in Philadelphia, resulting in multiple fatalities and prompting scrutiny over aviation safety practices .",
          "links": [
            {
              "id": 1037,
              "url": "https://www.nytimes.com/2025/01/31/us/plane-crash-philadelphia-roosevelt-mall.html"
            },
            {
              "id": 917,
              "url": "https://www.foxnews.com/us/philadelphia-plane-tragedy-medical-ambulance-transporting-pediatric-patient-crashes-explodes-near-homes"
            },
            { "id": 932 },
            {
              "id": 955,
              "url": "https://www.bbc.com/news/articles/ckg0m5n8g0do"
            },
            { "id": 998 }
          ]
        },
        {
          "title": "Former Prime Minister Imran Khan, imprisoned in Pakistan, draws notable parallels between his legal battles and those faced by President Trump in the United States .",
          "links": [
            {
              "id": 1323,
              "url": "https://www.foxnews.com/world/jailed-ex-pakistani-pm-imran-khan-draws-parallels-president-trump-fight-justice"
            }
          ]
        },
        {
          "title": "Trump's imposition of tariffs on imports from Canada, Mexico, and China is causing a stir in international trade, labeled as a national emergency by the administration .",
          "links": [
            {
              "id": 1147,
              "url": "https://www.foxnews.com/politics/trump-signs-tariffs-imports-canada-mexico-china-national-emergency"
            },
            {
              "id": 1182,
              "url": "https://www.bbc.com/news/articles/c627nx42xelo"
            },
            { "id": 1218 },
            {
              "id": 1220,
              "url": "https://www.bbc.com/news/articles/c1kmp99431mo"
            },
            {
              "id": 1243,
              "url": "https://www.nytimes.com/2025/02/01/business/trump-tariffs-canada-mexico-china.html"
            }
          ]
        },
        {
          "title": "Investigations in Iran reveal that its nuclear agency has been clandestinely operating from space launch sites, raising significant concerns over global security and nuclear proliferation .",
          "links": [
            {
              "id": 1115,
              "url": "https://www.foxnews.com/world/irans-covert-nuclear-agency-found-operating-out-top-space-program-launch-sites"
            },
            {
              "id": 883,
              "url": "https://www.foxnews.com/world/irans-covert-nuclear-agency-found-operating-out-top-space-program-launch-sites"
            }
          ]
        }
      ]
    },
    {
      "daysBack": 14,
      "name": "14 days",
      "items": [
        {
          "title": "Despite EU opposition, Belarusian President Aleksandr Lukashenko extends his rule after a disputed election, leading to significant political tension.",
          "links": [
            {
              "id": 2,
              "url": "https://www.foxnews.com/world/belarus-president-lukashenko-extends-rule-after-election-rejected-opposition-eu"
            },
            {
              "id": 204,
              "url": "https://www.nytimes.com/2025/01/26/world/europe/belarus-lukashenko-re-election.html"
            },
            {
              "id": 236,
              "url": "https://www.foxnews.com/world/belarus-president-lukashenko-extends-rule-after-election-rejected-opposition-eu"
            },
            {
              "id": 685,
              "url": "https://www.foxnews.com/world/belarus-president-lukashenko-extends-rule-after-election-rejected-opposition-eu"
            }
          ]
        },
        {
          "title": "Trump's imposition of tariffs on imports from Canada, Mexico, and China as a national emergency draws international criticism and disrupts global trade relations.",
          "links": [
            {
              "id": 1147,
              "url": "https://www.foxnews.com/politics/trump-signs-tariffs-imports-canada-mexico-china-national-emergency"
            },
            {
              "id": 1182,
              "url": "https://www.bbc.com/news/articles/c627nx42xelo"
            },
            {
              "id": 1198,
              "url": "https://www.bbc.com/news/articles/cj02eyv4v6yo"
            },
            {
              "id": 1220,
              "url": "https://www.bbc.com/news/articles/c1kmp99431mo"
            },
            {
              "id": 1230,
              "url": "https://www.bbc.com/news/articles/c78xvgvy172o"
            },
            {
              "id": 1243,
              "url": "https://www.nytimes.com/2025/02/01/business/trump-tariffs-canada-mexico-china.html"
            },
            {
              "id": 1284,
              "url": "https://www.nytimes.com/2025/02/01/us/politics/trumps-tariffs-us-mexico.html"
            },
            {
              "id": 1452,
              "url": "https://www.bbc.com/news/articles/c0lzxz7kg4wo"
            },
            {
              "id": 1512,
              "url": "https://www.nytimes.com/2025/02/01/world/americas/trump-mexico-tariffs.html"
            },
            {
              "id": 1519,
              "url": "https://www.nytimes.com/2025/02/01/world/canada/canada-trump-tariffs-windsor.html"
            }
          ]
        },
        {
          "title": "Iran's covert nuclear operations, discovered at space program launch sites, lead to widespread global security concerns among world leaders.",
          "links": [
            {
              "id": 1115,
              "url": "https://www.foxnews.com/world/irans-covert-nuclear-agency-found-operating-out-top-space-program-launch-sites"
            },
            {
              "id": 883,
              "url": "https://www.foxnews.com/world/irans-covert-nuclear-agency-found-operating-out-top-space-program-launch-sites"
            }
          ]
        },
        {
          "title": "A tragic midair collision near Washington, DC, results in the deaths of 67 people, prompting investigations of air traffic control staffing and aviation safety.",
          "links": [
            {
              "id": 692,
              "url": "https://www.foxnews.com/politics/trump-orders-assessment-aviation-safety-names-acting-faa-administrator-after-deadly-dc-plane-crash"
            },
            {
              "id": 719,
              "url": "https://www.foxnews.com/us/dc-plane-crash-timeline-midair-collision-involves-67-passengers-crew-members-soldiers"
            },
            {
              "id": 730,
              "url": "https://www.foxnews.com/us/nearly-30-bodies-recovered-no-survivors-expected-dc-plane-crash"
            },
            {
              "id": 738,
              "url": "https://www.bbc.com/news/articles/c8r53g4xv7zo"
            },
            { "id": 766, "url": "https://www.bbc.co.uk/sounds/play/p0kn72fw" },
            {
              "id": 819,
              "url": "https://www.nytimes.com/2025/01/30/briefing/washington-dc-plane-crash-bill-gates-memoir.html"
            },
            {
              "id": 842,
              "url": "https://www.nytimes.com/2025/01/30/briefing/washington-air-crash-hamas-hostages-senate-hearings.html"
            }
          ]
        },
        {
          "title": "Record-breaking warmth in January surprises climate scientists and amplifies worries regarding the effects of global warming worldwide.",
          "links": [
            {
              "id": 1855,
              "url": "https://www.bbc.com/news/articles/cwyjk92w9k1o"
            },
            {
              "id": 1936,
              "url": "https://www.nytimes.com/2025/02/05/climate/earth-hottest-january.html"
            },
            {
              "id": 2227,
              "url": "https://www.nytimes.com/2025/02/05/climate/earth-hottest-january.html"
            }
          ]
        }
      ]
    },
    {
      "daysBack": 30,
      "name": "30 days",
      "items": [
        {
          "title": "Hamas and Israel reached a pivotal agreement involving the release of hostages and Palestinian prisoners, highlighting the tenuous ceasefire and ongoing diplomatic efforts in the region .",
          "links": [
            {
              "id": 17,
              "url": "https://www.foxnews.com/world/hamas-releases-4-female-hostages-part-israel-ceasefire-deal"
            },
            {
              "id": 218,
              "url": "https://www.nytimes.com/2025/01/25/world/middleeast/israel-gaza-hostage-prisoner-swap.html"
            },
            {
              "id": 222,
              "url": "https://www.nytimes.com/2025/01/25/world/middleeast/israel-hamas-gaza-hostage-yehud.html"
            },
            {
              "id": 223,
              "url": "https://www.nytimes.com/2025/01/25/world/middleeast/palestinian-prisoners-released-second-exchange.html"
            },
            {
              "id": 225,
              "url": "https://www.nytimes.com/2025/01/25/world/middleeast/hamas-israel-hostages-oct-7.html"
            },
            {
              "id": 239,
              "url": "https://www.foxnews.com/world/israel-hamas-reach-deal-release-hostages-allow-palestinians-return-gaza-strip"
            },
            {
              "id": 467,
              "url": "https://www.foxnews.com/world/israel-hamas-reach-deal-release-hostages-allow-palestinians-return-gaza-strip"
            },
            {
              "id": 5,
              "url": "https://www.foxnews.com/world/israel-hamas-reach-deal-release-hostages-allow-palestinians-return-gaza-strip"
            },
            {
              "id": 668,
              "url": "https://www.foxnews.com/world/third-round-hostage-releases-begins-part-hamas-gaza-ceasefire-agreement-israel"
            },
            {
              "id": 745,
              "url": "https://www.bbc.com/news/articles/ce8j6rq855jo"
            }
          ]
        },
        {
          "title": "The Auschwitz Liberation 80th Anniversary prompted survivor Ryszard Horowitz to reflect on his journey from the Holocaust to achieving the American Dream, shedding light on the enduring impact of these historical events .",
          "links": [
            { "id": 113 },
            {
              "id": 15,
              "url": "https://www.foxnews.com/world/auschwitz-80-years-since-liberation-ryszard-horowitzs-story-survival-making-american-dream"
            },
            {
              "id": 171,
              "url": "https://www.nytimes.com/2025/01/27/world/europe/auschwitz-liberation-80th-anniversary.html"
            },
            {
              "id": 243,
              "url": "https://www.foxnews.com/world/town-once-inhabited-nazis-reconciles-past"
            },
            {
              "id": 249,
              "url": "https://www.foxnews.com/world/auschwitz-80-years-since-liberation-ryszard-horowitzs-story-survival-making-american-dream"
            },
            {
              "id": 471,
              "url": "https://www.foxnews.com/world/town-once-inhabited-nazis-reconciles-past"
            },
            {
              "id": 86,
              "url": "https://www.bbc.com/news/articles/c20p33pz3pzo"
            },
            {
              "id": 9,
              "url": "https://www.foxnews.com/world/town-once-inhabited-nazis-reconciles-past"
            }
          ]
        },
        {
          "title": "China's DeepSeek AI is disrupting global tech markets and challenging U.S. dominance in the tech sector, raising economic and strategic concerns .",
          "links": [
            { "id": 112 },
            {
              "id": 141,
              "url": "https://www.bbc.com/news/videos/c77rd5ddxn8o"
            },
            {
              "id": 142,
              "url": "https://www.bbc.com/news/videos/cly9lpx8xdko"
            },
            {
              "id": 153,
              "url": "https://www.nytimes.com/2025/01/27/technology/what-is-deepseek-china-ai.html"
            },
            {
              "id": 154,
              "url": "https://www.nytimes.com/2025/01/27/business/deepseek-nvidia-ai-chips.html"
            },
            {
              "id": 155,
              "url": "https://www.nytimes.com/2025/01/27/technology/deepseek-ai-chatbot-first-impressions.html"
            },
            {
              "id": 189,
              "url": "https://www.nytimes.com/2025/01/27/briefing/china-ai-markets-colombia-deportees-auschwitz-memorial.html"
            },
            {
              "id": 317,
              "url": "https://www.bbc.com/news/articles/c9w5d9new0yo"
            },
            {
              "id": 354,
              "url": "https://www.bbc.com/news/articles/czepw096wy4o"
            },
            { "id": 355 },
            {
              "id": 360,
              "url": "https://www.bbc.com/news/videos/cly9lpx8xdko"
            },
            {
              "id": 433,
              "url": "https://www.nytimes.com/2025/01/27/briefing/china-ai-markets-colombia-deportees-auschwitz-memorial.html"
            },
            {
              "id": 77,
              "url": "https://www.bbc.com/news/articles/cd643wx888qo"
            }
          ]
        },
        {
          "title": "The Congo conflict escalates with over 700 deaths, underscoring the deadly struggle over vital mineral resources essential for electric vehicles and the region's ongoing instability .",
          "links": [
            {
              "id": 1004,
              "url": "https://www.bbc.com/news/articles/c78xvgvy172o"
            },
            {
              "id": 1004,
              "url": "https://www.bbc.com/news/articles/c78xvgvy172o"
            },
            {
              "id": 1059,
              "url": "https://www.nytimes.com/video/world/africa/100000009956762/east-congo-conflict-explained.html"
            },
            {
              "id": 1230,
              "url": "https://www.bbc.com/news/articles/c78xvgvy172o"
            },
            {
              "id": 884,
              "url": "https://www.foxnews.com/world/trump-facing-first-test-africa-amid-bloody-battles-over-electric-vehicle-battery-minerals"
            },
            {
              "id": 978,
              "url": "https://www.bbc.com/news/articles/cn01k8948v1o"
            }
          ]
        },
        {
          "title": "Trump's imposition of tariffs on Canada, Mexico, and China, labeling it a national emergency, has triggered international backlash and potential trade disruptions .",
          "links": [
            {
              "id": 1147,
              "url": "https://www.foxnews.com/politics/trump-signs-tariffs-imports-canada-mexico-china-national-emergency"
            },
            {
              "id": 1147,
              "url": "https://www.foxnews.com/politics/trump-signs-tariffs-imports-canada-mexico-china-national-emergency"
            },
            {
              "id": 1182,
              "url": "https://www.bbc.com/news/articles/c627nx42xelo"
            },
            {
              "id": 1182,
              "url": "https://www.bbc.com/news/articles/c627nx42xelo"
            },
            {
              "id": 1198,
              "url": "https://www.bbc.com/news/articles/cj02eyv4v6yo"
            },
            { "id": 1218 },
            {
              "id": 1220,
              "url": "https://www.bbc.com/news/articles/c1kmp99431mo"
            },
            {
              "id": 1220,
              "url": "https://www.bbc.com/news/articles/c1kmp99431mo"
            },
            {
              "id": 1230,
              "url": "https://www.bbc.com/news/articles/c78xvgvy172o"
            },
            {
              "id": 1243,
              "url": "https://www.nytimes.com/2025/02/01/business/trump-tariffs-canada-mexico-china.html"
            }
          ]
        }
      ]
    }
  ]
}

const summaries = data.summaries
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
        <li v-for="item in summaries[activeSummaryId].items" :key="item.title">
          <p>{{ item.title }}
            <span class="links-list">
              (<a v-for="(link, linkIndex) in item.links" :key="linkIndex" :href="link.url"><span
                  v-if="linkIndex != 0">, </span>{{ linkIndex + 1 }}</a>)
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
</style>