import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sega',
  templateUrl: './sega.component.html',
  styleUrls: ['./sega.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SegaComponent {
  timelineItems = [
    { time: '1940-66', image: 'assets/sega/periscope.jpg', description: '1940: Martin Bromley, Irving Bromberg és James Humpert megalapítják a Standard Games nevű vállalatot Honoluluban, Hawaii-on. A céljuk az volt, hogy érmével működő szórakoztató gépeket biztosítsanak az amerikai katonák számára. A cég később átköltözött Japánba, és Service Games néven folytatja a tevékenységét. Innen ered a későbbi „SEGA” név. A Service Games egyesül egy másik vállalattal, a Rosen Enterprises-szal, amelyet David Rosen alapított, és létrejön a Sega Enterprises, Ltd. A SEGA megvásárolja a japán arcade-gép gyártó Nihon Goraku Bussant. A cég kiadja első sikeres játékgépét, a „Periscope”-ot, amely egy mechanikus tengeralattjáró-szimulátor volt.' },
    { time: '1970', image: 'assets/sega/killershark.jpg', description: '1970-ben a SEGA az egyik vezető arcade-gép gyártóvá válik. 1973:A cég bemutatja az első elektromechanikus lövöldözős játékát, a „Killer Shark”-ot, majd piacra dobták az egyik korai videójátékot, a „Heavyweight Champ”-et, amely egy bokszjáték volt. 1979-ben megjelenik a „Head On”, amely az első olyan játék, amelyben a játékosnak sorban kell összegyűjtenie tárgyakat – ez az alapja lett a Pac-Man játékmenetének.' },
    { time: '1983-86', image: 'assets/sega/outrun.jpg', description: '1983-ban megjelenik a SG-1000, a SEGA első otthoni konzolja, amelyet Japánban és néhány más piacon forgalmaznak. A SEGA kiadja a Master System konzolt, amelyet az Egyesült Államokban az ausztrál Tonka forgalmaz, de nem tud versenyezni a Nintendo Entertainment System (NES) ellen. Megjelenik az Out Run, a korszak egyik legikonikusabb arcade-játéka.' },
    { time: '1988-93', image: 'assets/sega/sonic.jpg', description: '1988: Japánban piacra kerül a Mega Drive (Észak-Amerikában Genesis néven). 1989:A SEGA Genesis megjelenik az Egyesült Államokban. A SEGA agresszív marketingkampányt folytat a Nintendo ellen. 1991:Megjelenik a Sonic the Hedgehog, amely a SEGA kabalafigurájává válik és a Genesis sikereit tovább növeli. A SEGA bevezeti a Sega CD kiegészítőt, amely azonban nem váltja be a hozzá fűzött reményeket.' },
    { time: '1998-2001', image: 'assets/sega/dreamcast.jpg', description: '1998-ban Japánban megjelenik a SEGA Dreamcast, amely az első online funkciókkal ellátott konzol volt. A Dreamcast észak-amerikai premierje sikeresnek bizonyul, de hamarosan megjelenik a Sony PlayStation 2, amely háttérbe szorítja. 2001:A SEGA bejelenti, hogy leáll a Dreamcast gyártásával és kilép a konzolpiacról, hogy kizárólag játékfejlesztéssel foglalkozzon.' },
    { time: '2003-jelen', image: 'assets/sega/yakuza.jpg', description: '2003-tól a SEGA különböző fejlesztőstúdiókat vásárol fel és átszervezi üzleti modelljét, megszerzi az Atlus nevű stúdiót, amely a Persona és Shin Megami Tensei sorozatokért felelős. Újra megerősíti pozícióját a videojáték-piacon a Yakuza és Total War sorozatokkal, továbbra is fejleszti a Sonic, Yakuza és Atlus címeit, és spekulációk merülnek fel egy esetleges új hardverprojektről.' },
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