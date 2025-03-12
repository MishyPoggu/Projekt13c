import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playstation',
  templateUrl: './playstation.component.html',
  styleUrls: ['./playstation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PlaystationComponent {
  timelineItems = [
    { time: '1988–1991', image: 'assets/ps/nintendoplaystation.jpg', description: '1988-ban a Sony a Nintendóval együttműködve kifejlesztettek egy CD-ROM-kiegészítőt a Super Nintendo Entertainment System (SNES) számára. Ezt a projektet Ken Kutaragi, a Sony mérnöke vezette, akit később a PlayStation atyjának neveztek. Kutaragi titokban egy egyedi hangchipen (SPC700) dolgozott az SNES-hez, ami lenyűgözte a Nintendót.A Sony és a Nintendo megállapodott abban, hogy a Sony kifejleszti az SNES CD-ROM-alapú változatát, a Nintendo Play Station nevet.Ez a konzol SNES kazettákat és új CD-alapú játékokat egyaránt támogat.' },
    { time: '1991', image: 'assets/ps/CES.jpg', description: '1991: A Consumer Electronics Show (CES) alkalmával a Sony bejelentette a Nintendo Play Stationt. Ám a Nintendo mindenkit megdöbbentett azzal, hogy ehelyett nyilvánosan bejelentette új partnerségét a Philipsszel. A Nintendo az utolsó pillanatban kihátrált, attól tartva, hogy a Sony irányítani fogja a szoftverlicenceket. Ez feldühítette Ken Kutaragit, aki meggyőzte a Sony vezetőit, hogy fejlesszék ki saját játékkonzoljukat, ahelyett, hogy felhagynák a projekttel. Így a Sony játékforradalma az árulásból született.' },
    { time: '1994', image: 'assets/ps/kenkutaragi.jpg', description: '1994-ben a Sony megalakította a Sony Computer Entertainmentet (SCE). Ken Kutaragi vezette a PlayStation projektet, és a PlayStation 1 (PS1) 1994. december 3-án megjelent Japánban. A 3D grafikai feldolgozást vittek végbe. Ez lehetővé tette az olyan játékokat, mint a Final Fantasy VII. A marketing a tinédzsereket és a felnőtteket célozza meg, ellentétben a Nintendo családbarát arculatával. PlayStation megelőzte a Nintendo 64-et az eladások terén, ki adták a Final Fantasy VII-t, amellyel a PlayStation uralja az RPG-piacot. A PlayStation lett az első konzol, amely 100 millió darabot adott el.' },
    { time: '2000', image: 'assets/ps/ps2.jpg', description: 'A PS2 2000. március 4-én jelent meg, amelynek a visszafelé kompatibilitása lehetővé tette a PS1 játékok lejátszását. 100 millió PS2-eladást jelentettek be, ezzel a leggyorsabban eladott konzol lett. A gyártás több mint 155 millió eladott példány után véget ért, így a PS2 minden idők legkelendőbb konzolja lett. Egy egész generációt uralt, és olyan riválisok ellen nyert, mint a Sega Dreamcast, a GameCube és az Xbox.' },
    { time: '2004', image: 'assets/ps/psp.jpg', description: '2004-ben A PlayStation Portable (PSP) egy kézi játékkonzol. Először 2004. december 12-én adták ki Japánban. A legerősebb rendszerű hordozható konzol volt,első igazi vetélytársa a Nintendo kézikonzoljainak. A PSP fejlett grafikus képességei népszerű,szórakoztató eszközzé tették, amely PlayStation 2 és PlayStation 3 konzolokhoz csatlakoztatható,ezenfelül pedig bármilyen USB interfésszel rendelkező számítógéphez is csatlakoztatható. A PSP-t pozitívan fogadták a kritikusok, és tízéves élettartama alatt több mint 80 millió darabot adtak el belőle.' },
    { time: '2006', image: 'assets/ps/ps3.jpg', description: 'A Sony 2006.-ban mutatta be a PS3-at. PlayStation Network (PSN) bemutatta az online többjátékos lehetőséget. Megjelent a cellprocesszor amely rendkívül erős volt, viszont a fejlesztés rá nehéz. A PS3 magas áron (599 USD) indult, így kevésbé volt vonzó, mint az olcsóbb Xbox 360. A PlayStation Networköt feltörték, és több millió felhasználó adatait tették közzé, ám ezeket a problémákat is le küzdötte a sony, hiszen a PS3-eladások olyan jelentős exkluzív termékekkel javultak, mint a The Last of Us.' },
    { time: '2013-2016', image: 'assets/ps/psvr.jpg', description: '2013: PlayStation 4 (PS4) megjelenése. Erősebb hardver, amely jobb grafikai teljesítményt biztosított. Share gomb a DualShock 4 kontrolleren a játékvideók és képek megosztásához. PlayStation Plus előfizetés bevezetése az online multiplayerhez.PS4 Pro: Erősebb verzió a 4K és HDR támogatás érdekében. PlayStation VR: Sony első VR-headsete, amely PS4-gyel működött.' },
    { time: '2020', image: 'assets/ps/ps5.jpg', description: 'A Sony 2020. november 12-én a COVID-19 idején dobta piacra a PS5-öt, amely hatalmas zavarokat okozott. Főbb problémák a bevezetés után: Súlyos készlethiány – Sok rajongó hónapokig nem tudott PS5-öt vásárolni a korlátozott kínálat miatt. Scalperek és viszonteladók – A botok felvásárolták a PS5-készleteket, és dupla vagy háromszoros áron adtak el konzolokat. Késleltetett játékkiadások. A járvány befolyásolta a játékfejlesztési ütemterveket. A PS5 sajátossága: Ultragyors SSD – kiküszöböli a betöltési képernyőket,sugárkövetés – javítja a megvilágítást és a visszaverődést. A PS5 eladások meghaladták az 50 millió darabot.' },
    { time: '2024-Jelen', image: 'assets/ps/ps5pro.jpg', description: 'A PlayStation 5 Pro-t a Sony hivatalosan 2024. szeptember 10-én jelentette be, a 2024 márciusa óta terjedő iparági pletykák nyomán. Többek között az új konzolnak három fő fejlesztése van: a jelenlegi PS5-nél körülbelül 45%-kal gyorsabb GPU, egy mély tanuláson alapuló képfelskálázási technológia, PlayStral Supercrayation (PlayPSSRray) teljesítmény a PlayStation 5-höz képest.' },
    { time: 'Cikk letöltése', isDownload: true, filepath:'assets/Pdf/Playstation.pdf'},
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