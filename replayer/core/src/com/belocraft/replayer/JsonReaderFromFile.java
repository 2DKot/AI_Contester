/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.replayer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonStructure;
import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import javax.json.JsonArray;

/**
 *
 * @author Eugene
 */
public class JsonReaderFromFile {

    private Maps map;
    private final ArrayList<Color> colors;
    
    JsonReaderFromFile()
    {
        colors = new ArrayList<Color>();
    }

    public Maps ReadJson(float speed) throws IOException {
        
        colors.add(Color.RED);
        colors.add(Color.GREEN);
        colors.add(Color.BLUE);
        colors.add(Color.YELLOW);
        
        map = new Maps(speed);
        String income_json = "";

        FileReader reader = new FileReader("result.json");
        int c;
        while ((c = reader.read()) != -1) {

            income_json += String.valueOf((char) c);
        }

        InputStream is
                = new ByteArrayInputStream(income_json.getBytes(Charset.defaultCharset()));
        JsonReader readerJson = Json.createReader(is);

        JsonStructure js = readerJson.read();
        JsonArray jo = (JsonArray) js;

        Gdx.app.log("J", String.valueOf(jo.size()));

        for (int i = 0; i < jo.size(); i++)         
        {
            JsonArray array = jo.getJsonObject(i).getJsonArray("players");
            ArrayList<ObjectToRender> objs = new ArrayList<ObjectToRender>();
            for (int j = 0; j < array.size(); j++){
            objs.add(buildObject((float)array.getJsonObject(j)
                    .getJsonNumber("x").doubleValue(),j));
            }
            
            map.addToArrayList(objs);
        }

        return map;
    }

    int koef = 10;

    ObjectToRender buildObject(float X, int i) {
        Pixmap pixCricle = new Pixmap(25, 25, Pixmap.Format.RGBA8888);
        pixCricle.setColor(colors.get(i));
        pixCricle.fillCircle(10, 10, 10);
        ObjectToRender objRender
                = new ObjectToRender(X * 45, 240, new Texture(pixCricle));        
        pixCricle.dispose();
        
        return objRender;
    }

}
