/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.models.Move;

/**
 *
 * @author Eugene
 */
public class RemoteProcess {

    private final Network network;
    private Boolean gameOver = false;

    public RemoteProcess(){
        network = new Network(this);
    }
    
    public Boolean connect(String adress, int port){
        return network.connect(adress, port);
    }
    
    public Boolean getGameOver() {
        return gameOver;
    }
    
    public void setGameOver(Boolean gameOver) {
        this.gameOver = gameOver;
    }
    
    public PlayerContext readPlayerContext() {
        PlayerContext context = network.readSocket();
        if (context != null) {
            this.gameOver = context.getGameOver();
        }
        return context;
    }

    public void writeMove(Move move) {
        network.writeSocket(move);
    }
}
