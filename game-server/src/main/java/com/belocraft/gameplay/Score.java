/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Player;

/**
 *
 * @author Eugene
 */
public class Score {
  
    public int getScoreOnTick(Player player)
    {
        return (int) (player.getPositionX()*2);
    }
}
