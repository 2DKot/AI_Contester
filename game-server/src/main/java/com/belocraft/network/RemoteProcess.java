/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.network;

import com.belocraft.gameplay.For_Test_Network;
import com.belocraft.models.Move;

/**
 *
 * @author Eugene
 */
public class RemoteProcess implements IRemoteProcess{

    Network network;
    Boolean game_over = false;        
    
    public RemoteProcess(For_Test_Network net, Runner runner)
    {        
        network = new Network(net, runner);
    }
    
    @Override
    public Boolean GameOVER() {
        return game_over;
    }

    @Override
    public PlayerContext ReadPlayerContext() {
        PlayerContext context = network.readSocket();
        if (context != null) this.game_over = context.getGame_over();
        return context;
    }

    @Override
    public void WriteMove(Move move) {        
        network.writeSocket(move);
    }
    
    
}
