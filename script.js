
// ============================
// GLOBAL VARIABLES
// ============================
let bookings = [];
let customers = [];
let destinations = [];
let nextCustomerId = 1; // Track next available customer ID

// ============================
// FORM VALIDATION FUNCTIONS
// ============================
function showError(elementId, messageId, show) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(messageId);

    if (show) {
        element.classList.add('is-invalid');
        errorElement.style.display = 'block';
    } else {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        errorElement.style.display = 'none';
    }
}

function validateRequired(fieldId, errorId) {
    const value = document.getElementById(fieldId).value.trim();
    const isValid = value !== '';
    showError(fieldId, errorId, !isValid);
    return isValid;
}

function validateEmail(fieldId, errorId) {
    const email = document.getElementById(fieldId).value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    showError(fieldId, errorId, !isValid);
    return isValid;
}

function validateNumber(fieldId, errorId, minValue = 1) {
    const value = parseFloat(document.getElementById(fieldId).value);
    const isValid = !isNaN(value) && value >= minValue;
    showError(fieldId, errorId, !isValid);
    return isValid;
}

function validateDate(fieldId, errorId) {
    const date = document.getElementById(fieldId).value;
    const isValid = date !== '';
    showError(fieldId, errorId, !isValid);
    return isValid;
}

// ============================
// BOOKING FORM VALIDATION
// ============================
function validateBookingForm() {
    let isValid = true;

    // Reset all errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.form-control').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });

    // Validate customer
    if (!validateRequired('bookingCustomer', 'customerError')) {
        isValid = false;
    }

    // Validate destination
    if (!validateRequired('bookingDestination', 'destinationError')) {
        isValid = false;
    }

    // Validate travel date
    if (!validateDate('bookingTravelDate', 'dateError')) {
        isValid = false;
    }

    // Validate travelers
    if (!validateNumber('bookingTravelers', 'travelersError', 1)) {
        isValid = false;
    }

    // Validate amount
    if (!validateNumber('bookingAmount', 'amountError', 1)) {
        isValid = false;
    }

    // Validate status
    if (!validateRequired('bookingStatus', 'statusError')) {
        isValid = false;
    }

    return isValid;
}

