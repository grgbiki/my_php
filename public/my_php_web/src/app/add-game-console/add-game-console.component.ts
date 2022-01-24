import { Component, OnInit } from '@angular/core';
import { GameConsole } from '../game-console/game-console.component';
import { PhpApiService } from '../php-api.service';

@Component({
  selector: 'app-add-game-console',
  templateUrl: './add-game-console.component.html',
  styleUrls: ['./add-game-console.component.css']
})
export class AddGameConsoleComponent implements OnInit {

  newConsole = new GameConsole("asdasd", "asdasd", "asdads");

  constructor(private phpApiService: PhpApiService) { }

  ngOnInit(): void {
  }

  submit() {
    // console.log("Test", JSON.parse(JSON.stringify(this.newConsole)));
    this.phpApiService.postConsole(this.newConsole);
  }
}
