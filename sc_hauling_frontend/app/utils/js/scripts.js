document.addEventListener('DOMContentLoaded', function() {
    let waypoints = [];
    const input = document.getElementById('waypoint_input');
    const dropdown = document.getElementById('waypoint_dropdown');
    const LIMIT_RESULTS = false; // Set to false to show all

    fetch('/api/waypoints')
        .then(res => res.json())
        .then(names => {
            waypoints = names;
        });

    input.addEventListener('input', function() {
        const value = input.value.toLowerCase();
        dropdown.innerHTML = '';
        let filtered;
        if (!value) {
            // Show all waypoints if input is empty
            filtered = waypoints.slice(0, LIMIT_RESULTS ? 15 : waypoints.length);
        } else {
            filtered = waypoints
                .filter(wp => wp.toLowerCase().includes(value))
                .slice(0, LIMIT_RESULTS ? 15 : waypoints.length);
        }
        if (filtered.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        filtered.forEach(wp => {
            const div = document.createElement('div');
            div.textContent = wp;
            div.onclick = function() {
                input.value = wp;
                dropdown.style.display = 'none';
            };
            dropdown.appendChild(div);
        });
        dropdown.style.display = 'block';
    });

    // Show all waypoints when input is focused and empty
    input.addEventListener('focus', function() {
        if (!input.value) {
            dropdown.innerHTML = '';
            const filtered = waypoints.slice(0, LIMIT_RESULTS ? 15 : waypoints.length);
            filtered.forEach(wp => {
                const div = document.createElement('div');
                div.textContent = wp;
                div.onclick = function() {
                    input.value = wp;
                    dropdown.style.display = 'none';
                };
                dropdown.appendChild(div);
            });
            dropdown.style.display = 'block';
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
                let pickupCount = 1;
                let dropoffCount = 1;

                document.getElementById('add-pickup-btn').addEventListener('click', function() {
                    pickupCount++;
                    const pickupCol = document.createElement('div');
                    pickupCol.className = 'pickup-col';
                    pickupCol.style.flex = '1';
                    pickupCol.innerHTML = `
                        <label for="pickup_location_${pickupCount}">Pick Up Location</label>
                        <div class="waypoint-input-wrapper">
                            <input type="text" id="pickup_location_${pickupCount}" name="pickup_location[]" autocomplete="off" />
                            <div id="pickup_location_dropdown_${pickupCount}" class="dropdown-list" style="display:none;"></div>
                        </div>
                        <label for="pickup_item_${pickupCount}" style="margin-top: 1em;">Pick Up Item</label>
                        <div class="waypoint-input-wrapper">
                            <input type="text" id="pickup_item_${pickupCount}" name="pickup_item[]" autocomplete="off" />
                            <div id="pickup_item_dropdown_${pickupCount}" class="dropdown-list" style="display:none;"></div>
                        </div>
                        <label for="pickup_scu_${pickupCount}" style="margin-top: 1em;">SCU Total</label>
                        <div class="waypoint-input-wrapper">
                            <input type="text" id="pickup_scu_${pickupCount}" name="pickup_scu[]" autocomplete="off" />
                        </div>
                    `;
                    document.querySelector('.locations-row').insertBefore(pickupCol, document.querySelector('.dropoff-col'));
                });

                document.getElementById('add-dropoff-btn').addEventListener('click', function() {
                    dropoffCount++;
                    const dropoffCol = document.createElement('div');
                    dropoffCol.className = 'dropoff-col';
                    dropoffCol.style.flex = '1';
                    dropoffCol.innerHTML = `
                        <label for="dropoff_location_${dropoffCount}">Drop Off Location</label>
                        <div class="waypoint-input-wrapper">
                            <input type="text" id="dropoff_location_${dropoffCount}" name="dropoff_location[]" autocomplete="off" />
                            <div id="dropoff_location_dropdown_${dropoffCount}" class="dropdown-list" style="display:none;"></div>
                        </div>
                        <label for="dropoff_item_${dropoffCount}" style="margin-top: 1em;">Drop Off Item</label>
                        <div class="waypoint-input-wrapper">
                            <input type="text" id="dropoff_item_${dropoffCount}" name="dropoff_item[]" autocomplete="off" />
                            <div id="dropoff_item_dropdown_${dropoffCount}" class="dropdown-list" style="display:none;"></div>
                        </div>
                        <label for="dropoff_scu_${dropoffCount}" style="margin-top: 1em;">SCU Total</label>
                        <div class="waypoint-input-wrapper">
                            <input type="text" id="dropoff_scu_${dropoffCount}" name="dropoff_scu[]" autocomplete="off" />
                        </div>
                    `;
                    document.querySelector('.locations-row').appendChild(dropoffCol);
                });
            });