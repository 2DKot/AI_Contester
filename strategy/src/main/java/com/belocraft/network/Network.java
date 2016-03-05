/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.models.Move;
import com.belocraft.models.Player;
import com.belocraft.models.World;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.nio.charset.Charset;
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
public class Network implements INetwork {

    private Socket socket;
    private RemoteProcess remote;

    public Network(RemoteProcess remoteProcess) {
        this.remote = remoteProcess;
    }

    
    public Boolean connect(String adress, int port)
    {
        System.out.println("try connect to server");

         try {
                this.socket = new Socket(adress, port);
                System.out.println("connect successful");
            return true;
            } catch (IOException ex) {
                Logger.getLogger(Network.class.getName()).log(Level.SEVERE, null, ex);
                System.out.println("connect fail");
            return false;
            }     
    }

    @Override
    public PlayerContext readSocket() {

        String incomeJson = null;

        try {
            InputStream inputStream = socket.getInputStream();
            int avalible = inputStream.available();
            byte buf[] = new byte[avalible];
            inputStream.read(buf, 0, avalible);
            incomeJson = new String(buf);

        } catch (IOException ex) {
            Logger.getLogger(Network.class.getName()).log(Level.SEVERE, null, ex);
            remote.setGameOver(true);
        }

        if (incomeJson == null || incomeJson.equals("")) {
            return null;
        }

        InputStream is
                = new ByteArrayInputStream(incomeJson.getBytes(Charset.defaultCharset()));

        JsonReader reader = Json.createReader(is);

        JsonStructure js = reader.read();
        JsonObject jo = (JsonObject) js;

        float position_x = (float) jo.getJsonNumber("x").doubleValue();

        Player player = new Player(position_x);

        Player[] players = new Player[1];
        players[0] = player;

        PlayerContext pc = new PlayerContext(player, new World(players));

        Boolean game_over = jo.getBoolean("game_over");
        if (game_over) {
            pc.setGameOver();
        }

        return pc;
    }

    @Override
    public void writeSocket(Move move) {

        String direction;

        switch (move.getDirection()) {
            case left:
                direction = "left";
                break;
            case right:
                direction = "right";
                break;
            default:
                direction = "none";
                break;
        }

        JsonObject value = Json.createObjectBuilder()
                .add("direction", direction)
                .build();

        try {
            socket.getOutputStream().write(value.toString().getBytes());
        } catch (IOException ex) {
            Logger.getLogger(Network.class.getName()).log(Level.SEVERE, null, ex);
            remote.setGameOver(true);
        }
    }

}
