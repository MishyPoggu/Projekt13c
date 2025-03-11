import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { ConsolesComponent } from './consoles/consoles.component';
import { PlaystationComponent } from './consoles/playstation/playstation.component';
import { XboxComponent } from './consoles/xbox/xbox.component';
import { NintendoComponent } from './consoles/nintendo/nintendo.component';
import { AtariComponent } from './consoles/atari/atari.component';
import { SegaComponent } from './consoles/sega/sega.component';
import { NamcoComponent } from './consoles/namco/namco.component';
import { ExidyComponent } from './consoles/exidy/exidy.component';
import { TaitoComponent } from './consoles/taito/taito.component';
import { KonamiComponent } from './consoles/konami/konami.component';
import { NuttingComponent } from './consoles/nutting/nutting.component';
import { BallyComponent } from './consoles/bally/bally.component';
import { WilliamsComponent } from './consoles/williams/williams.component';
import { SternComponent } from './consoles/stern/stern.component';
import { RaktarComponent } from './raktar/raktar.component';

export const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'home', component: BodyComponent },
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'consoles', component: ConsolesComponent },
  { path: 'playstation', component: PlaystationComponent },
  { path: 'xbox', component: XboxComponent },
  { path: 'nintendo', component: NintendoComponent },
  { path: 'atari', component: AtariComponent },
  { path: 'sega', component: SegaComponent },
  { path: 'namco', component: NamcoComponent },
  { path: 'exidy', component: ExidyComponent },
  { path: 'taito', component: TaitoComponent },
  { path: 'konami', component: KonamiComponent },
  { path: 'nutting', component: NuttingComponent },
  { path: 'bally', component: BallyComponent },
  { path: 'williams', component: WilliamsComponent },
  { path: 'stern', component: SternComponent },
  { path: 'raktar', component: RaktarComponent },
  { path: '**', redirectTo: '' }
];
