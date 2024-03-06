(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();
  let taxswitch=document.querySelector("#flexSwitchCheckDefault");
        taxswitch.addEventListener("click",()=>{
            let prices=document.getElementsByClassName("price");
            let pricewithtaxes=document.getElementsByClassName("pricewithtax");
            // console.log(prices);
            // console.log(pricewithtaxes);
            for(price of prices){
                if(price.style.display!="none"){
                    price.style.display="none";
                }
                else{
                    price.style.display="inline"
                }
            }
            for(pricewithtax of pricewithtaxes){
                if(pricewithtax.style.display!="inline"){
                    pricewithtax.style.display="inline";
                }
                else{
                    pricewithtax.style.display="none";
                }
            }
             
        })