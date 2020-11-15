import swal from 'sweetalert2'

export default class sweetAlert{
    constructor(){
        this.swalWithBootstrapButtons = swal.mixin({
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
    }

    /* MENSAGENS */
    sweetNotification(msg){
        swal.fire({
            title: `<strong>Ops, por favor confira os dados!</strong>`,
            type: 'info',
            icon:'info',
            showCloseButton: true,
            html: msg,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText:'<i class="fa fa-thumbs-up"></i> Ok',
        })
    }

    /* SUCESSO */
    sweetSuccess(msg){
        swal.fire({
            type: 'success',
            icon:'success',
            html: `${msg}`,
            showConfirmButton: false,
            timer: 3000,
        })
    }
}