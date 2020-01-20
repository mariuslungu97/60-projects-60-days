//month details
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const startingDates = [3, 6, 0, 3, 5, 1, 3, 6, 2, 4, 0, 2];
//selectors
const calendarMonths = document.querySelector('.calendar-months');
const cockpitMoods = document.getElementById('cockpitMoods');
const cockpitMoodItems = document.querySelectorAll('.calendar-cockpit__moods--mood');
const calendarMonthsId = document.getElementById('calendarMonths');
const btnRandom = document.querySelector('.buttons__btn--random');
const btnRedo = document.querySelector('.buttons__btn--redo');
const btnGrid = document.querySelector('.buttons__btn--grid');
const btnCard = document.querySelector('.buttons__btn--card');

let id = -1;
let state = [];

function getSelectedMood(e) {
    //get selected mood
    const selectedMood = e.target.closest('.calendar-cockpit__moods--mood');

    if(selectedMood) {

        const currId = parseInt(selectedMood.dataset.id, 10);

        if(id === currId) id = -1;
        else id = currId;

        console.log(id);

        //if -1 => no selected mood
        //else selected

        cockpitMoodItems.forEach(el => {
            if(id === -1 && el.classList.contains('selected')) el.classList.remove('selected');
            else if(id >= 1 && id <= 5) {
                if(parseInt(el.dataset.id, 10) === id) el.classList.add('selected');
                else el.classList.remove('selected');
            }
        });
    }

}

function setMood(e) {

    const selectedDate = e.target.closest('.month__date--style');

    if(selectedDate) {
        if(id === -1) {
            selectedDate.className = '';
            selectedDate.classList.add('month__date--style');
        }
        else if(id >= 1 && id <= 5) {
            selectedDate.className = '';
            selectedDate.classList.add('month__date--style', `color-${id}`);
        }
    };

};

function resetCalendar(type, rand) {
    //clear html, rerender calendar with random value set to true or false
    calendarMonthsId.innerHTML = '';

    monthNames.forEach( (monthName, i) => {
        let month;
        
        if(type === 'grid') month = renderMonth(monthName, daysInMonths[i], startingDates[i], rand);
        else if(type === 'card') {

            const events = state.filter(el => {
                if(el.date.datetime.month - 1 === i) return el;
            });

            month = renderMonthCard(monthName, daysInMonths[i], startingDates[i], events);

        } 

        calendarMonths.appendChild(month);
    
    });
};

cockpitMoods.addEventListener('click', getSelectedMood);
calendarMonthsId.addEventListener('click', setMood);
btnRandom.addEventListener('click', () => resetCalendar('grid', true));
btnRedo.addEventListener('click', () => resetCalendar('grid', false));
btnGrid.addEventListener('click', () => resetCalendar('grid', false));
btnCard.addEventListener('click', () => resetCalendar('card', false));


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
// taken from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527834

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//dynamically render 2020 months
function renderMonth(monthName, nrDays, startingDate, random = false) {

    const month = document.createElement('table');
    month.classList.add('month');

    let day = 1;
    let count = false;
    let arr = [];
    
    for(let i = 0; i < 5; i++) {
        //create row
        const row =  document.createElement('tr');

        for(let j = 0; j < 7; j++) {
            //set count to false (add blank rowEl's) and save next starting date for next month rendering
            if(day > nrDays) count = false;
            //set count to true 
            if(i === 0 && startingDate === j) count = true;

            if(count === true) {
                //create td element
                const rowEl = document.createElement('td');
                rowEl.setAttribute('class', 'month__date');
                //create span element and append to td element
                const rowDate = document.createElement('span');
                rowDate.classList.add('month__date--style');
                if(random === true) rowDate.classList.add(`color-${getRandomInt(1, 5)}`)
                
                rowDate.innerText = day.toString();

                rowEl.appendChild(rowDate);
                //append td element to row
                row.appendChild(rowEl);
                //increase day count
                day++;
            }
            else {
                //create blank td element
                const rowEl = document.createElement('td');
                rowEl.setAttribute('class', 'month__date');
                row.appendChild(rowEl);
            };
            
        }

        arr.push(row.outerHTML);
    }

    month.innerHTML = `
        <caption class="month__title">${monthName}</caption>
        <thead class="month__days">
            <tr>
                <th class="month__day" scope="col">Sun</th>
                <th class="month__day" scope="col">Mon</th>
                <th class="month__day" scope="col">Tue</th>
                <th class="month__day" scope="col">Wed</th>
                <th class="month__day" scope="col">Thu</th>
                <th class="month__day" scope="col">Fri</th>
                <th class="month__day" scope="col">Sat</th>
            </tr>
        </thead>
        <tbody class="month__dates">
            ${arr.join(' ')}
        </tbody>
    `;

    return month; 

};

function renderEvents(events) {

    console.log(events);

    let eventsRes = [];

    eventsRes = events.map(event => `
    
        <li>${event.date.string}: <span>${event.name}</span></li>

    `);

    return eventsRes.join(' ');

};

function renderMonthCard(monthName, nrDays, startingDate, events) {

    const month = renderMonth(monthName, nrDays, startingDate);

    const calendarMonthCard = document.createElement('div');

    calendarMonthCard.classList.add('calendar-month');

    calendarMonthCard.innerHTML = `
        <div class="calendar-month__calendar">
            ${month.outerHTML}
        </div>
        <div class="calendar-month__info">
            <h2 class="calendar-month__info--header u-margin-1">Events:</h2>
            <div class="calendar-month__info--events">
                <ul>
                    ${renderEvents(events)}
                </ul>
            </div>
        </div>
    `;

    return calendarMonthCard;

};

(function() {

    const apiKey = `xyz`;

    fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=dk&year=2020`)
        .then(res => res.json())
        .then(data => {
            //store data to local state

            const holidays = data.response.holidays;

            state = holidays.map(el => {
                const datetime = {...el.date.datetime};
    
                const res = {
                    name : el.name,
                    date : {
                        string : `${monthNames[datetime.month - 1]} ${datetime.day}, ${datetime.year}`,
                        datetime
                    }
                };

                return res;
            })

            console.log(state);

        });
        
})();
//initial calendar render
(function() {
    resetCalendar('grid', false);
})();

