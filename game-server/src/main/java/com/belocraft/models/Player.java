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
    
    private float X = 0;
    
    public Player(float X)
    {
        this.X = X;
    }
    
    public float GetPositionX()
    {
        return X;
    }
}
