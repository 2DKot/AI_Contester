/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Player;
import com.belocraft.models.World;

/**
 *
 * @author Eugene
 */
public class Processor {

    public World tick(LocalStrategy[] strategies, World world) {
        for (int i = 0; i < strategies.length; i++) {
            switch (strategies[i].getDirection()) {
                case left:
                    if (world.getPlayers()[i].getPositionX() > 0.5F) {
                        world.getPlayers()[i]
                                = new Player(world.getPlayers()[i].getPositionX() - 0.5F,
                                 world.getPlayers()[i].getNickName(),world.getPlayers()[i].getScore());
                    }
                    break;
                case right:
                    if (world.getPlayers()[i].getPositionX() < 14.5F) {
                        world.getPlayers()[i]
                                = new Player(world.getPlayers()[i].getPositionX() + 0.5F,
                                 world.getPlayers()[i].getNickName(),world.getPlayers()[i].getScore());
                    }
                    break;
                case none:
                    break;
            }
        }

        return world;
    }
}
