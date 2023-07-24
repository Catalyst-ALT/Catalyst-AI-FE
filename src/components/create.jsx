import { useState } from 'react';
import PomodoroTimer from "../components/create/pomodoro";
import Stopwatch from "../components/create/stopwatch";
import Metronome from "../components/create/metronome";
import Audio from "../components/create/audio";
import Notebook from "../components/create/notebook";
import Dictionary from "../components/create/dictionary";


const Create = ( {postId, output} ) => {

  const [activeComponent, setActiveComponent] = useState("")
  const components = {
    Audio: <Audio />,
    Metronome: <Metronome />,
    Stopwatch: <Stopwatch />,
    PomodoroTimer: <PomodoroTimer />,
    Notebook: <Notebook />,
    Dictionary: <Dictionary />,
  };

  return (
      <div>   
      <div>
        <p>A.I. Prompt: {output}</p>
        <br></br>
        <br></br>
        <button className="button-25" onClick={() => setActiveComponent("Stopwatch")}>Stopwatch</button>
        <button className="button-25" onClick={() => setActiveComponent("Audio")}>Audio Play</button>
        <button className="button-25" onClick={() => setActiveComponent("Metronome")}>Metronome</button>
        <button className="button-25" onClick={() => setActiveComponent("PomodoroTimer")}>Pomodoro Timer</button>
        <button className="button-25" onClick={() => setActiveComponent("Notebook")}>Notebook</button>
        <button className="button-25" onClick={() => setActiveComponent("Dictionary")}>Dictionary</button>
      </div>
      <div className="create-display">
      {components[activeComponent]}
    </div>
    </div>
  );
};
export default Create;
