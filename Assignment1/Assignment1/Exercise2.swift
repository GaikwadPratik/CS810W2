//
//  Exercise2.swift
//  Assignment1
//
//  Created by Pratik on 6/9/17.
//  Copyright © 2017 Pratik. All rights reserved.
//

import Foundation

var _arrWeather = Array(20...120);
var _arrSchedule = Array(0...5);
var _arrLikeRunning = Array(0...10);

//Hard coded values
var _nWeather = 25;
var _nSchedule = 3;
var _nLikeRunning = 9;

func Exercise2Solution()->Void
{
    if((_arrLikeRunning[_nLikeRunning] < 4) || (_arrSchedule[_nSchedule] > 2) || (_arrWeather[_nWeather] < 45 || _arrWeather[_nWeather] > 90))
    {
        print("Not Going for a Run");
    }
    else
    {
        print("Going for a Run");
    }
}
