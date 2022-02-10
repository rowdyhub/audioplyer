let displayW = window.innerWidth;
let displayH = window.innerHeight;


let cover = document.getElementById('cover');
let scroller = document.getElementById('scroller');
let scrollerRewind = document.getElementById('scrollerRewind');
let timeline = document.getElementById('timeline');
let timelinePlayed = document.getElementById('timelinePlayed');
let timelineBuffered = document.getElementById('timelineBuffered');
let timer = document.getElementById('timer');
let titleText = document.getElementById('titleText');
let trackLengthText = document.getElementById('trackLengthText');
let currentTimeText = document.getElementById('currentTimeText');


let prew = document.getElementById('prew');
let play = document.getElementById('play');
let next = document.getElementById('next');

let playlist_open = document.getElementById('playlist_open');
let playlistBlock = document.getElementById('playlist');
let playlist_close = document.getElementById('playlist_close');
let bar = document.getElementById('bar');
let list = document.getElementById('list');
let playlist_st = document.getElementsByClassName('playlist_st');

cover.style.height = parseInt(getComputedStyle(cover).width) + 'px';
list.style.height = (displayH - parseInt(getComputedStyle(bar).height) - 30) + 'px';

cover.innerText = `${displayW} x ${displayH}`;

scroller.style.top = timeline.offsetTop-10 + 'px';          // Размещение ползунка на таймлайне по вертикали
scrollerRewind.style.top = timeline.offsetTop-10 + 'px';    // Размещение ползунка на таймлайне по вертикали


window.onresize = () => {
    cover.style.height = parseInt(getComputedStyle(cover).width) + 'px';

    scroller.style.top = timeline.offsetTop-10 + 'px';          // Размещение ползунка на таймлайне по вертикали
    scrollerRewind.style.top = timeline.offsetTop-10 + 'px';    // Размещение ползунка на таймлайне по вертикали
}



let player = new Player();

player.changeTrack(titleText); // не передаем action
player.refreshState(trackLengthText, currentTimeText, scroller, timeline, timelinePlayed, timelineBuffered, play);

play.onclick = () => {
    player.togglePlayAudio();
}
next.onclick = () => {
    player.changeTrack(titleText, 'next');
}
prew.onclick = () => {
    player.changeTrack(titleText, 'prew');
}
playlist_open.onclick = () => {
    player.togglePlaylist(playlistBlock);
}
playlist_close.onclick = () => {
    player.togglePlaylist(playlistBlock);
}

// mouse rewind
scroller.onmousedown = () => {
    player.playerRewinding = true;
    scroller.style.display = 'none';
    scrollerRewind.style.display = 'block';
    document.getElementsByTagName('body')[0].onmousemove = (e) => {
        let xRewind = e.x;
        if(xRewind < 30){ //margin = 20 и ширина скроллера 20/2
            xRewind = 30;
        }
        else if(xRewind > parseInt(getComputedStyle(timeline).width)+10){
            xRewind = parseInt(getComputedStyle(timeline).width)+10;
        }
        scrollerRewind.style.left = xRewind-10 +'px';


        document.getElementsByTagName('body')[0].onmouseup = () => {
            if(player.playerRewinding == true){
                scroller.style.display = 'block';
                scrollerRewind.style.display = 'none';
                player.togglePlayAudio();
                player.trackCurrentAudio.currentTime = (1/parseInt(getComputedStyle(timeline).width))*(xRewind-10)*player.trackDuration;
    
                player.togglePlayAudio();
                player.playerRewinding = false;  
            }
        }
    }
}


// touscscreen rewind
scroller.ontouchstart = () => {
    player.playerRewinding = true;
    scroller.style.display = 'none';
    scrollerRewind.style.display = 'block';
    document.getElementsByTagName('body')[0].ontouchmove = (e) => {
        let xRewind = e.touches[0].pageX;
        if(xRewind < 30){ //margin = 20 и ширина скроллера 20/2
            xRewind = 30;
        }
        else if(xRewind > parseInt(getComputedStyle(timeline).width)+10){
            xRewind = parseInt(getComputedStyle(timeline).width)+10;
        }
        scrollerRewind.style.left = xRewind-10 +'px';


        document.getElementsByTagName('body')[0].ontouchend = () => {
            if(player.playerRewinding == true){
                player.togglePlayAudio();
                player.trackCurrentAudio.currentTime = (1/parseInt(getComputedStyle(timeline).width))*(xRewind-10)*player.trackDuration;
                scroller.style.display = 'block';
                scrollerRewind.style.display = 'none';
                player.togglePlayAudio();
                player.playerRewinding = false;  
            }
        }
    }
}






setInterval(function(){
    player.refreshState(trackLengthText, currentTimeText, scroller, timeline, timelinePlayed, timelineBuffered, play);
    
    for(let i = 0; i < playlist_st.length; i++){
        playlist_st[i].style = '';
    }
    
    playlist_st[player.trackCurrentAudioId].style.background = '#ffffff';
    playlist_st[player.trackCurrentAudioId].style.color = '#000000';
    
    if(player.playerState){
        player.trackCurrentAudio.onended = () => {
            player.changeTrack(titleText, 'next');
        };
        player.trackCurrentAudio.onstalled = () => {
            alert('err');
            player.changeTrack(titleText, 'next');
        };
    }
}, 100);