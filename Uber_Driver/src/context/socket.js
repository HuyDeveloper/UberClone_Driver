import {io} from 'socket.io-client';
import { BASE_URL } from '../../config';
const socket = io(BASE_URL)
let dataTrip
socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('bookingdriver', (msg) => {
    console.log(msg)
    dataTrip = msg
})

socket.on('disconnect', () => {
    console.log(socket.id) // undefined
})
export {dataTrip}
export default socket