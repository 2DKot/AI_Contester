/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.replayer;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonStructure;
import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;

/**
 *
 * @author Eugene
 */
public class JsonReader {
    
    public void ReadJson() throws IOException
    {
        String income_json = "";
        
        FileReader reader = new FileReader("test.json");
        int c;
            while((c=reader.read())!=-1){
                 
                income_json += String.valueOf((char)c);
            }                                      

        InputStream is
                = new ByteArrayInputStream(income_json.getBytes(Charset.defaultCharset()));

        
        JsonReader reader = Json.createReader(is);

        JsonStructure js = reader.read();
        JsonObject jo = (JsonObject) js;

        float position_x = (float)jo.getJsonNumber("x").doubleValue();                        
    }
    
}
