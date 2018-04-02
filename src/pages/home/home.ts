import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bgcolor: string = 'white';

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {

  }

  //check for permission if not it will request for permission
  ngOnInit() {

    this.speechRecognition.hasPermission()
      .then((haspermission: boolean) => {

        if (!haspermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }

      });

  }

  start() {
    //specify options in start listening like the language e.t.c
    this.speechRecognition.startListening()
      .subscribe(
        //return of possible matches in an array based on the speech recognition pattern 
        (matches: Array<string>) => {
          //choose the first one in the array
          this.bgcolor = matches[0];
        }
      )
  }

}