// ============================
// CUSTOMER FORM VALIDATION
// ============================
function validateCustomerForm() {
    let isValid = true;

    // Reset all errors
    document.querySelectorAll('#customerForm .error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('#customerForm .form-control').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });

    // Validate first name
    if (!validateRequired('customerFirstName', 'firstNameError')) {
        isValid = false;
    }

    // Validate last name
    if (!validateRequired('customerLastName', 'lastNameError')) {
        isValid = false;
    }

    // Validate email
    if (!validateRequired('customerEmail', 'emailError')) {
        isValid = false;
    } else if (!validateEmail('customerEmail', 'emailError')) {
        isValid = false;
    }

    return isValid;
}

// ============================
// DESTINATION FORM VALIDATION
// ============================
function validateDestinationForm() {
    let isValid = true;

    // Reset all errors
    document.querySelectorAll('#destinationForm .error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('#destinationForm .form-control').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });

    // Validate destination name
    if (!validateRequired('destinationName', 'destNameError')) {
        isValid = false;
    }

    // Validate country
    if (!validateRequired('destinationCountry', 'countryError')) {
        isValid = false;
    }

    // Validate price
    if (!validateNumber('destinationPrice', 'priceError', 1)) {
        isValid = false;
    }

    return isValid;
}

// ============================
// DATA MANAGEMENT
// ============================
function loadData() {
    console.log("Loading data from localStorage...");

    // Try to load data from localStorage
    const savedBookings = localStorage.getItem('travelBookings');
    const savedCustomers = localStorage.getItem('travelCustomers');
    const savedDestinations = localStorage.getItem('travelDestinations');

    // Parse data or use empty arrays
    bookings = savedBookings ? JSON.parse(savedBookings) : [];
    customers = savedCustomers ? JSON.parse(savedCustomers) : [];
    destinations = savedDestinations ? JSON.parse(savedDestinations) : [];

    // Calculate next available customer ID
    if (customers.length > 0) {
        nextCustomerId = Math.max(...customers.map(c => c.id)) + 1;
    } else {
        nextCustomerId = 1;
    }

    // If no data exists, initialize with sample data
    if (bookings.length === 0 || customers.length === 0 || destinations.length === 0) {
        console.log("Initializing with sample data...");
        initializeSampleData();
    }

    console.log("Data loaded successfully:");
    console.log("Bookings:", bookings.length);
    console.log("Customers:", customers.length);
    console.log("Destinations:", destinations.length);
    console.log("Next Customer ID will be:", nextCustomerId);
}

function initializeSampleData() {
    // Sample customers
    customers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main Street, New York"
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@email.com",
            phone: "+1 (555) 987-6543",
            address: "456 Oak Avenue, Los Angeles"
        },
        {
            id: 3,
            firstName: "Robert",
            lastName: "Johnson",
            email: "robert.j@email.com",
            phone: "+1 (555) 456-7890",
            address: "789 Pine Road, Chicago"
        }
    ];

    // Sample destinations
    destinations = [
        {
            id: 1,
            name: "Paris, France",
            country: "France",
            price: 1200,
            type: "city",
            description: "The city of love with iconic landmarks like the Eiffel Tower and Louvre Museum."
        },
        {
            id: 2,
            name: "Bali, Indonesia",
            country: "Indonesia",
            price: 950,
            type: "beach",
            description: "Tropical paradise with beautiful beaches, temples, and unique culture."
        },
        {
            id: 3,
            name: "Tokyo, Japan",
            country: "Japan",
            price: 1500,
            type: "city",
            description: "Vibrant metropolis blending ultramodern and traditional elements."
        }
    ];

    // Sample bookings
    bookings = [
        {
            id: 1,
            customerId: 1,
            destinationId: 1,
            travelDate: "2023-06-15",
            travelers: 2,
            amount: 2400,
            status: "confirmed",
            notes: "Honeymoon trip"
        },
        {
            id: 2,
            customerId: 2,
            destinationId: 2,
            travelDate: "2023-07-20",
            travelers: 4,
            amount: 3800,
            status: "pending",
            notes: "Family vacation"
        },
        {
            id: 3,
            customerId: 3,
            destinationId: 3,
            travelDate: "2023-08-10",
            travelers: 1,
            amount: 1500,
            status: "confirmed",
            notes: "Business trip"
        }
    ];

    // Set next customer ID
    nextCustomerId = 4;

    saveAllData();
}

function saveAllData() {
    console.log("Saving all data to localStorage...");
    localStorage.setItem('travelBookings', JSON.stringify(bookings));
    localStorage.setItem('travelCustomers', JSON.stringify(customers));
    localStorage.setItem('travelDestinations', JSON.stringify(destinations));
    console.log("Data saved successfully!");
}

// ============================
// UI FUNCTIONS
// ============================
function showAlert(message, type = 'success') {
    const alertHtml = `
                <div class="alert alert-${type} alert-dismissible fade show alert-message" role="alert">
                    <strong>${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Info!'}</strong> ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;

    document.getElementById('alertContainer').innerHTML = alertHtml;

    setTimeout(() => {
        const alert = document.querySelector('.alert-message');
        if (alert) {
            alert.remove();
        }
    }, 3000);
}

function showSection(sectionName) {
    // Hide all sections
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('bookings-section').style.display = 'none';
    document.getElementById('customers-section').style.display = 'none';
    document.getElementById('destinations-section').style.display = 'none';

    // Show selected section
    document.getElementById(sectionName + '-section').style.display = 'block';

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load section data
    if (sectionName === 'dashboard') {
        loadDashboard();
    } else if (sectionName === 'bookings') {
        loadBookingsTable();
    } else if (sectionName === 'customers') {
        loadCustomersTable();
    } else if (sectionName === 'destinations') {
        loadDestinationsGrid();
    }
}

function loadDashboard() {
    // Update stats
    document.getElementById('totalBookings').textContent = bookings.length;

    const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
    document.getElementById('activeBookings').textContent = activeBookings;

    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toLocaleString();

    document.getElementById('totalCustomers').textContent = customers.length;

    // Load recent bookings
    loadRecentBookings();
}

function loadRecentBookings() {
    const tableBody = document.getElementById('recentBookingsTable');
    tableBody.innerHTML = '';

    // Get 5 most recent bookings
    const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.travelDate) - new Date(a.travelDate))
        .slice(0, 5);

    if (recentBookings.length === 0) {
        tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center py-5">
                            <div class="empty-state">
                                <i class="fas fa-calendar-times"></i>
                                <h5>No Bookings Found</h5>
                                <p>Create your first booking to get started.</p>
                                <button class="btn btn-primary-custom" onclick="openBookingModal()">
                                    <i class="fas fa-plus-circle"></i> Create Booking
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
        return;
    }

    recentBookings.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customerId);
        const destination = destinations.find(d => d.id === booking.destinationId);

        const row = `
                    <tr>
                        <td>#${booking.id}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="customer-avatar me-2">
                                    ${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}
                                </div>
                                <span>${customer.firstName} ${customer.lastName}</span>
                            </div>
                        </td>
                        <td>${destination.name}</td>
                        <td>${formatDate(booking.travelDate)}</td>
                        <td>$${booking.amount}</td>
                        <td>
                            <span class="status-badge ${booking.status}">
                                ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="editBooking(${booking.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${booking.id}, 'booking')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;

        tableBody.innerHTML += row;
    });
}

