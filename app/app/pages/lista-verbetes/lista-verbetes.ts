import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {Verbete} from '../../dicionario/verbete';
import {DicionarioService} from '../../dicionario/dicionario.service.ts';
import {VerbetePage} from '../verbete/verbete';

@Page({
  templateUrl: 'build/pages/lista-verbetes/lista-verbetes.html'
})
export class ListaVerbetesPage {
  selectedItem: any;
  verbetes: Verbete[];

  constructor(private nav: NavController, navParams: NavParams, dicionarioService: DicionarioService) {
    // If we navigated to this page, we will have an item available as a nav param
    console.log(navParams.get("letra"));
    dicionarioService.verbetesComecandoComLetra(navParams.get("letra"))
      .subscribe(vs => this.update(vs));

  }

  update(vs:Verbete[]) {
    this.verbetes = vs;
  }

  verbeteSelecionado(event, item) {
    console.log(item);
    this.nav.push(VerbetePage, {
      verbete: item
    });
  }
}
