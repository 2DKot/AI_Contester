/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Direction;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.Charset;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonStructure;

/**
 *
 * @author Eugene
 */
public class Network {

    private GameServer gameServer;
    private ServerSocket server;
    private Socket socket;
    private Boolean sendContext;

    public Network(GameServer server, int port) throws IOException {
        this.server = new ServerSocket(port);
        this.gameServer = server;
        this.sendContext = false;
    }

    public void sendData() throws IOException {

        if (!sendContext) {
            float x = gameServer.getWorld().getPlayers()[0].getPositionX();

            JsonObject value = Json.createObjectBuilder()
                    .add("x", x)
                    .add("game_over", gameServer.getGameOver())
                    .build();

            socket.getOutputStream().write(value.toString().getBytes());
        }

        this.sendContext = true;
    }

    public void waitConnection() throws IOException {
        System.out.println("wait conection user");
        socket = server.accept();
        System.out.println("user connected");
    }
    
    public void readData() throws IOException {

        //читаем нужный из сети
        String move;

        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[inputStream.available()];
        inputStream.read(buf);
        move = new String(buf);

        InputStream is
                = new ByteArrayInputStream(move.getBytes(Charset.defaultCharset()));

        if (move.equals("")){
            return;
        }
        
        JsonReader reader = Json.createReader(is);

        JsonStructure js = reader.read();
        JsonObject jo = (JsonObject) js;

        String direction = jo.getString("direction");

        Direction dir;

        switch (direction) {
            case "left":
                dir = Direction.left;
                break;
            case "right":
                dir = Direction.right;
                break;
            default:
                dir = Direction.none;
                break;
        }

        LocalStrategy[] lstrategies = new LocalStrategy[1];
        lstrategies[0] = new LocalStrategy(dir);

        this.sendContext = false;

        gameServer.setLocalStrategy(lstrategies);

    }

}
