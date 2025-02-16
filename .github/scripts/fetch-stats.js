const fs = require('fs');
const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'AcaciaMan';
const STATS_FILE_PATH = 'github-stats-page/stats.json';

function getGithubToken() {
    return process.env.GITHUB_TOKEN;
}

async function fetchAllRepos() {
    try {
        const token = getGithubToken();
        const reposResponse = await axios.get(`${GITHUB_API_URL}/users/${REPO_OWNER}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        return reposResponse.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

async function fetchRepoStats(repoName) {
    try {
        const token = getGithubToken();
        const repoResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${repoName}`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        const repoData = repoResponse.data;

        const trafficClonesResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${repoName}/traffic/clones`, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        const trafficViewsResponse = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${repoName}/traffic/views`, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        const stats = {
            name: repoData.name,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            issues: repoData.open_issues_count,
            trafficViews: trafficViewsResponse.data.count,
            trafficClones: trafficClonesResponse.data.count,
            trafficUniqueViews: trafficViewsResponse.data.uniques,
            trafficUniqueClones: trafficClonesResponse.data.uniques
        };

        return stats;
    } catch (error) {
        console.error(`Error fetching stats for repository ${repoName}:`, error);
        return null;
    }
}

async function fetchAllRepoStats() {
    const repos = await fetchAllRepos();
    const allStats = [];

    for (const repo of repos) {
        const stats = await fetchRepoStats(repo.name);
        if (stats) {
            allStats.push(stats);
        }
    }

    return allStats;
}

async function saveStatsToFile(stats) {
    try {
        fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(stats, null, 2));
        console.log('GitHub stats updated successfully.');
    } catch (error) {
        console.error('Error saving GitHub stats:', error);
    }
}

async function main() {
    const allStats = await fetchAllRepoStats();
    await saveStatsToFile(allStats);
}

main();
