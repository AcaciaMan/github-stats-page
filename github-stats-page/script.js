document.addEventListener('DOMContentLoaded', function() {
    const statsTableBody = document.querySelector('#stats-table tbody');

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
                    
                `;
                statsTableBody.appendChild(row);
            });
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

                return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });

            rows.forEach(row => table.querySelector('tbody').appendChild(row));
        });
    });
});
