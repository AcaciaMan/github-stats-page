document.addEventListener('DOMContentLoaded', function() {
    const statsTableBody = document.querySelector('#stats-table tbody');

    fetch('https://api.github.com/users/AcaciaMan/repos')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${repo.name}</td>
                    <td>${repo.stargazers_count}</td>
                    <td>${repo.forks_count}</td>
                    <td>${repo.watchers_count}</td>
                    <td>${repo.open_issues_count}</td>
                `;
                statsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));

    document.querySelectorAll('th').forEach(header => {
        header.addEventListener('click', () => {
            const table = header.parentElement.parentElement.parentElement;
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const index = Array.from(header.parentElement.children).indexOf(header);
            const ascending = header.classList.toggle('ascending');

            rows.sort((a, b) => {
                const aText = a.children[index].textContent;
                const bText = b.children[index].textContent;

                return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });

            rows.forEach(row => table.querySelector('tbody').appendChild(row));
        });
    });
});
