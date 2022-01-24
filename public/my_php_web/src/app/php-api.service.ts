import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game, GameConsole } from './game-console/game-console.component';

@Injectable({
  providedIn: 'root'
})
export class PhpApiService {
  baseUrl: string = "http://localhost:4343/api/";

  constructor(private httpClient: HttpClient) { }

  public getConsoles(pageNumber: number, searchQuery?: string): Promise<GameConsole[]> {
    let httpParams = new HttpParams();
    if (searchQuery) {
      httpParams = httpParams.append("searchQuery", searchQuery)
    }
    httpParams = httpParams.append("page", pageNumber)

    const url = this.baseUrl + "consoles";
    return this.httpClient.get(url, { params: httpParams }).toPromise()
      .then(response => response as GameConsole[])
      .catch(this.handleError);
  }

  public getConsole(consoleId: string): Promise<GameConsole> {
    const url = this.baseUrl + "console/" + consoleId;
    return this.httpClient.get(url).toPromise()
      .then(response => response as GameConsole)
      .catch(this.handleError);
  }

  public postConsole(gameConsole: GameConsole): Promise<GameConsole> {
    const json = gameConsole.toJson();
    const url = this.baseUrl + "consoles";
    console.log(url);

    return this.httpClient.post(url, json).toPromise()
      .then(response => response as GameConsole)
      .catch(this.handleError);
  }

  public updateConsole(consoleId: string, newGameConsole: GameConsole): Promise<void> {
    const json = newGameConsole.toJson();
    const url = this.baseUrl + "console/" + consoleId;
    return this.httpClient.put(url, json).toPromise()
      .then(response => response as GameConsole)
      .catch(this.handleError);
  }

  public deleteConsole(consoleId: string): Promise<void> {
    const url = this.baseUrl + "console/" + consoleId;
    console.log(url);
    return this.httpClient.delete(url).toPromise()
      .catch(this.handleError);
  }

  // public getGames() {
  //   const url = this.baseUrl + "games";
  //   this.httpClient.get(url).toPromise()
  //     .then(response => response as GameConsole[])
  //     .catch(this.handleError);
  // }

  public postGame(consoleId: string, game: Game): Promise<GameConsole> {
    const url = this.baseUrl + "console/" + consoleId + "/games";
    return this.httpClient.post(url, game.toJson()).toPromise()
      .then(response => response as GameConsole)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("Error");
    return Promise.reject(error.message || error);

  }
}
