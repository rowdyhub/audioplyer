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


cover.style.height = parseInt(getComputedStyle(cover).width) + 'px';

scroller.style.top = timeline.offsetTop-10 + 'px'; // Размещение ползунка на тааймлайне по вертикали
scrollerRewind.style.top = timeline.offsetTop-10 + 'px'; // Размещение ползунка на тааймлайне по вертикали






let player = new Player();

player.changeTrack(titleText); // не передаем action
player.refreshState(trackLengthText, currentTimeText, scroller, timeline, timelinePlayed, timelineBuffered, play)

play.onclick = () => {
    player.togglePlayAudio();
}
next.onclick = () => {
    player.changeTrack(titleText, 'next');
}
prew.onclick = () => {
    player.changeTrack(titleText, 'prew');
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
    if(player.playerState){
        player.trackCurrentAudio.onended =() => {
            player.changeTrack(titleText, 'next');
        };
    }
}, 100);



//console.log(getComputedStyle(timeline).width);



//let currentAudio = new Audio('media/music/AVAION - Pieces.mp3')



// currentAudio.duration - хранит продолжительность трека
// currentAudio.currentTime - текущее время трека
// currentAudio.buffered.end(0) - прогресс загрузки


/* rolleDiscription()
function rolleDiscription(){
    let description = document.getElementById('description');
    let descriptionText = description.innerText;

    if(descriptionText.length > 20){
        description.innerHTML = '<marquee direction="left" scrollamount="5">'+descriptionText+'</marquee>';
    }
    else {
        description.innerHTML = descriptionText;
    }
}


function titleAudioNormalize(){

}


console.log(currentAudio);
function getAaa(){
    console.log(currentAudio.buffered.end(0));
    //currentAudio.currentTime += 5;
} */