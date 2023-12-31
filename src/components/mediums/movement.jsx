import { useState } from "react";
import axios from "axios";
import data from "/prompt.json";
import MovementPrompt from "../promptresponse/movementprompt.jsx";
import {useNavigate} from 'react-router-dom';
import ParameterComponent from "../parameters/ParameterComponent.jsx";
import MediumNav from "../parameters/MediumNav.jsx"; 
import LoadingRobot from "./../robot.jsx"; 

const Movement = ({ setOutput, output, setMovementGenerativeSpace }) => {
    const [movementSomatics, setMovementSomatics] = useState("");
    const [movementThemes, setMovementThemes] = useState("");
    const [emotion, setEmotion] = useState("");
    const [postId, setPostId] = useState(null);
    const [sentiment, setSentiment] = useState("");
    const [promptLength, setPromptLength] = useState("");
    const [activeElement, setActiveElement] = useState("movementSomatics");
    const [generateButton, setGenerateButton] = useState(false);
    const [beginButtonVisible, setBeginButtonVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const initialNavDataValues = [
        {
            title: "Somatics",
            isActive: true,
            onClick: () => {
                setActiveElement("movementSomatics");
                handleActiveNav("movementSomatics");
              },
        },
        {
            title: "Themes", 
            isActive: false,
            onClick: () => {
                setActiveElement("movementThemes");
                handleActiveNav("movementThemes");
              },
        },
        {
            title: "Emotions",
            isActive: false,
            onClick: () => {
                setActiveElement("emotions");
                handleActiveNav("emotions");
              },
        },
        {
            title: "Sentiments",
            isActive: false,
            onClick: () => {
                setActiveElement("sentiments");
                handleActiveNav("sentiments");
              },
        },
        {
            title: "Length",
            isActive: false,
            onClick: () => {
                setActiveElement("promptLength");
                handleActiveNav("length");
              },
        },
    ];
    const [navData, setNavData] = useState(initialNavDataValues);
    const [isLoading, setIsLoading] = useState(false);

    const handlePost = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
        .post('https://catalyst-x226.onrender.com/api/movement/generate/',{
            somatic: movementSomatics,
            theme: movementThemes,
            sentiment: sentiment,
            emotion: emotion,
            prompt_length: promptLength,
        })
        .then((response) => {
            setPostId(response.data.id);
            setBeginButtonVisible(true);
            setIsClicked(true);
        })
        .finally(() => {
            const timeout = setTimeout(() => {
                setIsLoading(false)}, 1000)
        })
    }

    const handleMovementSomatics = (selectedMovementSomatics) => {
        setMovementSomatics(selectedMovementSomatics);
        console.log(selectedMovementSomatics)
    }
    
    const handleMovementThemes = (selectedMovementThemes) => {
        setMovementThemes(selectedMovementThemes);
        console.log(selectedMovementThemes)
    }

    const handleEmotionChange = (selectedEmotion) => {
        setEmotion(selectedEmotion);
        console.log(selectedEmotion)
    }

    const handleSentimentChange = (selectedSentiment) => {
        setSentiment(selectedSentiment);
        console.log(selectedSentiment)
    }

    const handlePromptLength = (selectedPromptLength) => {
        setPromptLength(selectedPromptLength);
        console.log(selectedPromptLength)
    }

    const handleClickCreatePage = () => {
      setMovementGenerativeSpace(true)
    }

    const handleBack = () => {
      const currentActiveIndex = keys.indexOf(activeElement);
      const previousActiveIndex = currentActiveIndex - 1;
      
      if (previousActiveIndex >= 0) {
        setActiveElement(keys[previousActiveIndex]);
      }
    };

const mappedMovementSomatics = data.movementSomatics
const mappedMovementThemes = data.movementThemes
const mappedEmotion = data.emotions
const mappedSentiment = data.sentiments
const mappedPromptLength = data.promptLength

const handleActiveNav = (newValue) => {
    const newState = navData.map(datum => {
        if (datum.isActive) {
            datum.isActive = false
            return datum
        }

        if (datum.title.toLowerCase() === newValue) {
            datum.isActive = true
            return datum
        }

        return datum
    })

    setNavData(newState);
};
console.log("navData", navData)

const handleStateSet = (key, value) => {
    if (key === "Movement Somatics") {
        handleMovementSomatics(value);
        const newActiveElement = "movementThemes";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }
    if (key === "Movement Themes") {
        handleMovementThemes(value);
        const newActiveElement = "emotions";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }    
    if (key === "Emotions") {
        handleEmotionChange(value);
        const newActiveElement = "sentiments";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }
    if (key === "Sentiments") {
        handleSentimentChange(value);
        const newActiveElement = "promptLength";
        setActiveElement(newActiveElement);
        handleActiveNav("length");
    }

    if (key === "Prompt Length") {
        handlePromptLength(value);
        const newActiveElement = "generate";
        setActiveElement(newActiveElement);
        setGenerateButton(true);
        handleActiveNav(newActiveElement);
    }

    if (key === "generateButton") {
        handleGenerate(value)
    }
}

const keys = ["movementSomatics", "movementThemes", "emotions", "sentiments", "promptLength", "generate"]

const instruction = {
    movementThemes: "Choose the foundation of your movement prompt",
    movementSomatics: "Select a somatic approach to shape your movement prompt",
    emotion: "Infuse feeling into your movement prompt",
    sentiments: "Set the mood and tone of your movement prompt",
    promptLength: "What is the optimal length for your movement prompt?",

  };
return (
    <>
      <div className="flex flex-col items-center justify-center space-y-10 h-screen">
        <div>
            {isLoading ?(
                <LoadingRobot/>
            ) : (
          <div className="flex flex-col items-center ">
            {generateButton ? (
              <>
                <div>
                  <div className="flex justify-center">
                    {isClicked ?
                      <button 
                      onClick={handlePost}
                      className="begin-button border border-slate-400 p-4"
                      >
                        REGENERATE
                      </button>
                      :
                      <button
                        className="text-4xl m-10 p-8 bg-slate-200 border border-slate-500"
                        onClick={handlePost}
                        key="generateButton"
                      >
                        GENERATE
                      </button>
                    }
                  </div>
                  <div className="font-serif text-3xl text-center pr-6 pt-24 pl-6 pb-24 ">
                    {postId && (
                      <MovementPrompt
                        postId={postId}
                        setOutput={setOutput}
                        output={output}
                      />
                    )}
                  </div>
                </div>
                {beginButtonVisible && (
                  <button
                    className="text-4xl m-10 p-8 bg-slate-200 border border-slate-500"
                    onClick={handleClickCreatePage}
                  >
                    CREATE
                  </button>
                )}
              </>
            ) : (
              <div>
                <ParameterComponent
                  key={activeElement}
                  data={data[activeElement]}
                  handler={handleStateSet}
                  mediumNavComponent={<MediumNav navData={navData} />}
                />
             
              </div>
            )}
          </div>
            )}
        </div>
        <div className="instruction-container">
        <h2 className='instruction'>{instruction[activeElement]}</h2>
        </div>
      </div>
    </>
  );
  };  

export default Movement;