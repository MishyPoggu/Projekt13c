import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-konami',
  templateUrl: './konami.component.html',
  styleUrls: ['./konami.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class KonamiComponent {
  timelineItems = [
    { time: '1969', image: 'assets/konami/kagesamakozuki.jpg', description: '1969. március 21.: Kagemasa Kōzuki megalapítja vállalkozását Oszakában, kezdetben zenegépek bérbeadásával és javításával foglalkozva' },
    { time: '1970', image: 'assets/konami/konamimachines.jpg', description: '1973. március 19.: A vállalat hivatalosan bejegyzésre kerül KONAMI INDUSTRY CO., LTD. néven, és megkezdi szórakoztató gépek gyártását játéktermek számára. 1978. október: A cég alaptőkéje 20 millió jenre emelkedik, jelezve a vállalat növekedését és pénzügyi stabilitását. 1979. január: A KONAMI megkezdi termékeinek exportját az Egyesült Államokba, ezzel belépve a nemzetközi piacra. ' },
    { time: '1980', image: 'assets/konami/castlevania.jpg', description: '1980-ban a vállalat jelentős sikereket ér el olyan játéktermi játékokkal, mint a "Scramble" és a "Frogger", amelyek világszerte népszerűvé válnak. Létrejön az amerikai leányvállalat, a Konami of America, Inc., elősegítve a cég terjeszkedését az észak-amerikai piacon. 1983. december: A KONAMI belép az MSX számítógépes piacra. A vállalat megkezdi játékainak fejlesztését a Nintendo Entertainment System (NES) konzolra, olyan sikeres sorozatokkal, mint a "Gradius" és a "Castlevania".' },
    { time: '1990', image: 'assets/konami/Yugioh.jpg', description: '1990: A kobei központi épületet súlyosan megrongálja a Nagy Hanshin-Awaji földrengés, de a vállalat gyorsan helyreállítja működését, bizonyítva rugalmasságát és elkötelezettségét. 1997. január: A KONAMI megalapítja a Konami Gaming, Inc. leányvállalatot az Egyesült Államokban, belépve a szerencsejáték-gépek piacára, és diverzifikálva üzleti tevékenységét. 1999. február: A vállalat elindítja a kártyajáték üzletágát, kiadva a népszerű "Yu-Gi-Oh!" gyűjtögetős kártyajátékot, amely világszerte hatalmas sikert arat.' },
    { time: '2000-jelen', image: 'assets/konami/konamii.jpg', description: '2000-től a vállalat hivatalos neve KONAMI CORPORATION-re változott, jelezve a cég globális jelenlétét és diverzifikációját. A Konami befektetett a Hudson Soft vállalatba, amely később, 2011-ben teljes tulajdonú leányvállalatává vált. A Hudson Soft olyan népszerű játékok fejlesztője volt, mint a "Bomberman" és az "Adventure Island". A Konami megszerezte a japán Professional Baseball 12 csapatának licencét, lehetővé téve a hivatalos csapatok és játékosok szerepeltetését a videojátékaikban. Konami számos sikeres játékot adott ki: Metal Gear Solid 2: Sons of Liberty (2001), Silent Hill 2 (2001), Pro Evolution Soccer sorozat ' },
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