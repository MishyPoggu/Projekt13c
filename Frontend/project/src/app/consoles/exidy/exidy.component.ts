import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exidy',
  templateUrl: './exidy.component.html',
  styleUrls: ['./exidy.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ExidyComponent {
  timelineItems = [
    { time: '1973', image: 'assets/exidy/tvpinball.jpg', description: '1973-ban az Exidy-t H.R. "Pete" Kauffman alapította, aki korábban a Ramtek Corporationnél dolgozott, egy másik korai arcade-játékokat fejlesztő cégnél. A cég neve az „EXpertise” és a „DYnamo” szavak kombinációjából született, tükrözve a cég célját: dinamikus és technológiailag fejlett játékokat készíteni. Első jelentős sikerük a TV Pinball volt 1975, amely egy flipper-szimulációs videójáték. ' },
    { time: '1976', image: 'assets/exidy/deathrace.jpg', description: '1976-ban az Exidy kiadta a Death Race című játékot, amely óriási figyelmet kapott, de nem csak pozitív értelemben, mivel a játékban az volt a cél, hogy egy autóval elüssünk futó figurákat, akik haláluk után kis sírkeresztté változtak a képernyőn. Az amerikai média ki is mutatta a nem tetszését, mondván, hogy erőszakos a tartalma és ez a fiatalokat károsítja. A New York Times és más nagy újságok is cikkeztek róla, és a játék az egyik első, társadalmi vitát kiváltó videojátékká vált, ám a cégnek ez egy hatalmas profit lett.' },
    { time: '1978', image: 'assets/exidy/starfire.jpg', description: '1978: Megjelent a Star Fire, amely az első olyan arcade-játék volt, amely lehetővé tette a játékos számára, hogy a nevét beírja a toplistába. Ez erősen inspirálódott a Star Wars látványvilágából, és az egyik legkorábbi űrhajós lövöldözős játék lett. Ebben az évben adták ki a Car Polo-t ami egy többjátékos arcade-játák. Két csapat autókkal próbálja a labdát kapuba juttatni-egy korai példája a Rocket League-hez hasonló koncepciónak.' },
    { time: '1979–83', image: 'assets/exidy/crossbow.jpg', description: '1979: Az egyik első dungeon-crawler az Exidy legújabb játéka, a Venture volt.,amely egy izometrikus nézetű akciójáték volt, amelyben a játékos egy kis piros pontot, „Winky-t” irányított, és különböző szörnyekkel és csapdákkal kellett megküzdenie a pályákon. A játék előfutára volt a későbbi RPG stílusú dungeon-játékoknak. Készítettek egy Pac-Man alternatívát a Mouse Trap-et ahol a játékos egy macskát irányított. Kiadták az első fénypisztolyos arcade pedig a crossbow volt.' },
    { time: '1984–90', image: 'assets/exidy/sorcerer.jpg', description: '1983-ban a videojáték-ipar hatalmas válságon ment keresztül, ami több kisebb fejlesztő cég csődjét eredményezte, így az Exidy próbált alkalmazkodni az otthoni számítógépes piac változásaihoz, de a nagyobb cégekkel, mint az Atari és a Nintendo, nem tudott versenyezni. 1978-ban az Exidy megpróbálkozott az otthoni számítógépes  piacon egy Sorcerer nevű számítógéppel, amely fejlettebb volt mint az Apple II, de nem tudott széles körben elterjedni. Az Exidy a Crossbow és néhány más későbbi lövöldözős játékkal még megpróbált életben maradni, de a 80-as évek végére a cég teljesen eltűnt a piacról. 1990-re a cég hivatalosan megszűnt.' },
    { time: '1990-jelen', image: 'assets/exidy/exidy.jpg', description: 'Az Exidy játékai máig népszerűek a retro gaming közösségben, és a MAME emulátorok segítségével sokan még játszanak ezekkel a játékokkal. A Death Race és a Venture kultikus státuszba emelkedett, és több retrospektív cikk és dokumentumfilm is említi. ' },
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