function loadBookingsTable() {
    const tableBody = document.getElementById('bookingsTable');
    tableBody.innerHTML = '';

    if (bookings.length === 0) {
        tableBody.innerHTML = `
                    <tr>
                        <td colspan="8" class="text-center py-5">
                            <div class="empty-state">
                                <i class="fas fa-calendar-times"></i>
                                <h5>No Bookings Found</h5>
                                <p>Create your first booking to get started.</p>
                                <button class="btn btn-primary-custom" onclick="openBookingModal()">
                                    <i class="fas fa-plus-circle"></i> Create Booking
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
        return;
    }

    bookings.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customerId);
        const destination = destinations.find(d => d.id === booking.destinationId);

        const row = `
                    <tr>
                        <td>#${booking.id}</td>
                        <td>${customer.firstName} ${customer.lastName}</td>
                        <td>${destination.name}</td>
                        <td>${formatDate(booking.travelDate)}</td>
                        <td>${booking.travelers}</td>
                        <td>$${booking.amount}</td>
                        <td>
                            <span class="status-badge ${booking.status}">
                                ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="editBooking(${booking.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${booking.id}, 'booking')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;

        tableBody.innerHTML += row;
    });
}

function loadCustomersTable() {
    const tableBody = document.getElementById('customersTable');
    tableBody.innerHTML = '';

    if (customers.length === 0) {
        tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center py-5">
                            <div class="empty-state">
                                <i class="fas fa-users-slash"></i>
                                <h5>No Customers Found</h5>
                                <p>Add your first customer to get started.</p>
                                <button class="btn btn-primary-custom" onclick="openCustomerModal()">
                                    <i class="fas fa-plus-circle"></i> Add Customer
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
        return;
    }

    customers.forEach(customer => {
        const customerBookings = bookings.filter(b => b.customerId === customer.id);
        const totalSpent = customerBookings.reduce((sum, booking) => sum + booking.amount, 0);

        const row = `
                    <tr>
                        <td>#${customer.id}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="customer-avatar me-2">
                                    ${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}
                                </div>
                                <span>${customer.firstName} ${customer.lastName}</span>
                            </div>
                        </td>
                        <td>${customer.email}</td>
                        <td>${customer.phone || 'N/A'}</td>
                        <td>${customerBookings.length}</td>
                        <td>$${totalSpent}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="editCustomer(${customer.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${customer.id}, 'customer')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;

        tableBody.innerHTML += row;
    });
}

function loadDestinationsGrid() {
    const grid = document.getElementById('destinationsGrid');
    grid.innerHTML = '';

    if (destinations.length === 0) {
        grid.innerHTML = `
                    <div class="col-12">
                        <div class="dashboard-card text-center">
                            <div class="empty-state">
                                <i class="fas fa-map-marked-alt"></i>
                                <h5>No Destinations Found</h5>
                                <p>Add your first destination to get started.</p>
                                <button class="btn btn-primary-custom" onclick="openDestinationModal()">
                                    <i class="fas fa-plus-circle"></i> Add Destination
                                </button>
                            </div>
                        </div>
                    </div>
                `;
        return;
    }

    destinations.forEach(destination => {
        const card = `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="dashboard-card">
                            <h5>${destination.name}</h5>
                            <p class="text-muted">${destination.country}</p>
                            <p>${destination.description}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <h4 class="text-primary">$${destination.price}</h4>
                                    <small class="text-muted">per person</small>
                                </div>
                                <span class="badge bg-secondary">${destination.type}</span>
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-sm btn-outline-primary me-1" onclick="editDestination(${destination.id})">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${destination.id}, 'destination')">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `;

        grid.innerHTML += card;
    });
}

// ============================
// MODAL FUNCTIONS
// ============================
function openBookingModal(bookingId = null) {
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    const title = document.getElementById('bookingModalTitle');

    // Reset form and errors
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingId').value = '';
    document.querySelectorAll('#bookingForm .error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('#bookingForm .form-control').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });

    // Populate customer dropdown
    const customerSelect = document.getElementById('bookingCustomer');
    customerSelect.innerHTML = '<option value="">Select Customer</option>';
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.firstName} ${customer.lastName}`;
        customerSelect.appendChild(option);
    });

    // Populate destination dropdown
    const destinationSelect = document.getElementById('bookingDestination');
    destinationSelect.innerHTML = '<option value="">Select Destination</option>';
    destinations.forEach(destination => {
        const option = document.createElement('option');
        option.value = destination.id;
        option.textContent = `${destination.name} ($${destination.price})`;
        destinationSelect.appendChild(option);
    });

    // Set default date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('bookingTravelDate').value = tomorrow.toISOString().split('T')[0];

    // If editing, populate with existing data
    if (bookingId) {
        title.textContent = 'Edit Booking';
        const booking = bookings.find(b => b.id === bookingId);

        if (booking) {
            document.getElementById('bookingId').value = booking.id;
            document.getElementById('bookingCustomer').value = booking.customerId;
            document.getElementById('bookingDestination').value = booking.destinationId;
            document.getElementById('bookingTravelDate').value = booking.travelDate;
            document.getElementById('bookingTravelers').value = booking.travelers;
            document.getElementById('bookingAmount').value = booking.amount;
            document.getElementById('bookingStatus').value = booking.status;
            document.getElementById('bookingNotes').value = booking.notes || '';
        }
    } else {
        title.textContent = 'Add New Booking';
    }

    modal.show();
}

