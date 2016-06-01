import {Page, NavController, NavParams} from 'ionic-angular';
import {ListaVerbetesPage} from '../lista-verbetes/lista-verbetes';
import {Verbete} from '../../dicionario/verbete';
import {DicionarioService} from '../../dicionario/dicionario.service.ts';

@Page({
  templateUrl: 'build/pages/dicionario/dicionario.html'
})
export class DicionarioPage {

  public letras: string[]

  constructor(private nav: NavController, navParams: NavParams, dicionarioService: DicionarioService) {
    // If we navigated to this page, we will have an item available as a nav param

    this.letras = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    console.log(this.letras);
  }

  letraSelecionada(event, item) {
    this.nav.push(ListaVerbetesPage, {
      letra: item
    });
  }
}
