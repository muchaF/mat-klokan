const notification = document.getElementById("notification-board");
const board = document.getElementById("board");

var state = false
login.addEventListener("click", () => {
     if (!state) {
          state = true;
          notification.classList.remove("hide");
          board.classList.add("shade");
     }

     else {
          state = false;
          notification.classList.add("hide");
          board.classList.remove("shade");
     }
});

board.addEventListener("click", (event) => {
     if (event.target != login && state) {
          state = false;
          notification.classList.add("hide");
          board.classList.remove("shade");
     }
});