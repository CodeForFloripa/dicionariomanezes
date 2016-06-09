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

    // Letras para serem mostradas. Não precisamos atualizar a view, isso eh feito
    // automagicamente
    this.letras = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  }

  /**
   * Callback para a seleção de uma letra
   */
  letraSelecionada(event, item) {
    this.nav.push(ListaVerbetesPage, {
      letra: item
    });
  }
}
