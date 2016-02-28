/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Direction;
import com.belocraft.network.Runner;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonStructure;

/**
 *
 * @author Eugene
 */
public class Network implements For_Test_Network {

    GameServer game_server;

    public Network(GameServer server) {
        this.game_server = server;
    }

    private String data = "";

    public void sendData() {
        float x = game_server.getWorld().getPlayers()[0].getPositionX();

        JsonObject value = Json.createObjectBuilder()
                .add("x", x)
                .add("game_over", game_server.getGameOver())
                .build();
        data = value.toString();
    }

    public void requestInfo(Runner runner) {
        runner.run();
    }

    @Override
    public String readData() {

        if ("".equals(data)) {
            return null;
        }

        String Data_copy = data;
        data = "";
        return Data_copy;
    }

    @Override
    public void sendData(String move) {
        InputStream is
                = new ByteArrayInputStream(move.getBytes(Charset.defaultCharset()));

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

        game_server.setLocalStrategy(lstrategies);
    }

}
