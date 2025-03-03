import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-namco',
  templateUrl: './namco.component.html',
  styleUrls: ['./namco.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NamcoComponent {
  timelineItems = [
    { time: '1955–79', image: 'assets/namco/geebee.jpg', description: 'Masaya Nakamura alapítja meg a Nakamura Seisakusho Co., Ltd. nevű céget Tokióban,amely kezdetben pénzérmével működő mechanikus vidámparki játékokat gyárt. A vállalat folyamatosan bővíti mechanikus játékait, Japán-szerte népszerűek lesznek és az Osaka Expo 70 világkiállításon jelentős megbízásokat kap a vidámparki berendezéseire. Felvásárolták az Atari japán üzletágát és 1977-ben a cég új neve Namco lett. Az első játéka a  Gee Bee, amely egy flipper-stílusú arcade játék.' },
    { time: '1980–89', image: 'assets/namco/pacman.jpg', description: 'Toru Iwatani vezetésével megalkotják a Pac-Mant, amely az egyik legikonikusabb videojáték lesz, ezzel elérve azt hogy 300,000 arcade gépet adnak el. 1981 és 87 között folyamatosan adnak ki játékokat:Az arcade virágkora 84 és 87 között volt, hiszen ekkor adták ki a Tower of Druaga-t, egy korai akció-RPG-t. Az Ordyne-t, egy színes shoot em up játék, amely nagy sikert arat és 1987-ben az egyik első horror beat em up játékot is kiadják, a Splatterhouse-t. A 90-es évek végére kiadták a Final Lapet, amely az első arcade versenyjáték volt, amely támogatta a hálózati többjátékos módot.' },
    { time: '1990-99', image: 'assets/namco/tekken.jpg', description: 'A Namco belépett a konzolos piacra a Super Nintendo és a Sega Mega Drive megjelenésekor. Kiadták a Ridge Racert amelyet a Playstationre fejlesztettek ki. A Sonyval együttműködve kiadták a Tekkent, amely az első teljesen 3D-s verekedős/harci játékot. Később a Tekken 3 lesz az egyik legnagyobb példányszámban eladott PlayStation játék.' },
    { time: '2000–09', image: 'assets/namco/soulcalibur.jpg', description: '2001-ben a Namco elindítja első mobiltelefonos játékait, 2005-ben pedig a Namco és Bandai egyesül, létrejön ezzel a Bandai Namco Holdings. Az új vállalat célja a videojátékok, anime és egyéb szórakoztatóipari tartalmak egyesítése. Kiadták a Tekken 5-öt és 6-ot amely hatalmas siker lett és a Soulcalibur IV játékuk Star Wars karaktereket is tartalmaz.' },
    { time: '2010–jelen', image: 'assets/namco/eldenring.jpg', description: '2011-ben kiadták a Dark Souls-t, amely annyira sikeres lett hogy játéksorozattá alakult és a legbefolyásosabb játékká vált a 2010-es években. A Tekken 7 is megjelent amely már e-sport szintre emelkedett.  Újraértelmezték a Pac-Mant és kiadták a Pac-Man 256-ot, majd megkezdték a VR technológiára épülő arcade projekteket. 2022-ben a FromSoftware által fejlesztett Elden Ringet is ők adták ki, amely a játéktörténelem egyik legnagyobb sikere lett. A vállalat azóta is új generációs konzolok felé nyit és a régi szériáit is bővíti.' },
  ];

  selectedItem = this.timelineItems[0];

  selectItem(item: any) {
    this.selectedItem = item;
  }
}