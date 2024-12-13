document.getElementById('searchbutton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchbar').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    fetch('DoomNet/data.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(website => {
                const websiteName = website.name.toLowerCase();
                const websiteUrl = website.url.toLowerCase();
                return websiteName.includes(searchQuery) || websiteUrl.includes(searchQuery);
            });

            if (filteredData.length === 0) {
                resultsDiv.innerHTML = '<p>No results found</p>';
            } else {
                const resultsList = document.createElement('ul');
                filteredData.forEach(website => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = website.url;
                    link.textContent = website.name;
                    link.target = '_blank'; // Open in new tab
                    listItem.appendChild(link);
                    resultsList.appendChild(listItem);
                });
                resultsDiv.appendChild(resultsList);
            }
        })
        .catch(error => {
            console.error('Error loading website data:', error);
            resultsDiv.innerHTML = '<p>Error loading website data</p>';
        });
});





