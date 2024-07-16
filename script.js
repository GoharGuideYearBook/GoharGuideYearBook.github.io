document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');

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

                const quote = document.createElement('p');
                quote.textContent = person.quote;

                infoDiv.appendChild(name);
                infoDiv.appendChild(quote);
                profileDiv.appendChild(img);
                profileDiv.appendChild(infoDiv);

                container.appendChild(profileDiv);
            });
        })
        .catch(error => console.error('Error fetching the people data:', error));
});