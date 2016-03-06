/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.Main;
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

    public GameServer(int port) throws IOException {
        this.processor = new Processor();        
        this.network = new com.belocraft.gameplay.Network(this,port);        
        this.allReaded = false;
        Player[] players = new Player[Main.getStrategyCount()];
        for (int i = 0; i < players.length; i++) {
            players[i] = new Player(15);
        }
        this.world = new World(players);
        this.gameOver = false;        
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
        
        JsonResult jsonResult = new JsonResult();
        
        int ticks = Main.getTicksCount();
 
        network.waitConnection();

        while (ticks != 0) {
            if (allReaded) {
                world = processor.tick(lstrategies, world);
                Player[] players = world.getPlayers();
                for (int i = 0; i < players.length; i++) {
                    jsonResult.addX(players[i].getPositionX(),i);
                }
                ticks--;
                allReaded = false;
            } else {
                network.sendData();
                network.readData();
            }           
        }
        
        this.gameOver = true;
        network.sendData();

        jsonResult.writeJson();        
    }
}