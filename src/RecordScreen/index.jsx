import React, { useState } from 'react';
export const RecordScreen = () => {


    // create ref for steam
    const stream = React.useRef(null);

    const [capturedVideo, setCapturedVideo] = useState(null);
    const [recordingStarted, setRecordingStarted] = useState(false);

    async function startRecording() {
        stream.current = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });
        const recorder = new MediaRecorder(stream.current);

        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: chunks[0].type });
            setCapturedVideo(URL.createObjectURL(completeBlob));
        };

        recorder.start();
    }

    return <div>

        <button onClick={startRecording}>Start Recording</button>

        {capturedVideo && (
            <a href={capturedVideo} download="recorded-video.webm" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4">Download</a>
        )}

    </div>;
}