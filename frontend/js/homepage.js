
document.addEventListener('DOMContentLoaded', function () {
    const userDisplay = document.getElementById('user-display');
    const signinLink = document.getElementById('signin-link');
    const signoutLink = document.getElementById('signout-link');
    const adminLink = document.getElementById('admin-link');

    function truncateName(name, maxLength = 15) {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
    }

    const currentUserJSON = sessionStorage.getItem('currentUser');

    if (currentUserJSON) {
        const currentUser = JSON.parse(currentUserJSON);

        signinLink.classList.add('d-none');

        userDisplay.classList.remove('d-none');
        signoutLink.classList.remove('d-none');

        userDisplay.textContent = truncateName(currentUser.name);

        if (currentUser.role === 'manager') {
            adminLink.classList.remove('d-none');
        }

    } else {
        signinLink.classList.remove('d-none');
    }

    signoutLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        sessionStorage.removeItem('currentUser');

        window.location.reload();
    });
   
    const newCarsButton = document.getElementById('btnradio4');
    const usedCarsButton = document.getElementById('btnradio5');
    const carsContainer = document.getElementById('recommended-cars-container');
    let recommendedCars = JSON.parse(localStorage.getItem('cars')) || [];
    function renderCars(filterStatus) {

        carsContainer.innerHTML = '';

        const carsToDisplay = recommendedCars.filter(car => car.status === filterStatus);

        carsToDisplay.forEach(car => {
            const badgeClass = car.status === 'New' ? 'new_css' : 'used_css';
            const ratingStars = '★'.repeat(car.rating) + '☆'.repeat(5 - car.rating);
            let priceHTML = '';
            const hasPromo = car.promoPrice && car.promoPrice < car.price;

            if (hasPromo) {
                priceHTML = `
        <p class="d-flex align-items-baseline mb-1">
            <del class="text-secondary fw-light me-2">$${car.price.toLocaleString()}</del>
            <span class="fw-bold fs-4 text-danger">$${car.promoPrice.toLocaleString()}</span>
        </p>
    `;
            } else {
                priceHTML = `
        <p class="fw-bold fs-4 text-primary mb-1">$${car.price.toLocaleString()}</p>
    `;
            }
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

    newCarsButton.addEventListener('click', () => renderCars('New'));
    usedCarsButton.addEventListener('click', () => renderCars('Used'));

    renderCars('New');
    const compareContainer = document.getElementById('compare-cars-container');
    const compareModalEl = document.getElementById('compareModal');
    const compareModalBody = document.getElementById('compare-modal-body');

    
    let carsForComparison = JSON.parse(localStorage.getItem('cars')) || [];
    const car1 = carsForComparison.find(car => car.title.includes("Tesla Model 3")) || carsForComparison[0];
    const car2 = carsForComparison.find(car => car.title.includes("Ford F-250")) || carsForComparison[1];

    const createCompareCarCardHTML = (car) => {
        if (!car) return ''; 

        const badgeClass = car.status === 'New' ? 'new_css' : 'used_css';
        const ratingStars = '★'.repeat(car.rating) + '☆'.repeat(5 - car.rating);

        let priceHTML = '';
        const hasPromo = car.promoPrice && car.promoPrice < car.price;
        if (hasPromo) {
            priceHTML = `<p class="d-flex align-items-baseline mb-1">
                           <del class="text-secondary fw-light me-2">$${car.price.toLocaleString()}</del>
                           <span class="fw-bold fs-4 text-danger">$${car.promoPrice.toLocaleString()}</span>
                         </p>`;
        } else {
            priceHTML = `<p class="fw-bold fs-4 text-primary mb-1">$${car.price.toLocaleString()}</p>`;
        }

        return `
           <div class="col-12 col-md-5 d-flex justify-content-center">
               <div class="card position-relative card_css" style="width: 25rem;">
                   <div class="ribbon"><img src="../resource/corner_ribbon.png" alt="Featured" /></div>
                   <img src="${car.image}" class="card-img-top" alt="${car.title}">
                   <div class="card-body">
                       <span class="badge ${badgeClass}">${car.status}</span>
                       <h5 class="card-title mt-2">${car.title}</h5>
                       ${priceHTML}
                       <p class="mb-3">${car.location}</p>
                       <div class="row g-2">
                           <div class="col-4 d-flex align-items-center"><span class="me-2">📅</span><small>${car.year}</small></div>
                           <div class="col-8 d-flex align-items-center"><span class="me-2">⚙️</span><small>${car.drive}</small></div>
                           <div class="col-4 d-flex align-items-center"><span class="me-2">⛽</span><small>${car.fuel}</small></div>
                           <div class="col-8 d-flex align-items-center"><span class="me-2">👥</span><small>${car.seats} seats</small></div>
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
    };

    function renderCompareCars(carA, carB) {
        if (!carA || !carB) {
            compareContainer.innerHTML = "<p class='text-white text-center'>Could not load cars to compare.</p>";
            return;
        }

        compareContainer.innerHTML = `
           ${createCompareCarCardHTML(carA)}
           <div class="col-12 col-md-2 d-flex justify-content-center align-items-center">
               <div class="vs-circle">VS</div>
           </div>
           ${createCompareCarCardHTML(carB)}
       `;
    }

    function populateCompareModal(carA, carB) {
        if (!carA || !carB) {
            compareModalBody.innerHTML = "<p class='text-center'>Comparison data is not available.</p>";
            return;
        }

        const features = [
            { label: 'Price', key: 'price', format: val => val ? `$${val.toLocaleString()}` : 'N/A' },
            { label: 'Year', key: 'year' },
            { label: 'Drive Type', key: 'drive' },
            { label: 'Fuel Type', key: 'fuel' },
            { label: 'Seats', key: 'seats', format: val => `${val} seats` },
            { label: 'Rating', key: 'rating', format: val => '★'.repeat(val) + '☆'.repeat(5 - val) }
        ];

        const tableRowsHTML = features.map(feature => {
            const valA = feature.format ? feature.format(carA[feature.key]) : carA[feature.key] || 'N/A';
            const valB = feature.format ? feature.format(carB[feature.key]) : carB[feature.key] || 'N/A';
            return `
               <tr>
                   <td class="feature-label text-primary">${feature.label}</td>
                   <td>${valA}</td>
                   <td>${valB}</td>
               </tr>
           `;
        }).join('');

        compareModalBody.innerHTML = `
           <div class="container-fluid">
               <table class="table comparison-table">
                   <thead>
                       <tr>
                           <th>Feature</th>
                           <th>
                               
                               <h5>${carA.title}</h5>
                           </th>
                           <th>
                               
                               <h5>${carB.title}</h5>
                           </th>
                       </tr>
                   </thead>
                   <tbody>
                       ${tableRowsHTML}
                   </tbody>
               </table>
           </div>
        `;
    }

    renderCompareCars(car1, car2);

    if (compareModalEl) {
        compareModalEl.addEventListener('show.bs.modal', function () {
            populateCompareModal(car1, car2);
        });
    }

    let minRangeValueGap = 100000;
    const range = document.getElementById("range-track");
    const minPriceDisplay = document.getElementById("min-price-display");
    const maxPriceDisplay = document.getElementById("max-price-display");
    const rangeInput = document.querySelectorAll(".custom-range-slider input");

    let minRange, maxRange;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(value);
    };

    const minRangeFill = () => {
        range.style.left = (rangeInput[0].value / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (rangeInput[1].value / rangeInput[1].max) * 100 + "%";
    };

    const setMinValueOutput = () => {
        minRange = parseInt(rangeInput[0].value);
        minPriceDisplay.innerHTML = formatCurrency(minRange);
    };

    const setMaxValueOutput = () => {
        maxRange = parseInt(rangeInput[1].value);
        maxPriceDisplay.innerHTML = formatCurrency(maxRange);
    };

    setMinValueOutput();
    setMaxValueOutput();
    minRangeFill();

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            setMinValueOutput();
            setMaxValueOutput();
            minRangeFill();

            if (maxRange - minRange < minRangeValueGap) {
                if (e.target.className === "min") {
                    rangeInput[0].value = maxRange - minRangeValueGap;
                    setMinValueOutput();
                    minRangeFill();
                    e.target.style.zIndex = "2";
                } else {
                    rangeInput[1].value = minRange + minRangeValueGap;
                    e.target.style.zIndex = "2";
                    setMaxValueOutput();
                    minRangeFill();
                }
            }
        });
    });

});
