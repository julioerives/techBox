/*Funcion que muestra mensajitos abajo a la derecha prueba*/
export function showMessage(message, type = "success") //el message es lo que queramos que se vea en el toast, y el tipo que si pongo error que sea rojo, success verde, etc
{
    Toastify({
        text: message,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === "success" ? "rgba(42, 199, 21, 0.5)" : "rgba(237, 14, 14, 0.5)",
          "backdrop-filter": "blur(10px)",
          "border-radius": "10px",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

/*
    <!--toastifyjs cdn en header-->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">


	    <!--Toastify al final-->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
*/