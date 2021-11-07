import './lib/webaudio-controls.js';


const getBaseURL = () => {
    return new URL('.', import.meta.url);
};

let style = `
// ici des règles CSS
`;


let template = /*html*/`
<link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
.material-icons{
    font-family: 'Material Icons';
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
}
section{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 1.7%;
}
.container{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Style du lecteur video */
.container #video_player{
    position: relative;
    width: 700px;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(255,255,255,0.24);
}
.container #video_player #main_video{
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
}
.container #video_player .controls{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background: rgba(0,0,0,.71);
    box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.25);
    z-index: 3;
    transform: translateY(180%);
    transition: 0.3s;
}
#video_player .controls .progress-area{
    width: 100%;
    height: 5px;
    margin: auto;
    background: #f0f0f0;
    cursor: pointer;
}
.container #video_player .controls.active{
    transform: translateY(0);
}
.controls .progress-area .progress-bar {
    position: relative;
    width: 0%;
    background: orangered;
    height: inherit;
    border-radius: inherit;
    cursor: pointer;
}
.controls .progress-area .progress-bar::before{
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    background: orangered;
}
.controls .controls-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    width: 97%;
    height: 46px;
    margin: 0 auto;
}
.controls .controls-list .controls-left,
.controls .controls-list .controls-right{
    display: flex;
    justify-content: center;
    align-items: center;
}
.controls .controls-left .timer{
    display: inline-block;
    font-size: 14px;
    white-space: nowrap;
    color: #fff; 
    margin-left: 5px;
    text-align: center;
}
.controls .icon{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    margin-left: 8px;
    margin-right: 5px;
}
.controls .icon .material-icons{
    font-size: 26px;
    color: #fff;
    cursor: pointer;
}
/*Animation du bouton "revenir en arriere"*/
.controls .icon .material-icons.fast-rewind:active{
    transition: 0.2s;
    transform: rotate(-45deg);
}
.controls .icon .material-icons.fast-forward:active{
    transition: 0.2s;
    transform: rotate(45deg);
}
.controls .icon .volume_range{
    -webkit-appearance: none;
    appearance: none;
    width: 0px;
    height: 3px;
    background: #fff;
    color: #fff;
    cursor: pointer;
    outline: none;
    border: none;
    transition: 0.4s;
}
.controls .icon .volume_range::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    outline: none;
    background: #fff;
    opacity: 0;
    color: #fff; 
    transition: 0.3s;
}
.controls .icon:hover .volume_range{
    display: inline-block;
    width: 60px;
}
.controls .icon:hover .volume_range::-webkit-slider-thumb{
    opacity: 1;
    pointer-events: auto;
    transition: 0.5s;
}
.controls-right .icon .auto-play{
    width: 30px;
    height: 10px;
    border-radius: 20px;
    position: relative;
    margin-right: 8px !important;
    background: #b6b6b6;
}
.controls-right .icon .auto-play::before{
    font-family: 'Material Icons';
    content: '\e034';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    line-height: 17px;
    font-size: 14px;
    background: #727272;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    
}
.controls-right .icon .auto-play.active::before{
    content: '\e037';
    left: 15px;
    font-family: 'Material Icons';
}
.controls-right .icon .material-icons.settingsBtn{
    font-size: 24px;
    transition: 0.3s;
}
.controls-right .icon .settingsBtn.active{
    transform: rotate(45deg);
}
#video_player .progressAreaTime{
    position: absolute;
    left: var(--x);
    transform: translateX(-50%);
    bottom: 60px;
    min-width: 50px;
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    background: #002333;
    border-radius: 5px;
    z-index: 1;
    display: none;
}
#video_player .progressAreaTime::before{
    content: '';
    position: absolute;
    bottom: -40%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(45deg);
    background: #002333;
    width: 15px;
    height: 15px;
    z-index: -1;
}
#video_player #settings{
    position: absolute;
    right: 25px;
    bottom: 62px;
    background: rgba(28,28,28,0.9);
    width: 200px;
    height: 250px;
    color: #fff;
    overflow-y: scroll;
    z-index: 20;
    display: none;
}

#video_player #settings.active{
    display: block;
}
#video_player #settings .playback span{
    font-size: 14px;
    font-weight: 300;
    padding: 15px 30px;
    display: block;
    border-bottom: 1px solid rgb(83 83 83);
}
#video_player #settings .playback ul{
    position: relative;
}
#video_player #settings .playback ul li{
    position: relative;
    width: 100%;
    cursor: pointer;
    text-align: left;
    padding: 12px 33px;
    display: block;
    font-size: 14px;
}
#video_player #settings .playback ul li:hover{
    background: rgba(28,28,28,0.9);
}
#video_player #settings .playback ul li.active::before{
    content: '\\e876';
    font-family: "Material Icons";
    position: absolute;
    left: 7px;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 10px;
    font-size: 18px;
}
#video_player #settings::-webkit-scrollbar{
    width: 8px;
    background: transparent;
}
#video_player #settings::-webkit-scrollbar-thumb{
    height: 20px;
    border: 2px solid transparent;
    background: rgba(83,83,83,0.9);
    border-radius: 20px;
}

.container .video-list{
    background: #fff;
    border-radius: 5px;
    height: 520px;
    overflow-y: scroll;
}
.container .video-list::-webkit-scrollbar{
    width: 7px;
}
.container .video-list::-webkit-scrollbar-track{
    background: #ccc;
    border: 50px;
}
.container .video-list::-webkit-scrollbar-thumb{
    background: #666;
    border: 50px;
}
.container .video-list .vid video{
    width:100px;
    border-radius: 5px;
}
.container .video-list .vid{
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f7f7f7;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    cursor: pointer;
}

@media (max-width: 400px) {
    .container{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .controls .icon{
        margin-left: 5px;
        margin-right: 5px;
        font-size: 24px;
    }
    .volume,.volume_range,.picture_in_picture{
        display: none;
    }

}
</style>



<body>
  <section>
    <div class="container">
      <div id="video_player">
        <video id="main_video"></video>
        <div class="progressAreaTime">0:00</div>
        <div class="controls">
          <div class="progress-area">
            <div class="progress-bar">
              <span></span>
            </div>
          </div>
          <div class="controls-list">
            <div class="controls-left">
              <span class="icon">
              <i class="material-icons fast-rewind">replay_10</i>
              </span>
              <span class="icon">
              <i class="material-icons play_pause">play_arrow</i>
              </span>
              <span class="icon">
              <i class="material-icons fast-forward">forward_10</i>
              </span>
              <span class="icon">
              <i class="material-icons volume">volume_up</i>
              <input type="range" min="0" max="100" class="volume_range">
              </span>
              <div class="timer">
                <span class="current">0:00</span> / <span class="duration">0:00</span>
              </div>
            </div>
            <div class="controls-right">
              <span class="icon">
              <i class="material-icons auto-play"></i>
              </span>
              <span class="icon">
              <i class="material-icons settingsBtn">settings</i>
              </span>
              <span class="icon">
              <i class="material-icons picture_in_picture">picture_in_picture_alt</i>
              </span>
              <span class="icon">
              <i class="material-icons fullscreen">fullscreen</i>
              </span>
            </div>
          </div>
        </div>
        <div id="settings">
          <div class="playback">
            <span>Vitesse de Lecture</span>
            <ul>
              <li data-speed="0.25" >0.25</li>
              <li data-speed="0.5">0.5</li>
              <li data-speed="0.75">0.75</li>
              <li data-speed="1" class="active">Normale</li>
              <li data-speed="1.25">1.25</li>
              <li data-speed="1.5">1.5</li>
              <li data-speed="1.75">1.75</li>
              <li data-speed="2">2</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="video-list">
        <div class="vid">
          <video src="https://vod-progressive.akamaized.net/exp=1636331986~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F814%2F22%2F554074757%2F2621006309.mp4~hmac=abddd7f5d8dfb40e7992821956bda129457dbf236259e4d8665dd8f84c532dcd/vimeo-prod-skyfire-std-us/01/814/22/554074757/2621006309.mp4?filename=Water+Lilies+-+75008.mp4"></video>
        </div>
        <div class="vid">
          <video src="https://vod-progressive.akamaized.net/exp=1636332415~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2775%2F21%2F538877060%2F2554448076.mp4~hmac=8ab0f93946cc73ebc0ce37e34a8ad9fc5847aa3197d1b92432739b41e03be081/vimeo-prod-skyfire-std-us/01/2775/21/538877060/2554448076.mp4?filename=Waves+-+70796.mp4"></video>
        </div>
        <div class="vid">
          <video src="https://vod-progressive.akamaized.net/exp=1636332525~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3306%2F20%2F516532097%2F2399156942.mp4~hmac=89703ff7198471c75ca9cc4f6a6f68789643d059d407ce9c2222c94ae92f0138/vimeo-prod-skyfire-std-us/01/3306/20/516532097/2399156942.mp4?filename=Cat+-+66004.mp4"></video>
        </div>
        <div class="vid">
          <video src="http://html5videoformatconverter.com/data/images/happyfit2.mp4"></video>
        </div>
      </div>
    </div>
  </section>
</body>
   `;


