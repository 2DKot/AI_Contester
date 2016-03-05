/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.replayer;

import java.util.ArrayList;

/**
 *
 * @author Eugene
 */
public class Maps {

    private final ArrayList<ArrayList<ObjectToRender>> animation;
    private ArrayList<ObjectToRender> lastObj;
    private float temp = 1;
    private float speed = 1;

    public Maps(float speed) {
        this.animation = new ArrayList<ArrayList<ObjectToRender>>();
        this.speed = speed;
    }

    public ArrayList<ArrayList<ObjectToRender>> getAnimation() {
        return this.animation;
    }

    public void addToArrayList(ArrayList<ObjectToRender> obj) {
        this.animation.add(obj);
    }

    public ArrayList<ObjectToRender> getNextObject(float delta) {
        if (!animation.isEmpty() && temp >= this.speed) {
            ArrayList<ObjectToRender> value = animation.get(0);
            animation.remove(0);
            lastObj = value;
            temp = 0;
        }
        temp += delta;
        return lastObj;
    }
}
