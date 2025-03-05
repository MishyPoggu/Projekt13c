import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sega',
  templateUrl: './nintendo.component.html',
  styleUrls: ['./nintendo.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NintendoComponent {
  timelineItems = [
    { time: '1889–1949', image: 'assets/nintendo/hanafuda.jpg', description: 'Fusajiro Yamauchi Kiotóban megalapítja a Nintendo Koppai céget, amely kézzel festett hanafuda kártyákat készít. 1902:A Nintendo elkezdi a nyugati típusú játékkártyák gyártását Japánban. 1929:Fusajiro Yamauchi nyugdíjba vonul, és veje, Sekiryo Kaneda (később Yamauchi) veszi át a vezetést. 1947:Létrejön a Nintendo Playing Card Co. Ltd. néven egy új leányvállalat a kártyák gyártására és forgalmazására.' },
    { time: '1959', image: 'assets/nintendo/disneyplayingcards.jpg', description: 'A Nintendo licencszerződést köt a Disneyvel, és karakteres játékkártyákat kezd árusítani. A vállalat nevét Nintendo Co., Ltd.-re változtatja, és új piacokra lép (játékok, szállodaipar, éttermek, taxivállalat). ' },
    { time: '1966-77', image: 'assets/nintendo/laserclayshootingsystem.jpg', description: 'Kidolgozzák az első elektronikus játékot, az Ultra Handet (feltaláló: Gunpei Yokoi). 1973:Létrehozza az első interaktív fényfegyveres attrakcióját, a Laser Clay Shooting Systemet. A Nintendo szerződést köt a Mittel Games-szel, és bemutatják az első videójáték-rendszerüket, amely a Magnavox Odyssey konzolon alapul. Megjelenik az első saját fejlesztésű játékkonzol, a Color TV-Game sorozat.' },
    { time: '1980–89', image: 'assets/nintendo/donkey-mario.jpg', description: 'Megjelenik az első Game & Watch kézikonzol, amely LCD-kijelzővel működik. 1981: Shigeru Miyamoto megalkotja Donkey Kongot, amely bemutatja a későbbi ikonikus karaktert, Jumpmant (később Mario), majd Japánban megjelenik a Nintendo Family Computer (Famicom), amely a nyugati piacon Nintendo Entertainment System (NES) néven válik ismertté. 1985: Kiadják a Super Mario Bros.-t, amely forradalmasítja a platformjátékokat. 1989:Megjelenik a Game Boy, amely a kézikonzolok piacának meghatározó szereplője lesz.' },
    { time: '1990-99', image: 'assets/nintendo/pokemonredandblue.jpg', description: 'Japánban debütál a Super Famicom (Super Nintendo Entertainment System, SNES). 1991: Az SNES megjelenik az Egyesült Államokban, és elindul a Sega vs. Nintendo háború. 1996: A Nintendo 64 (N64) piacra kerül, és vele együtt a Super Mario 64, amely új alapokra helyezi a 3D-s platformjátékokat. 1998: Megjelenik a Game Boy Color, valamint az egyik legsikeresebb játék, a Pokémon Red/Blue.' },
    { time: '2000-09', image: 'assets/nintendo/nintendowiiposter.jpg', description: 'Kiadják a GameCube-ot, amely optikai lemezt használ, és versenybe száll a Sony PlayStation 2-vel és az Xbox-szal. Megjelenik a Nintendo DS, amely érintőképernyőt hoz a kézikonzolok világába. Bemutatják a Nintendo Wii-t, amely a mozgásérzékelős irányítással új játékstílust vezet be. A Nintendo DS és a Wii minden idők legnagyobb példányszámban eladott konzoljaivá válnak.' },
    { time: '2010-16', image: 'assets/nintendo/nintendo3ds.jpg', description: 'Megjelenik a Nintendo 3DS, amely szemüveg nélküli 3D-s kijelzőt kínál. A Wii U piacra kerül, de az eladások elmaradnak a várakozásoktól. Nintendo és a mobiljáték-piac: bejelentik, hogy okostelefonos játékokat fejlesztenek.' },
    { time: '2017-jelen', image: 'assets/nintendo/legendofzelda.jpg', description: 'Megjelenik a Nintendo Switch, amely forradalmasítja a konzolpiacot hibrid kialakításával. A Super Smash Bros. Ultimate minden idők egyik legsikeresebb Nintendo játéka lesz. 2020: A COVID-19 járvány alatt a Animal Crossing: New Horizons óriási siker lesz. 2023: A The Legend of Zelda: Tears of the Kingdom megjelenik és hatalmas elismerést kap.' },
    { time: 'Cikk letöltése', isDownload: true, filepath:'assets/Pdf/Nintendo.pdf'},
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