/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.MyStrategy;
import com.belocraft.Strategy;
import com.belocraft.models.Move;

/**
 *
 * @author Eugene
 */
public class Runner {

    RemoteProcess remote;
    Strategy strategy = new MyStrategy();

    public Runner(){
        remote = new RemoteProcess();
    }
    
    public Boolean connect(String adress, int port){
        return remote.connect(adress,port);
    }

    public void run() {
        
        int tryes = 1000;
        while (!remote.getGameOver()) {
            Move move = new Move();
            PlayerContext context = remote.readPlayerContext();
            if (context == null) {
        //        tryes--;
                if (tryes > 1) {
                    continue;
                } else {
                    break;
                }
            }
            strategy.move(context.getPlayer(), context.getWorld(), move);
            remote.writeMove(move);
            tryes = 100;
        }
        /* Move move = new Move();
        PlayerContext context = remote.readPlayerContext();
        if (context != null) {
            strategy.move(context.getPlayer(), context.getWorld(), move);
            remote.writeMove(move);
        }*/
    }
}
