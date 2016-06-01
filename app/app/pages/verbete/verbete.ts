import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {Verbete} from '../../dicionario/verbete';
import {DicionarioService} from '../../dicionario/dicionario.service.ts';

@Page({
  templateUrl: 'build/pages/verbete/verbete.html'
})
export class VerbetePage {
  verbete: Verbete;

  constructor(private nav: NavController, navParams: NavParams, dicionarioService: DicionarioService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.verbete = <Verbete>navParams.get('verbete');
  }
}
