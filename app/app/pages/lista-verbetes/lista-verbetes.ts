import {Page, NavController, NavParams, Toast} from 'ionic-angular';
import {Verbete} from '../../dicionario/verbete';
import {DicionarioService} from '../../dicionario/dicionario.service.ts';
import {VerbetePage} from '../verbete/verbete';
import {NgZone,ChangeDetectorRef, Input, Component} from '@angular/core';




@Page({
  templateUrl: 'build/pages/lista-verbetes/lista-verbetes.page.html'
})
export class ListaVerbetesPage {
  verbetes: Verbete[];
  err: string

  constructor(private nav: NavController, navParams: NavParams, dicionarioService: DicionarioService) {

    // Chamada assícrona para atualização dos dados
    dicionarioService
      .verbetesComecandoComLetra(navParams.get("letra"))
      .subscribe(vs => this.verbetes = vs);
  }


  /**
   * Callback para a seleção de itens
   */
  verbeteSelecionado(event, item) {
    /* Iniciando uma nova página */
    this.nav.push(VerbetePage, {
      verbete: item
    });
  }

  /**
   * Mostra uma mensagem na tela
   * @param  {string} message [description]
   * @return {[type]}         [description]
   */
  showToast(message: string) {
    let toast = Toast.create({
      message: message,
      duration: 3000
    });

    this.nav.present(toast)
  }
}
