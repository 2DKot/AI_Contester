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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
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
    private final int ticksCount;
    private final int strategyCount;
    private final Score score;

    public GameServer(int strategyCount, int ticksCount) {
        this.processor = new Processor();        
        this.network = new com.belocraft.gameplay.Network(this,strategyCount);        
        this.allReaded = false;
        Player[] players = new Player[strategyCount];
        for (int i = 0; i < players.length; i++) {
            players[i] = new Player(15, "Player " + (i+1),0);
        }
        this.world = new World(players);
        this.gameOver = false;        
        this.ticksCount = ticksCount;
        this.strategyCount = strategyCount;
        this.score = new Score();
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
        
        JsonLog jsonResult = new JsonLog(strategyCount);
        
        int ticks = this.ticksCount;
 
        network.waitConnection();

        while (ticks != 0) {
            if (allReaded) {
                world = processor.tick(lstrategies, world);
                Player[] players = world.getPlayers();
                for (int i = 0; i < players.length; i++) {
                    jsonResult.addX(players[i].getPositionX(),i);
                    players[i].addScore(score.getScoreOnTick(players[i]));                    
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
       
        ArrayList<Player> players = new ArrayList<>();       
        players.addAll(Arrays.asList(world.getPlayers()));

        players.sort(new Comparator<Player>() {
            @Override
            public int compare(Player o1, Player o2) {
                int a = o1.getScore();
                int b = o2.getScore();
                return a < b ? 1 : a == b ? 0 : -1;
            }
        });
        
        JsonScore jsonScore = new JsonScore(players);
        jsonScore.writeScoreIntoJson();
    }
}