function openCustomerModal(customerId = null) {
    const modal = new bootstrap.Modal(document.getElementById('customerModal'));
    const title = document.getElementById('customerModalTitle');

    // Reset form and errors
    document.getElementById('customerForm').reset();
    document.getElementById('customerId').value = '';
    document.querySelectorAll('#customerForm .error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('#customerForm .form-control').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });

    if (customerId) {
        title.textContent = 'Edit Customer';
        const customer = customers.find(c => c.id === customerId);

        if (customer) {
            document.getElementById('customerId').value = customer.id;
            document.getElementById('customerFirstName').value = customer.firstName;
            document.getElementById('customerLastName').value = customer.lastName;
            document.getElementById('customerEmail').value = customer.email;
            document.getElementById('customerPhone').value = customer.phone || '';
            document.getElementById('customerAddress').value = customer.address || '';
        }
    } else {
        title.textContent = 'Add New Customer';
    }

    modal.show();
}

function openDestinationModal(destinationId = null) {
    const modal = new bootstrap.Modal(document.getElementById('destinationModal'));
    const title = document.getElementById('destinationModalTitle');

    // Reset form and errors
    document.getElementById('destinationForm').reset();
    document.getElementById('destinationId').value = '';
    document.querySelectorAll('#destinationForm .error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('#destinationForm .form-control').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
    });

    if (destinationId) {
        title.textContent = 'Edit Destination';
        const destination = destinations.find(d => d.id === destinationId);

        if (destination) {
            document.getElementById('destinationId').value = destination.id;
            document.getElementById('destinationName').value = destination.name;
            document.getElementById('destinationCountry').value = destination.country;
            document.getElementById('destinationPrice').value = destination.price;
            document.getElementById('destinationType').value = destination.type || 'beach';
            document.getElementById('destinationDescription').value = destination.description || '';
        }
    } else {
        title.textContent = 'Add New Destination';
    }

    modal.show();
}

