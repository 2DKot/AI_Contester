/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

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
public class JsonLog {
    
    private final ArrayList<Tuple<Integer,ArrayList>> mapHistory;
    public JsonLog(int strategyCount)
    {
        this.mapHistory = new ArrayList<>();    
        for (Integer i = 0; i < strategyCount; i++){
            this.mapHistory.add(new Tuple<>(i.intValue(),new ArrayList()));
        }
    }        
    
    void addX(float x, int numberPlayer) {
        mapHistory.get(numberPlayer).y.add(x);
    }

    public void writeJson() throws FileNotFoundException {
        JsonArrayBuilder array = Json.createArrayBuilder();
        for (int i = 0; i < mapHistory.get(0).y.size(); i++) {
            JsonObjectBuilder value = Json.createObjectBuilder();
            JsonArrayBuilder array_value = Json.createArrayBuilder();
            value.add("tick", i);            
            
            for (Tuple<Integer,ArrayList> player : mapHistory){
            array_value.add(Json.createObjectBuilder()
                    .add("x", (float)player.y.get(i)));
            }
            
            value.add("players", array_value);
            array.add(value);
        }
        writeToFile(array.build().toString());
    }
    
    void writeToFile(String json) throws FileNotFoundException
    {
        try (PrintWriter out = new PrintWriter("log.json")) {
            out.write(json);
            out.flush();
        }
    }
}
