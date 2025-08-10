document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    function loadDarkModePreference() {
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode === "enabled") {
            document.body.classList.add("dark-mode");
        }
    }

    function saveDarkModePreference() {
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    }

    loadDarkModePreference();

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        saveDarkModePreference();
    });

    /**
     * Load people from a JSON file and inject them into a specific container.
     * @param {string} jsonPath - Path to JSON file.
     * @param {string} containerId - ID of the container to inject into.
     */
    function loadPeople(jsonPath, containerId) {
        const container = document.getElementById(containerId);

        fetch(jsonPath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network fucked up. :skull:");
                }
                return response.json();
            })
            .then((people) => {
                people.forEach((person) => {
                    const profileDiv = document.createElement("div");
                    profileDiv.classList.add("profile");

                    const img = document.createElement("img");
                    img.src = person.img;
                    img.alt = person.name;

                    const infoDiv = document.createElement("div");
                    infoDiv.classList.add("info");

                    const name = document.createElement("h3");
                    name.textContent = person.name;

                    const role = document.createElement("p");
                    role.textContent = person.role;
                    role.classList.add("role");

                    const quote = document.createElement("p");
                    quote.textContent = person.quote;

                    infoDiv.appendChild(name);
                    infoDiv.appendChild(role);
                    infoDiv.appendChild(quote);
                    profileDiv.appendChild(img);
                    profileDiv.appendChild(infoDiv);
                    container.appendChild(profileDiv);
                });
            })
            .catch((error) =>
                console.error("There was a problem with the fetch operation:", error)
            );
    }

    // Load multiple JSON files
    loadPeople("data/people-23-24.json", "container-23-24");
    loadPeople("data/people-24-25.json", "container-24-25");
});
