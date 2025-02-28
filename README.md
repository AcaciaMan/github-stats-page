# github-stats-page

## GitHub Stats Page

This page displays GitHub user stats such as followers count, stars count, stars last 14 days count, repositories count, unique viewers count, and allows sorting by these stats.

![Screenshot_stats_page](https://github.com/user-attachments/assets/dd32e9ef-bec1-4816-8ca3-d8bc2757cabe)

### How to Use

1. Open the `github-stats-page/index.html` file in your web browser.
2. The page will automatically fetch and display the GitHub user stats.
3. Click on the table headers to sort the stats by the respective column.

### New Static Nature and Daily Update Mechanism

The `github-stats-page/index.html` file is now static and no longer fetches data dynamically. Instead, the stats are updated once a day using a GitHub Action workflow.

The GitHub Action workflow fetches data from the GitHub API and updates a JSON file `github-stats-page/stats.json` with the latest stats. The `github-stats-page/script.js` file is modified to fetch data from the local `stats.json` file instead of the GitHub API.

### Creating a Personal Access Token

To give push access to the `acacia-forex` repository, you need to create a personal access token with the required permissions:

1. Go to your GitHub account settings.
2. Navigate to "Developer settings" and then "Personal access tokens".
3. Click on "Generate new token".
4. Give your token a descriptive name and select the `repo` scope to allow pushing to the `acacia-forex` repository.
5. Click "Generate token" and copy the token. Make sure to store it securely as you won't be able to see it again.

### Adding the Personal Access Token as a Secret

To use the personal access token in the workflow, you need to add it as a secret in the repository:

1. Go to the repository on GitHub.
2. Click on "Settings" and then "Secrets".
3. Click on "New repository secret".
4. Name the secret `GITHUB_TOKEN` and paste the personal access token you generated earlier.
5. Click "Add secret".

### Using the GITHUB_TOKEN Environment Variable

The script `.github/scripts/fetch-stats.js` uses the `GITHUB_TOKEN` environment variable for authentication when making requests to the GitHub API. Make sure to set the `GITHUB_TOKEN` environment variable in your GitHub Action workflows to avoid rate limiting issues.

### Running the Workflow on Demand

To run the workflow on demand, you can use the `workflow_dispatch` event trigger. This allows you to manually trigger the workflow from the GitHub Actions tab in your repository.

1. Go to the repository on GitHub.
2. Click on the "Actions" tab.
3. Select the workflow you want to run.
4. Click on the "Run workflow" button.
5. Optionally, provide any required inputs and click "Run workflow" to start the workflow.
