import React, { useEffect, useRef, useState } from 'react';

// create a react component called RecordVideo to get media stream from the user's camera
export const RecordVideo = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturedVideo, setCapturedVideo] = useState(null);
    const [recordingStarted, setRecordingStarted] = useState(false);
    const [paused, setPaused] = useState(false);

    //store permision to access camera
    const [permission, setPermission] = useState("REQUEST_ACCESS");


    // start previewing the video stream from the user's camera
    const startPreview = async () => {
        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            videoRef.current.srcObject = streamRef.current;
            setPermission("GRANTED");
        } catch (err) {
            setPermission("DENIED");
            console.error('Error accessing media devices.', err);
        }
    };

    const startRecording = async () => {
        try {

            setRecordingStarted(true);
            setCapturedVideo(null);

            mediaRecorderRef.current = new MediaRecorder(streamRef.current);
            mediaRecorderRef.current.start();

            const recordedChunks = [];
            mediaRecorderRef.current.addEventListener('dataavailable', function (e) {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            });

            mediaRecorderRef.current.addEventListener('timeupdate', function () {
                console.log('timeupdate', mediaRecorderRef.current.currentTime);
            });

            mediaRecorderRef.current.addEventListener('stop', function () {
                const blob = new Blob(recordedChunks, {
                    type: 'video/webm',
                });
                setCapturedVideo(URL.createObjectURL(blob));
            });

        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    const stopRecording = () => {
        console.log('Stop Recording');

        // videoRef.current = video.srcObject;
        const tracks = streamRef.current.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        videoRef.current.srcObject = null;
        setRecordingStarted(false);
        startPreview();
    };

    const pauseRecording = () => {
        console.log('Pause Recording');
        mediaRecorderRef.current.pause();
        setPaused(true);
    };

    const resumeRecording = () => {
        console.log('Resume Recording');
        mediaRecorderRef.current.resume();
        setPaused(false);
    };



    useEffect(() => {
        startPreview();
    }, [])


    if (permission === "REQUEST_ACCESS") {
        return (
            <div className="flex flex-col h-screen justify-between">
                <div className="flex justify-center pb-4">
                    Provide access to camera and microphone
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen justify-between">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted></video>
            {permission === "DENIED" ? (
                <div className="flex justify-center pb-4">
                    <p className="text-red-500">Camera access denied</p>
                </div>
            ) :
                (<div className="fixed bottom-0 left-0 right-0 flex justify-center p-4">
                    {recordingStarted ?
                        <>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={stopRecording}>Stop</button>
                            {!paused && <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={pauseRecording}>Pause</button>}
                        </> :
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startRecording}>Record</button>}


                    {paused && (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={resumeRecording}>Resume</button>
                    )}
                    {capturedVideo && (
                        <a href={capturedVideo} download="recorded-video.webm" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4">Download</a>
                    )}
                </div>)
            }

        </div>
    );


    // create a video element to display the video stream
    // create a canvas element to display the video stream
    // create a download button to download the video
    // create a download button to download the canvas

}

