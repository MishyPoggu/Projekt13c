import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taito',
  templateUrl: './taito.component.html',
  styleUrls: ['./taito.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TaitoComponent {
  timelineItems = [
    { time: '1953', image: 'assets/taito/michaelkogan.jpg', description: '1953: Az alapítója Michael Kogan, egy orosz származású üzletember, aki Japánba emigrált. A cég kezdetben importált automatákat árusított, például zenedobozokat, italautomatákat és mechanikus szerencsejátékokat. Az első japán vállalatok egyike volt, amely az ilyen típusú szórakoztatóberendezésekkel kezdett foglalkozni. A cég ekkori neve:Taito Trading Company' },
    { time: '1956-60', image: 'assets/taito/basketball.jpg', description: '1956: Megerősödik a cég pozíciója a japán automatapiacon és saját gépek fejlesztésébe kezd, hogy csökkentse a külföldi importtól való függést. A Taito az első japán cég, amely saját fejlesztésű flippergépeket és egyéb mechanikus szórakoztatóeszközöket készít. Az árkádpiac Japánban gyorsan növekszik, és a Taito egyre nagyobb szerepet játszik benne, ekkor még főként egyszerű, mechanikus játékokat fejleszt.' },
    { time: '1973-80', image: 'assets/taito/spaceinvaders.jpg', description: '1973-ban a Taito kiadja első videojátékát, az Elepong-ot, amely a Pong japán változata. A cég felismeri az új technológia lehetőségeit és egyre inkább a videojátékok fejlesztésére összpontosít. 1978-ban megjelent a Space Invaders amely világszerte hatalmas sikerű videojáték, forradalmasította az ipart. Az egyik első játék, amelyet a popkultúra széles körben átvett, elindította az árkádjátékok aranykorát. A cég kiterjesztette tevékenységét az Egyesült Államok piacára és az egyik vezető szereplővé vált.' },
    { time: '1980', image: 'assets/taito/elevatoraction.jpg', description: '1980: A Taito folytatja az innovációt, és számos ikonikus árkádjátékot dob piacra: Qix Egyedi vonalhúzós puzzle játék, Jungle Hunt egy korai platformer, amelyben egy dzsungelben kell túlélni, Elevator Action egy akció-platformer, amelyben egy kémnek kell ellopnia titkos dokumentumokat. ' },
    { time: '1986-90', image: 'assets/taito/bubble.jpg', description: '1986: Bubble Bobble megjelenése, amely az egyik legismertebb platformjáték,kétjátékos kooperatív módot kínál. A Taito piacra dobja az egyik első rail shooter típusú játékot és az új hardverek fejlesztése révén a cég egyre komplexebb árkádgépeket hoz létre. 1990-ben megjelenik a Puzzle Bobble (Bust-A-Move), a Bubble Bobble folytatása és a Taito elkezdi fejleszteni játékait otthoni konzolokra (Super Nintendo, PlayStation).' },
    { time: '1995–2005', image: 'assets/taito/squareenix.jpg', description: '1995: A konzolos játékok előretörése miatt az árkádpiac zsugorodni kezd, amihez a Taito igyekszik alkalmazkodni, de nehezen tud versenyezni a nagyobb vállalatokkal, majd megpróbál betörni a mobiljátékok piacára. 2005-ben a Square Enix megvásárolja a Taito-t, hogy megerősítse árkád- és mobiljáték-portfólióját. A Taito hivatalosan is a Square Enix egyik leányvállalatává válik.' },
    { time: '2016-jelen', image: 'assets/taito/taitoegretmini.jpg', description: '2016-tól az ikonikus játék modernizált változatokban tér vissza különböző platformokra. 2021-ben a Taito új kiadásokkal és mini árkádgépekkel ünnepli történelmét. Megjelenik a Taito Egret II Mini, amely a klasszikus árkádjátékok gyűjteményét kínálja.' },
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