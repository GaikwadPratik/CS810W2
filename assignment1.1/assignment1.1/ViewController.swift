//
//  ViewController.swift
//  assignment1
//
//  Created by Pratik on 6/3/17.
//  Copyright © 2017 Pratik. All rights reserved.
//

import UIKit

class ViewController: UIViewController
{
    
    var _numberOnScreen:Double = 0;
    var _previousNumber:Double = 0;
    var _calculating:Bool = false;
    var _operation = 0;
    
    @IBOutlet weak var lblResult: UILabel!
    
    @IBAction func numbersClick(_ sender: UIButton)
    {
        if(_calculating == true)
        {
            lblResult.text = String(sender.tag - 1);
            _numberOnScreen = Double(lblResult.text!)!;
            _calculating = false;
        }
        else
        {
            lblResult.text = lblResult.text! + String(sender.tag - 1);
            _numberOnScreen = Double(lblResult.text!)!;
        }
    }
    
    
    @IBAction func operationClick(_ sender: UIButton)
    {
        //Only when number is entered and button pressed is neither "C" nor "="
        if(lblResult.text != "" && sender.tag != 11 && sender.tag != 16)
        {
            _previousNumber = Double(lblResult.text!)!;
            if(sender.tag == 12)//divide
            {
                lblResult.text = "/";
            }
            if(sender.tag == 13)//multiply
            {
                lblResult.text = "*";
            }
            if(sender.tag == 14)//subtract
            {
                lblResult.text = "-";
            }
            if(sender.tag == 15)//add
            {
                lblResult.text = "+";
            }
            
            _operation = sender.tag;
            _calculating = true;
        }
        else if (sender.tag == 16) //When "=" is pressed
        {
            if(_operation == 12)
            {
                lblResult.text = String(_previousNumber / _numberOnScreen);
            }
            else if (_operation == 13)
            {
                lblResult.text = String(_previousNumber * _numberOnScreen);
            }
            else if(_operation == 14)
            {
                lblResult.text = String(_previousNumber - _numberOnScreen);
            }
            else if(_operation == 15)
            {
                lblResult.text = String(_previousNumber + _numberOnScreen);
            }
        }
        else if(sender.tag == 11)//"C"
        {
            _previousNumber = 0;
            _numberOnScreen = 0;
            lblResult.text = "";
            _operation = 0;
        }
    }

    override func viewDidLoad()
    {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning()
    {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

