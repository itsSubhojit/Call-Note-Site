let addbtn = document.querySelector("#plus");
let closebtn = document.querySelector("#close");
let form = document.querySelector("#form");
let container = document.querySelector(".app-container");


let imageurl = document.querySelector("#imageurl");
let fullname = document.querySelector("#fullname");
let hometown = document.querySelector("#hometown");
let purpose = document.querySelector("#purpose");

let upbtn = document.querySelector("#upBtn");
let downbtn = document.querySelector("#downBtn");

let categoryradio = document.querySelectorAll("input[name='category']");

// save to localstorage
function savetolocalstorage(obj){
    if(localStorage.getItem("tasks") === null){
        let oldtasks = [];
        oldtasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldtasks));
    }else{
        let oldtasks = localStorage.getItem("tasks");
        oldtasks = JSON.parse(oldtasks);
        oldtasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldtasks));
    }
}

// open form
addbtn.addEventListener("click", () => {
  form.style.display = "block";
  container.style.display = "none";
});

// close form
closebtn.addEventListener("click", () => {
  form.style.display = "none";
  container.style.display = "block";
});

// submit form and Validation full form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = imageurl.value.trim();
  const full = fullname.value.trim();
  const homet = hometown.value.trim();
  const purposenew = purpose.value.trim();

let selected = false;
categoryradio.forEach((cat) => {
    if(cat.checked){
      selected = cat.value;
    }

});

if(image === ""){
    alert("Please Enter a Valid URL");
    return;
}

if(full === ""){
    alert("Please Enter Your FullName");
    return;
}

if(homet === ""){
    alert("Please Enter Your HomeTown");
    return;
}

if(purposenew === ""){
    alert("Please Enter Your Purpose");
    return;
}

if(!selected){
    alert("Please Select a Category");
    return;
}
 
   savetolocalstorage({
    image,
    full,
    homet,
    purposenew,
    selected,
   });

   form.reset();
   form.style.display = "none";
   container.style.display = "block";

   showcards();
});


function showcards(){
    container.innerHTML = "";

    let alltasks = JSON.parse(localStorage.getItem("tasks"));

    alltasks.forEach(function(task){

        // ===== Main Card =====
const card = document.createElement("div");
card.classList.add("card", "profile-card", "stacked");


// ===== Profile Header =====
const profileHeader = document.createElement("div");
profileHeader.classList.add("profile-header");

const img = document.createElement("img");
img.src = task.image;
img.alt = "Profile";

profileHeader.appendChild(img);

// ===== Name =====
const name = document.createElement("h2");
name.textContent = task.full;

// ===== Info Row 1 =====
const infoRow1 = document.createElement("div");
infoRow1.classList.add("info-row");

const label1 = document.createElement("span");
label1.classList.add("label");
label1.textContent = "Home town";

const value1 = document.createElement("span");
value1.classList.add("value");
value1.textContent = task.homet;

infoRow1.append(label1, value1);

// ===== Info Row 2 =====
const infoRow2 = document.createElement("div");
infoRow2.classList.add("info-row");

const label2 = document.createElement("span");
label2.classList.add("label");
label2.textContent = "Purpose";

const value2 = document.createElement("span");
value2.classList.add("value");
value2.textContent = task.purposenew;

infoRow2.append(label2, value2);

// ===== Action Buttons =====
const actionButtons = document.createElement("div");
actionButtons.classList.add("action-buttons");

const callBtn = document.createElement("button");
callBtn.classList.add("btn", "btn-black");
callBtn.innerHTML = `
  <span class="material-icons-round" style="font-size:18px; margin-right:6px;">
    call
  </span>
  Call
`;

const msgBtn = document.createElement("button");
msgBtn.classList.add("btn", "btn-light");
msgBtn.textContent = "Message";

actionButtons.append(callBtn, msgBtn);

// ===== Append Everything to Card =====
card.append(
  profileHeader,
  name,
  infoRow1,
  infoRow2,
  actionButtons
);

// ===== Finally append card to page =====
document.querySelector(".app-container").appendChild(card);

    })
}

showcards();

function updatecards() {

for (let i = 0; i < 3; i++) {
container.style.zIndex = 3 - i;
container.style. transform = 'translateY(${i*10}px) scale(${1-i*0.02})';
container.style.opacity = '${1 - i * 0.02}';
  }
}

upbtn.addEventListener("click", function(){
  //console.dir(container);

  let lastchild = container.lastElementChild;
  if(lastchild){
    container.insertBefore(lastchild, container.firstElementChild);
    //update
    updatecards()
  }

  downbtn.addEventListener("click", function(){
    let firstchild = container.firstElementChild;
    if(firstchild){
      container.appendChild(firstchild);
      //update
      updatecards()
    }
  })
})