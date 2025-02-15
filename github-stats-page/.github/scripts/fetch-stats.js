const fs = require('fs');
const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'AcaciaMan';
const REPO_NAME = 'github-stats-page';
const STATS_FILE_PATH = 'github-stats-page/stats.json';

async function fetchRepoTrafficStats() {
    try {
        const trafficResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/traffic/clones`);
        const trafficData = trafficResponse.data;

        const uniqueVisitorsResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/traffic/views`);
        const uniqueVisitorsData = uniqueVisitorsResponse.data;

        return {
            clones_today: trafficData.clones[0].count,
            unique_viewers: uniqueVisitorsData.count,
            clones_14days: trafficData.count,
            unique_viewers_14days: uniqueVisitorsData.uniques,
            all_clones: trafficData.count
        };
    } catch (error) {
        console.error('Error fetching GitHub traffic stats:', error);
        return {
            clones_today: 0,
            unique_viewers: 0,
            clones_14days: 0,
            unique_viewers_14days: 0,
            all_clones: 0
        };
    }
}

async function fetchRepoStats() {
    try {
        const repoResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}`);
        const repoData = repoResponse.data;

        const trafficStats = await fetchRepoTrafficStats();

        const stats = {
            name: repoData.name,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            issues: repoData.open_issues_count,
            ...trafficStats
        };

        fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(stats, null, 2));
        console.log('GitHub stats updated successfully.');
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

fetchRepoStats();