class MyVideoPlayer extends HTMLElement {
    constructor() {
        super();
        console.log("BaseURL = " + getBaseURL());
        this.attachShadow({ mode: "open" });

    }

    fixRelativeURLs() {
        // pour les knobs
        let knobs = this.shadowRoot.querySelectorAll('webaudio-knob, webaudio-switch, webaudio-slider');
        knobs.forEach((e) => {
            let path = e.getAttribute('src');
            e.src = getBaseURL() + '/' + path;
        });


    }
    connectedCallback() {
        // Appelée avant affichage du composant
        //this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML = `<style>${style}</style>${template}`;

        this.fixRelativeURLs();

        //this.player = this.shadowRoot.querySelector("#main_video");
        this.video_player = this.shadowRoot.querySelector('#video_player')
        this.mainVideo = this.video_player.querySelector('#main_video');
        // récupération de l'attribut HTML
        this.mainVideo.src = this.getAttribute("src");

        this.play_pause = this.video_player.querySelector('.play_pause');
        this.progressAreaTime = this.video_player.querySelector('.progressAreaTime')
        this.controls = this.video_player.querySelector('.controls');
        this. progressArea = this.video_player.querySelector('.progress-area');
        this.progress_Bar = this.video_player.querySelector('.progress-bar');
        this.volume = this.video_player.querySelector('.volume');
        this.volume_range = this.video_player.querySelector('.volume_range');
        this.current = this.video_player.querySelector('.current');
        this.totalDuration = this.video_player.querySelector('.duration');
        this. auto_play = this.video_player.querySelector('.auto-play');
        this.settingsBtn = this.video_player.querySelector('.settingsBtn');
        this.fullscreen = this.video_player.querySelector('.fullscreen');
        this.settings = this.video_player.querySelector('#settings');
        this.playback = this.video_player.querySelectorAll('.playback li');
        this.listVideo = document.querySelectorAll('.video-list .vid');

        // déclarer les écouteurs sur les boutons
        this.definitEcouteurs();
    }

