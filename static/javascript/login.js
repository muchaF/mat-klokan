const loginPatters = /\w+\@\w+\.\w+/gm
const passwordPatterns = /\w+/gm
function validEmail(email){
     if(email.search(loginPatters) != -1){
          return true;
     }
     return false;
}

document.querySelector("#form").addEventListener("submit", (e) => {
     if(validEmail(document.querySelector("input[name=login]").value) && document.querySelector("input[name=password]").value.search(passwordPatterns) != -1){
          return;
     }
     e.preventDefault();
});