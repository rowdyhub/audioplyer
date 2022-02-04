


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="icons/play.png" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
    <title>Media - Music</title>
</head>
<body>

<!-- <pre style="color: #fff">
        Debug
</pre> -->

    <div class="nav"></div>
    <div class="player">
        <div class="cover" id="cover"></div>
        <div class="track">
            <div id="timeline">
                <div id="timelineBuffered"></div>
                <div id="timelinePlayed"></div>
            </div>
            <div id="scroller"></div>
            <div id="scrollerRewind"></div>
            <div id="timer"><span id="currentTimeText">00:00</span> / <span id="trackLengthText">00:00</span></div>
        </div>
        <div class="titleText" id="titleText">
            ...
        </div>
        <div class="control">
            <div id="prew" title="Предыдущий трек"></div>
            <div id="play" title="Воспроизвести"></div>
            <div id="next" title="Следующий трек"></div>
        </div>
    </div>
</body>
</html>
<script src="audioPlayerClass.js"></script>
<script src="audioPlayer.js"></script>





<script>
<?php
$scdir = scandir('media/music');
$response = json_encode($scdir);
echo 'let getplaylist = '.$response.';';
?>



for(let i = 2; i < getplaylist.length; i++){
    player.playlist.push(getplaylist[i].substr(0, getplaylist[i].lastIndexOf('.')));
}


</script>