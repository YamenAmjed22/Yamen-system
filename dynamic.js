document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const query = document.getElementById('search-input').value.toLowerCase();
    const pages = document.querySelectorAll('.page');
    let found = false;

    // Check if the search query is empty
    if (query === '') {
        // If the search query is empty, reload the page
        window.location.reload();
        return;
    }

    // Hide all pages initially
    pages.forEach(page => {
        page.classList.add('d-none');
    });

    // Loop through all pages to check cards
    pages.forEach(page => {
        const cards = page.querySelectorAll('.vacation-card');
        let pageHasResults = false;

        cards.forEach(card => {
            const name = card.closest('[data-name]').getAttribute('data-name').toLowerCase();
            if (name.includes(query)) {
                card.closest('.col-md-6').style.display = 'block'; // Make the card visible
                pageHasResults = true;
            } else {
                card.closest('.col-md-6').style.display = 'none'; // Hide the card
            }
        });

        // Show the page if it has results
        if (pageHasResults) {
            page.classList.remove('d-none');
            found = true;
        }
    });

    // Show message if no results are found
    if (!found) {
        alert('No results found');
    } else {
        // Reset pagination and show the first page with results
        showPage(1);
    }
});

// Handle clearing the search input
document.getElementById('search-input').addEventListener('input', function() {
    if (this.value === '') {
        // If search input is cleared, reload the page
        window.location.reload();
    }
});

// Select All Checkbox
document.getElementById('select-all').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.select-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

// Pagination Logic
document.addEventListener('DOMContentLoaded', () => {
    const paginationLinks = document.querySelectorAll('.page-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageNumber = e.target.getAttribute('data-page');
            showPage(pageNumber);
        });
    });

    function showPage(pageNumber) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('d-none');
        });

        // Show the selected page
        document.getElementById(`page-${pageNumber}`).classList.remove('d-none');
    }

    // Initialize by showing the first page
    showPage(1);
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});