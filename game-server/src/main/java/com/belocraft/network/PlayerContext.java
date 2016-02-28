/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.models.Player;
import com.belocraft.models.World;

/**
 *
 * @author Eugene
 */
public class PlayerContext {

    private final Player player;
    private final World world;
    private Boolean game_over;

    public PlayerContext(Player player, World world) {
        this.player = player;
        this.world = world;
        this.game_over = false;
    }

    public Player getPlayer() {
        return player;
    }

    public World getWorld() {
        return world;
    }

    public Boolean getGameOver() {
        return game_over;
    }

    public void setGameOver() {
        this.game_over = true;
    }
}
