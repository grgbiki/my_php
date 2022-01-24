import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhpApiService } from '../php-api.service';

export class Game {
  _id!: string;
  #name!: string;
  #price!: number;


  get brand() { return this.#name };
  get price() { return this.#price };

  set name(name: string) { this.#name = name };
  set price(price: number) { this.#price = price };

  constructor(name: string, price: number) {
    this.#name = name;
    this.#price = price;
  }

  toJson() {
    return {
      "name": this.#name,
      "price": this.#price
    };
  }
}


export class GameConsole {
  _id!: string;
  #name!: string;
  #brand!: string;
  #releaseDate!: string;
  #games!: Game[];
  get name() { return this.#name };
  get brand() { return this.#brand };
  get releaseDate() { return this.#releaseDate };
  get games() { return this.#games };

  set name(name: string) { this.#name = name };
  set brand(brand: string) { this.#brand = brand };
  set releaseDate(releaseDate: string) { this.#releaseDate = releaseDate };
  set games(games: Game[]) { this.#games = games };

  constructor(name: string, brand: string, releaseDate: string) {
    this.#name = name;
    this.#brand = brand;
    this.#releaseDate = releaseDate;
  }

  toJson() {
    return {
      "name": this.#name,
      "brand": this.#brand,
      "releaseDate": this.#releaseDate,
    }
  }
}

@Component({
  selector: 'app-game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css']
})
export class GameConsoleComponent implements OnInit {
  consoleId: string = "";
  gameConsole: GameConsole = new GameConsole("", "", "");
  newGame: Game = new Game("", 0);
  update = false;

  constructor(private router: Router, private route: ActivatedRoute, private phpApiService: PhpApiService) { }

  ngOnInit(): void {
    this.consoleId = this.route.snapshot.params["consoleId"]!;
    this.phpApiService.getConsole(this.consoleId)
      .then(gameConsole => this._setConsole(gameConsole))
      .catch(err => this._handleError(err));
  }

  private _handleError(err: any): void {
    console.log(err);
  }

  private _setConsole(gameConsole: GameConsole): void {
    this.gameConsole = gameConsole;
    console.log(this.gameConsole);
  }

  public deleteConsole(): void {
    this.phpApiService.deleteConsole(this.gameConsole._id).then(() => {
      this.router.navigate(['/consoles'])
    });
  }

  toggleUpdate(): void {
    this.update = !this.update;
  }
  updateConsole(): void {
    this.phpApiService.updateConsole(this.gameConsole._id, this.gameConsole).then(() => {
      this.toggleUpdate();
    });
  }

  addGame(): void {
    this.phpApiService.postGame(this.consoleId, this.newGame)
      .then(gameConsole => this._setConsole(gameConsole))
      .catch(err => this._handleError(err));;
  }
}
