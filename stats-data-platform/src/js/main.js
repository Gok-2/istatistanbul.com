// JavaScript functionality for the statistics and data analysis platform website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            // Show corresponding section
            const sectionId = item.dataset.section;
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // File upload functionality
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    // Handle file upload
    document.getElementById('fileInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadArea.innerHTML = `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        }
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            uploadArea.innerHTML = `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        }
    });

    // Example function for processing data
    document.getElementById('processDataBtn').addEventListener('click', () => {
        alert('Data processing started!');
        // Implement data processing logic here
    });
});