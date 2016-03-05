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
public interface INetwork {

    public void writeSocket(Move move);

    public PlayerContext readSocket();
}
