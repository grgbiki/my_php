import { Component, OnInit } from '@angular/core';
import { GameConsole } from '../game-console/game-console.component';

import { PhpApiService } from '../php-api.service';

@Component({
  selector: 'app-game-consoles',
  templateUrl: './game-consoles.component.html',
  styleUrls: ['./game-consoles.component.css']
})
export class GameConsolesComponent implements OnInit {
  gameConsoles: GameConsole[] = [];
  newConsole = new GameConsole("Test", "Test", "Test");
  search: string = "";
  pageNumber: number = 1;

  constructor(private phpApiService: PhpApiService) { }

  ngOnInit(): void {
    this.phpApiService.getConsoles(this.pageNumber)
      .then(consoles => this._setConsole(consoles))
      .catch(err => this._handleError(err));
  }

  searchConsole() {
    this.pageNumber = 1;
    this.phpApiService.getConsoles(this.pageNumber, this.search)
      .then(consoles => this._setConsole(consoles))
      .catch(err => this._handleError(err));
  }

  private _handleError(err: any): void {
    console.log(err);
  }

  private _setConsole(consoles: GameConsole[]): void {
    this.gameConsoles = consoles;
    console.log(this.gameConsoles);
  }

  next() {
    this.pageNumber = this.pageNumber + 1;
    this.phpApiService.getConsoles(this.pageNumber)
      .then(consoles => this._setConsole(consoles))
      .catch(err => this._handleError(err));
  }
  previous() {
    this.pageNumber = this.pageNumber - 1;
    this.phpApiService.getConsoles(this.pageNumber)
      .then(consoles => this._setConsole(consoles))
      .catch(err => this._handleError(err));
  }
}
