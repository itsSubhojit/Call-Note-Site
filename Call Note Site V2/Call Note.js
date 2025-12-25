const addbtn = document.querySelector("#plus");
const closebtn = document.querySelector("#close");
const form = document.querySelector("#form");
const container = document.querySelector(".app-container");
const sideControls = document.querySelector("#sideControls");

const imageurl = document.querySelector("#imageurl");
const fullname = document.querySelector("#fullname");
const hometown = document.querySelector("#hometown");
const purpose = document.querySelector("#purpose");
const categoryradio = document.querySelectorAll("input[name='category']");

let currentIndex = 0;

// Default Data for initial view
const defaultTask = {
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200",
    full: "Fatima Uma",
    homet: "Singapore",
    purposenew: "Bookings - 3 times",
    selected: "Urgent"
};

function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [defaultTask];
}

// Open Form: Hide side buttons
addbtn.addEventListener("click", () => {
    form.style.display = "block";
    container.style.display = "none";
    sideControls.style.display = "none"; 
});

// Close Form: Show side buttons
closebtn.addEventListener("click", () => {
    form.style.display = "none";
    container.style.display = "block";
    sideControls.style.display = "flex";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedVal = "";
    categoryradio.forEach(r => { if(r.checked) selectedVal = r.value; });

    const newTask = {
        image: imageurl.value,
        full: fullname.value,
        homet: hometown.value,
        purposenew: purpose.value,
        selected: selectedVal
    };

    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    form.reset();
    form.style.display = "none";
    container.style.display = "block";
    sideControls.style.display = "flex";
    
    currentIndex = tasks.length - 1;
    showcards(currentIndex);
});

function showcards(index) {
    const alltasks = getTasks();
    if (index >= alltasks.length) currentIndex = 0;
    if (index < 0) currentIndex = alltasks.length - 1;

    const task = alltasks[currentIndex];
    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.classList.add("card-wrapper");

    // Sidebar with 4 dots logic
    wrapper.innerHTML = `
        <div class="card-sidebar">
            <div class="status-dot dot-Emergency ${task.selected === 'Emergency' ? 'active' : ''}"></div>
            <div class="status-dot dot-Important ${task.selected === 'Important' ? 'active' : ''}"></div>
            <div class="status-dot dot-Urgent ${task.selected === 'Urgent' ? 'active' : ''}"></div>
            <div class="status-dot dot-NoRush ${task.selected === 'No Rush' ? 'active' : ''}"></div>
        </div>
        <div class="card profile-card stacked" style="flex:1">
            <div class="profile-header"><img src="${task.image}"></div>
            <h2>${task.full}</h2>
            <div class="info-row"><span class="label">Home town</span><span class="value">${task.homet}</span></div>
            <div class="info-row"><span class="label">Purpose</span><span class="value">${task.purposenew}</span></div>
            <div class="action-buttons">
                <button class="btn btn-black"><span class="material-icons-round">call</span> Call</button>
                <button class="btn btn-light">Message</button>
            </div>
        </div>
    `;
    container.appendChild(wrapper);
}

document.querySelector("#upBtn").addEventListener("click", () => { currentIndex++; showcards(currentIndex); });
document.querySelector("#downBtn").addEventListener("click", () => { currentIndex--; showcards(currentIndex); });

// Initial load
showcards(currentIndex);