import { Body, Controller, Get, Render, Post, Res, HttpRedirectResponse } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountCreation } from './AccountCreation';
import { Response } from 'express';

@Controller()
export class AppController {
  #accountCreation:AccountCreation[]=[];
  constructor(private readonly appService: AppService) {}


  @Get()
  @Render('index')
  getHello() {
    return {
      data:{},
      errors:[]
    };
  }

  @Get('SikeresFoglalas')
  @Render('FoglalasOldal')
  getFogOld(){
    return {
      
    }
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
    
    const stringDate = accountCreation.datum.toString()    
    const beirtDatum = Date.parse(stringDate.replace(/-/g, " "));
    const maiDatum = new Date();
    maiDatum.setHours(0, 0, 0, 0);
    const kulonbseg = Math.abs(Number(maiDatum) - beirtDatum);
    if (kulonbseg > 604800000) {
      errors.push("Hibásan megadott dátum!");
    }

    if(accountCreation.vendegSzam < 1 || accountCreation.vendegSzam > 10)
    {
      errors.push("A vendégek száma helytelenül lett megadva!")
    }

    if(errors.length > 0){
      response.render('index', {
        data: accountCreation,
        errors
    })
    return

    const Megadas:AccountCreation={
      nev:accountCreation.nev,
      emailCim:accountCreation.emailCim,
      datum: accountCreation.datum,
      vendegSzam: accountCreation.vendegSzam
    }
    //this.#Megadas.push(Megadas);
    //console.log(this.#Megadas);
    }
  }
}
