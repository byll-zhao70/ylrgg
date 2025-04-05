// URL of the initial API request (replace with the actual URL)
const apiUrl = 'https://raw.githubusercontent.com/byll-zhao70/ylrgg/main/team_data/';

let currentRegion = 'na';

let rankedLists = {
    na: [
      { name: "Sentinels", country: "USA", rating: 1950 },
      { name: "LOUD", country: "Brazil", rating: 1935 }
    ],
    eu: [
      { name: "Team Heretics", country: "Spain", rating: 2000 },
      { name: "Team Vitality", country: "France", rating: 1972 }
    ],
    br: [
      { name: "Edward Gaming", country: "China", rating: 1900 },
      { name: "FunPlus Phoenix", country: "China", rating: 1885 }
    ],
    ap: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    kr: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    ch: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    jp: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    lan: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    las: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    oce: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ],
    gc: [
      { name: "Paper Rex", country: "Singapore", rating: 1940 },
      { name: "Talon Esports", country: "Thailand", rating: 1925 }
    ]
}

// Function to get all teams for a given region
async function getAllTeamsByRegion(region) {
    let allTeams = null;
    try {
        // GET request to the current page's URL
        const response = await fetch(`${apiUrl}${region}_teams.json`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        allTeams = data.data

    } catch (error) {
        console.error('Error fetching teams:', error);
    }

    return allTeams;
}

async function getAllTeams() {
    const teamMap = {};
    // Hard Coded Regions
    let regions = ['na', 'eu', 'br', 'ap', 'kr', 'ch', 'jp', 'lan', 'las', 'oce', 'gc'];
    try {
        for (let region in regions) {
            const info = await getAllTeamsByRegion(regions[region]);
            rankedLists[regions[region]] = info;
            if(regions[region] === currentRegion){
              showRankedList(currentRegion, document.getElementById(currentRegion));
            }
        }
    } catch(error) {
        console.error('Error Fetching teams:', error);
    }
}

// Function to convert team data 

// Function to get and display the teams with detailed information
async function getAndDisplayTeams() {
    try {
        // Get all teams from all pages
        await getAllTeams();
        
        // Get the container where the teams will be displayed
        //const container = document.getElementById('teams-container');
        
        // Clear any loading text
        //container.innerHTML = '';
        
        // Check if there are teams to display
        //if (teams.length === 0) {
        //    container.innerHTML = '<p>No teams available.</p>';
        //    return;
        //}
        

        // Default Functionality for Base Region 


        /*
        // Create a list to hold the team details
        const ul = document.createElement('ul');
        
        // Create an array of promises for fetching detailed info
        const detailPromises = teams.map(async team => {
            try {
                // Make an API call to get detailed information for each team
                const detailsResponse = await fetch(team.detailsUrl);
                
                if (!detailsResponse.ok) {
                    throw new Error(`HTTP error! status: ${detailsResponse.status}`);
                }
                
                // Parse the detailed JSON response
                const details = await detailsResponse.json();

                // Return the details along with the team name
                return {
                    name: details.name,
                    city: details.city,
                    stadium: details.stadium,
                    founded: details.founded
                };
            } catch (detailsError) {
                console.error('Error fetching team details:', detailsError);
                return {
                    name: team.name,
                    error: 'Error loading details.'
                };
            }
        });

        // Wait for all the promises to resolve
        const detailedTeams = await Promise.all(detailPromises);

        // Loop through the resolved detailed teams and create list items
        detailedTeams.forEach(details => {
            const li = document.createElement('li');
            if (details.error) {
                li.textContent = `${details.name}: ${details.error}`;
            } else {
                li.innerHTML = `
                    <h3>${details.name}</h3>
                    <p>City: ${details.city}</p>
                    <p>Stadium: ${details.stadium}</p>
                    <p>Founded: ${details.founded}</p>
                `;
            }
            ul.appendChild(li);
        });

        // Append the list to the container
        container.appendChild(ul);
        */
    } catch (error) {
        console.error('Error fetching teams:', error);
        //const container = document.getElementById('teams-container');
        //container.innerHTML = `<p>Error loading teams. Please try again later.</p>`;
    }
}

function showRankedList(region, button) {
  currentRegion = button.id;
  const buttons = document.querySelectorAll('.region-button');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.querySelector('span')) {
      btn.querySelector('span').remove();
    }
  });

  button.classList.add('active');
  const checkmark = document.createElement('span');
  checkmark.innerHTML = '&#x2713;';
  button.appendChild(checkmark);

  const listContainer = document.getElementById('ranked-list');
  listContainer.innerHTML = '';
  const spinner = document.getElementById('loading-spinner');

  if (rankedLists[region].length == 2) {
    spinner.style.display = 'block';
  } else {
    spinner.style.display = 'none';
    rankedLists[region].forEach(team => {
      const teamItem = document.createElement('div');
      teamItem.classList.add('team-item');
      teamItem.style.cursor = 'pointer'; // indicate it's clickable

      // Use a fallback (e.g., default_logo.png) if team.img is missing
      teamItem.innerHTML = `
        <div class="team-info">
          <img src="${team.img || 'default_logo.png'}" alt="Team logo">
          <div class="details">
            <span class="team-name">${team.name}</span>
            <span class="country">${team.country}</span>
          </div>
        </div>
        <div class="rating">${team.id || team.rating}</div>
      `;

      // Make the team item clickable – passing the team id via query parameter
      teamItem.addEventListener('click', () => {
        window.location.href = `team.html?teamid=${team.id}`;
      });

      listContainer.appendChild(teamItem);
    });
  }
}

// Call the function when the page loads
window.addEventListener('load', getAndDisplayTeams);
showRankedList(currentRegion, document.getElementById(currentRegion));