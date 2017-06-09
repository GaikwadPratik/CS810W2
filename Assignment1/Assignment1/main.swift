//
//  main.swift
//  Assignment1
//
//  Created by Pratik on 6/7/17.
//  Copyright © 2017 Pratik. All rights reserved.
//

import Foundation

var _dPrinciple = 1000.00;
var _dHighRate = 0.02;
var _dLowRate = 0.01;
var _dRate = 0.00;
var _nMonthCount = 0;
var _dFinalAmount = _dPrinciple;

while (_dPrinciple >= 0)
{
    if (_dPrinciple > 500)
    {
        _dRate = _dHighRate;
    }
    else
    {
        _dRate = _dLowRate;
    }
    
    var _dInterest = _dPrinciple*_dRate;
    _dPrinciple = _dPrinciple+_dInterest;
    
    var _dRoundedPrinciple = Double(round(100*_dPrinciple)/100);
    _nMonthCount = _nMonthCount + 1;
    
    if (_nMonthCount < 10)
    {
        print(" Month number: \(_nMonthCount),  Amount left to be paid: $\(_dRoundedPrinciple)");
    }
    else
    {
        print(" Month number: \(_nMonthCount), Amount left to be paid: $\(_dRoundedPrinciple)");
    }
    
    _dFinalAmount = _dFinalAmount + _dInterest;
    _dPrinciple = _dPrinciple-100.00;
}

var finalRounded = Double(round(100*_dFinalAmount)/100)
print("\n The entire loan of $1000, which after interest is $\(finalRounded) has been paid in a total of \(_nMonthCount) months.")

