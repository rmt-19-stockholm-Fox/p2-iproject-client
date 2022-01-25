import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  confirm({ title = 'Confirmation', text = 'continue?' }) {
    return Swal.fire({
      title, text,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
      width: '27rem'
    });
  }
}
