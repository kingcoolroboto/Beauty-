    function toggleDropdown() {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('open');
    }

    function selectName(name) {
        const label = document.querySelector('.dropdown-label');
        label.textContent = name;
        document.querySelector('.dropdown').classList.remove('open');
    }

    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.dropdown');
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

   // Toggle button functionality
    function toggleNews() {
        const toggleButton = document.getElementById('news');
        toggleButton.classList.toggle('active');
        const span = toggleButton.querySelector('span');
        span.textContent = toggleButton.classList.contains('active') ? 'Yes' : 'No';
    }

// Common variables for both start and end date pickers
let currentDate = new Date();
let selectedStartDate = null;
let selectedEndDate = null;

// Render the calendar
function renderCalendar(targetInput, targetPopup, selectedDate, renderDate) {
    const calendarDates = targetPopup.querySelector(".calendar-dates");
    const currentMonthYear = targetPopup.querySelector(".current-month-year");
    const prevMonthBtn = targetPopup.querySelector(".prev-month");
    const nextMonthBtn = targetPopup.querySelector(".next-month");

    const year = renderDate.getFullYear();
    const month = renderDate.getMonth();
    currentMonthYear.textContent = `${renderDate.toLocaleString("default", { month: "long" })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    calendarDates.innerHTML = "";

    // Fill in the days
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDates.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= lastDateOfMonth; day++) {
        const dateClass = [];
        const today = new Date();

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dateClass.push("today");
        }

        if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dateClass.push("selected");
        }

        calendarDates.innerHTML += `<div class="date ${dateClass.join(" ")}">${day}</div>`;
    }

    // Add click event to dates
    calendarDates.querySelectorAll(".date").forEach(dateElement => {
        dateElement.addEventListener("click", (event) => {
            const selectedDay = parseInt(event.target.textContent);
            const chosenDate = new Date(year, month, selectedDay);
            targetInput.value = chosenDate.toLocaleDateString();

            if (targetInput.id === "Start-date-input") {
                selectedStartDate = chosenDate;
            } else {
                selectedEndDate = chosenDate;
            }

            renderCalendar(targetInput, targetPopup, chosenDate, renderDate);
            targetPopup.style.display = "none";
        });
    });

// Navigate months
prevMonthBtn.onclick = (event) => {
    event.preventDefault(); // Prevent default form submission
    renderDate.setMonth(renderDate.getMonth() - 1);
    renderCalendar(targetInput, targetPopup, selectedDate, renderDate);
};

nextMonthBtn.onclick = (event) => {
    event.preventDefault(); // Prevent default form submission
    renderDate.setMonth(renderDate.getMonth() + 1);
    renderCalendar(targetInput, targetPopup, selectedDate, renderDate);
}
}

// Initialize a date picker
function initializeDatePicker(inputId, popupId) {
    const dateInput = document.getElementById(inputId);
    const datePickerPopup = document.getElementById(popupId);

    dateInput.addEventListener("click", () => {
        datePickerPopup.style.display = datePickerPopup.style.display === "none" ? "flex" : "none";
        renderCalendar(dateInput, datePickerPopup, inputId === "Start-date-input" ? selectedStartDate : selectedEndDate, currentDate);
    });
}

// Generate weekdays between start and end dates
function generateWeekdays() {
    if (!selectedStartDate || !selectedEndDate) {
        alert("Please select both start and end dates.");
        return;
    }

    const weekdays = [];
    let current = new Date(selectedStartDate);

    while (current <= selectedEndDate) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) { // Skip Sundays (0) and Saturdays (6)
            weekdays.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }

    console.log("Weekdays:", weekdays.map(date => date.toLocaleDateString()));
}

// Attach date pickers and buttons
initializeDatePicker("Start-date-input", "start-date-picker-popup");
initializeDatePicker("End-date-input", "end-date-picker-popup");

// Button for generating weekdays
document.getElementById("generate-weekdays-btn").addEventListener("click", generateWeekdays);
