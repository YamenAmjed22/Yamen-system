// Define card data
const cardData = [
    { name: "John Doe", date: "2024-08-10", duration: "11 days", salary: "$400" },
    { name: "Alice Johnson", date: "2024-08-11", duration: "10 days", salary: "$400" },
    { name: "Bob Brown", date: "2024-08-12", duration: "9 days", salary: "$400" },
    { name: "Michael Smith", date: "2024-08-13", duration: "8 days", salary: "$400" },
    { name: "Jessica White", date: "2024-08-14", duration: "7 days", salary: "$400" },
    { name: "Daniel Lee", date: "2024-08-15", duration: "6 days", salary: "$400" },
    { name: "Olivia Martinez", date: "2024-08-16", duration: "5 days", salary: "$400" },
    { name: "Emma Davis", date: "2024-08-15", duration: "4 days", salary: "$400" },
    { name: "Liam Brown", date: "2024-08-14", duration: "3 days", salary: "$400" },
    { name: "Sophia Wilson", date: "2024-08-13", duration: "2 days", salary: "$400" },
    { name: "Mia Taylor", date: "2024-08-13", duration: "1 days", salary: "$400" }
];

function createCard(card) {
    return `
        <div class="col-md-4 col-lg-3 mb-3">
            <div class="card vacation-card">
                <div class="card-body">
                    <div class="align-items-center">
                        <div class="text-center mb-3">
                            <img src="/images/8N7A5661.JPG" alt="Profile" class="card-photo">
                        </div>
                        <div class="text-start ms-3">
                            <h5 class="card-title text-center mb-4 ">${card.name}</h5>
                            <p class="card-text mb-0 fw-lighter mt-2">Submitted on:</p>
                            <p class="mt-1 fw-bold mb-0">${card.date}</p>
                            <p class="card-text fw-lighter mt-1 mb-0">Duration:</p>
                            <p class="fw-bold mb-0">${card.duration}</p>
                            <p class="card-text fw-lighter mt-0 mb-0">Salary:</p>
                            <p class="fw-bold mt-1">${card.salary}</p>
                        </div>
                    </div>
                    <div class="text-start mt-3 d-flex ">
                        <button class="btn btn-outline-success ms-auto mt-2 me-2">Decline</button>
                        <button class="btn btn-success">Approve</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayCards(cards) {
    const cardsContainer = document.getElementById('cards-container');
    // Clear the container before appending new cards
    cardsContainer.innerHTML = '';
    // Append new cards
    const cardMarkup = cards.map(card => createCard(card)).join('');
    cardsContainer.innerHTML = `
        <div class="row mt-4">
            ${cardMarkup}
        </div>
    `;
}

function filterCards(query) {
    const filteredCards = cardData.filter(card => {
        const searchTerm = query.toLowerCase();
        return card.name.toLowerCase().includes(searchTerm) ||
               card.date.toLowerCase().includes(searchTerm) ||
               card.duration.toLowerCase().includes(searchTerm) ||
               card.salary.toLowerCase().includes(searchTerm);
    });
    
    // Sort the filtered cards by duration and return top 4
    const sortedTopCards = filteredCards.sort((a, b) => {
        const durationA = parseInt(a.duration);
        const durationB = parseInt(b.duration);
        return durationB - durationA;
    }).slice(0, 4);

    return sortedTopCards;
}

function init() {
    // Display top 4 cards on page load
    displayTop4Cards();

    // Search functionality
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const query = searchInput.value;
        const filteredCards = filterCards(query);
        displayCards(filteredCards);
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        const filteredCards = filterCards(query);
        displayCards(filteredCards);
    });
}

// Display top 4 cards sorted by duration
function displayTop4Cards() {
    // Sort cards by duration (descending)
    const sortedTopCards = cardData.slice().sort((a, b) => {
        const durationA = parseInt(a.duration);
        const durationB = parseInt(b.duration);
        return durationB - durationA;
    }).slice(0, 4);

    displayCards(sortedTopCards);
}

// Initialize
document.addEventListener('DOMContentLoaded', init);
