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