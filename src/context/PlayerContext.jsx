import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () =>{
        audioRef.current.play();
        setPlayerStatus(true)
    }

    const pause = () =>{
        audioRef.current.pause();
        setPlayerStatus(false);
    }

    const playWithId = async(id) =>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayerStatus(true)
    }

    const previous = async () =>{
        if(track.id>0){
            await setTrack(songsData[track.id -1])
            await audioRef.current.play()
            setPlayerStatus(true)
        }
    }
    const next = async () =>{
        if(track.id<songsData.length-1){
            await setTrack(songsData[track.id +1])
            await audioRef.current.play()
            setPlayerStatus(true)
        }
    }

    const seekSong = async (e) =>{
       audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)


    }

    useEffect(() => {
        const audio = audioRef.current;
        const seekBarElem = seekBar.current;
    
        if (!audio || !seekBarElem) return;
    
        const updateTime = () => {
            if (!audio.duration) return; 
    
            seekBarElem.style.width = (Math.floor(audio.currentTime / audio.duration * 100)) + '%';
            setTime({
                currentTime: {
                    second: Math.floor(audio.currentTime % 60),
                    minute: Math.floor(audio.currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(audio.duration % 60),
                    minute: Math.floor(audio.duration / 60)
                }
            });
        };
    
        audio.ontimeupdate = updateTime;
    
        return () => {
            audio.ontimeupdate = null;  
        };
    }, [audioRef, seekBar]);
    
    

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayerStatus,
        time, setTime,
        play,pause,
        playWithId,
        previous,next,seekSong


    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider