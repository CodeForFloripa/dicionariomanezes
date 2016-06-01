import { Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Verbete} from './verbete'
import {Observable} from 'rxjs'

@Injectable()
export class DicionarioService {

  verbetes: Array<Verbete>

  constructor(private http: Http) {

  }

  buscaVerbete(termo: string): Observable<Verbete[]> {
    var t = termo.toLowerCase();
    return this.carregaVerbetes()
      .flatMap(vs => Observable.from(vs))
      .filter(v => v.verbete.toLowerCase().indexOf(t) != -1)
      .toArray()
  }

  private carregaVerbetes(): Observable<Verbete[]> {
    return this.http.get('/assets/diciomane.json')
      .map(r=> <Verbete[]>r.json())
      .do(vs => this.verbetes = vs)
  }

  todosOsVerbetes(): Observable<Verbete[]> {
    return this.carregaVerbetes();
  }

  verbetesComecandoComLetra(letra: string): Observable<Verbete[]> {
    var s = letra.toLowerCase();
    return this.carregaVerbetes()
      .flatMap(vs => Observable.from(vs))
      .filter(v => v.verbete.toLowerCase().startsWith(s))
      .toArray()
  }

}
