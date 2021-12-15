const notification = document.getElementById("notification-board");
const board = document.getElementById("board");
const logOut = document.getElementById("logout");
const displayName = document.getElementById("name"); 
var state = false

login.addEventListener("click", () => {
     if (!state) {
          state = true;
          notification.classList.remove("hide");
          login.classList.add("wide");
          board.classList.add("shade");
          displayName.innerText = "User";
     }

     else {
          state = false;
          notification.classList.add("hide");
          board.classList.remove("shade");
          login.classList.remove("wide");
          displayName.innerText = "U";
     }
});

board.addEventListener("click", (event) => {
     console.log("s")
     if (event.target != login && state) {
          state = false;
          notification.classList.add("hide");
          board.classList.remove("shade");
     }
});

logOut.addEventListener("click", ()=>{
     console.log("logout");
})