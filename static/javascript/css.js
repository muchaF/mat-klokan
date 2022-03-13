const numberOfcollumns = 4;

function updateCSS(){
    // margin for fit content
    let compute = document.querySelector("nav").offsetWidth;
    document.querySelector(".input-container").style.marginLeft = compute + "px";

    let fragment = document.querySelector(".fragment");
    let computeWidth = (fragment.offsetWidth) * numberOfcollumns;
    document.querySelector(".activeTable").style.width = "calc(" + computeWidth + "px + 4rem)";

    let container = document.querySelector(".elements").offsetHeight;
    let icon = document.querySelector(".profile-icon");
    icon.style.width = container + "px";
    icon.style.height = container + "px";
}

window.addEventListener("resize",() => {
    updateCSS();
})

window.addEventListener("load",() => {
    updateCSS();
})
