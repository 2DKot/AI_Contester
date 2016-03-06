/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft;

import com.belocraft.models.Direction;
import com.belocraft.models.Player;
import com.belocraft.models.World;

/**
 *
 * @author Eugene
 */
public class MyStrategy implements Strategy {

    Boolean t = false;

    @Override
    public void move(Player play, World world, com.belocraft.models.Move move) {

        if (play.getPositionX() > 0.5F && t == false) {
            move.setDirection(Direction.left);
        } else {
            t = true;
        }

        if (t && play.getPositionX() < 14.5F) {
            move.setDirection(Direction.right);
        } else {
            t = false;
        }

    }

}
