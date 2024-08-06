
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Function to load dark mode preference
    function loadDarkModePreference() {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    }

    // Function to save dark mode preference
    function saveDarkModePreference() {
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // Load dark mode preference on page load
    loadDarkModePreference();

    // Fetch the data from JSON file and display profiles
    fetch('data/people.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(people => {
            people.forEach(person => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                const img = document.createElement('img');
                img.src = person.img;
                img.alt = person.name;

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('info');

                const name = document.createElement('h3');
                name.textContent = person.name;

                const role = document.createElement('p');
                role.textContent = person.role;
                role.classList.add('role');

                const quote = document.createElement('p');
                quote.textContent = person.quote;

                infoDiv.appendChild(name);
                infoDiv.appendChild(role);
                infoDiv.appendChild(quote);
                profileDiv.appendChild(img);
                profileDiv.appendChild(infoDiv);
                container.appendChild(profileDiv);
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));

    // Add event listener to toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        saveDarkModePreference();
    });
});