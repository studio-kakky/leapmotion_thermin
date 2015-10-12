class Termin extends SoundBox{
  constructor(ctx, targetElem, freq = 440, gain = 0.5, octabeDistance = 150) {
    this.noteGuideElement = $(targetElem);
    this.octabeDistance = octabeDistance;
    super(ctx, freq, gain);
    this.setGuide();
  }

  setNote(distance) {
    var step = distance / (this.octabeDistance / 12);
    var stepNum = Math.pow(2, step/12);
    this.setCurrentNote(step);
    this.frequency = this.baseFreq * stepNum;
  }

  setGuide() {
    var ul = $('<ul>').addClass('note-guide');
    var li;
    var notes = {
      note_0:'C',
      note_4:'D',
      note_8:'E',
      note_10:'F',
      note_14:'G',
      note_18:'A',
      note_22:'B',
      note_24:'C',
      note_28:'D',
      note_32:'E',
      note_34:'F',
      note_38:'G',
      note_42:'A',
      note_46:'B',
      note_48:'C'
    };
    for( var i = 0; i < 49; i ++) {
      li = $('<li class="noge-guide__indicator"><div class="note-guide_notemark-wrapper"><span class="note-guide__notemark"></span></div></li>');
      var note_index = 'note_' + i;
      if(notes[note_index]) li.append('<span class="note-guide__notename">' + notes[note_index] + '</span>');
      ul.append(li);
    }
    this.noteGuideElement.append(ul);
  }

  setCurrentNote(step) {
    var guideStep = Math.round(step * 2) + 18;
    var notemarks = $(this.noteGuideElement).find('.note-guide__notemark');
    for( var i = 0, l = notemarks.length; i < 49; i ++) {
      if(i === guideStep) {
        $(notemarks[i]).css('opacity',1);
      } else {
        $(notemarks[i]).css('opacity',0);
      }
    }
  }



  setGain(distance) {
    this.gain = distance;
  }
}
