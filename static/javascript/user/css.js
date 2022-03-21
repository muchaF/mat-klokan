const numberOfcollumns = 8;

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
        document.querySelector(".activeTable").style.width = "calc(" + computeWidth + "px + 8rem)";
    } catch(error){}

    let solvers = document.querySelector(".best").offsetWidth;
    document.querySelector(".activeTable").style.width = "calc(" + solvers + "px - 2rem)"

    let width = parseFloat(window.getComputedStyle(document.querySelector(".activeTable")).width)
    let fragments = document.querySelectorAll(".fragment");
    width /= 8;
    // console.log(fragments)
    for(let fg of fragments){
        // console.log("calc(" + width + "px - 2rem)")
        fg.style.width = "calc(" + width + "px - 2rem - 1px)";
    }

    let sampleHeight = document.querySelector(".sample").offsetHeight;
    console.log(sampleHeight)
    for(let s of document.querySelectorAll(".scinput")){
        // console.log("calc(" + width + "px - 2rem)")
        s.style.height = sampleHeight + "px";
    }
}

window.addEventListener("resize",() => {
    console.log("sdf")
    updateCSS();
})

window.addEventListener("load",() => {
    console.log('load')
    updateCSS();
})
