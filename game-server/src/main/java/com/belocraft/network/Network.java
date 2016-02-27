/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.gameplay.For_Test_Network;
import com.belocraft.models.Move;
import com.belocraft.models.Player;
import com.belocraft.models.World;
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
public class Network implements INetwork{
    
    For_Test_Network network;
    Runner runner;
    
    public Network(For_Test_Network net, Runner runner)
    {
        this.network = net;
        this.runner = runner;
    }
    
    @Override
    public PlayerContext readSocket() {        
        String income_json = network.ReadData();
        
        if (income_json == null) return null;
        
        InputStream is = 
                new ByteArrayInputStream
        (income_json.getBytes(Charset.defaultCharset()));  
        
        JsonReader reader = Json.createReader(is);
        
        JsonStructure js = reader.read();
        JsonObject jo = (JsonObject)js;
        
        String position_x = jo.getString("X");                            
        
        Player player = new Player(Float.parseFloat(position_x));
        
        Player[] players = new Player[1];
        players[0] = player;
        
        PlayerContext pc = new PlayerContext(player, new World(players));
        
        Boolean game_over = jo.getBoolean("Game_Over");          
        if (game_over) pc.setGame_over();        
        
        runner.Run();
        
        return pc;        
    }

    @Override
    public void writeSocket(Move move) {                           
        
        String direction;
        
        switch(move.getDirection()){
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
                .add("Direction", direction)
                .build();
        
        network.SendData(value.toString());
    }
    
}