    definitEcouteurs() {
        console.log("ecouteurs définis")
        this.shadowRoot.querySelector(".play_pause").onclick = () => {
            const isVideoPaused = this.video_player.classList.contains('paused');
            isVideoPaused ? this.pauseVideo() : this.playVideo();
        }
        this.shadowRoot.querySelector(".fast-forward").onclick = () => {
            this.mainVideo.currentTime += 10;
        }
        this.shadowRoot.querySelector(".fast-rewind").onclick = () => {
            this.mainVideo.currentTime -= 10;
        }
        this.shadowRoot.querySelector(".fullscreen").onclick = () => {
            if (!this.video_player.classList.contains('openFullScreen')) {
                this.video_player.classList.add('openFullScreen');
                this.fullscreen.innerHTML = "fullscreen_exit";
                this.video_player.requestFullscreen();
            }else{
                this.video_player.classList.remove('openFullScreen');
                this.fullscreen.innerHTML = "fullscreen";
                document.exitFullscreen();
            }
        }
        //Afficher le durée de la video
        this.mainVideo.addEventListener("loadeddata",(e)=>{
            let videoDuration = e.target.duration;
            let totalMin = Math.floor(videoDuration / 60);
            let totalSec = Math.floor(videoDuration % 60);

            // Si les secondes sont inferieurs à 10 alors cela ajoute un 0 avant
            totalSec < 10 ? totalSec = "0"+totalSec : totalSec;
            this.totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
        })

        //Durée en direct de la video
        this.mainVideo.addEventListener('timeupdate',(e) => {
            let currentVideoTime = e.target.currentTime;
            let currentMin = Math.floor(currentVideoTime / 60);
            let currentSec = Math.floor(currentVideoTime % 60);

            // Si les secondes sont inferieurs à 10 alors cela ajoute un 0 avant
            currentSec < 10 ? currentSec = "0"+currentSec : currentSec;
            this.current.innerHTML = `${currentMin} : ${currentSec}`;

            let videoDuration = e.target.duration
            //Barre de progression
            let progressWidth = (currentVideoTime / videoDuration) * 100;
            this.progress_Bar.style.width = `${progressWidth}%`;
        })

        // Progression en direct de la barre de la vidéo
        this.progressArea.addEventListener('click',(e)=>{
            let videoDuration = this.mainVideo.duration;
            let progressWidthval = this.progressArea.clientWidth;
            let ClickOffsetX = e.offsetX;
            this.mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
        })

        //Slider volume
        this.volume_range.addEventListener('change',() =>{
            this.changeVolume();
        })

        //Mute volume
        this.volume.addEventListener('click',() =>{
            this.muteVolume();
        })

        //Affichage du compteur de la video sur la barre de progression
        this.progressArea.addEventListener('mousemove',(e)=>{
            let progressWidthval = this.progressArea.clientWidth;
            let x = e.offsetX;
            this.progressAreaTime.style.setProperty('--x',`${x}px`);
            this.progressAreaTime.style.display = "block";
            let videoDuration = this.mainVideo.duration;
            let progressTime = Math.floor((x/progressWidthval)*videoDuration);
            let currentMin = Math.floor(progressTime / 60);
            let currentSec = Math.floor(progressTime % 60);
            // if seconds are less then 10 then add 0 at the begning
            currentSec < 10 ? currentSec = "0"+currentSec : currentSec;
            this.progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;

        })

        this.progressArea.addEventListener('mouseleave',()=>{
            this.progressAreaTime.style.display = "none";
        })

        // Recommencer la video du debut activer/desactiver
        this.auto_play.addEventListener('click',()=>{
            this.auto_play.classList.toggle('active')
            if(this.auto_play.classList.contains('active')){
                this.auto_play.title = "Autoplay activé";
            }else{
                this.auto_play.title = "Autoplay desactivé";
            }
        });

        this.mainVideo.addEventListener("ended",()=>{
            if (this.auto_play.classList.contains('active')) {
                this.playVideo();
            }else{
                this.play_pause.innerHTML = "recommencer";
                this.play_pause.title = "Recommencer";
            }
        });

        //Picture in picture (Fonctionne que sur Chrome, Mozilla est en retard)
        this.shadowRoot.querySelector(".picture_in_picture").onclick = () => {
            this.mainVideo.requestPictureInPicture();
        }

        //Ouverture de la fenêtre de vitesse lecture
        this.settingsBtn.addEventListener('click', () =>{
            this.settings.classList.toggle('active');
            this.settingsBtn.classList.toggle('active');
        })

        //Vitesse de lecture
        this.playback.forEach((event) =>{
            event.addEventListener('click',()=>{
                this.removeActiveClasses();
                event.classList.add('active');
                let speed = event.getAttribute('data-speed');
                this.mainVideo.playbackRate = speed;
            })
        })

        //Cache l'affichage du menu lorsque la video est en marche. L'affiche en passant la souris sur la video
        this.video_player.addEventListener('mouseover',()=>{
            this.controls.classList.add('active');
        })

        this.video_player.addEventListener('mouseleave',()=>{
            if (this.video_player.classList.contains('paused')) {
                if (this.settingsBtn.classList.contains('active')) {
                    this.controls.classList.add('active');
                }else{
                    this.controls.classList.remove('active')
                }
            }else{
                this.controls.classList.add('active')
            }
        })

        //Playlist (fonctionne pas)
        this.listVideo.forEach(video => {
            video.onclick = () =>{
                this.listVideo.forEach(vid => vid.classList.remove('active'));
                video.classList.add('active');
                if(video.classList.contains('active')){
                    let src = video.children[0].getAttribute('src');
                    this.mainVideo.src = src;
                }
            }
        })

    }


