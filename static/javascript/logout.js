const profileToggle = document.getElementById("profileToggle");
const profileTab = document.getElementById("profile");
var state = false;
profileTab.style = "transform: translateX(-100%)"
window.onload = () => {   
     profileToggle.addEventListener("click",()=>{
          if(profileTab.style.transform == "translateX(-100%)" ){
               profileTab.style = "transform: translateX(0%)"
          }
          else{
               profileTab.style = "transform: translateX(-100%)"
          }
     });
};
