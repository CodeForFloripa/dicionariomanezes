import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {Verbete} from '../../dicionario/verbete';
import {DicionarioService} from '../../dicionario/dicionario.service.ts';

@Page({
  templateUrl: 'build/pages/dicionario/dicionario.html'
})
export class DicionarioPage {
  selectedItem: any;
  verbetes: Verbete[];

  constructor(private nav: NavController, navParams: NavParams, dicionarioService: DicionarioService) {
    // If we navigated to this page, we will have an item available as a nav param

    dicionarioService.verbetesComecandoComLetra("a")
      .subscribe(vs => this.update(vs));

  }

  update(vs:Verbete[]) {
    this.verbetes = vs;
  }

  itemTapped(event, item) {
    // this.nav.push(ItemDetailsPage, {
    //   item: item
    // });
  }
}
