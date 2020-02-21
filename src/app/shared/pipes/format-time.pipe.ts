import { Pipe } from '@angular/core';

@Pipe({name: 'formatTime'})
export class FormatTimePipe {  
    transform(seconds: number){
        let s = seconds % 60;
        let ss = s.toString();
        if (s < 10) { ss = "0" + ss; }

        let m = (seconds - s) / 60;
        let mm = m.toString();
        if (m < 10) { mm = "0" + mm; }

        return  mm + ":" + ss;
    }
}