// ============================
// CRUD OPERATIONS WITH VALIDATION
// ============================
function validateAndSaveBooking() {
    if (!validateBookingForm()) {
        showAlert('Please fill all required fields correctly', 'error');
        return;
    }

    // Get form values
    const bookingId = document.getElementById('bookingId').value;
    const customerId = parseInt(document.getElementById('bookingCustomer').value);
    const destinationId = parseInt(document.getElementById('bookingDestination').value);
    const travelDate = document.getElementById('bookingTravelDate').value;
    const travelers = parseInt(document.getElementById('bookingTravelers').value);
    const amount = parseFloat(document.getElementById('bookingAmount').value);
    const status = document.getElementById('bookingStatus').value;
    const notes = document.getElementById('bookingNotes').value;

    // Create booking object
    const bookingData = {
        customerId,
        destinationId,
        travelDate,
        travelers,
        amount,
        status,
        notes
    };

    if (bookingId) {
        // Update existing booking
        const index = bookings.findIndex(b => b.id === parseInt(bookingId));
        if (index !== -1) {
            bookings[index] = { ...bookings[index], ...bookingData };
            showAlert('Booking updated successfully!', 'success');
        }
    } else {
        // Create new booking
        const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
        bookingData.id = newId;
        bookings.push(bookingData);
        showAlert('Booking created successfully!', 'success');
    }

    // Save to localStorage
    saveAllData();

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();

    // Refresh UI
    loadDashboard();
    if (document.getElementById('bookings-section').style.display !== 'none') {
        loadBookingsTable();
    }
}

function validateAndSaveCustomer() {
    if (!validateCustomerForm()) {
        showAlert('Please fill all required fields correctly', 'error');
        return;
    }

    // Get form values
    const customerId = document.getElementById('customerId').value;
    const firstName = document.getElementById('customerFirstName').value.trim();
    const lastName = document.getElementById('customerLastName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    // Create customer object
    const customerData = {
        firstName,
        lastName,
        email,
        phone,
        address
    };

    if (customerId) {
        // Update existing customer
        const index = customers.findIndex(c => c.id === parseInt(customerId));
        if (index !== -1) {
            customers[index] = { ...customers[index], ...customerData };
            showAlert('Customer updated successfully!', 'success');
        }
    } else {
        // Create new customer with auto-incremented ID
        customerData.id = nextCustomerId;
        customers.push(customerData);
        nextCustomerId++; // Increment for next customer
        showAlert('Customer created successfully!', 'success');
    }

    // Save to localStorage
    saveAllData();

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('customerModal')).hide();

    // Refresh UI
    loadDashboard();
    if (document.getElementById('customers-section').style.display !== 'none') {
        loadCustomersTable();
    }
}

function validateAndSaveDestination() {
    if (!validateDestinationForm()) {
        showAlert('Please fill all required fields correctly', 'error');
        return;
    }

    // Get form values
    const destinationId = document.getElementById('destinationId').value;
    const name = document.getElementById('destinationName').value.trim();
    const country = document.getElementById('destinationCountry').value.trim();
    const price = parseFloat(document.getElementById('destinationPrice').value);
    const type = document.getElementById('destinationType').value;
    const description = document.getElementById('destinationDescription').value.trim();

    // Create destination object
    const destinationData = {
        name,
        country,
        price,
        type,
        description
    };

    if (destinationId) {
        // Update existing destination
        const index = destinations.findIndex(d => d.id === parseInt(destinationId));
        if (index !== -1) {
            destinations[index] = { ...destinations[index], ...destinationData };
            showAlert('Destination updated successfully!', 'success');
        }
    } else {
        // Create new destination
        const newId = destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1;
        destinationData.id = newId;
        destinations.push(destinationData);
        showAlert('Destination created successfully!', 'success');
    }

    // Save to localStorage
    saveAllData();

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('destinationModal')).hide();

    // Refresh UI
    loadDashboard();
    if (document.getElementById('destinations-section').style.display !== 'none') {
        loadDestinationsGrid();
    }
}

// ============================
// EDIT FUNCTIONS
// ============================
function editBooking(bookingId) {
    openBookingModal(bookingId);
}

function editCustomer(customerId) {
    openCustomerModal(customerId);
}

function editDestination(destinationId) {
    openDestinationModal(destinationId);
}