    // API de mon composant
    playVideo() {
        this.play_pause.innerHTML = "pause";
        this.play_pause.title = "pause";
        this.video_player.classList.add('paused')
        this.mainVideo.play();
        //this.player.play();
    }

    pauseVideo() {
        //this.player.pause();
        this.play_pause.innerHTML = "play_arrow";
        this.play_pause.title = "play";
        this.video_player.classList.remove('paused')
        this.mainVideo.pause();
    }

    changeVolume() {
        this.mainVideo.volume = this.volume_range.value / 100;
        if (this.volume_range.value == 0) {
            this.volume.innerHTML = "volume_off";
        }else if(this.volume_range.value < 40){
            this.volume.innerHTML = "volume_down";
        }else{
            this.volume.innerHTML = "volume_up";
        }
    }

    muteVolume() {
        if (this.volume_range.value == 0) {
            this.volume_range.value = 80;
            this.mainVideo.volume = 0.8;
            this.volume.innerHTML = "volume_up";
        }else{
            this.volume_range.value = 0;
            this.mainVideo.volume = 0;
            this.volume.innerHTML = "volume_off";
        }
    }

    removeActiveClasses(){
        this.playback.forEach(event => {
            event.classList.remove('active');
        });
    }


}

customElements.define("my-player", MyVideoPlayer);
