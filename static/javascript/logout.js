const profileToggle = document.getElementById("profileToggle");
const profileTab = document.getElementById("profile");
var state = false;
profileTab.style = "transform: translateX(-100%)"
window.onload = () => {   
     profileToggle.addEventListener("click",()=>{
          console.log(typeof(profileTab.style.transform))
          console.log(profileTab.style.transform)
          if(profileTab.style.transform == "translateX(-100%)" ){
               console.log("toggle")
               profileTab.style = "transform: translateX(0%)"
          }
          else{
               profileTab.style = "transform: translateX(-100%)"
          }
     });
};

function out(){
     console.log("ssdasd");
}


