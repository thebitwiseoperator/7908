var videoControlDefaults = {
    //This array contains all of the stops of the video. 
    video_stops: [],
    //This function plays the video and takes the user to the quiz when it's done. 
    play: function () {
        document.getElementById("video-blocker").style.pointerEvents = 'none';
        //Find the div with a class of .video-background. Apply Popcorn magic. 
        var theVideo = Popcorn(".video-background");
        //On the first stop, pause the video. 
        theVideo.cue(videoControl.video_stops[videoControl.stopIndex], function () {
            document.getElementById("video-blocker").style.pointerEvents = 'all';
            theVideo.pause();
            if ((videoControlDefaults.video_stops.length - 1) < videoControl.stopIndex) {
                theVideo.pause();
                $(".video-background").click(function () {
                    GSI.switchPage('quiz');
                });
            }
        });
        theVideo.play();
        videoControl.stopIndex++
    },
    //This function will mute/unmute the audio. 
    toggleMute: function () {
        if ($(".video-background").length) {
            var theVideo = Popcorn(".video-background");
            //If the video is not muted, mute it. Otherwise, unmute the video. 
            theVideo.mute(!theVideo.media.muted);
        }
        var bool = $("audio").prop("muted");
        $("audio").prop("muted", !bool);
        $(".volume-button").toggleClass('volume-button-muted');
    },
    //This function will toggle the visibility of the closed captioning. 
    toggleClosedCaptioning: function () {
        $(".videosub-bar").toggle();
    },
    //Retrive the stops from the JSON video file. Consult the documentation. 
    loadJSON: function () {
        $.getJSON('json/video/' + videoControl.videoName + '.json', function (data) {
            for (var i = 0; i < data.video_stops.length; i++) {
                //Push each element from the JSON stops into the stops array. 
                videoControl.video_stops.push(data.video_stops[i]);
            }
            //When the retrieval is done, play the video. 
            videoControl.play();
        });
    },
    //This function takes the parameter of name. We use the name to associate the correct JSON file. 
    theNameOfThisVideoIs: function (name) {
        videoControl.videoName = name;
        //Set the stops length to zero so each movie (at different pages) starts at the beginning. 
        videoControl.video_stops.length = 0;
        //Start the process of loading the JSON file. 
        videoControl.loadJSON();
    }
};
/***** -- This is the 'options' version of the GSIDefaults object. You may modify this. -- ******/
var videoControlOptions = {
    //Changes the background images of the CC button. 
    switchCCImage: function () {
        $(".closed-captions-button-off").toggleClass('closed-captions-button-on');
    },
    stopIndex: 0,
    //Assign this method to an element when you want to go to a specific part of the video. 
    goToMarker: function (markerIndex) {
        var popcorn = Popcorn('.video-background');
        videoControl.testMarker(markerIndex);
        popcorn.currentTime(markerIndex);
        videoControl.play();
    },
    //Pass the marker into the function, reset the stop index, loop through the stops array, increment the 
    //stop index until the time of the next index is higher than the time of the marker. 
    testMarker: function (marker) {
        videoControl.stopIndex = 0;
        for (var i = 0; i < videoControl.video_stops.length; i++) {
            if (marker > videoControl.video_stops[videoControl.stopIndex]) {
                ++videoControl.stopIndex;
            }
        }
    }
};
/*This creates the videoControl object and combines videoControlDefaults and videoControlOptions. 
It does not modify videoControlDefaults.*/
var videoControl = $.extend({}, videoControlOptions, videoControlDefaults);