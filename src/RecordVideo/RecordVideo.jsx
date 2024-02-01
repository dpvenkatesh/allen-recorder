import React, { useEffect, useRef } from 'react';

// create a react component called RecordVideo to get media stream from the user's camera
export const RecordVideo = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const startRecording = async () => {

        // check if the browser supports MediaRecorder
        if (!navigator.mediaDevices?.getUserMedia) {
            console.log('getUserMedia() not supported.');
            return;
        }

        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play();
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }

    };
    const stopRecording = () => {
        console.log('Stop Recording');
       
        // videoRef.current = video.srcObject;
        const tracks = streamRef.current.getTracks();
      
        tracks.forEach(function(track) {
          track.stop();
        });
      
        videoRef.current.srcObject = null;
      };

    const pauseRecording = () => {
        console.log('Pause Recording');
        // Add your pause recording logic here
    };

    const resumeRecording = () => {
        console.log('Resume Recording');
        // Add your resume recording logic here
    };


    useEffect(() => {
        startRecording();
        
    }, [])

    return (
        <div className="flex flex-col h-screen justify-between">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted></video>
            <div className="flex justify-center pb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startRecording}>Start</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={stopRecording}>Stop</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={pauseRecording}>Pause</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={resumeRecording}>Resume</button>
            </div>
        </div>
    );


    // create a video element to display the video stream
    // create a canvas element to display the video stream
    // create a download button to download the video
    // create a download button to download the canvas

}

