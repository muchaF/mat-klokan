const profileToggle = document.getElementById("profileToggle");
const profileTab = document.getElementById("profile");
var state = false;

window.onload = () => {   
     profileToggle.addEventListener("click",()=>{
          if(profileTab.offsetLeft >= 80){
               profileTab.style = "left:" + (profileTab.clientWidth * -1) +"px;"
          }
          else{
               profileTab.style = "left:" + (profileToggle.clientWidth) +"px;"
          }
     });
};

function out(){
     console.log("ssdasd");
}


