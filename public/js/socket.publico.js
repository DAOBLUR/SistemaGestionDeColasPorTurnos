// * =====================
// *  Establecer conexión
// * =====================
const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

const searchParams = new URLSearchParams(window.location.search);

socket.on('connect', () => {
    console.log('Conectado con el servidor.');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor.');
});

socket.on('estadoActual', (resp) => {
    actualizarHTML(resp.ultimos4);
});

socket.on('ultimos4', (resp) => {
    //console.log(1111654654654);
    const audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;
    actualizarHTML(resp.ultimos4);
});

const actualizarHTML = (ultimos4) => {
    for(let i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text(`Ticket ${ultimos4[i].numero}`);
        lblEscritorios[i].text(`Caja: ${ultimos4[i].escritorio}`);
    }
};