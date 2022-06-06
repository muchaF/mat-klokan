
var columns = 5
let statusBarWidth = document.querySelector("nav").offsetWidth;

function updateCSS() {
    let main = document.querySelector("#main");
    main.style.width = `calc(100% - ${statusBarWidth}px)`
    main.style.marginLeft = `${statusBarWidth}px`
}

window.addEventListener("resize", () => {
    updateCSS();
})

window.addEventListener("load", () => {
    updateCSS();
})
