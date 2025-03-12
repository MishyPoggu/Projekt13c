import { Component, HostListener } from '@angular/core';
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
    { time: '1930', image: 'assets/stern/sternpinball.png', description: '1930: SPI-Stern pinball Inc. A cég az 1930-as évek elejére és a modern flipper megalapítására vezethető vissza. Sam Stern, az SPI alapítójának, elnökének és vezérigazgatójának, Gary Sternnek az apja, a flipper úttörője, a Williams Electronics résztulajdonosa és elnöke volt. A Williams és más innovatív cégek, köztük a Bally és a Gottlieb alkották az alapot, amelyre a flipperipar épült.' },
    { time: '1940', image: 'assets/stern/1930.png', description: '1947-ben Sam Stern (balra) meglátogatta a flipper úttörőjét, Harry Williamst (jobbra) Chicagóban, ahol a flipperipar folklórja szerint Sam pimaszul feltette a lábát Harry asztalára, és megkérdezte: „Miért nem adod el nekem a cégedet?” Sam üzemeltetői és forgalmazói sikerei miatt Harrynek mindössze három órába telt, mire úgy döntött, hogy eladja a cég felét Samnek. ' },
    { time: '1950-60', image: 'assets/stern/stern-flipper.jpg', description: '1950: Williams és más úttörő chicagói cégek számos új innovációt vezetett be a flipperben, beleértve a többjátékos játékokat, a ponttárcsákat és az egyre kifinomultabb játéktér mechanizmusokat és művészeti csomagokat.' },
    { time: '1970-80', image: 'assets/stern/computerspace.jpg', description: '1970-től kezdtek megjelenni az érmével működő videojátékok. Ahogy a coin-op piac fejlődött, más vállalatok felvásárolták a meglévő flippercégeket. 1986-ban, apja halála után Gary Stern segített megalapítani a Data East Pinballt, amelyet aztán a Sega vásárolt meg, és átnevezte Sega Pinballra. Gary ezt követően megvásárolta az üzletet a Segától, és átnevezte Stern Pinball, Inc.-re.' },
    { time: '1990', image: 'assets/stern/williamspinball.jpg', description: '1990: A flipper népszerűsége tovább nőtt és az iparág a legjobb éveit élte. Stern Pinball és más chicagói producerek, köztük Williams, Bally, Midway és Gottlieb a flipper legikonikusabb címeit készítették.' },
    { time: '2000', image: 'assets/stern/pinballbouncesback.jpg', description: '2009 őszén a Stern Pinball társult a Hagerty Peterson & Co., LLC (a továbbiakban: HP) egyik leányvállalatával, egy magántőke-befektetési cég, amely segít a vállalatnak átvészelni a nagy recessziót és felkészülni a növekedés következő szakaszára. A Dave Peterson, a HP ügyvezető igazgatója által vezetett csapat segített a vállalatnak megerősíteni működését és pénzügyi helyzetét, bővíteni termékkínálatát és új piacokra belépni.' },
    { time: '2010-20', image: 'assets/stern/halloffame.jpg', description: '2010-től napjainkig a Stern Pinball büszkén támogatja a flippert világszerte, innovációval és dizájnnal vezetve az iparágat. A Hall-of-Fame alkotóinak otthona, szenvedélyt kelt, barátságokat köt, és élvonalbeli játékokon keresztül összeköti a játékosokat. A chicagói O Hare repülőtér közelében található Stern fejlett flippergépeket, alkatrészeket és tartozékokat tervez, gyárt és forgalmaz digitális, fogyasztói, kereskedelmi és vállalati piacok számára világszerte.' },
  ];

  selectedItem = this.timelineItems[0];
    isMobileView = window.innerWidth <= 768;
  
    @HostListener('window:resize', [])
    onResize() {
      this.isMobileView = window.innerWidth <= 768;
    }
  
    selectItem(item: any) {
      if (item.isDownload) {
        this.downloadFile(item.filepath);
      } else {
        this.selectedItem = item;
      }
    }
  
    previousItem() {
      const currentIndex = this.timelineItems.indexOf(this.selectedItem);
      if (currentIndex > 0) {
        this.selectedItem = this.timelineItems[currentIndex - 1];
      }
    }
  
    nextItem() {
      const currentIndex = this.timelineItems.indexOf(this.selectedItem);
      if (currentIndex < this.timelineItems.length - 1) {
        this.selectedItem = this.timelineItems[currentIndex + 1];
      }
    }
  
    downloadFile(filepath: string) {
      const link = document.createElement('a');
      link.href = filepath;
      link.download = filepath.split('/').pop() || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }