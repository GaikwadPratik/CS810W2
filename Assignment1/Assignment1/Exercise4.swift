//
//  Exercise4.swift
//  Assignment1
//
//  Created by Pratik on 6/9/17.
//  Copyright © 2017 Pratik. All rights reserved.
//

import Foundation

class Currency
{
    var _chCountry :Character;
    var _chName:Character;
    var _chSymbol:Character;
    
    init()
    {
        _chCountry = " ";
        _chName = " ";
        _chSymbol = " ";
    }
}

class Money
{
    var _fValue :Float;
    let _currency = Currency();
    init()
    {
        _fValue = 0.0;
    }
}

class ATMLogin
{
    var _chPassword:Character;
    var _chUser:Character;
    init()
    {
        _chPassword = " ";
        _chUser = " ";
    }
}

class ATM
{
    var _name:Character;
    var _number:Character;
    let _innerCash:InnerCash;
    let _log:Log;
    var _session:[Session];
    var _money: [Money];
    let _atmLogin:ATMLogin;
    
    init()
    {
        _atmLogin = ATMLogin();
        _name = _atmLogin._chUser;
        _number = _atmLogin._chPassword;
        _log = Log();
        _innerCash = InnerCash();
        _session = [Session]();
        _money = [Money]();
    }
}

class Log
{
    var _chCardNumber:Character;
    var _dtDate:Date;
    var _chDetails:Character;
    var _chSessionNumber:Character;
    var _dTime:Double;
    var _chTransactionNumber: Character;
    let _atm:ATM;
    
    init()
    {
        _chCardNumber = " ";
        _dtDate = Date();
        _chDetails = " ";
        _chSessionNumber = " ";
        _dTime = 0.0;
        _chTransactionNumber = " ";
        _atm = ATM();
    }
}

class InnerCash
{
    var _nBill1:Int
    var _nBill10:Int
    var _nBill100:Int
    var _nBill20:Int
    var _nBill5:Int
    var _nBill50:Int
    let _atm:ATM;
    var _money:[Money];
    init()
    {
        _nBill1 = 0;
        _nBill10 = 0;
        _nBill100 = 0;
        _nBill20 = 0;
        _nBill5 = 0;
        _nBill50 = 0;
        _atm = ATM();
        _money = [Money]();
    }
}

class Account
{
    var _fInitialBalance:Float
    var _chNumber:Character
    var _nOverdraftLimit:Int
    var _chOwner:Character
    let _currency: Currency
    let _bank:Bank
    var _card:[Card]
    
    init()
    {
        _fInitialBalance = 0.0;
        _chNumber = " ";
        _nOverdraftLimit = 0;
        _chOwner = " ";
        _currency = Currency();
        _bank = Bank();
        _card = [Card]();
    }
}

class Bank
{
    var _chCode:Character;
    var _chName:Character;
    var _account:[Account];
    
    init()
    {
        _chCode = " ";
        _chName = " ";
        _account = [Account]();
    }
}

class Card
{
    var _dtExpirationDate:Date
    var _chHolderName:Character
    var _chHolderSurname:Character
    var _chNumber:Character
    var _chPassword:Character
    let _account:Account
    
    init()
    {
        _dtExpirationDate = Date();
        _chHolderName =  " ";
        _chHolderSurname = " ";
        _chNumber = " ";
        _chPassword = " ";
        _account = Account()
    }
    
    func bank()
    {
        
    }
}
class Transaction
{
    var _fAmount : Float;
    var _nCurrentBalance:Int;
    var _dtDate: Date;
    var _bDone: Bool;
    var _chNumber:Character;
    var _dTime:Double;
    var _session:Session;
    var _currency:Currency;
    
    init()
    {
        _fAmount = 0.0;
        _nCurrentBalance = 0;
        _dtDate = Date();
        _bDone = true;
        _chNumber = " ";
        _dTime = _dtDate.timeIntervalSinceReferenceDate;
        _session = Session();
        _currency = Currency();
    }
    
    func account() -> Void
    {
        
    }
    
    func bank() -> Void
    {
        
    }
    
    func card() -> Void
    {
        
    }
}

class Withdrawal:Transaction{}

class Inquiry:Transaction{}

class Deposit:Transaction{}

class Transfer:Transaction
{
    var _chTargetAccountNumber:Character;
    var _chTargetBankCode:Character;
    override init()
    {
        _chTargetAccountNumber=" ";
        _chTargetBankCode=" ";
    }
}

class Session
{
    var _chLastMessage:Character;
    var _chNumber:Character;
    let _card: Card;
    let _atm: ATM;
    var _transaction:[Transaction];
    
    init()
    {
        _chLastMessage=" ";
        _chNumber=" ";
        _card = Card();
        _atm = ATM();
        _transaction = [Transaction]();
    }
    
    func account()
    {
        
    }
    
    func bank()
    {
        
    }
}
