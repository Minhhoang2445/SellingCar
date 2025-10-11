document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('promotion-list-container');
    let cars = JSON.parse(localStorage.getItem('cars')) || [];

    function renderPromotions() {
        if (cars.length === 0) {
            container.innerHTML = '<p class="text-danger">No car data found in localStorage.</p>';
            return;
        }

        container.innerHTML = ''; // Clear the container

        cars.forEach(car => {
            const currentPrice = car.promoPrice ? `<span class="text-danger fw-bold">$${car.promoPrice.toLocaleString()}</span>` : 'No promotion';

            const carElementHTML = `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100">
                        <img src="${car.image}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${car.title}">
                        <div class="card-body">
                            <h5 class="card-title">${car.title}</h5>
                            <p class="card-text">Original Price: <strong>$${car.price.toLocaleString()}</strong></p>
                            <p class="card-text">Current Promo Price: ${currentPrice}</p>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" placeholder="New Promo Price" id="price-${car.id}">
                                <button class="btn btn-primary btn-save-promo" data-car-id="${car.id}">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += carElementHTML;
        });
    }

    container.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-save-promo')) {
            const carId = event.target.getAttribute('data-car-id');
            const priceInput = document.getElementById(`price-${carId}`);
            const newPrice = priceInput.value;
            const newPriceFloat = parseFloat(newPrice);
            if (newPriceFloat && newPriceFloat >= cars.find(car => car.id === carId).price) {
                alert("Giá khuyến mãi phải rẻ hơn giá gốc.");
                return;
            }
            // Find the car in our array
            const carIndex = cars.findIndex(car => car.id === carId);
            if (carIndex > -1) {
                // If input is empty, remove promotion. Otherwise, set it.
                cars[carIndex].promoPrice = newPrice ? parseFloat(newPrice) : null;

                // Save the entire updated array back to localStorage
                localStorage.setItem('cars', JSON.stringify(cars));

                alert(`Promotion for "${cars[carIndex].title}" has been updated!`);
                priceInput.value = ''; // Clear the input field
                renderPromotions(); // Re-render to show the updated status
            }
        }
    });

    // Initial render
    renderPromotions();
});