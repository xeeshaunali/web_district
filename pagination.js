<script>
    // Function to handle pagination
    function paginate(items, currentPage, perPage) {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        return items.slice(start, end);
    }

    // Function to update table rows based on current page
    function updateTableRows(currentPage, perPage) {
        const rows = $('#dataTable tbody tr');
        const paginatedRows = paginate(rows, currentPage, perPage);

        rows.hide(); // Hide all rows
        paginatedRows.show(); // Show rows for the current page
    }

    // Function to update pagination links
    function updatePaginationLinks(currentPage, totalPages) {
        const pagination = $('#pagination');
        pagination.empty(); // Clear previous pagination links

        // Add Previous Page link
        pagination.append(`<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
                          </li>`);

        // Add Page links
        for (let i = 1; i <= totalPages; i++) {
            pagination.append(`<li class="page-item ${currentPage === i ? 'active' : ''}">
                                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                              </li>`);
        }

        // Add Next Page link
        pagination.append(`<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
                          </li>`);
    }

    // Function to handle page change
    function changePage(newPage) {
        const totalPages = Math.ceil($('#dataTable tbody tr').length / 20); // Assuming 20 rows per page
        const currentPage = Math.min(Math.max(newPage, 1), totalPages); // Ensure page is within bounds

        updateTableRows(currentPage, 20); // Update table rows
        updatePaginationLinks(currentPage, totalPages); // Update pagination links
    }

    // Initialize table and pagination on page load
    $(document).ready(function () {
        updateTableRows(1, 20); // Initialize with the first page and 20 rows per page
        updatePaginationLinks(1, Math.ceil($('#dataTable tbody tr').length / 4)); // Initialize pagination links
    });

    // Function to handle search input
    $('#searchInput').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        const rows = $('#dataTable tbody tr');

        // Filter rows based on search input
        rows.filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
        });

        // Update pagination links after filtering
        updatePaginationLinks(1, Math.ceil(rows.filter(':visible').length / 20));
    });
</script>