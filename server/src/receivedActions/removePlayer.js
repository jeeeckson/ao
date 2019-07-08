//import handleSendPackage from "../handleSendPackage";
import vars from '../vars';

function removePlayer(socket) {
  try {
    delete vars.clients[socket.id];
    delete vars.players[socket.id];
    console.log("remove: ", socket.id);
    //handleSendPackage.removePlayer(socket);
  } catch (err) {
    console.error(err);
  }
}
export default removePlayer;