import axios from "axios";
import { useState } from "react";
import data from "/prompt.json";
import CreativeWritingPrompt from "../promptresponse/creativewritingprompt.jsx";
import ParameterComponent from "../parameters/ParameterComponent.jsx";
import MediumNav from "../parameters/MediumNav.jsx";

const CreativeWriting = ({ setOutput, output, setGenerativeSpace }) => {
  const [themes, setThemes] = useState("");
  const [categories, setCategories] = useState("");
  const [writingStyle, setWritingStyle] = useState("");
  const [postId, setPostId] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [promptLength, setPromptLength] = useState("");
  const [activeElement, setActiveElement] = useState("themes");
  const [generateButton, setGenerateButton] = useState(false);
  const initialNavDataValues = [
    {
      title: "Themes",
      isActive: true,
    },
    {
      title: "Categories",
      isActive: false,
    },
    {
      title: "Emotion",
      isActive: false,
    },
    {
      title: "Sentiment",
      isActive: false,
    },
    {
      title: "Length",
      isActive: false,
    },
  ];
  const [navData, setNavData] = useState(initialNavDataValues);

  const handlePost = (e) => {
    e.preventDefault();
    axios
      .post("https://catalyst-x226.onrender.com/api/write/generate/", {
        style: writingStyle,
        theme: themes,
        category: categories,
        sentiment: sentiment,
        emotion: emotion,
        prompt_length: promptLength,
      })
      .then((response) => {
        console.log(response.data);
        setPostId(response.data.id);
      });
  };

  const handleWritingStyle = (selectedStyle) => {
    setWritingStyle(selectedStyle);
    console.log(selectedStyle);
  };

  const handleThemeChange = (selectedTheme) => {
    setThemes(selectedTheme);
    console.log(selectedTheme);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategories(selectedCategory);
    console.log(selectedCategory);
  };

  const handleEmotionChange = (selectedEmotion) => {
    setEmotion(selectedEmotion);
    console.log(selectedEmotion);
  };

  const handleSentimentChange = (selectedSentiment) => {
    setSentiment(selectedSentiment);
    console.log(selectedSentiment);
  };

  const handlePromptLength = (selectedPromptLength) => {
    setPromptLength(selectedPromptLength);
    setGenerateButton(true);
    console.log(selectedPromptLength);
  };

  const handleClickCreatePage = () => {
    setGenerativeSpace(true);
  };

  const mappedWritingStyle = data.writingStyle;
  const mappedThemes = data.themes;
  const mappedCategories = data.categories;
  const mappedEmotion = data.emotion;
  const mappedSentiment = data.sentiment;
  const mappedPromptLength = data.promptLength;

  const handleActiveNav = (newValue) => {
    // find object that is set to true and turn it to false -oldValue(false) newValue(true)
    // find object that matches the key and turn it to true


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
  console.log("navData",navData)

  const handleStateSet = (key, value) => {
    console.log("key", key);
    if (key === "Themes") {
      handleThemeChange(value);
      const newActiveElement = "categories";
      setActiveElement(newActiveElement);
      handleActiveNav(newActiveElement);
    }
    if (key === "Categories") {
      handleCategoryChange(value);
      const newActiveElement = "emotion";
      setActiveElement(newActiveElement);
      handleActiveNav(newActiveElement);
    }
    if (key === "Emotions") {
      handleEmotionChange(value);
      const newActiveElement = "sentiment";
      setActiveElement(newActiveElement);
      handleActiveNav(newActiveElement);
    }
    if (key === "Sentiment") {
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

  if (key === "Generate Button"){
 
  }
  };

  const keys = ["themes", "categories", "emotion", "sentiment", "promptLength", "generate"];

  return (
    <>
    <div>
    <div>
      <div className="flex flex-col items-center">
        {generateButton ? (
          <>
            <div className="font-serif text-4xl text-center p-4 pt-32">
              {postId && (
                <CreativeWritingPrompt
                  postId={postId}
                  setOutput={setOutput}
                  output={output}
                  
                />
              )}
              <br />
            </div>
            <div>
              <button
                className="text-4xl justify-center ml-17 m-7 p-8 bg-slate-200 border border-slate-500"
                onClick={handlePost}
              >
                GENERATE
              </button>
            </div>
            <button
              className="m-2 border border-slate-500 p-4"
              onClick={handleClickCreatePage}
            >
              BEGIN
            </button>
          </>
        ) : (
          <> <ParameterComponent
          key={activeElement}
          data={data[activeElement]}
          handler={handleStateSet}
          mediumNavComponent={<MediumNav navData={navData} />}
        /></>
        )}
      </div>
    </div>
    </div>
  </>
   
  
  );
};

export default CreativeWriting;
