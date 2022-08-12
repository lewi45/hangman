import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: 'pm-hangman',
    templateUrl: './hangman.component.html',
    styleUrls: ['./hangman.component.css']
})

export class HangmanComponent implements OnInit {
    fruits: string[] = [];
    drawstep: number = 0;
    message: string = '';
    actword: string = '';
    alphabet: string = 'aábcdeéfghiíjklmnoóöőpqrstuüűvwxyz';
    letters: string[];
    actletters: string[];
    foundletters: string[];
    usedletters: string[];
    letterlength: number;
    successes: number;

    getword(): void {
        var randy: number = Math.floor(Math.random() * this.fruits.length);        
        this.actword = this.fruits[randy].trim();
        this.actletters = this.actword.split('');
        this.foundletters = [];
        this.usedletters = [];
        this.drawstep=0;
        this.letterlength = this.actword.length;
        this.successes = 0;
        this.message = '';
    }

    surrender(): void {
        this.message = `EZ NEM SIKERÜLT! A megfejtés: ${this.actword}`;
    }

    guess(letter:string): void {
        var hit:number = 0;
        this.actletters.forEach(function(elem, index, array) {
            if (elem === letter) {hit++}
        })        
        this.successes+=hit;
        if (!hit) {
            this.drawstep++; } 
        else {
            this.foundletters.push(letter);
        }
        this.usedletters.push(letter);

        if (this.drawstep >= 8) {
            this.message = `EZ NEM SIKERÜLT! A megfejtés: ${this.actword}`;
        }

        if (this.successes >= this.letterlength) {
            this.message = `TELJES SIKER! GRATULA!`;
        }
        
        

    }

    badanswer(): void {
        this.drawstep++;
    }
    
    ngOnInit(): void {
        fetch('./../assets/words.txt')
        .then(response => response.text())
        .then(data => {
            var split = data.split(/\n/);
            for(var line = 0; line < split.length; line++){
                this.fruits.push(split[line]);
            }
        });
        this.letters = this.alphabet.split('');

        
    }   
}