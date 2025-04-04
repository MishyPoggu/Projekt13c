import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atari',
  templateUrl: './atari.component.html',
  styleUrls: ['./atari.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AtariComponent {
  timelineItems = [
    { time: '1958-71', image: 'assets/atari/bushnell.jpg', description: '1958:William Higinbotham amerikai fizikus létrehozza a Tennis for Two nevű játékot egy oszcilloszkópon, amely a későbbi Pong játék előfutára volt. 1961: A Massachusetts Institute of Technology (MIT) diákjai megalkotják a Spacewar! nevű játékot, amely az első igazi többjátékos számítógépes videojáték volt. 1969:Nolan Bushnell, a Utah Egyetem mérnökhallgatója megismerkedik a Spacewar! játékkal. 1971:Bushnell és Ted Dabney elkészíti a világ első érmebedobós videojátékát, a Computer Space-t, amelyet a Nutting Associates adott ki. A játék azonban túl bonyolult volt a közönség számára, és nem lett nagy siker.' },
    { time: '1972-76', image: 'assets/atari/pong.jpg', description: '1972-ben Nolan Bushnell és Ted Dabney megalapítja az Atarit a kaliforniai Sunnyvale-ben. Az „Atari” név a japán Go társasjátékból származik, ahol a jelentése „támadás” vagy „figyelmeztetés”. 1972. szeptember: Az Atari kifejleszti a Pong nevű játékot, amelyet Allan Alcorn programoz. A Pong az első kereskedelmileg sikeres videojáték lesz. 1973:Az Atari elkezdi licencelni a Pongot más cégeknek, és piacra dobja az otthoni verziót is. Az Atari kiadja a Home Pong konzolt, amely hatalmas siker lesz a karácsonyi szezonban.' },
    { time: '1977-83', image: 'assets/atari/ET.jpg', description: '1976:A Warner Communications megvásárolja az Atarit 28 millió dollárért, hogy pénzügyi stabilitást biztosítson a cégnek. Megjelenik az Atari 2600, amely az egyik első otthoni videojáték-konzol cserélhető kazettákkal. Az Atari kiadja a Space Invaders konzolos verzióját, amely elősegíti az otthoni videojátékok elterjedését. 1982:Az Atari kiadja az E.T. the Extra-Terrestrial játékot, amely a valaha volt egyik legnagyobb bukás a videojátékok történetében, majd az Atari túltermeli a játékokat, és hatalmas veszteségeket szenved el.' },
    { time: '1984–95', image: 'assets/atari/jaguar.jpg', description: '1984: A Warner Communications eladja az Atari fogyasztói részlegét Jack Tramielnak, a Commodore alapítójának, aki az Atarit egy PC-gyártóvá alakítja. Az Atari kiadja az Atari ST számítógépet, amely az Amiga és Macintosh riválisa lesz. Megjelenik az Atari Lynx, az első színes képernyős kézikonzol, de nem tud versenyezni a Nintendo Game Boy-jal, viszont megjelent az Atari Jaguar, amely az első 64 bites konzolként hirdeti magát, ám nem tudja felvenni a versenyt a PlayStation és a Sega Saturn konzolokkal. Az Atari egyesül a JTS-szel, egy merevlemezgyártó céggel, és gyakorlatilag megszűnik konzolgyártóként.' },
    { time: '1996–2008', image: 'assets/atari/infogrames-atari.jpg', description: '1996-ban a Hasbro Interactive megvásárolja az Atari maradék jogait és újra kiad néhány régi játékot. 2001:A francia Infogrames megvásárolja a Hasbro Interactive-ot, és ezzel az Atari jogait is. 2003:Az Infogrames az Atari márkanevet kezdi használni, hogy felélessze a legendás céget. 2004–2007:Az Atari több sikertelen játékot ad ki, és komoly anyagi gondokkal küzd.' },
    { time: '2009–jelen', image: 'assets/atari/atarivsc.jpg', description: '2009-ben az Atari USA csődvédelmet kér, hogy leváljon a francia anyavállalatról. Mobiljátékok és kaszinójátékok piacára lép, de nem ér el nagy sikereket. Megjelent az Atari VCS, egy modern retro-konzol, amely a régi Atari játékokat és új indie címeket is futtat. 2020–2023:Ismét klasszikus játékok újraélesztésére és a nosztalgia piacra koncentrál.' },
    { time: 'Cikk letöltése', isDownload: true, filepath:'assets/Pdf/Atari.pdf'},
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