(function () {
  // audio

  /*
    store all songs information
    load every song and place into an audio array
    play the song on load / when a song is finished play the next one in the list
  */

  var playAndPauseButton = document.querySelector(".track__play");
  
  var songs = [
    {
      "artist": 'shrek',
      "title": "smash mouth",
      "image": "image/shrek.jpeg",
      "audio": "music/smash-mouth.mp3"
    },
    {
      "artist": 'shrek',
      "title": "smash mouth",
      "image": "image/shrek.jpeg",
      "audio": "music/smash-mouth.mp3"
    }
  ];
  
  var allAudio = [];
  var activeTrack = 0;

  songs.forEach(function (current) {
    var newAudio = new Audio();

    newAudio.src = current.audio;
    newAudio.load();

    newAudio.addEventListener('ended', function () {

      console.log(activeTrack, songs.length-1)
      if (activeTrack < songs.length-1) {
        activeTrack++;
      } else {
        activeTrack = 0;
      }

      document.querySelector(".track__img").src = songs[activeTrack].image;
      document.querySelector(".track__title").textContent = songs[activeTrack].title;
      document.querySelectorAll(".track__p")[1].textContent = songs[activeTrack].artist;
    });

    allAudio.push(newAudio);

    // set the animation for the text on load
    window.setTimeout(function () {
      document.querySelector(".text-wrapper").classList.remove("fade");
      document.querySelector(".content").classList.remove("fade");
      document.querySelector(".move__p").classList.add("move__p--animate");
      document.querySelector(".move__title").classList.add("move__title--animate");
      document.querySelector(".move__desc").classList.add("move__desc--animate")
    }, 2000);

  });

	playAndPauseButton.addEventListener("click", function () {

    if (allAudio[activeTrack].paused) {
      playAndPauseButton.textContent = '| |'
			allAudio[activeTrack].play();
		} else {
      playAndPauseButton.textContent = '>'
      allAudio[activeTrack].pause();
		}
  });

  // the text animation using tilt js

  document.querySelector(".content").addEventListener("tiltChange", function (event) { 
    document.querySelector(".content").style.transform = 'perspective(0) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    document.querySelector(".move").style.transform = 'perspective(0) rotateX(' + event.detail.tiltY + 'deg) rotateY(' + event.detail.tiltX + 'deg) scale3d(1, 1, 1)';
  });


})();

