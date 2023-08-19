import { io } from "socket.io-client";
import BASE_URL from '../../config'
const socket = io.connect(BASE_URL);
export default socket;