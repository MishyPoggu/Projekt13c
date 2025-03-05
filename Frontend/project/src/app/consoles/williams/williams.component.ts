import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-williams',
  templateUrl: './williams.component.html',
  styleUrls: ['./williams.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class WilliamsComponent {
  timelineItems = [
    { time: '1940', image: 'assets/williams/firstpinball.jpg', description: '1943: Harry E. Williams megalapítja a Williams Manufacturing Company-t Chicagóban. A 40-es évek végére pedig elkezdődtek az első flippergépek kifejlesztése, korai elektromágneses mechanizmusok bevezetése.' },
    { time: '1950-60', image: 'assets/williams/armynavy.jpg', description: 'Williams piacra dobja első sikeres flippergépeit, újításokkal, például forgókerék mechanizmusokkal. Megjelenik az „Army Navy” flipper, amely egyik legkorábbi interaktív játékélményt nyújtja. Bevezetésre kerülnek a modern pontozási rendszerek, új világítási effektek és mozgó mechanikus elemek. Az első olyan Williams flipper jelenik meg, amelyben már többgolyós (multiball) játékmód is elérhető.' },
    { time: '1970-80', image: 'assets/williams/midway.jpg', description: 'Elektromechanikus rendszerek helyett teljesen elektronikus vezérlésű flipperek jelennek meg. 1977: A Williams bevezeti az első digitális kijelzős flippergépeket. Megjelenik a „Firepower” flipper, amely az egyik első teljes mértékben elektronikus flippergépe a cégnek. 1980-as évek közepe: A Williams megvásárolja a Bally/Midway flipperrészlegét, ezzel megerősítve piaci pozícióját.' },
    { time: '1990', image: 'assets/williams/twilightzone.jpg', description: '1991: A „Terminator 2: Judgment Day” flipper megjelenése – az egyik első licenszelt filmes flipper Williams-től, majd a „The Addams Family” bemutatása – a valaha volt legkelendőbb flippergép). A „Twilight Zone” flipper kiadása, amelyet sokan a legjobb flippernek tartanak. 1995: A Williams bemutatja az első „Mode-Based” játékmenetű flipperjátékokat, ahol a játékos különböző küldetéseket teljesíthet. 1997: A „Medieval Madness” megjelenése, amely a modern flipper egyik ikonikus darabja. Később a Williams bejelenti, hogy befejezi a flippergyártást, mivel a videojátékok és más szórakozási formák kiszorítják a gépeiket.' },
    { time: '2000-jelen', image: 'assets/williams/williamsnow.jpg', description: 'A 2000-es évek elején a Williams licenszeit különböző cégek (pl. Stern Pinball) felvásárolják, és tovább gyártanak új flippereket. A digitális flipperjátékok (pl. „Pinball Arcade”) révén a klasszikus Williams flipperek új közönséget találnak, majd 2008-ban a Zen Studios megszerzi a Williams/Bally digitális flipperlicenszét, és elkezdik újraalkotni a klasszikus gépeket digitális formában. A jelenlegi években pedig a Williams klasszikusok továbbra is élnek a gyűjtők és digitális adaptációk által.' },
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