import { useState } from "react";
import axios from "axios";
import data from "/prompt.json";
import MusicPrompt from "../promptresponse/musicprompt.jsx";
import {useNavigate} from 'react-router-dom';
import ParameterComponent from "../parameters/ParameterComponent.jsx";
import MediumNav from "../parameters/MediumNav.jsx";
import LoadingRobot from "./../robot.jsx";
import NavBar from "../navbar.jsx"; 

const Music = ({ setOutput, output, setMusicGenerativeSpace }) => {
    const [explorations, setExplorations] = useState("");
    const [concepts, setConcepts] = useState("");
    const [elements, setElements] = useState("");
    const [emotion, setEmotion] = useState("");
    const [promptLength, setPromptLength] = useState("");
    const [postId, setPostId] = useState(null);
    const [activeElement, setActiveElement] = useState("explorations");
    const [generateButton, setGenerateButton] = useState(false);
    const [beginButtonVisible, setBeginButtonVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const initialNavDataValues = [
        {
          title: "Exploration",
          isActive: true,
          onClick: () => {
            setActiveElement("explorations");
            handleActiveNav("explorations");
          },
        },
        {
          title: "Elements",
          isActive: false,
          onClick: () => {
            setActiveElement("elements");
            handleActiveNav("elements");
          },
        },
        {
          title: "Concepts",
          isActive: false,
          onClick: () => {
            setActiveElement("concepts");
            handleActiveNav("concepts");
          },
        },
        {
          title: "Emotion",
          isActive: false,
          onClick: () => {
            setActiveElement("musicEmotion");
            handleActiveNav("emotion");
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
        .post('https://catalyst-x226.onrender.com/api/music/generate/',{
            exploration: explorations,
            concept: concepts,
            element: elements,
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
    };
    
        const handleExplorations = (selectedExplorations) => {
            setExplorations(selectedExplorations);
        };
        

        const handleElements = (selectedElements) => {
            setElements(selectedElements);
        };
        
        
        const handleConcepts = (selectedConcepts) => {
            setConcepts(selectedConcepts);
        };
        
        
        const handleEmotionChange = (selectedEmotion) => {
            setEmotion(selectedEmotion);
        }

        const handlePromptLength = (selectedPromptLength) => {
            setPromptLength(selectedPromptLength);
            setGenerateButton(true);
        }

        const handleClickCreatePage = () => {
            setMusicGenerativeSpace(true)
        }

        const handleBack = () => {
          const currentActiveIndex = keys.indexOf(activeElement);
          const previousActiveIndex = currentActiveIndex - 1;
          
          if (previousActiveIndex >= 0) {
            setActiveElement(keys[previousActiveIndex]);
          }
        };

const mappedExplorations = data.explorations
const mappedConcepts = data.concepts
const mappedEmotion = data.emotions
const mappedElements = data.musicElements
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

const handleStateSet = (key, value) => {
    if (key === "Music Explorations") {
        handleExplorations(value)
        const newActiveElement = "elements";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }
    if (key === "Elements") {
        console.log("key", key)
        console.log("value", value)
        handleElements(value)
        const newActiveElement = "concepts";
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }
    if (key === "Concepts") {
        const newActiveElement = "musicEmotion";
        handleConcepts(value)
        setActiveElement(newActiveElement);
        handleActiveNav(newActiveElement);
    }
    if (key === "Emotion") {
        const newActiveElement = "promptLength";
        handleEmotionChange(value)
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

    if (key === "Generate Button"){

    }
};

const keys = ["explorations", "elements", "concepts", "musicEmotion", "promptLength", "generate"]

const instruction = {
    explorations: "Set the direction of your music prompt",
    elements: "Pick an element as inspiration in your music prompt",
    musicEmotion: "Infuse feeling into your music prompt",
    concepts: "Select the backbone of your music prompt",
    promptLength: "What is the optimal length for your creative writing prompt?"
}

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
                      <MusicPrompt
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
             

export default Music;