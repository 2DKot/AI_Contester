/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Direction;
import com.belocraft.models.Player;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonStructure;

/**
 *
 * @author Eugene
 */
public class Network {

    private final GameServer gameServer;
    private ServerSocket server;
    private final ArrayList<Socket> socket;
    private Boolean sendContext;
    private final int strategyCount;

    public Network(GameServer server, int strategyCount) {

        try {
            this.server = new ServerSocket(0);
        } catch (IOException ex) {            
            System.out.println(ex.getMessage());
        }
        
        System.out.println("[PORT] " + this.server.getLocalPort());

        this.gameServer = server;
        this.sendContext = false;
        this.socket = new ArrayList<>();
        this.strategyCount = strategyCount;
    }

    public void sendData() throws IOException {

        if (!sendContext) {

            Player[] players = gameServer.getWorld().getPlayers();

            for (int i = 0; i < players.length; i++) {

                if (socket.get(i) == null) {
                    continue;
                }

                float x = players[i].getPositionX();

                JsonObject value = Json.createObjectBuilder()
                        .add("x", x)
                        .add("game_over", gameServer.getGameOver())
                        .build();

                try{
                socket.get(i).getOutputStream().write(value.toString().getBytes());
                }catch(Exception ex){
                    socket.set(i, null);
                }
            }
        }

        this.sendContext = true;
    }

    public void waitConnection() throws IOException {
        System.out.println("wait conection user");
        for (int i = 0; i < strategyCount; i++) {
            socket.add(server.accept());
            System.out.println("user " + String.valueOf(i+1) + " connected");
        }
    }

    public void readData() {

        LocalStrategy[] lstrategies = new LocalStrategy[strategyCount];
        
        int i = 0;
        while(i < strategyCount) {

            if (socket.get(i) == null) {
                i++;
                continue;                
            }

            String move;
            
            try {
                InputStream inputStream = socket.get(i).getInputStream();
                byte[] buf = new byte[inputStream.available()];
                inputStream.read(buf);
                move = new String(buf);
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                socket.set(i, null);
                i++;
                continue;
            }
            InputStream is
                    = new ByteArrayInputStream(move.getBytes(Charset.defaultCharset()));

            if (move.equals("")) {                
                continue;
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

            lstrategies[i] = new LocalStrategy(dir);
            i++;
        }

        this.sendContext = false;

        gameServer.setLocalStrategy(lstrategies);

    }
}