import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameConsole } from '../game-console/game-console.component';
import { PhpApiService } from '../php-api.service';

@Component({
  selector: 'app-add-game-console',
  templateUrl: './add-game-console.component.html',
  styleUrls: ['./add-game-console.component.css']
})
export class AddGameConsoleComponent implements OnInit {

  newConsole = new GameConsole("", "", "");

  constructor(private router: Router, private phpApiService: PhpApiService) { }

  ngOnInit(): void {
  }

  submit() {
    // console.log("Test", JSON.parse(JSON.stringify(this.newConsole)));
    this.phpApiService.postConsole(this.newConsole).then(() => {
      this.router.navigate(['/consoles'])
    });
  }
}
