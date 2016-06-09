import {Page, NavController, NavParams} from 'ionic-angular';
import {Verbete} from '../../dicionario/verbete';
import {DicionarioService} from '../../dicionario/dicionario.service.ts';

@Page({
  templateUrl: 'build/pages/verbete/verbete.html'
})
export class VerbetePage {
  verbete: Verbete;

  constructor(private nav: NavController, navParams: NavParams, dicionarioService: DicionarioService) {

    /**
     * Uma view acessa os dados passados para ela através do navParams
     */
    this.verbete = <Verbete>navParams.get('verbete');
  }
}
