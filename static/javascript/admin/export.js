function callForExport(){     
     console.log("call...")
     xhr = new XMLHttpRequest();   
     xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 ) {
               console.log("sd")
               var blob = new Blob([xhr.response], {type: 'image/pdf'});
               console.log(blob)
          }
          // console.log(xhr.response)
     }
     xhr.open("GET","/API/export", true);
     xhr.send();
}
