/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Player;
import com.belocraft.models.World;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author Eugene
 */
public class GameServer {

    private LocalStrategy[] lstrategies;
    private World world;
    private final Processor processor;
    private final Network network;
    private Boolean allReaded;
    private Boolean gameOver;
    private final ArrayList map_history;   

    public GameServer(int port) throws IOException {
        this.processor = new Processor();        
        this.network = new com.belocraft.gameplay.Network(this,port);        
        this.allReaded = false;
        Player[] players = new Player[1];
        players[0] = new Player(15);
        this.world = new World(players);
        this.gameOver = false;
        this.map_history = new ArrayList();
    }

    public void setLocalStrategy(LocalStrategy[] lstrategy) {
        this.lstrategies = lstrategy;
        allReaded = true;
    }

    public World getWorld() {
        return world;
    }

    public Boolean getGameOver() {
        return this.gameOver;
    }

    public void start() throws FileNotFoundException, IOException {
        int ticks = 20;
        
        network.waitConnection();

        while (ticks != 0) {
            if (allReaded) {
                world = processor.tick(lstrategies, world);
                addX(world.getPlayers()[0].getPositionX());
                ticks--;
                allReaded = false;
            } else 
            {
                network.sendData();
                network.readData();
            }           
        }
        
        this.gameOver = true;
        network.sendData();

        String js = writeJson();
        try (PrintWriter out = new PrintWriter("result.json")) {
            out.write(js);
            out.flush();
        }
    }

    void addX(float x) {
        map_history.add(x);
    }

    public String writeJson() {
        JsonArrayBuilder array = Json.createArrayBuilder();
        for (int i = 0; i < map_history.size(); i++) {
            JsonObjectBuilder value = Json.createObjectBuilder();
            JsonArrayBuilder array_value = Json.createArrayBuilder();
            value.add("tick", i);            
            array_value.add(Json.createObjectBuilder()
                    .add("x", (float) map_history.get(i)));
            value.add("players", array_value);
            array.add(value);
        }
        return array.build().toString();
    }
}
