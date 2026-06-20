const username = 'charlzee';

async function fetchAllRepoDates() {
    // Find all elements on the page that need a repo date
    const repoElements = document.querySelectorAll('.repo-update-time');

    // Loop through each element
    for (const element of repoElements) {
        const repoName = element.getAttribute('repo-name'); 
        
        try {
            // Fetch data for the repository
            const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch ${repoName}`);
            }

            const data = await response.json();
            const lastPush = new Date(data.pushed_at);

            // Format the date
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = lastPush.toLocaleDateString('en-US', options);

            element.innerText = `Last updated: ${formattedDate}`;

        } catch (error) {
            console.error(`Error fetching data for ${repoName}:`, error);
            element.innerText = 'Date unavailable';
        }
    }
}

fetchAllRepoDates();
