// This function initializes your car database in localStorage if it doesn't exist.
function initializeCarData() {
    // Check if the 'cars' data is already in localStorage
    if (!localStorage.getItem('cars')) {
        console.log('Initializing car data for the first time...');
        const initialCars = [
            {
                id: 'tesla-model-3',
                status: 'New',
                image: '../resource/Tesla.png',
                title: 'Tesla Model 3',
                price: 35000,
                promoPrice: null,
                location: 'Florida, USA',
                year: 2025,
                drive: 'Rear-Wheel Drive',
                fuel: 'Electric',
                seats: 5,
                rating: 4,
                reviews: 12
            },
            {
                id: 'ford-f250',
                status: 'New',
                image: '../resource/Ford.png',
                title: 'Ford F-250 Super Duty',
                price: 82000,
                promoPrice: null,
                location: 'Milan, Italy',
                year: 2025,
                drive: '4-Wheel Drive',
                fuel: 'Gasoline',
                seats: 5,
                rating: 5,
                reviews: 30
            },
            {
                id: 'toyota-corolla',
                status: 'New',
                image: '../resource/Honda.png',
                title: 'Toyota Corolla Altis',
                price: 28000,
                promoPrice: null,
                location: 'Tokyo, Japan',
                year: 2025,
                drive: 'Front-Wheel Drive',
                fuel: 'Gasoline',
                seats: 5,
                rating: 3,
                reviews: 8
            },
            {
                id: 'tesla-model-3-blue',
                status: 'Used',
                // AND for this car. No problem at all.
                image: '../resource/Tesla.png',
                title: 'Tesla Model 3 - Blue (Used)',
                price: 31000,
                promoPrice: 29500,
                location: 'California, USA',
                year: 2021,
                drive: 'Rear-Wheel Drive',
                fuel: 'Gasoline',
                seats: 5,
                rating: 4,
                reviews: 45
            }
            // Add more cars here
        ];

        // Save the initial data to localStorage
        localStorage.setItem('cars', JSON.stringify(initialCars));
    }
}

// Run the initialization function when the admin script loads
initializeCarData();
document.addEventListener('DOMContentLoaded', function () {

    
    const carsContainer = document.getElementById('car-list-container');
    const allCars = JSON.parse(localStorage.getItem('cars')) || [];

    function renderAllCars() {
        carsContainer.innerHTML = '';

        if (allCars.length === 0) {
            carsContainer.innerHTML = '<p class="text-center text-muted">Sorry, no cars are available at the moment.</p>';
            return;
        }

        allCars.forEach(car => {
            const badgeClass = car.status === 'New' ? 'new_css' : 'used_css';
            const ratingStars = '★'.repeat(car.rating) + '☆'.repeat(5 - car.rating);

            let priceHTML = '';
            const hasPromo = car.promoPrice && car.promoPrice < car.price;
            if (hasPromo) {
                priceHTML = `
                <p class="d-flex align-items-baseline mb-1">
                    <del class="text-secondary fw-light me-2">$${car.price.toLocaleString()}</del>
                    <span class="fw-bold fs-4 text-danger">$${car.promoPrice.toLocaleString()}</span>
                </p>`;
            } else {
                priceHTML = `
                <p class="fw-bold fs-4 text-primary mb-1">$${car.price.toLocaleString()}</p>`;
            }

            // --- ROLLED-BACK CARD DESIGN ---
            // This is your original vertical card grid layout.
            const carHTML = `
                 <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <div class="card position-relative card_css" style="width: 20rem;">
                        <div class="ribbon"><img src="../resource/corner_ribbon.png" alt="Featured" /></div>
                        <img src="${car.image}" class="card-img-top" alt="${car.title}">
                        <div class="card-body">
                            <span class="badge ${badgeClass}">${car.status}</span>
                            <h5 class="card-title mt-2">${car.title}</h5>
                            <p class="fw-bold fs-4 text-primary mb-1">${priceHTML}</p>
                            <p class="mb-3">${car.location}</p>
                            <div class="row g-2">
                                <div class="col-4 d-flex align-items-center">
                                    <span class="me-2">📅</span><small>${car.year}</small>
                                </div>
                                <div class="col-8 d-flex align-items-center">
                                    <span class="me-2">⚙️</span><small>${car.drive}</small>
                                </div>
                                <div class="col-4 d-flex align-items-center">
                                    <span class="me-2">⛽</span><small>${car.fuel}</small>
                                </div>
                                <div class="col-8 d-flex align-items-center">
                                    <span class="me-2">👥</span><small>${car.seats} seats</small>
                                </div>
                            </div>
                            <hr class="bg-white">
                            <div class="text-white">
                                <span class="fs-4 text-warning">${ratingStars}</span>
                                <span class="fs-5">(${car.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            carsContainer.innerHTML += carHTML;
            
        });
    }

    renderAllCars();

});
document.addEventListener('DOMContentLoaded', function () {
    function initializeSlider(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return; 
        const range = container.querySelector(".range-track");
        const minPriceDisplay = container.querySelector('[id^="min-price-display"]');
        const maxPriceDisplay = container.querySelector('[id^="max-price-display"]');
        const rangeInput = container.querySelectorAll(".custom-range-slider input");

        let minRangeValueGap = 100000;
        let minRange, maxRange;

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            }).format(value);
        };

        const rangeFill = () => {
            if (!range) return;
            range.style.left = (rangeInput[0].value / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (rangeInput[1].value / rangeInput[1].max) * 100 + "%";
        };

        const setMinValueOutput = () => {
            minRange = parseInt(rangeInput[0].value);
            if (minPriceDisplay) minPriceDisplay.innerHTML = formatCurrency(minRange);
        };

        const setMaxValueOutput = () => {
            maxRange = parseInt(rangeInput[1].value);
            if (maxPriceDisplay) maxPriceDisplay.innerHTML = formatCurrency(maxRange);
        };

        rangeInput.forEach((input) => {
            input.addEventListener("input", (e) => {
                setMinValueOutput();
                setMaxValueOutput();
                rangeFill();

                if (maxRange - minRange < minRangeValueGap) {
                    if (e.target.className === "min") {
                        rangeInput[0].value = maxRange - minRangeValueGap;
                        setMinValueOutput();
                        rangeFill();
                    } else {
                        rangeInput[1].value = minRange + minRangeValueGap;
                        setMaxValueOutput();
                        rangeFill();
                    }
                }
            });
        });

        setMinValueOutput();
        setMaxValueOutput();
        rangeFill();
    }

    initializeSlider('.d-lg-block .filter-pane'); // For the static, large-screen slider
    initializeSlider('.offcanvas .filter-pane');     // For the offcanvas, small-screen slider
});