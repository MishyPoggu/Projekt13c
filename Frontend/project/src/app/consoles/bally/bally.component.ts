import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bally',
  templateUrl: './bally.component.html',
  styleUrls: ['./bally.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BallyComponent {
  timelineItems = [
    { time: '1930', image: 'assets/bally/raymoloney.jpg', description: '1932. január 10.-én Raymond Moloney megalapítja a Bally Manufacturing Corporation-t Chicagóban, első játékuk, a "Ballyhoo" flippergép után elnevezve. Majd a 30-as évek végén a vállalat bővíti tevékenységét szerencsejáték-eszközök gyártására, különösen mechanikus nyerőgépekre, jelentős sikereket érve el ezen a területen.' },
    { time: '1940-50', image: 'assets/bally/ballybingo.jpg', description: '1940: A második világháború alatt a Bally lőszereket és repülőgép-alkatrészeket gyártott, majd a háború után a vállalat folytatja a flippergépek, bingógépek és nyerőgépek fejlesztését és gyártását. 1958. február 26.-án Raymond Moloney elhunyt, ami után a vállalat átmeneti nehézségekkel küzd.' },
    { time: '1960', image: 'assets/bally/moneyhoney.jpg', description: '1963-ban egy befektetői csoport, élén Bill O Donnell-lel, felvásárolja a Bally-t, és a vállalat újra növekedésnek indul. Bemutatják az első elektromechanikus nyerőgépet, a "Money Honey"-t, amely nagy sikert arat, később pedig a Bally felvásárolja a Midway Manufacturing Company-t, egy szórakoztató játékokat gyártó céget. ' },
    { time: '1970-80', image: 'assets/bally/ballys.jpg', description: '1974-ben a Bally megvásárolja a német Guenter Wulff-Apparatebau céget, amelyet később Bally Wulff névre keresztelnek. Megnyílik a Park Place Casino & Hotel Atlantic City-ben, jelezve a Bally belépését a kaszinóiparba. Az 1982-ben a Bally megvásárolta a Six Flags vidámpark-láncot, felvásárolják a Health and Tennis Corporation of America-t, amely később Bally Total Fitness néven válik ismertté. A vállalat több kaszinót is megvásárol, köztük a Las Vegas-i MGM Grand Hotelt, amelyet később Ballys Las Vegas névre keresztelnek, ám pénzügyi nehézségek miatt a Bally eladja a Six Flags-et és a Bally/Midway részleget, utóbbit a Williams Electronics vásárolja meg.' },
    { time: '1990', image: 'assets/bally/arthurgoldberg.jpg', description: '1990-ben Arthur Goldberg lesz a vállalat elnöke, és megkezdi a cég átszervezését. A Bally eladja a Scientific Games-et és a Life Fitness-t, valamint a renói kaszinót és 1996. december 18.-án a Hilton Hotels Corporation felvásárolja a Bally Entertainment-et 3 milliárd dollárért.' },
    { time: '2000-jelen', image: 'assets/bally/ballysports.jpg', description: '2000-től a Hilton kaszinó részlege, beleértve a Bally tulajdonokat, kiválik és Park Place Entertainment néven működik tovább, majd a Harrahs Entertainment felvásárolja a Caesars Entertainment-et, beleértve a Bally márkát is. A Scientific Games megvásárolja a Bally Technologies-t, amely a Bally név alatt nyerőgépeket és kaszinóberendezéseket gyárt. Így egészen a 2020-as évekig mentek a megvásárlások, még A Diamond Sports Group is bejelenti, hogy a Bally Sports hálózatokat átnevezi FanDuel Sports Network-re. Maga a bally mint flippergép gyártó és mint régi énje teljesen eltűnt, már csak a gyűjtőknek jelenthet valamit vagy akár a kaszinó felé való érdeklődőknek.' },
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