document.addEventListener('DOMContentLoaded', function() {
    const actionSelect = document.getElementById('actionSelect');
    const dynamicFields = document.getElementById('dynamicFields');

    actionSelect.addEventListener('change', function() {
        updateDynamicFields(actionSelect.value);
    });

    function updateDynamicFields(action) {
        dynamicFields.innerHTML = ''; // Clear previous fields
        switch (action) {
            case 'addCategory':
            case 'removeCategory':
                dynamicFields.innerHTML = `
                    <label for="categoryName">Category Name:</label>
                    <input type="text" id="categoryName" name="categoryName">
                `;
                break;
            case 'addSubcategory':
            case 'removeSubcategory':
                dynamicFields.innerHTML = `
                    <label for="parentCategory">Select Category:</label>
                    <select id="parentCategory">
                        <!-- Populate with categories from your data -->
                    </select>
                    <label for="subcategoryName">Subcategory Name:</label>
                    <input type="text" id="subcategoryName" name="subcategoryName">
                `;
                break;
        }
    }

    // Populate categories for subcategory management
    function populateCategories() {
        const parentCategorySelect = document.getElementById('parentCategory');
        const categories = [
            "new arrivals", "bedroom", "living", "study", "kids", 
            "dining", "decor", "office", "kitchen", "doors", "wardrobes", "part sale"
        ]; // Replace with dynamic categories if needed

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            parentCategorySelect.appendChild(option);
        });
    }

    populateCategories();
});
