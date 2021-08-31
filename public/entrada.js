/* 
let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck);
      let ruta=document.getElementById("ruta");
      let formularioRuta=document.getElementById("form_entrada");
 
    
     ruta.addEventListener('change' ,()=>{
      // console.log(`${ruta.value}`)
      //Element.setAttribute(name, value);
      formularioRuta.setAttribute(action,`${ruta.value}`)
    //   formularioRuta.innerHTML=`action:${ruta.value}`;
     //  ${document.URL}
       console.log(formularioRuta.action)
    })

    }
  }, 100);
 */
