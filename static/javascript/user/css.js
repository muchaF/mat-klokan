const numberOfcollumns = 4;

function updateCSS(){
    // icon size
    let container = document.querySelector(".elements").offsetHeight;
    let icon = document.querySelector(".profile-icon");
    icon.style.width = container + "px";
    icon.style.height = container + "px";
    
    // margin for fit content
    let compute = document.querySelector("nav").offsetWidth;
    document.querySelector(".input-container").style.marginLeft = compute + "px";
    
    document.querySelector(".input-container").classList.remove("hide");

    try{
        let fragment = document.querySelector(".fragment");
        let computeWidth = (fragment.offsetWidth) * numberOfcollumns;
        document.querySelector(".activeTable").style.width = "calc(" + computeWidth + "px + 4rem)";
    } catch(error){}
}

window.addEventListener("resize",() => {
    console.log("sdf")
    updateCSS();
})

window.addEventListener("load",() => {
    updateCSS();
})