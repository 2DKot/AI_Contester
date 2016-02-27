/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Player;
import com.belocraft.models.World;
import com.belocraft.network.Runner;
import java.math.BigDecimal;
import java.util.ArrayList;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author Eugene
 */
public class GameServer {
    
    private LocalStrategy[] lstrategy;
    private World world;
    private Processor processor;
    private Network network;
    private Boolean all_readed;  
    private Boolean game_over;
    private ArrayList map_history;
    
    private Runner runner;
    
    public GameServer()
    {
        this.processor = new Processor();
        this.all_readed = true;
        this.network = new com.belocraft.gameplay.Network(this);
        this.runner = new Runner(network);
        this.all_readed = false;
        Player[] players = new Player[1];
        players[0] = new Player(15);
        this.world = new World(players);
        this.game_over = false;      
        this.map_history = new ArrayList();
    }        
    
    public void setLocalStrategy(LocalStrategy[] lstrategy)
    {
        this.lstrategy = lstrategy;    
        all_readed = true;
    }
    
    public World getWorld()
    {
        return world;
    }        
    
    public Boolean getGameOver(){
        return this.game_over;
    }
    
    public void Start()
    {
        int ticks = 20;
        
        while(ticks != 0)
        {
            if (all_readed)
            {
                world = processor.Tick(lstrategy, world);
                AddX(world.getPlayers()[0].GetPositionX());
                ticks--;
                all_readed = false;
            }
            else network.requestInfo(runner);
            network.SendData();                       
        }
        
        String js = WriteJson();
        
    }
    
    void AddX(float X)
    {
        map_history.add(X);
    }    
    
    public String WriteJson()
    {
        JsonArrayBuilder array = Json.createArrayBuilder();
        for (int i = 0; i < map_history.size(); i++){
            JsonObjectBuilder value = Json.createObjectBuilder();
            value.add("tick", i);        
            value.add("players", Json.createObjectBuilder()
                    .add("X", String.valueOf((float)map_history.get(i))));
            array.add(value);
        }                
        return array.build().toString();
    }
}
