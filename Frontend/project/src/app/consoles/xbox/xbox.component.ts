import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xbox',
  templateUrl: './xbox.component.html',
  styleUrls: ['./xbox.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class XboxComponent {
  timelineItems = [
    { time: '1998-1999', image: 'assets/xbox/directxbox.jpg', description: '1998: A Microsoft DirectX csapatának négy mérnöke – Kevin Bachus, Seamus Blackley, Ted Hase és Otto Berkes – elkezdett dolgozni egy "DirectX Box" nevű projekten. Céljuk egy PC-alapú konzol létrehozása volt, amely a Windows és a DirectX technológiákra épül, és versenyképes alternatívát kínál a Sony PlayStation 2-vel szemben. 1999: A csapat bemutatta a "DirectX Box" prototípusát a Microsoft vezetőségének, beleértve Bill Gates-t is. A projekt pozitív fogadtatásban részesült, és zöld utat kapott a további fejlesztésekhez.' },
    { time: '2000-2001', image: 'assets/xbox/Halo.jpg', description: '2000 március 10:A Game Developers Conference (GDC) rendezvényen Bill Gates hivatalosan bejelentette az Xbox konzolt, amely a Microsoft első belépése volt a videojáték-konzolok piacára. 2001 november 15: Az Xbox megjelent Észak-Amerikában, olyan kiemelkedő játékokkal, mint a "Halo: Combat Evolved", amely később az egyik legnépszerűbb cím lett a platformon.' },
    { time: '2002-2005', image: 'assets/xbox/xbxlive.jpg', description: '2002 november15: Elindult az Xbox Live, a Microsoft online játék és digitális médiaszolgáltatása, amely lehetővé tette a játékosok számára az online multiplayer játékot és tartalmak letöltését. Az Xbox világszerte több mint 24 millió példányban kelt el. Bár ez jelentős eredmény volt, a Sony PlayStation 2 dominanciája miatt a Microsoft a következő generációs konzol fejlesztésére összpontosított.' },
    { time: '2005-2010', image: 'assets/xbox/xboxkinect.jpg', description: '2005-ben megjelent az Xbox 360 Észak-Amerikában, majd később más régiókban is. Az új konzol erősebb hardverrel, továbbfejlesztett Xbox Live szolgáltatásokkal és vezeték nélküli kontrollerekkel érkezett. 2010 november 4.: Bemutatták a Kinectet, egy mozgásérzékelős perifériát, amely lehetővé tette a játékosok számára a kontroller nélküli játékélményt, új dimenziót adva a konzolos szórakozásnak.' },
    { time: '2013-2016', image: 'assets/xbox/xboxone.jpg', description: '2013 november22: Megjelent az Xbox One, amelyet kezdetben kritizáltak az online kapcsolati követelmények és a használt játékok korlátozásai miatt. A negatív visszajelzések hatására a Microsoft módosította ezeket a politikákat, hogy jobban megfeleljen a felhasználói igényeknek. A Microsoft bevezette a visszafelé kompatibilitást, lehetővé téve az Xbox 360 játékok futtatását az Xbox One konzolon, ezzel növelve a játékosok számára elérhető játékok számát.' },
    { time: '2017-2019', image: 'assets/xbox/gamepass.jpg', description: '2017-ben elindult az Xbox Game Pass előfizetési szolgáltatás, amely havi díj ellenében hozzáférést biztosított egy folyamatosan bővülő játékkönyvtárhoz, új üzleti modellt kínálva a játékosok számára. 2017 november7: Megjelent az Xbox One X, amelyet a világ legerősebb konzoljaként hirdettek, és 4K felbontású játékélményt kínált a felhasználóknak.' },
    { time: '2020-2025', image: 'assets/xbox/designlab.jpg', description: '2020: Az Xbox Game Pass Ultimate előfizetők számára elérhetővé vált az xCloud (később Xbox Cloud Gaming), amely lehetővé tette a játékok streamelését különböző eszközökön, beleértve a mobiltelefonokat és táblagépeket is. A Microsoft bejelentette az Xbox Design Lab kibővítését, amely lehetővé teszi a játékosok számára, hogy egyedi kontrollereket tervezzenek és rendeljenek, tovább személyre szabva a játékélményt.' },
    { time: 'Cikk letöltése', isDownload: true, filepath:'assets/Pdf/xbox.pdf'},
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