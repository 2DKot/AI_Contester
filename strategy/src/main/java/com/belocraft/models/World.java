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
public class World {

    private Player[] players;

    public World(Player[] players) {
        this.players = players;
    }

    public Player[] getPlayers() {
        return players;
    }
}
