var k=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var w=(n,r,e)=>r in n?k(n,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[r]=e,E=(n,r)=>{for(var e in r||(r={}))S.call(r,e)&&w(n,e,r[e]);if(_)for(var e of _(r))T.call(r,e)&&w(n,e,r[e]);return n};var i=(n,r,e,t)=>{for(var a=t>1?void 0:t?x(r,e):r,o=n.length-1,c;o>=0;o--)(c=n[o])&&(a=(t?c(r,e,a):c(a))||a);return t&&a&&k(r,e,a),a};var d=class{constructor(){this._baseUrl="mave.io"}static getInstance(){return d._inst||(d._inst=new d),d._inst}get baseUrl(){return this._baseUrl}set baseUrl(r){this._baseUrl=r}};import{html as v,LitElement as V}from"lit";import{property as l,query as p,state as b}from"lit/decorators.js";import{css as L}from"lit";var $=L`
  dialog {
    position: relative;
    display: flex;
    float: left;
    align-items: center;
    border-width: 0;
    width: 100%;
    height: 100%;
    max-width: 100vw !important;
    max-height: 100vh !important;
    padding: 0;
    margin: 0;
    background: transparent;
  }

  dialog::backdrop {
    background: black;
  }

  dialog[open] {
    -webkit-animation: show 250ms ease-out normal;
  }

  @-webkit-keyframes show {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 100;
      transform: scale(1);
    }
  }

  canvas,
  .poster {
    transform: scale(1.01);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .active_upload {
    width: calc(100vw - 14rem);
    height: 100vh;
  }

  .active_upload::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  .active_overlay {
    position: fixed;
    background: black;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .active_overlay video {
    object-fit: contain;
  }

  iframe {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 20;
    transition-property: all;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  video {
    transform: scale(1.01);
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    object-fit: cover;
  }

  video::cue {
    color: white;
    opacity: 1;
    background-color: rgba(0, 0, 0, 1) !important;
    /* background-image: linear-gradient(to bottom, black, black); */
  }

  video::-webkit-media-text-track-container {
    opacity: 1;
    top: -3rem;
    overflow: visible !important;
  }

  video::-webkit-media-text-track-background {
    display: none !important;
  }

  video::-webkit-media-text-track-display {
    display: inline-block !important;
    /* border: 1px solid red; */
    overflow: visible !important;
  }

  video::-webkit-media-text-track-display-backdrop {
    background: transparent !important;
  }
`;import{decode as I}from"@fpapado/blurhash";import{html as A,css as F,LitElement as U}from"lit";import{property as z,query as H,state as f}from"lit/decorators.js";var h=class extends U{constructor(){super(...arguments);this._ghostActive=!0;this._loaded=!0;this._delayed=!1}connectedCallback(){var e;super.connectedCallback(),setTimeout(()=>{this._delayed=!0},250),this._globalStyle=document.documentElement.getAttribute("style")||"",document.documentElement.setAttribute("style",`${this._globalStyle}; padding-right: 14rem; transition: padding 150ms; transition-timing-function: cubic-bezier(0, 0, 0.2, 1);`),window.addEventListener("resize",this.appHeight),window.addEventListener("focus",this.appHeight),this.appHeight(),setTimeout(()=>{this._ghostActive=!0,this.dialog.showModal()},0),(e=this.iframe)==null||e.addEventListener("load",this.iframeLoaded.bind(this))}appHeight(){document.documentElement.style.setProperty("--app-height",`${window.innerHeight}px`)}disconnectedCallback(){var e;document.documentElement.setAttribute("style",this._globalStyle||""),(e=this.iframe)==null||e.removeEventListener("load",this.iframeLoaded.bind(this)),this.dialog.close(),window.removeEventListener("resize",this.appHeight),window.removeEventListener("focus",this.appHeight),super.disconnectedCallback()}dialogHandler(e){e.type=="close"&&window.postMessage({message:"mave:close_settings",hash:this.embed},"*"),e.target==this.dialog&&this.dialog.close()}render(){return A`
      <dialog
        id="dialog"
        @close=${this.dialogHandler}
        @click=${this.dialogHandler}
      >
        <div class=${this._ghostActive?"ghost active":"ghost"}></div>
        <div class="settings">
          <iframe
            src="https://${d.getInstance().baseUrl}/e/${this.embed}/settings"
            frameborder="0"
            sandbox="allow-scripts allow-forms allow-same-origin"
            allow="autoplay; fullscreen; clipboard-write;"
            width="100%"
            height="100%"
            class=${this._loaded&&this._delayed?"loaded":"initial"}
          ></iframe>
        </div>
      </dialog>
    `}iframeLoaded(){this._loaded=!0}};h.styles=F`
    dialog {
      position: relative;
      display: flex;
      float: right;
      align-items: center;
      border-width: 0;
      background: transparent;
    }

    dialog::backdrop {
      background: none;
    }

    .ghost {
      background-color: #1c1917;
      width: 14rem;
      height: 100vh;
      position: fixed;
      margin-right: -14rem;
      top: 0;
      right: 0;
      z-index: 10000;
      transition: margin 150ms;
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }

    .ghost.active {
      margin-right: 0;
    }

    .settings {
      width: 14rem;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10000;
      height: var(--app-height);
      min-height: -webkit-fill-available;
    }

    .initial {
      opacity: 0;
      transform: scale(0.95);
      transition: opacity, transform 150ms;
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }

    .loaded {
      opacity: 1;
      transform: scale(1);
      transition: opacity, transform 150ms;
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  `,i([z({type:String})],h.prototype,"embed",2),i([H("#dialog")],h.prototype,"dialog",2),i([H("#iframe")],h.prototype,"iframe",2),i([f()],h.prototype,"_ghostActive",2),i([f()],h.prototype,"_loaded",2),i([f()],h.prototype,"_delayed",2);customElements.get("mave-settings")||customElements.define("mave-settings",h);var P=crypto.getRandomValues(new Uint8Array(21)).reduce((n,r)=>n+=(r&=63)<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r<63?"_":"-",""),s=class extends V{constructor(){super(...arguments);this._settingsActive=!1;this._blurhashShouldBeVisible=!0;this._overlayActive=!1;this._uploadActive=!1;this._hlsLoaded=!1;this._iframeReady=!1;this._initialPlayEventTriggered=!1;this.baseUrl=d.getInstance().baseUrl;this.canPlay=!1;this.loadeddata=!1}connectedCallback(){var e;super.connectedCallback(),window.addEventListener("message",this.messageHandler.bind(this)),window.addEventListener("load",this.visibilityHandler.bind(this)),window.addEventListener("scroll",this.visibilityHandler.bind(this)),window.addEventListener("resize",this.visibilityHandler.bind(this)),((e=this.video)==null?void 0:e.canPlayType("application/vnd.apple.mpegurl"))&&!this._hlsLoaded&&this.scriptHandler()}disconnectedCallback(){window.removeEventListener("message",this.messageHandler.bind(this)),window.removeEventListener("load",this.visibilityHandler.bind(this)),window.removeEventListener("scroll",this.visibilityHandler.bind(this)),window.removeEventListener("resize",this.visibilityHandler.bind(this));let e=document.querySelector("mave-settings");e&&e.remove(),super.disconnectedCallback()}initializeVideo(){if(!this.loadeddata&&this.video&&this.video.readyState>=2&&(setTimeout(()=>{this.blurhash&&(this._blurhashShouldBeVisible=!1)},1250),this.loadeddata=!0),!this.canPlay){let e=()=>{this._iframeReady||(this.sendMessage("mave:video_canplay"),setTimeout(e.bind(this),25),this.canPlay=!0)};e()}}videoHandler(e){if(!!this.video)switch(e.type){case"loadeddata":case"canplay":this.initializeVideo();break;case"progress":(!this.canPlay||!this.loadeddata)&&this.initializeVideo();try{let t=this.video.buffered.length-1,a=Math.round(this.video.buffered.end(t)/this.video.duration*100);this.sendMessage("mave:video_progress",{buffer:a})}catch{}break;case"play":if(this._iframeReady){this.timeUpdate();let t=this.autoplay&&!this._initialPlayEventTriggered||this.video.currentTime<1e-4?0:this.video.currentTime;this.sendMessage("mave:video_play",{currentTime:t,bitrate:this._bitrate}),this._initialPlayEventTriggered=!0}break;case"timeupdate":this.sendMessage("mave:video_timeupdate",{currentTime:this.video.currentTime});break;case"pause":case"ended":this.sendMessage("mave:video_timeupdate",{currentTime:this.video.currentTime}),this._animationFrame&&(cancelAnimationFrame(this._animationFrame),this._animationFrame=void 0),setTimeout(()=>{this.sendMessage(e.type=="ended"?"mave:video_ended":"mave:video_pause")},25);break}}messageHandler(e){var o;let{data:t}=e,{message:a}=t;if(!(!this.isConnected||!t||t.hash!=this.embed))switch(a){case"mave:player_ready":if(this._iframeReady=!0,!this._initialPlayEventTriggered&&this.video&&!this.video.paused){let m=this.autoplay?0:this.video.currentTime;this.sendMessage("mave:video_play",{currentTime:m,bitrate:this._bitrate}),this._initialPlayEventTriggered=!0}break;case"mave:player_event":if(!this.video)return;let c=t.event;switch(Object.keys(c)[0]){case"play":c.play?this.video.play():this.video.pause();break;case"muted":this.video.muted=c.muted;break;case"volume":this.video.volume=c.volume;break;case"currentTime":this.video.currentTime=c.currentTime;break}break;case"mave:open_popup_overlay":this._overlayActive=!0,this._blurhashShouldBeVisible&&(this._blurhashShouldBeVisible=!1),this.dialog.showModal(),this._globalStyle=document.documentElement.getAttribute("style")||"",document.documentElement.setAttribute("style",`${this._globalStyle}; overflow: hidden;`);break;case"mave:close_popup_overlay":this.dialog.close(),this._overlayActive=!1,document.documentElement.setAttribute("style",this._globalStyle||"");break;case"mave:open_dialog":this.dialog.showModal(),this._uploadActive=!0;break;case"mave:close_dialog":this.dialog.close(),this._uploadActive=!1;break;case"mave:toggle_fullscreen":document.fullscreenElement?this.closeFullscreen():this.openFullscreen();break;case"mave:open_fullscreen":this.openFullscreen();break;case"mave:close_fullscreen":this.closeFullscreen();break;case"mave:open_settings":if(this._settingsActive=!this._settingsActive,this._settingsActive){let m=document.createElement("mave-settings");m.setAttribute("embed",this.embed),document.body.appendChild(m)}else{let m=document.querySelector("mave-settings");m&&m.remove()}break;case"mave:close_settings":this._settingsActive=!1;let y=document.querySelector("mave-settings");y&&y.remove();break;case"mave:update_embed_settings":this.aspectRatio=t.aspect_ratio_enabled?t.aspect_ratio:void 0,this.width=t.aspect_ratio_enabled?void 0:t.width,this.height=t.aspect_ratio_enabled?void 0:t.height,this.loop=t.loop,this.autoplay=t.autoplay_enabled,this.autoplay&&((o=this.video)==null?void 0:o.paused)&&this.video.currentTime<this.video.duration&&this.video.play(),this.visibilityHandler();break;case"mave:request_in_viewport":setTimeout(()=>{this.visibilityHandler()},20);break;case"mave:render_video":this._hlsLoaded=!1,this._blurhashShouldBeVisible=!1,this.loadeddata=!1,this.canPlay=!1,this.src!=t.video_src&&(this.src=t.video_src),this.autoplay!=t.autoplay&&(this.autoplay=t.autoplay),this.blurhash!=t.blurhash&&(this.blurhash=t.blurhash),this.posterImage!=t.poster_image&&(this.posterImage=t.poster_image),this.posterVideoSource!=t.poster_video_source&&(this.posterVideoSource=t.poster_video_source);break}}generateStyle(){let e=document.createElement("style");if(this._overlayActive&&(e.textContent=":host { overflow: hidden; width: 100%; height: 100%; }"),this.width&&this.height)e.textContent=`:host { display: block; overflow: hidden; width: ${this.width}; height: ${this.height}; min-width: 320px; min-height: 180px; }`;else if(this.aspectRatio){let[t,a]=this.aspectRatio.split(":");e.textContent=`:host { display: block; overflow: hidden; aspect-ratio: ${t} / ${a}; width: 100%; min-width: 320px; min-height: 180px; }`}else e.textContent=":host { display: block; overflow: hidden; aspect-ratio: 16 / 9; width: 100%; min-width: 320px; min-height: 180px; }";return e}closeDialog(){this._overlayActive=!1,this._uploadActive=!1,this.sendMessage("mave:closing_overlay")}clickDialog(e){this._uploadActive&&e.target==this.dialog&&(this.closeDialog(),this.sendMessage("mave:cancel_upload"))}poster(){var e;return this.posterImage?this.posterImage:`${(e=this.src)==null?void 0:e.replace("stream","image")}/thumbnail.jpg?time=0`}render(){return v`
      ${this.generateStyle()}
      <dialog
        id="dialog"
        @click=${this.clickDialog}
        @close=${this.closeDialog}
        class=${this._overlayActive?"active_overlay":this._uploadActive?"active_upload":""}
      >
        ${this.renderCanvas()}
        ${this.src?v`
              ${this.initiateScript()}
              ${this._blurhashShouldBeVisible?v`
                    <img
                      class="poster"
                      .src=${this.poster()}
                      style="filter: contrast(1.05); filter: brightness(1.1);"
                    />
                  `:""}

              <video
                id="video"
                playsinline
                @canplay=${this.videoHandler}
                @play=${this.videoHandler}
                @pause=${this.videoHandler}
                @ended=${this.videoHandler}
                @progress=${this.videoHandler}
                @loadeddata=${this.videoHandler}
                @timeupdate=${this.videoHandler}
                .muted=${this.muted}
                .autoplay=${this.autoplay}
                .loop=${this.loop}
                .src=${this.src}
                .poster=${this.poster()}
              ></video>
            `:""}
        ${this.embed?v`
              <iframe
                title="embed"
                id="iframe"
                src="${this.generateUrl()}"
                sandbox="allow-scripts allow-forms allow-same-origin"
                allow="autoplay; fullscreen; clipboard-write;"
                frameborder="0"
                scrolling="no"
              >
              </iframe>
            `:""}
      </dialog>
    `}generateUrl(){return this.jwt?`https://${this.baseUrl}/e/${this.embed}?reference_id=${this.jwt}`:this.reference_id&&this.display_name?`https://${this.baseUrl}/e/${this.embed}?reference_id=${this.reference_id}&display_name=${this.display_name}`:this.reference_id?`https://${this.baseUrl}/e/${this.embed}?reference_id=${this.reference_id}`:this.display_name?`https://${this.baseUrl}/e/${this.embed}?display_name=${this.display_name}`:`https://${this.baseUrl}/e/${this.embed}?reference_id=${P}`}sendMessage(e,t={}){if(!this.iframe.contentWindow||!this.video)return;let a=E({message:e},t);this.iframe.contentWindow.postMessage(a,"*")}openFullscreen(){document.fullscreenElement||(this.requestFullscreen?this.requestFullscreen():this.video.webkitEnterFullScreen(),this.sendMessage("mave:video_fullscreen",{fullscreen:!0}))}closeFullscreen(){document.fullscreenElement&&(document.exitFullscreen(),this.sendMessage("mave:video_fullscreen",{fullscreen:!1}))}renderCanvas(){if(!this.blurhash||!this._blurhashShouldBeVisible)return;let e=document.createElement("canvas"),t=I(this.blurhash,320,180),a=e.getContext("2d"),o=a==null?void 0:a.createImageData(320,180);return o==null||o.data.set(t),o&&(a==null||a.putImageData(o,0,0)),e}timeUpdate(){this._animationFrame=requestAnimationFrame(()=>{!this.video||(this.sendMessage("mave:video_timeupdate",{currentTime:this.video.currentTime}),this.timeUpdate())})}initiateScript(){let e=document.createElement("script");return e.onload=this.scriptHandler.bind(this),e.src="https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.1.5/hls.min.js",e}scriptHandler(){if(!(!this.video||!this.src||this._hlsLoaded)){if(this.video.canPlayType("application/vnd.apple.mpegurl"))this.video.src=this.src;else if(Hls.isSupported()){let e=new Hls;e.loadSource(this.src),e.attachMedia(this.video);let t=[];e.on(Hls.Events.MANIFEST_LOADED,(a,o)=>{t=o.levels.reverse()}),e.on(Hls.Events.LEVEL_LOADED,(a,o)=>{this._bitrate!=t[o.level].bitrate&&(this._bitrate=t[o.level].bitrate,this.sendMessage("mave:bitrate",{bitrate:this._bitrate}))}),e.subtitleTrack=0,e.subtitleDisplay=!0}this._hlsLoaded=!0}}visibilityHandler(){if(!this.iframe||!this.iframe.contentWindow)return;let{top:e,bottom:t}=this.iframe.getBoundingClientRect(),a=window.innerHeight||document.documentElement.clientHeight,o=(e>0||t>0)&&e<a;this.sendMessage(o?"mave:video_in_viewport":"mave:video_out_viewport")}};s.styles=$,i([l({type:String})],s.prototype,"embed",2),i([l({type:String})],s.prototype,"reference_id",2),i([l({type:String})],s.prototype,"display_name",2),i([l({type:String})],s.prototype,"jwt",2),i([l({type:String})],s.prototype,"classname",2),i([l({type:Boolean})],s.prototype,"muted",2),i([l({type:Boolean})],s.prototype,"autoplay",2),i([l({type:Boolean})],s.prototype,"loop",2),i([l({type:String})],s.prototype,"src",2),i([l({type:String})],s.prototype,"blurhash",2),i([l({type:String,attribute:"aspect-ratio"})],s.prototype,"aspectRatio",2),i([l({type:String})],s.prototype,"width",2),i([l({type:String})],s.prototype,"height",2),i([l({type:String,attribute:"poster-image"})],s.prototype,"posterImage",2),i([l({type:String,attribute:"poster-video-source"})],s.prototype,"posterVideoSource",2),i([p("#dialog")],s.prototype,"dialog",2),i([p("#iframe")],s.prototype,"iframe",2),i([p("#video")],s.prototype,"video",2),i([p("#canvas")],s.prototype,"canvas",2),i([p("#script")],s.prototype,"script",2),i([b()],s.prototype,"_settingsActive",2),i([b()],s.prototype,"_blurhashShouldBeVisible",2),i([b()],s.prototype,"_overlayActive",2),i([b()],s.prototype,"_uploadActive",2);customElements.get("mave-component")||customElements.define("mave-component",s);export{d as Config,s as MaveComponent};
