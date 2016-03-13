/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.belocraft.gameplay;

import com.belocraft.models.Direction;

/**
 *
 * @author Eugene
 */
public class LocalStrategy {

    private final Direction direction;

    public LocalStrategy(Direction direction) {
        this.direction = direction;
    }

    public Direction getDirection() {
        return direction;
    }
}
