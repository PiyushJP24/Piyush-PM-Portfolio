// Links for the "Supporting analysis" section and the two analyst project pages.
// Render rules: skip any button whose URL is an empty string.
// Match projects and visualisations by the exact title shown on their cards.

export const analysis = {
  tableauProfileUrl: "https://public.tableau.com/app/profile/piyush.paliwal7704/vizzes",

  // Project pages: one button under the header strip, above Overview,
  // styled like the two buttons on the PM project pages.
  projects: [
    {
      title: "Vendor Performance Analysis",
      githubUrl: "https://github.com/PiyushJP24/End-to-End-Vendor-Performance-Analysis",
      githubLabel: "View code on GitHub"
    },
    {
      title: "Airline Data Analysis",
      githubUrl: "https://github.com/PiyushJP24/Airline-Data-Analysis-",
      githubLabel: "View code on GitHub"
    }
  ],

  // Visualisations tab: each "View Dashboard" button opens its url in a new tab.
  visualisations: [
    {
      title: "Netflix Usage V3",
      url: "https://public.tableau.com/app/profile/piyush.paliwal7704/viz/NetflixUsageV3_17512742317590/NetflixUsage"
    },
    {
      title: "Spotify Music and Artist Analysis",
      url: "https://public.tableau.com/app/profile/piyush.paliwal7704/viz/SpotifyMusicandArtistAnalysis/Dashboard1"
    },
    {
      title: "Impact of Large Language Models: Trends & Implications",
      url: "https://public.tableau.com/app/profile/piyush.paliwal7704/viz/ImpactofLargeLanguageModelsTrendsImplications/LLMs"
    }
  ]
};
