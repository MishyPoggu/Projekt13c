import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stern',
  templateUrl: './nutting.component.html',
  styleUrls: ['./nutting.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NuttingComponent {
  timelineItems = [
    { time: '1964', image: 'assets/nutting/knowledgecomputer.jpg', description: '1964-ben az Edex Teaching Systems nevű oktatástechnológiai cég kifejlesztette a Knowledge Computer nevű érmebedobós kvízjátékot. Bill Nutting, egy San Franciscó-i áruház beszerzője, befektetett az Edex Teaching Systems-be, és a Knowledge Computer marketingjével foglalkozott.' },
    { time: '1965-66', image: 'assets/nutting/nutting.jpg', description: '1956: Jogok megszerzése: Amikor az Edex-et a Raytheon felvásárolta, Nutting megvásárolta a Knowledge Computer jogait, hogy továbbra is forgalmazhassa a játékot. Nutting Associates alapítása: Bill Nutting megalapította a Nutting Associates vállalatot, hogy forgalmazza a Knowledge Computer-t és annak továbbfejlesztett változatát, a Computer Quiz-t. ' },
    { time: '1967-68', image: 'assets/nutting/computerquiz.jpg', description: '1967-ben a Nutting Associates piacra dobta a Computer Quiz nevű érmebedobós kvízgépet, amelyet Richard Ball tervezett. A Computer Quiz-t áttervezték egy szilárdtest (solid-state) változatra, javítva ezzel a megbízhatóságot és a teljesítményt.' },
    { time: '1971', image: 'assets/nutting/computerspace.jpg', description: '1971-ben Nolan Bushnell és Ted Dabney, a későbbi Atari alapítói, kifejlesztették a Computer Space nevű videojátékot, amelyet a Nutting Associates gyártott le. Körülbelül 1500 darabot készítettek belőle. Bushnell nagyobb részesedést szeretett volna a cégben, de mivel ezt nem kapta meg, elhagyta a vállalatot, és megalapította az Atarit.' },
    { time: '1972-76', image: 'assets/nutting/computerspaceball.jpg', description: '1972: A Nutting Associates több játékot is kifejlesztett, mint például a Computer Space Ball (1972) és a Ricochet (1976). Azonban a vállalat pénzügyi nehézségekkel küzdött, és 1976-ban megszűnt.' },
    { time: '1977', image: 'assets/nutting/sircoma.jpg', description: '1977-ben a Nutting Associates-t William "Si" Redd vásárolta meg, és a vállalatot beolvasztották a Sircoma nevű cégbe, amely videópóker gépek gyártásával foglalkozott.' },
    { time: '1977 után', image: 'assets/nutting/gunfight.jpg', description: 'Bill Nutting testvére, Dave Nutting, szintén tevékenykedett a videojáték-iparban. Létrehozta a Dave Nutting Associates nevű tanácsadó céget, amely számos játékot fejlesztett a Midway számára az 1970-es és 1980-as években, mint például a Gun Fight, Sea Wolf és Gorf.' },
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