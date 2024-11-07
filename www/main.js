const ctx = document.getElementById('graficoHabitos').getContext('2d');

const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

let habits = JSON.parse(localStorage.getItem('habits')) || [];
let habitsData = JSON.parse(localStorage.getItem('habitsData')) || [6, 4, 3, 5, 2, 2, 3];

// Llamar a renderHabits() inmediatamente después de cargar los datos
renderHabits();

addHabitBtn.addEventListener('click', () => {
    const habitText = habitInput.value;

    if (habitText) {
        const habit = {
            text: habitText,
            completed: false
        };

        habits.push(habit);

        habitInput.value = '';

        saveHabits();
        renderHabits();
    }
});

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('habitsData', JSON.stringify(habitsData));
}

function renderHabits() {
    habitList.innerHTML = '';

    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.textContent = habit.text;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completar';
        completeBtn.addEventListener('click', () => {
            completeHabit(index);
        });

        li.appendChild(completeBtn);
        habitList.appendChild(li);
    });
}

function completeHabit(index) {
    const habit = habits[index];
    habit.completed = true;

    // Eliminar hábito del array
    habits.splice(index, 1);

    // Incrementar el conteo de hábitos completados
    incrementHabitCompletion();

    // Guardar y renderizar hábitos actualizados
    saveHabits();
    renderHabits();
}


function getCurrentDayIndex() {
    const today = new Date();
    const day = today.getDay(); // 0 = Dom, 1 = Lun, ..., 6 = Sáb
    return day === 0 ? 6 : day - 1; // 0 = Lun, ..., 6 = Dom
}

function incrementHabitCompletion() {
    const currentDayIndex = getCurrentDayIndex();
    habitsData[currentDayIndex] += 1;
    miGrafico.data.datasets[0].data = habitsData;
    miGrafico.update();
    saveHabits();
}

const miGrafico = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['Lun', 'Mart', 'Miér', 'Juev', 'Vier', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Hábitos Completados',
            data: habitsData,
            backgroundColor: 'rgba(86, 107, 47, 0.5)',
            borderColor: 'rgba(86, 107, 47, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// Datos de ejemplo 
const moodData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], 
    datasets: [{
        label: 'Estado de Ánimo',
        data: [4, 2, 2, 3, 4, 2, 4], //valores sobre como me senti
        backgroundColor: 'rgba(86, 107, 47, 0.2)', 
        borderColor: 'rgba(86, 107, 47, 1)', 
        borderWidth: 2,
        fill: true, 
        tension: 0.3 
    }]
};

// Crear el gráfico
const moodLineChart = new Chart(moodCtx, {
    type: 'line', 
    data: moodData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 5, 
                title: {
                    display: true,
                }
            },
            x: {
                title: {
                    display: true,
                }
            }
        }
    }
});
