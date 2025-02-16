document.addEventListener('DOMContentLoaded', function() {
    const statsTableBody = document.querySelector('#stats-table tbody');
    const totalStars = document.getElementById('total-stars');
    const totalForks = document.getElementById('total-forks');
    const totalWatchers = document.getElementById('total-watchers');
    const totalIssues = document.getElementById('total-issues');
    const totalViews = document.getElementById('total-views');
    const totalClones = document.getElementById('total-clones');

    let starsSum = 0;
    let forksSum = 0;
    let watchersSum = 0;
    let issuesSum = 0;
    let viewsSum = 0;
    let clonesSum = 0;

    fetch('stats.json')
        .then(response => response.json())
        .then(stats => {
            stats.forEach(repo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${repo.name}</td>
                    <td>${repo.stars}</td>
                    <td>${repo.forks}</td>
                    <td>${repo.watchers}</td>
                    <td>${repo.issues}</td>
                    <td>${repo.trafficViews}</td>
                    <td>${repo.trafficClones}</td>
                `;
                statsTableBody.appendChild(row);

                starsSum += repo.stars;
                forksSum += repo.forks;
                watchersSum += repo.watchers;
                issuesSum += repo.issues;
                viewsSum += repo.trafficViews;
                clonesSum += repo.trafficClones;
            });

            totalStars.textContent = starsSum;
            totalForks.textContent = forksSum;
            totalWatchers.textContent = watchersSum;
            totalIssues.textContent = issuesSum;
            totalViews.textContent = viewsSum;
            totalClones.textContent = clonesSum;
        })
        .catch(error => console.error('Error fetching stats:', error));

    document.querySelectorAll('th').forEach(header => {
        header.addEventListener('click', () => {
            const table = header.parentElement.parentElement.parentElement;
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const index = Array.from(header.parentElement.children).indexOf(header);
            const ascending = header.classList.toggle('ascending');

            rows.sort((a, b) => {
                const aText = a.children[index].textContent;
                const bText = b.children[index].textContent;

                if (!isNaN(aText) && !isNaN(bText)) {
                    return ascending ? parseFloat(aText) - parseFloat(bText) : parseFloat(bText) - parseFloat(aText);
                }

                return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });

            rows.forEach(row => table.querySelector('tbody').appendChild(row));
        });
    });
});
