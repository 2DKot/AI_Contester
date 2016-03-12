/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.models;

/**
 *
 * @author Eugene
 */
public class Player {

    private float x = 0;
    private int score = 0;

    public int getScore() {
        return score;
    }
    private final String nickName;

    public String getNickName() {
        return nickName;
    }

    public Player(float x, String nickName, int score) {
        this.x = x;
        this.nickName = nickName;
        this.score = score;
    }

    public float getPositionX() {
        return x;
    }
    
    public void addScore(int score)
    {
        this.score += score;
    }
}
