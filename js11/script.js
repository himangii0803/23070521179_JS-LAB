// Timer with pause/resume
let timerInterval, paused = false, remainingTime;
document.getElementById('startTimer').addEventListener('click', () => {
    const target = new Date(document.getElementById('targetDate').value).getTime();
    clearInterval(timerInterval);
    paused = false;
    timerInterval = setInterval(() => {
        if (paused) return;
        const now = Date.now();
        remainingTime = target - now;
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            document.getElementById('timerDisplay').textContent = 'EXPIRED';
            return;
        }
        const d = Math.floor(remainingTime / 86400000),
              h = Math.floor((remainingTime % 86400000) / 3600000),
              m = Math.floor((remainingTime % 3600000) / 60000),
              s = Math.floor((remainingTime % 60000) / 1000);
        document.getElementById('timerDisplay').textContent = `${d}:${h}:${m}:${s}`;
    }, 1000);
});
document.getElementById('pauseTimer').addEventListener('click', () => paused = true);
document.getElementById('resumeTimer').addEventListener('click', () => paused = false);

// Scheduler with dynamic addition
let classes = [{ name: 'Math', start: '09:00', end: '10:00' }];
const schedule = document.getElementById('schedule');
function renderSchedule() {
    schedule.innerHTML = '';
    classes.forEach(cls => {
        const div = document.createElement('div');
        div.className = 'class-item';
        div.textContent = `${cls.name} (${cls.start}-${cls.end})`;
        schedule.appendChild(div);
    });
}
renderSchedule();
document.getElementById('addClass').addEventListener('click', () => {
    const name = document.getElementById('newClassName').value;
    const start = document.getElementById('newStart').value;
    const end = document.getElementById('newEnd').value;
    if (name && start && end) {
        classes.push({ name, start, end });
        renderSchedule();
    }
});
let alerted = new Set();
setInterval(() => {
    const now = new Date(), curr = now.getHours() * 60 + now.getMinutes();
    classes.forEach((cls, i) => {
        const [sh, sm] = cls.start.split(':').map(Number),
              [eh, em] = cls.end.split(':').map(Number);
        const startM = sh * 60 + sm, endM = eh * 60 + em;
        const div = schedule.children[i];
        if (curr >= startM && curr < endM) {
            div.className = 'class-item active';
            if (!alerted.has(cls.name)) {
                alert(`${cls.name} starting!`);
                alerted.add(cls.name);
            }
        } else if (curr < startM) {
            div.className = 'class-item upcoming';
        } else {
            div.className = 'class-item past';
        }
    });
}, 60000);