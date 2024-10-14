import { Body, Controller, Get, Render, Post, Res, HttpRedirectResponse } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountCreation } from './AccountCreation';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Post('AppDolg')
  AppDolg(@Body() accountCreation:AccountCreation, 
  @Res() response: Response){

    let errors = [];

    if(!accountCreation.nev || !accountCreation.emailCim || !accountCreation.datum || accountCreation.vendegSzam){
      errors.push('Minden mezőt kötelező kitölteni!');
    }
    let emailCheck = accountCreation.emailCim;
    if(emailCheck.lastIndexOf("@") == -1 || emailCheck.indexOf("@") == 0 || emailCheck.indexOf("@") == emailCheck.length){
      errors.push('Helytelen e-mail címet adott meg!')
    }
    if(accountCreation.vendegSzam < 1 || accountCreation.vendegSzam > 10)
    {
      errors.push("A vendégek száma helytelenül lett megadva!")
    }
  }

  }
