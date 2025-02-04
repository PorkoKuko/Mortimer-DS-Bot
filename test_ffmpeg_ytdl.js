/*import ytdl from 'discord-ytdl-core';
import { spawn } from 'child_process';

const ffmpegPath = 'A:\\ffmpeg\\ffmpeg-7.0.1-essentials_build\\bin\\ffmpeg.exe'; // Update this to the full path of ffmpeg.exe

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with a valid YouTube URL

console.log(`Using FFmpeg path: ${ffmpegPath}`);

try {
    const stream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
        ffmpegPath: ffmpegPath
    });

    stream.on('info', info => {
        console.log(`Stream info: ${info.videoDetails.title}`);
    });

    stream.on('error', error => {
        console.error(`Stream Error: ${error.message}`);
    });

    const ffmpeg = spawn(ffmpegPath, ['-i', 'pipe:0', '-f', 'null', '-'], { stdio: ['pipe', 'pipe', 'pipe'] });

    stream.pipe(ffmpeg.stdin);

    ffmpeg.stdout.on('data', (data) => {
        console.log(`FFmpeg stdout: ${data}`);
    });

    ffmpeg.stderr.on('data', (data) => {
        console.error(`FFmpeg stderr: ${data}`);
    });

    ffmpeg.on('close', (code) => {
        console.log(`FFmpeg process closed with code: ${code}`);
    });

} catch (error) {
    console.error(`Error: ${error.message}`);
}*/
