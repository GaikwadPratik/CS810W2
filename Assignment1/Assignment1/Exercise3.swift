//
//  Exercise3.swift
//  Assignment1
//
//  Created by Pratik on 6/9/17.
//  Copyright © 2017 Pratik. All rights reserved.
//

import Foundation

func Exercise3Solution()->Void
{
    let _dicMarathonTimings:[Int:String] =
    [
        341: "Elena",
        273: "Thomas",
        278: "Hamilton",
        329: "Suzie",
        445: "Phil",
        402: "Matt",
        388: "Alex",
        275: "Emma",
        243: "John",
        334: "James",
        412: "Jane",
        393: "Emily",
        299: "Daniel",
        343: "Neda",
        317: "Aaron",
        265: "Kate"
    ];
    
    let _arrTimings = [Int](_dicMarathonTimings.keys);
    var _nMinTime = Int.max;
    
    for _time in _arrTimings
    {
        if(_time < _nMinTime)
        {
            _nMinTime = _time;
        }
    }
    
    print("The fastest runner is \(_dicMarathonTimings[_nMinTime]!) having running time as \(_nMinTime) minutes");
}
