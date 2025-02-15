# github-stats-page

## GitHub Stats Page

This page displays GitHub user stats such as followers count, stars count, stars last 14 days count, repositories count, unique viewers count, and allows sorting by these stats.

### How to Use

1. Open the `github-stats-page/index.html` file in your web browser.
2. The page will automatically fetch and display the GitHub user stats.
3. Click on the table headers to sort the stats by the respective column.

### New Static Nature and Daily Update Mechanism

The `github-stats-page/index.html` file is now static and no longer fetches data dynamically. Instead, the stats are updated once a day using a GitHub Action workflow.

The GitHub Action workflow fetches data from the GitHub API and updates a JSON file `github-stats-page/stats.json` with the latest stats. The `github-stats-page/script.js` file is modified to fetch data from the local `stats.json` file instead of the GitHub API.
