const name = document.getElementById("name");
const form = document.getElementById("form");
var nameWidth = 0;

window.onload = () => {
     var margins = getComputedStyle(name)
     nameWidth += name.offsetWidth + parseInt(margins.marginLeft) + parseInt(margins.marginRight);
     form.style.minWidth = nameWidth+"px";
}

