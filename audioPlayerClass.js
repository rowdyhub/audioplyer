class Player {
    constructor(){
        // config
        this.userAutoplay = false;

        this.playerState = false;               // true - воспроизведение, false - ожидание
        this.playerMediaSRC = 'media/music/';
        this.playerAudioType = 'mp3';
        this.playerRewinding = false;

        this.trackCurrentAudio;
        this.trackCurrentAudioId = 0;
        this.trackDuration;
        this.trackCurrentTime = 0;
        this.trackScrollerPosition; //(1/this.trackDuration*this.trackCurrentTime);
        this.trackBufferPosition = 0;

        this.playlist = [];
        this.playlistShow = false;
    }

    
    togglePlayAudio(){
        if(!this.playerState){
            this.playerState = true;
            this.trackCurrentAudio.play();
        }
        else {
            this.playerState = false;
            this.trackCurrentAudio.pause();
        }
    }


    togglePlaylist(playlistblock) {
        if(!this.playlistShow){
            this.playlistShow = true;
            playlistblock.style.transition = '.3s';
            playlistblock.style.left = '0px';
        }
        else {
            this.playlistShow = false;
            playlistblock.style.transition = '.3s';
            playlistblock.style.left = '100vw';
        }
    }


    changeTrack(titleText, action, thisOneTrackId = null){
        if(this.trackCurrentAudio === undefined && this.playlist.length > 0){
            this.trackCurrentAudio = new Audio(this.playerMediaSRC + this.playlist[this.trackCurrentAudioId] + '.' + this.playerAudioType);
        }
        else if(this.trackCurrentAudio != '' && this.playlist.length > 0){
            this.trackCurrentAudio.pause();
            if(action === 'next'){
                if(this.trackCurrentAudioId < this.playlist.length-1){
                    this.trackCurrentAudioId += 1;
                }
                else {
                    this.trackCurrentAudioId = 0;
                }
            }
            else if(action === 'prew'){
                if(this.trackCurrentAudioId > 0){
                    this.trackCurrentAudioId -= 1;
                }
                else {
                    this.trackCurrentAudioId = this.playlist.length-1;
                }
            }
            else if(action === 'thisOne' && thisOneTrackId !== null){
                this.trackCurrentAudioId = thisOneTrackId;
            }
            else {
                alert('Error controller');
            }
            this.trackCurrentAudio = new Audio(this.playerMediaSRC + this.playlist[this.trackCurrentAudioId] + '.' + this.playerAudioType);
            if(this.playerState){ 
                this.trackCurrentAudio.play();
            }
        }
        else {
            titleText.innerText = 'Нет треков для воспроизведения';
        }
        titleText.innerText = this.playlist[this.trackCurrentAudioId];
        document.title = this.playlist[this.trackCurrentAudioId];
        
        /* console.log(this.trackCurrentAudio + ' => ' + this.trackCurrentAudioId); */
        
    }


    // Приведение времени к виду 00:00, 00:00:00
    // n - время в секундах
    timerNormolize(n) {
        n = Math.floor(n);

        //let hours;
        let minutes;
        let seconds;
    
        minutes = Math.floor(parseInt(n) / 60);
        seconds = Math.floor(parseInt(n) - minutes*60);
    
        if(minutes == 0){
            minutes = '00'
        }
        else if (minutes > 0 && minutes < 10){
            minutes = '0'+minutes;
        }
        if(seconds == 0){
            seconds = '00'
        }
        else if (seconds > 0 && seconds < 10){
            seconds = '0'+seconds;
        }
    
    
        return minutes + ':' + seconds
    }


    // Чекаем обновления и перерисовываем
    refreshState(trackLengthText, currentTimeText, scroller, timeline, timelinePlayed, timelineBuffered, playpause){
        if(this.playerState){
            playpause.style.cssText = `
                background: url("icons/pause.png") no-repeat; 
                background-size: 60%; 
                background-position: center; 
                background-color: darkgrey;
            `;
            this.trackCurrentTime = this.trackCurrentAudio.currentTime;
            this.trackDuration = this.trackCurrentAudio.duration;
            this.trackScrollerPosition = (1/this.trackDuration*this.trackCurrentTime);
            trackLengthText.innerText = this.timerNormolize(this.trackDuration);
            currentTimeText.innerText = this.timerNormolize(this.trackCurrentTime);
            
            scroller.style.left = (parseInt(getComputedStyle(timeline).width) * this.trackScrollerPosition + 20 * (1 - this.trackScrollerPosition)) + 'px'; // Размещение ползунка на тааймлайне по горизонтали
            timelinePlayed.style.width = this.trackScrollerPosition*100 + '%';
            timelineBuffered.style.width = 100/this.trackDuration*this.trackCurrentAudio.buffered.end(0) + '%';
        }
        else {
            playpause.style.cssText = `
                background: url("icons/play.png") no-repeat; 
                background-size: 60%; 
                background-position: center; 
                background-color: darkgrey;
            `;
        }
    }



    rewind(){

    }
}
