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

const cardsPerPage = 6;
let filteredData = [...cardData];
let filteredTotalPages = Math.ceil(filteredData.length / cardsPerPage);
let selectAllState = false;
let selectedCards = new Set(); // Track selected card indices

function createCard(card, index) {
    return `
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="card vacation-card">
                <div class="card-body">
                    <input type="checkbox" class="select-checkbox d-flex align-items-start" data-index="${index}" ${selectedCards.has(index) ? 'checked' : ''} />
                    <div class="align-items-center">
                        <div class="text-center mb-3">
                            <img src="/images/8N7A5661.JPG" alt="Profile" class="card-photo">
                        </div>
                        <div class="ms-3 text-start">
                            <h5 class="card-title text-center">${card.name}</h5>
                            <p class="card-text mb-0 fw-lighter mt-2">Submitted on:</p>
                            <p class="mt-1 fw-bold mb-0">${card.date}</p>
                            <p class="card-text fw-lighter mt-1 mb-0">Duration:</p>
                            <p class="fw-bold mb-0">${card.duration}</p>
                            <p class="card-text fw-lighter mt-0 mb-0">Salary:</p>
                            <p class="fw-bold mt-1">${card.salary}</p>
                        </div>
                    </div>
                    <div class="text-start mt-3">
                        <button class="btn btn-outline-success ms-auto mt-2 mt-md-0 me-2">Decline</button>
                        <button class="btn btn-success">Approve</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayPage(pageNumber) {
    const startIndex = (pageNumber - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, filteredData.length);
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = `
        <div class="row mt-4">
            ${filteredData.slice(startIndex, endIndex).map((card, index) => createCard(card, startIndex + index)).join('')}
        </div>
    `;
}

function createPagination() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';
    for (let i = 1; i <= filteredTotalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.dataset.page = i;
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            displayPage(parseInt(event.target.dataset.page));
        });
        pageItem.appendChild(pageLink);
        paginationControls.appendChild(pageItem);
    }
}

function updateAllCheckboxes(state) {
    if (state) {
        // Add all card indices to selectedCards
        for (let i = 0; i < cardData.length; i++) {
            selectedCards.add(i);
        }
    } else {
        // Clear all card indices from selectedCards
        selectedCards.clear();
    }

    // Update checkboxes on the current page
    document.querySelectorAll('.select-checkbox').forEach(checkbox => {
        checkbox.checked = state;
    });
}

function init() {
    displayPage(1);
    createPagination();
    updateAllCheckboxes(selectAllState);
}

// Handle clearing the search input
document.getElementById('search-input').addEventListener('input', function() {
    if (this.value === '') {
        filteredData = [...cardData];
        filteredTotalPages = Math.ceil(filteredData.length / cardsPerPage);
        init();
    }
});

// Search functionality
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const query = document.getElementById('search-input').value.toLowerCase();
    filteredData = cardData.filter(card => card.name.toLowerCase().includes(query));
    filteredTotalPages = Math.ceil(filteredData.length / cardsPerPage);
    init();
});

// Select All Checkbox
document.getElementById('select-all').addEventListener('change', function() {
    selectAllState = this.checked;
    updateAllCheckboxes(selectAllState);
});

// Handle individual checkbox change
document.getElementById('cards-container').addEventListener('change', function(e) {
    if (e.target.classList.contains('select-checkbox')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (e.target.checked) {
            selectedCards.add(index);
        } else {
            selectedCards.delete(index);
        }
    }
});

// Initialize
init();
// display 4 cardes 
