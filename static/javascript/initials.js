const name1 = document.getElementById("name");
var name = name1.innerText;
name = name.replace(/[^\w\s!?]/g,'');
name = name.replace(" ",'');

const chars = name.split("")
var initials = chars[0]

document.getElementById("full-name").innerText = name
name1.innerText = initials.toUpperCase();

// 600 
// 18-20-M/01 kod oboru