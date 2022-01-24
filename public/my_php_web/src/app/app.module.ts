import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameConsolesComponent } from './game-consoles/game-consoles.component';
import { GamesComponent } from './games/games.component';
import { GameConsoleComponent } from './game-console/game-console.component';
import { RouterModule } from '@angular/router';
import { NavigatorComponent } from './navigator/navigator.component';
import { AddGameConsoleComponent } from './add-game-console/add-game-console.component';

@NgModule({
  declarations: [
    AppComponent,
    GameConsolesComponent,
    GamesComponent,
    GameConsoleComponent,
    NavigatorComponent,
    AddGameConsoleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "consoles",
        component: GameConsolesComponent
      }, {
        path: "console/:consoleId",
        component: GameConsoleComponent
      },
      {
        path: "add",
        component: AddGameConsoleComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
