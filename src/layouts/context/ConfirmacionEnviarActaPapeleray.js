/* eslint-disable import/no-anonymous-default-export */
import Swal from 'sweetalert2'

class ConfirmacionEnviarActaPapeleray {
  confirmar(cel, eliminarCallback) {
    Swal.fire({
      title: 'Desea enviar el acta a la papelera? ' + cel,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCallback(cel);
      }
    });
  }
}
export default ConfirmacionEnviarActaPapeleray;
