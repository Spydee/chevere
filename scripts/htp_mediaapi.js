class apiPlayer {
    constructor(elem, audioContext, masterGain) {
        this.elem = elem;
        this.audioContext = audioContext;
        this.masterGainNode = masterGain;
        this.readyToPlay = false;
    }

    setSource(src) {
        if (this.elem.src)
            return; // can't redefine
        this.elem.src = src;
        this.elem.onloadeddata = function() {
            this.readyToPlay = true;
        }
        return;
        try {
            if (!this.audioContext) {
                throw "Undefined audio context in setSource: " + src;
            }

            $(this.elem).data('track', this.audioContext.createMediaElementSource(this.elem));
            $(this.elem).data('gainNode', this.audioContext.createGain());
            let vol = $(this.elem).data('volume');
            if (!vol) {
                throw "node volume not set in setSource: " + src;
            }
            $(this.elem).data('gainNode').gain.value = vol;
            $(this.elem).data('track').connect($(this.elem).data('gainNode'));
//            $(this.elem).data('gainNode').connect(this.masterGainNode);
//            this.gainNode.connect(this.masterGainNode);
            //this.gainNode.connect(audioCtx.destination);
            myDebugger.log("Set source to " + this.elem.src);
    /*        */
        }
        catch(e) {
            myDebugger.log("$ERROR$ " + e);
        }
    }

    play(currTime, ele) {
        if (ele) {
            ele.currentTime = currTime;
            myDebugger.log("Playing " + ele.src);
            //ele.play();
            this.actualStart = performance.now();
        }
   //     myDebugger.log("Playing " + this.elem.src);
    }

    pause() {
        if (this.elem) {
            this.elem.pause();
            this.actualEnd = performance.now();
        }
    }

/**
 * The timer is short but never gets cleared
 */
    stop() {
        this.actualEnd = performance.now();
        try{
            this.elem.currentTime = me.offsetTime/1000;
                this.gainNode.disconnect(); // not tested
        }
        catch (e) {
        }
    }
}



class audioPlayer extends apiPlayer {

}   