/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Player;
import com.belocraft.mymath.Tuple;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author Eugene
 */
public class JsonScore {
    
    private final ArrayList<Player> players;
    
    public JsonScore(ArrayList<Player> players)
    {
        this.players = players;
    }
    
    public void writeScoreIntoJson() throws FileNotFoundException
    {
        JsonArrayBuilder array = Json.createArrayBuilder();
        
        for (Player player : players)
        {
            JsonObjectBuilder value = Json.createObjectBuilder();             
            value.add(player.getNickName(),player.getScore());
            array.add(value);
        }               
        
        writeToFile(array.build().toString());
    }
    
    private void writeToFile(String json) throws FileNotFoundException
    {
        try (PrintWriter out = new PrintWriter("result.json")) {
            out.write(json);
            out.flush();
        }
    }
}