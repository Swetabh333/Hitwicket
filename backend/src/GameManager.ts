import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private users: WebSocket[];
  private pendingUser: WebSocket | null;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }
  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
		this.users = this.users.filter((user)=> user!==socket )
	}

  //private handleMessage();
  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.type == INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }
			if(msg.type == MOVE){

			}
    });
  }
}
