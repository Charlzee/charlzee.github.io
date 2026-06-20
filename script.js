const username = 'charlzee';

async function fetchAllRepoDates() {
    // Find all elements that need repo date
    const repoElements = document.querySelectorAll('.repo-update-time');
    
    if (repoElements.length === 0) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repository list from GitHub');
        }

        const reposData = await response.json();

        repoElements.forEach(element => {
            const repoName = element.getAttribute('repo-name');
            
            // Find the repository in the API array
            const matchedRepo = reposData.find(
                repo => repo.name.toLowerCase() === repoName.toLowerCase()
            );

            if (matchedRepo) {
                const lastPush = new Date(matchedRepo.pushed_at);

                // Format the date
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = lastPush.toLocaleDateString('en-US', options);

                element.innerText = `Last Updated: ${formattedDate}`;
            } else {
                element.innerText = 'Repository not found';
            }
        });

    } catch (error) {
        console.error('Error fetching bulk repo data:', error);
        // Fallback text for all elements if the API call fails
        repoElements.forEach(element => {
            element.innerText = 'Date unavailable';
        });
    }
}

fetchAllRepoDates();
