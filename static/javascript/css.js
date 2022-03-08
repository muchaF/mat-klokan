window.addEventListener("resize",() => {
    var compute =   document.querySelector(".year-container").offsetWidth +
                    document.querySelector(".navbar").offsetWidth;
    document.querySelector(".tables").style.marginLeft = compute + "px";
})

window.addEventListener("load",() => {
    var compute =   document.querySelector(".year-container").offsetWidth +
                    document.querySelector(".navbar").offsetWidth;
    document.querySelector(".tables").style.marginLeft = compute + "px";
})