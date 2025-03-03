import { Component } from '@angular/core';
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
    { time: '1964', image: 'assets/nutting/knowledgecomputer.jpg', description: 'Az Edex Teaching Systems nevű oktatástechnológiai cég kifejlesztette a Knowledge Computer nevű érmebedobós kvízjátékot. Bill Nutting, egy San Franciscó-i áruház beszerzője, befektetett az Edex Teaching Systems-be, és a Knowledge Computer marketingjével foglalkozott.' },
    { time: '1965-66', image: 'assets/nutting/nutting.jpg', description: 'Jogok megszerzése: Amikor az Edex-et a Raytheon felvásárolta, Nutting megvásárolta a Knowledge Computer jogait, hogy továbbra is forgalmazhassa a játékot. Nutting Associates alapítása: Bill Nutting megalapította a Nutting Associates vállalatot, hogy forgalmazza a Knowledge Computer-t és annak továbbfejlesztett változatát, a Computer Quiz-t. ' },
    { time: '1967-68', image: 'assets/nutting/computerquiz.jpg', description: 'A Nutting Associates piacra dobta a Computer Quiz nevű érmebedobós kvízgépet, amelyet Richard Ball tervezett. A Computer Quiz-t áttervezték egy szilárdtest (solid-state) változatra, javítva ezzel a megbízhatóságot és a teljesítményt.' },
    { time: '1971', image: 'assets/nutting/computerspace.jpg', description: 'Nolan Bushnell és Ted Dabney, a későbbi Atari alapítói, kifejlesztették a Computer Space nevű videojátékot, amelyet a Nutting Associates gyártott le. Körülbelül 1500 darabot készítettek belőle. Bushnell nagyobb részesedést szeretett volna a cégben, de mivel ezt nem kapta meg, elhagyta a vállalatot, és megalapította az Atarit.' },
    { time: '1972-76', image: 'assets/nutting/computerspaceball.jpg', description: 'A Nutting Associates több játékot is kifejlesztett, mint például a Computer Space Ball (1972) és a Ricochet (1976). Azonban a vállalat pénzügyi nehézségekkel küzdött, és 1976-ban megszűnt.' },
    { time: '1977', image: 'assets/nutting/sircoma.jpg', description: 'A Nutting Associates-t William "Si" Redd vásárolta meg, és a vállalatot beolvasztották a Sircoma nevű cégbe, amely videópóker gépek gyártásával foglalkozott.' },
    { time: '1977 után', image: 'assets/nutting/gunfight.jpg', description: 'Bill Nutting testvére, Dave Nutting, szintén tevékenykedett a videojáték-iparban. Létrehozta a Dave Nutting Associates nevű tanácsadó céget, amely számos játékot fejlesztett a Midway számára az 1970-es és 1980-as években, mint például a Gun Fight, Sea Wolf és Gorf.' },
  ];

  selectedItem = this.timelineItems[0];

  selectItem(item: any) {
    this.selectedItem = item;
  }
}