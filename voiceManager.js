import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';
import ytdl from '@distube/ytdl-core';

import pkg from 'libsodium-wrappers';
const { sodium } = pkg;

import { config } from 'dotenv';

config(); // Load .env file

await pkg.ready;
console.log('Sodium is ready!');

const connections = new Map();
const inactivityTimeouts = new Map(); // Store timeouts for each guild

export async function joinChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('Me he unido a un canal de voz!');
    });

    connections.set(channel.guild.id, connection);
    resetInactivityTimer(channel.guild.id); // Start the inactivity timer when joining

    return connection;
}

export function leaveChannel(guildId) {
    const connection = connections.get(guildId);
    if (connection) {
        connection.destroy();
        connections.delete(guildId);
        clearTimeout(inactivityTimeouts.get(guildId)); // Clear the inactivity timer
        inactivityTimeouts.delete(guildId);
        console.log('Desconectado de un canal de voz!');
    }
}

export async function playYouTube(connection, url) {
    const player = createAudioPlayer();
    const apiKey = process.env.YOUTUBE_API_KEY; // Read API key from environment variables

    console.log(`Attempting to play URL: ${url}`); // Debugging log

    try {
        const stream = ytdl(url, {
            filter: 'audioonly',
            opusEncoded: true,
            requestOptions: {
                headers: {
                    'x-youtube-api-key': apiKey,
                },
            },
            highWaterMark: 1 << 25,
            encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
        });

        stream.on('info', info => {
            console.log(`Streaming: ${info.videoDetails.title}`);
            const videoDuration = info.videoDetails.lengthSeconds; // Get video duration in seconds
            const channel = connection.channel; // Get the channel from the connection
            resetInactivityTimer(connection.guildId, videoDuration + 180); // Set inactivity timer to video duration + 3 minutes
            
            // Check if channel is defined before sending the message
            if (channel) {
                channel.send(`La duración del video es: ${videoDuration} segundos.`); // Send video duration to channel
            } else {
                console.error('Channel is undefined. Cannot send video duration message.');
            }
        });

        stream.on('error', error => {
            console.error(`Stream Error: ${error.message}`);
            if (error.message.includes('403')) {
                console.error('Detected 403 error, the video might be restricted.');
            }
        });

        const resource = createAudioResource(stream, { inputType: ytdl.arbitraryInputType });

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('Reproductor activo!');
            resetInactivityTimer(connection.guildId); // Reset the inactivity timer when music is played
        });

        player.on(AudioPlayerStatus.Idle, () => {
            console.log('Reproductor pausado!');
        });

        player.on('error', error => {
            console.error(`Audio Player Error: ${error.message}`);
            if (error.message.includes('403')) {
                console.error('Detected 403 error, the video might be restricted.');
            }
        });

    } catch (error) {
        console.error(`playYouTube Error: ${error.message}`);
    }
}

function resetInactivityTimer(guildId, duration = 3 * 60 * 1000) { // Default to 3 minutes
    clearTimeout(inactivityTimeouts.get(guildId)); // Clear existing timer
    inactivityTimeouts.set(guildId, setTimeout(() => {
        //leaveChannel(guildId); // Leave the channel after the specified duration
    }, duration)); // Use the specified duration
}
