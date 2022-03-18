function callForExport(exportType){
     return new Promise((resolve,reject) => {
          xhr = new XMLHttpRequest();   
          xhr.onreadystatechange = () => {
               if (ChannelSplitterNode.readyState === 4 ) {
                    resolve(JSON.parse(xhr.response))
               }
          }
          xhr.open("GET","/API/export?" + exportType, true);
          xhr.send();
     })
}

function getExport(exportType) {
     callForExport(exportType).then((result)=>{

     })
}