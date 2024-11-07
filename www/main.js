const ctx = document.getElementById('graficoHabitos').getContext('2d');

const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

let habits = [];

addHabitBtn.addEventListener('click', () => {
    const habitText = habitInput.value;

    if (habitText) {
        const habit = {
            text: habitText,
            completed: false
        };

        habits.push(habit);

        habitInput.value = '';

        renderHabits();
    }
});

function renderHabits() {
    habitList.innerHTML = '';

    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.textContent = habit.text;

        if (habit.completed) {
            li.style.textDecoration = 'line-through';
            li.style.color = '#556B2';
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completar';
        completeBtn.addEventListener('click', () => {
            habit.completed = true;
            incrementHabitCompletion();
            renderHabits();
        });

        li.appendChild(completeBtn);
        habitList.appendChild(li);
    });
}

// Función para obtener el índice del día actual (0 = Lun, 6 = Dom)
function getCurrentDayIndex() {
    const today = new Date();
    const day = today.getDay(); // 0 = Dom, 1 = Lun, ..., 6 = Sáb
    return day === 0 ? 6 : day - 1; // Ajustar para que 0 = Lun, ..., 6 = Dom
}

function incrementHabitCompletion() {
    const currentDayIndex = getCurrentDayIndex();
    miGrafico.data.datasets[0].data[currentDayIndex] += 1;
    miGrafico.update();
}

const miGrafico = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['Lun', 'Mart', 'Miér', 'Juev', 'Vier', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Hábitos Completados',
            data: [6, 4, 3, 5, 2, 2, 3],
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

const moodCtx = document.getElementById('moodLineChart').getContext('2d');

// Datos de ejemplo 
const moodData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], // Días de la semana
    datasets: [{
        label: 'Estado de Ánimo',
        data: [4, 2, 2, 3, 4, 2, 4], //valores sobre como me senti
        backgroundColor: 'rgba(86, 107, 47, 0.2)', // Color de fondo
        borderColor: 'rgba(86, 107, 47, 1)', // Color de la línea
        borderWidth: 2,
        fill: true, // Rellenar el área debajo de la línea
        tension: 0.3 // Curvatura de la línea
    }]
};

// Crear el gráfico
const moodLineChart = new Chart(moodCtx, {
    type: 'line', // Tipo de gráfico
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
