import {ViewChild} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {DicionarioPage} from './pages/dicionario/dicionario.ts';
import {ListaVerbetesPage} from './pages/lista-verbetes/lista-verbetes.ts';
import {VerbetePage} from './pages/verbete/verbete.ts';
import {DicionarioService} from './dicionario/dicionario.service.ts';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [[DicionarioService]]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = DicionarioPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dicionário', component: DicionarioPage },
      { title: 'Dicionário a', component: ListaVerbetesPage },
      { title: 'Dicionário b', component: VerbetePage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
