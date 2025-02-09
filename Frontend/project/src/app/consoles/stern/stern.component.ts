import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stern',
  templateUrl: './stern.component.html',
  styleUrls: ['./stern.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SternComponent {
  timelineItems = [
    { time: '1930', image: 'assets/sternpinball.png', description: 'SPI-Stern pinball Inc. A cég az 1930-as évek elejére és a modern flipper megalapítására vezethető vissza. Sam Stern, az SPI alapítójának, elnökének és vezérigazgatójának, Gary Sternnek az apja, a flipper úttörője, a Williams Electronics résztulajdonosa és elnöke volt. A Williams és más innovatív cégek, köztük a Bally és a Gottlieb alkották az alapot, amelyre a flipperipar épült.' },
    { time: '1940', image: 'assets/1930.png', description: '1947-ben Sam Stern (balra) meglátogatta a flipper úttörőjét, Harry Williamst (jobbra) Chicagóban, ahol a flipperipar folklórja szerint Sam pimaszul feltette a lábát Harry asztalára, és megkérdezte: „Miért nem adod el nekem a cégedet?” Sam üzemeltetői és forgalmazói sikerei miatt Harrynek mindössze három órába telt, mire úgy döntött, hogy eladja a cég felét Samnek. ' },
    { time: '1950-60', image: 'assets/stern-flipper.jpg', description: 'Williams és más úttörő chicagói cégek számos új innovációt vezetett be a flipperben, beleértve a többjátékos játékokat, a ponttárcsákat és az egyre kifinomultabb játéktér mechanizmusokat és művészeti csomagokat.' },
    { time: '1970-80', image: 'assets/computerspace.jpg', description: 'Megjelentek az érmével működő videojátékok. Ahogy a coin-op piac fejlődött, más vállalatok felvásárolták a meglévő flippercégeket. 1986-ban, apja halála után Gary Stern segített megalapítani a Data East Pinballt, amelyet aztán a Sega vásárolt meg, és átnevezte Sega Pinballra. Gary ezt követően megvásárolta az üzletet a Segától, és átnevezte Stern Pinball, Inc.-re.' },
    { time: '1990', image: 'assets/williamspinball.jpg', description: 'A flipper népszerűsége tovább nőtt és az iparág a legjobb éveit élte. Stern Pinball és más chicagói producerek, köztük Williams, Bally, Midway és Gottlieb a flipper legikonikusabb címeit készítették.' },
    { time: '2000', image: 'assets/pinballbouncesback.jpg', description: '2009 őszén a Stern Pinball társult a Hagerty Peterson & Co., LLC (a továbbiakban: HP) egyik leányvállalatával, egy magántőke-befektetési cég, amely segít a vállalatnak átvészelni a nagy recessziót és felkészülni a növekedés következő szakaszára. A Dave Peterson, a HP ügyvezető igazgatója által vezetett csapat segített a vállalatnak megerősíteni működését és pénzügyi helyzetét, bővíteni termékkínálatát és új piacokra belépni.' },
    { time: '2010-20', image: 'assets/halloffame.jpg', description: 'A Stern Pinball büszkén támogatja a flippert világszerte, innovációval és dizájnnal vezetve az iparágat. A Hall-of-Fame alkotóinak otthona, szenvedélyt kelt, barátságokat köt, és élvonalbeli játékokon keresztül összeköti a játékosokat. A chicagói O Hare repülőtér közelében található Stern fejlett flippergépeket, alkatrészeket és tartozékokat tervez, gyárt és forgalmaz digitális, fogyasztói, kereskedelmi és vállalati piacok számára világszerte.' },
  ];

  selectedItem = this.timelineItems[0];

  selectItem(item: any) {
    this.selectedItem = item;
  }
}