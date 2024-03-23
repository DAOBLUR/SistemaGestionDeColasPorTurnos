// * =====================
// *  Establecer conexión
// * =====================
const socket = io();

const label = $('small');

const searchParams = new URLSearchParams(window.location.search);

socket.on('connect', () => {
    console.log('Conectado con el servidor.');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor.');
});

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El numero de caja es necesario');
}
const escritorio = searchParams.get('escritorio');

$('h1').text(`Caja °${escritorio}`);
setInterval(() => {
    socket.emit('atenderTicket', {escritorio}, (resp) => {
        if(resp === 'No hay Tickets.') {
            label.text(resp);
            //alert(resp);
            return;
        }
        label.text(`Ticket ${resp.numero}`);
    });
}, 5000);


