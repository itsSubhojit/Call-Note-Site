let addbtn = document.querySelector("#plus");
let closebtn = document.querySelector("#close");
let form = document.querySelector("#form");
let card = document.querySelector("#card");


let imageurl = document.querySelector("#imageurl");
let fullname = document.querySelector("#fullname");
let hometown = document.querySelector("#hometown");
let purpose = document.querySelector("#purpose");

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
  card.style.display = "none";
});

// close form
closebtn.addEventListener("click", () => {
  form.style.display = "none";
  card.style.display = "block";
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
}

if(full === ""){
    alert("Please Enter Your FullName");
}

if(homet === ""){
    alert("Please Enter Your HomeTown");
}

if(purposenew === ""){
    alert("Please Enter Your Purpose");
}

if(!selected){
    alert("Please Select a Category");
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
   card.style.display = "block";
});


function showcards(){
    let alltasks = JSON.parse(localStorage.getItem("tasks"));

    alltasks.forEach(function(task){


    })

}




