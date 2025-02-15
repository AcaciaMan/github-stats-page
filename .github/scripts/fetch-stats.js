const fs = require('fs');
const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'AcaciaMan';
const REPO_NAME = 'github-stats-page';
const STATS_FILE_PATH = 'github-stats-page/stats.json';

async function fetchRepoStats() {
    try {
        const repoResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}`);
        const repoData = repoResponse.data;

        const stats = {
            name: repoData.name,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            issues: repoData.open_issues_count,
            clones_today: 0, // Placeholder, replace with actual data if available
            unique_viewers: 0, // Placeholder, replace with actual data if available
            clones_14days: 0, // Placeholder, replace with actual data if available
            unique_viewers_14days: 0, // Placeholder, replace with actual data if available
            all_clones: 0 // Placeholder, replace with actual data if available
        };

        fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(stats, null, 2));
        console.log('GitHub stats updated successfully.');
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

fetchRepoStats();
