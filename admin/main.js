const categories = {
    "new arrivals": { "furniture": ["item1", "item2", "item3"], "decor": ["item4", "item5"] },
    "bedroom": { "bed sets": ["bed", "headboard", "bed frame"], "storage": ["wardrobe", "nightstand", "dresser"], "furniture": ["armoire", "vanity", "mirror"], "accessories": ["side table", "dressing table", "cloth stand"] },
    "living": { "sofas": ["sofa", "recliner", "loveseat"], "tables": ["coffee table", "side table", "console table"], "storage": ["TV stand", "bookshelf", "cabinet"], "decor": ["rug", "lamp", "wall art"] },
    "study": { "furniture": ["desk", "chair", "bookshelf"], "storage": ["file cabinet", "storage bin", "organizer"], "decor": ["lamp", "wall art", "plant"] },
    "kids": { "furniture": ["bunk bed", "kids desk", "chair"], "storage": ["toy storage", "bookshelf", "closet"], "decor": ["wall decals", "lamp", "rug"] },
    "dining": { "furniture": ["dining table", "chairs", "sideboard"], "tableware": ["plates", "cutlery", "glasses"], "decor": ["centerpiece", "placemats", "candles"] },
    "decor": { "wall art": ["painting", "poster", "mirror"], "lighting": ["lamp", "chandelier", "sconce"], "accents": ["vase", "sculpture", "clock"] },
    "office": { "furniture": ["office desk", "office chair", "filing cabinet"], "storage": ["bookcase", "shelf", "storage box"], "accessories": ["lamp", "organizer", "mouse pad"] },
    "kitchen": { "appliances": ["fridge", "oven", "microwave"], "cabinets": ["upper cabinets", "lower cabinets", "pantry"], "furniture": ["kitchen island", "bar stools", "kitchen table"] },
    "doors": { "entry": ["front door", "back door", "screen door"], "interior": ["bedroom door", "bathroom door", "closet door"], "specialty": ["sliding door", "barn door", "french door"] },
    "wardrobes": { "types": ["sliding wardrobe", "walk-in wardrobe", "mirror wardrobe"], "accessories": ["hangers", "storage bins", "shoe rack"], "organizers": ["drawer dividers", "shelf dividers", "hanging organizers"] },
    "part sale": { "clearance": ["item on sale 1", "item on sale 2", "item on sale 3"], "seasonal": ["holiday sale", "summer sale", "winter sale"], "promotions": ["buy one get one", "discounted bundles", "flash sale"] }
};
function renderNavbar() {
    const navbar = document.querySelector('.navbar .nav ul');
    navbar.innerHTML = ''; // Clear existing items

    Object.keys(categories).forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `${category} <i class="fa-solid fa-angle-down"></i>`;
        const submenu = document.createElement('ul');
        submenu.classList.add('submenu');

        // Iterate over subcategories within the current category
        Object.keys(categories[category]).forEach(subcategory => {
            const subLi = document.createElement('li');
            subLi.innerHTML = `${subcategory} <i class="fa-solid fa-angle-right"></i>`;
            const subSubmenu = document.createElement('ul');

            // Add items to the subcategory
            categories[category][subcategory].forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.textContent = item;
                subSubmenu.appendChild(itemLi);
            });

            subLi.appendChild(subSubmenu);
            submenu.appendChild(subLi);
        });

        li.appendChild(submenu);
        navbar.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', renderNavbar);