// ============================
// DELETE FUNCTIONS
// ============================
function deleteItem(itemId, itemType) {
    let itemName = '';

    if (itemType === 'booking') {
        const booking = bookings.find(b => b.id === itemId);
        if (booking) {
            const customer = customers.find(c => c.id === booking.customerId);
            itemName = `booking for ${customer.firstName} ${customer.lastName}`;
        }
    } else if (itemType === 'customer') {
        const customer = customers.find(c => c.id === itemId);
        if (customer) {
            itemName = `${customer.firstName} ${customer.lastName}`;

            // Check if customer has bookings
            const hasBookings = bookings.some(b => b.customerId === itemId);
            if (hasBookings) {
                showAlert('Cannot delete customer with existing bookings. Delete the bookings first.', 'error');
                return;
            }
        }
    } else if (itemType === 'destination') {
        const destination = destinations.find(d => d.id === itemId);
        if (destination) {
            itemName = destination.name;

            // Check if destination has bookings
            const hasBookings = bookings.some(b => b.destinationId === itemId);
            if (hasBookings) {
                showAlert('Cannot delete destination with existing bookings. Delete the bookings first.', 'error');
                return;
            }
        }
    }

    document.getElementById('deleteMessage').textContent = `Are you sure you want to delete ${itemName}?`;
    document.getElementById('deleteId').value = itemId;
    document.getElementById('deleteType').value = itemType;

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

function confirmDelete() {
    const itemId = parseInt(document.getElementById('deleteId').value);
    const itemType = document.getElementById('deleteType').value;

    if (itemType === 'booking') {
        bookings = bookings.filter(b => b.id !== itemId);
        showAlert('Booking deleted successfully!', 'success');
    } else if (itemType === 'customer') {
        customers = customers.filter(c => c.id !== itemId);
        showAlert('Customer deleted successfully!', 'success');

        // Recalculate next customer ID after deletion
        if (customers.length > 0) {
            nextCustomerId = Math.max(...customers.map(c => c.id)) + 1;
        } else {
            nextCustomerId = 1;
        }
    } else if (itemType === 'destination') {
        destinations = destinations.filter(d => d.id !== itemId);
        showAlert('Destination deleted successfully!', 'success');
    }

    // Save to localStorage
    saveAllData();

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();

    // Refresh UI
    loadDashboard();
    if (document.getElementById('bookings-section').style.display !== 'none') {
        loadBookingsTable();
    }
    if (document.getElementById('customers-section').style.display !== 'none') {
        loadCustomersTable();
    }
    if (document.getElementById('destinations-section').style.display !== 'none') {
        loadDestinationsGrid();
    }
}

// ============================
// UTILITY FUNCTIONS
// ============================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============================
// INITIALIZATION
// ============================
function initializeApp() {
    console.log("Initializing Travel Agency Dashboard...");

    // Load data
    loadData();

    // Load dashboard
    loadDashboard();

    // Setup event listeners for real-time validation
    setupRealTimeValidation();

    console.log("App initialized successfully!");
}

function setupRealTimeValidation() {
    // Real-time validation for booking form
    document.getElementById('bookingCustomer')?.addEventListener('change', function () {
        validateRequired('bookingCustomer', 'customerError');
    });

    document.getElementById('bookingDestination')?.addEventListener('change', function () {
        validateRequired('bookingDestination', 'destinationError');
    });

    document.getElementById('bookingTravelDate')?.addEventListener('change', function () {
        validateDate('bookingTravelDate', 'dateError');
    });

    document.getElementById('bookingTravelers')?.addEventListener('input', function () {
        validateNumber('bookingTravelers', 'travelersError', 1);
    });

    document.getElementById('bookingAmount')?.addEventListener('input', function () {
        validateNumber('bookingAmount', 'amountError', 1);
    });

    // Real-time validation for customer form
    document.getElementById('customerFirstName')?.addEventListener('input', function () {
        validateRequired('customerFirstName', 'firstNameError');
    });

    document.getElementById('customerLastName')?.addEventListener('input', function () {
        validateRequired('customerLastName', 'lastNameError');
    });

    document.getElementById('customerEmail')?.addEventListener('input', function () {
        validateEmail('customerEmail', 'emailError');
    });

    // Real-time validation for destination form
    document.getElementById('destinationName')?.addEventListener('input', function () {
        validateRequired('destinationName', 'destNameError');
    });

    document.getElementById('destinationCountry')?.addEventListener('input', function () {
        validateRequired('destinationCountry', 'countryError');
    });

    document.getElementById('destinationPrice')?.addEventListener('input', function () {
        validateNumber('destinationPrice', 'priceError', 1);
    });
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);
