import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
// import { MyRoom } from "./rooms/MyRoom";
import { GameRoom } from "./GameRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('outside', GameRoom);
        gameServer.define('path_left', GameRoom);
        gameServer.define('path_center', GameRoom);
        gameServer.define('path_right', GameRoom);
        gameServer.define('village', GameRoom);
        gameServer.define('picos_shop', GameRoom);
        gameServer.define('cafe', GameRoom);
        gameServer.define('post_office', GameRoom);
        gameServer.define('theater_lobby', GameRoom);
        gameServer.define('theater_screen', GameRoom);
        gameServer.define('town_hall', GameRoom);

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("This isn't how you play advent!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
