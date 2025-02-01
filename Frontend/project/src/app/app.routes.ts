import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConsolesComponent } from './consoles/consoles.component';
import { PlaystationComponent } from './consoles/playstation/playstation.component';
import { XboxComponent } from './consoles/xbox/xbox.component';
import { NintendoComponent } from './consoles/nintendo/nintendo.component';
import { AtariComponent } from './consoles/atari/atari.component';
import { SegaComponent } from './consoles/sega/sega.component';


export const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'home', component: BodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'consoles', component: ConsolesComponent },
  { path: 'playstation', component: PlaystationComponent },
  { path: 'xbox', component: XboxComponent },
  { path: 'nintendo', component: NintendoComponent },
  { path: 'atari', component: AtariComponent },
  { path: 'sega', component: SegaComponent },
  { path: '**', redirectTo: '' }
];
