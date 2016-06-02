import { Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Verbete} from './verbete'
import {Observable} from 'rxjs'

@Injectable()
export class DicionarioService {

  verbetes: Array<Verbete>

  constructor(private http: Http) { }


  /**
   * Busca um verbete com base num termo assincronamente
   * @param  {string}                termo Termo a ser pesquisado. Desconsidera case e o termo pode estar em qualquer lugar da palavra
   * @return {Observable<Verbete[]>}
   */
  buscaVerbete(termo: string): Observable<Verbete[]> {
    var t = termo.toLowerCase();
    return this.carregaVerbetes()
      .flatMap(vs => Observable.from(vs))
      .filter(v => v.verbete.toLowerCase().indexOf(t) != -1)
      .toArray()
  }

  /**
   * Carrega todos os verbetes
   * TODO: Implementar cache
   * @return {Observable<Verbete[]>}
   */
  private carregaVerbetes(): Observable<Verbete[]> {
    return this.http.get('assets/diciomane.json')
      .map(r=> <Verbete[]>r.json())
      .do(vs => this.verbetes = vs)
  }

  /**
   * Retorna todos os verbetes disponíveis
   * @return {Observable<Verbete[]>} [description]
   */
  todosOsVerbetes(): Observable<Verbete[]> {
    return this.carregaVerbetes();
  }

  /**
   * Busca verbetes que comecem com uma letra específica (desconsiderando case)
   *
   * @param  {string}                letra
   * @return {Observable<Verbete[]>}       [description]
   */
  verbetesComecandoComLetra(letra: string): Observable<Verbete[]> {
    var s = letra.toLowerCase();
    return this.carregaVerbetes()
      .flatMap(vs => Observable.from(vs))
      .filter(v => v.verbete.toLowerCase().startsWith(s))
      .toArray()
  }

}
