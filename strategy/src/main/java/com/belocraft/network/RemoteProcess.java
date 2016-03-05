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

    Network network;
    Boolean game_over = false;

    public RemoteProcess(){
        network = new Network();
    }
    
    public Boolean connect(String adress, int port){
        return network.connect(adress, port);
    }
    
    public Boolean getGameOver() {
        return game_over;
    }
    
    public PlayerContext readPlayerContext() {
        PlayerContext context = network.readSocket();
        if (context != null) {
            this.game_over = context.getGameOver();
        }
        return context;
    }

    public void writeMove(Move move) {
        network.writeSocket(move);
    }
}
