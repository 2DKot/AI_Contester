/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft;

import com.belocraft.models.Move;
import com.belocraft.models.Player;
import com.belocraft.models.World;

/**
 *
 * @author Eugene
 */
public interface Strategy {
    
    public void move(Player play, World world, Move move);
}
