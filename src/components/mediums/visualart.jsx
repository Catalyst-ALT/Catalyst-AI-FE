import { useState } from "react";
import axios from "axios";
import data from "/prompt.json";
import VisualArtPrompt from "../promptresponse/visualartprompt.jsx";
import {useNavigate} from 'react-router-dom';
import ParameterComponent from "../parameters/ParameterComponent.jsx";

const VisualArt = ({ setOutput, output, setVisualArtGenerativeSpace }) => {
    const [visualArtThemes, setVisualArtThemes] = useState("");
    const [visualArtMedium, setVisualArtMedium] = useState("");
    const [emotion, setEmotion] = useState("");
    const [sentiment, setSentiment] = useState("");
    const [promptLength, setPromptLength] = useState("");
    const [postId, setPostId] = useState(null);
    const [activeElement, setActiveElement] = useState("themes");


    const handlePost = (e) => {
        e.preventDefault();
        axios
        .post('https://catalyst-x226.onrender.com/api/visual_art/generate/',{
            theme: visualArtThemes,
            medium: visualArtMedium,
            sentiment: sentiment,
            emotion: emotion,
            prompt_length: promptLength,
        })
        .then((response) => {
            console.log(response.data)
            setPostId(response.data.id)
        })}

    const handleVisualArtThemes = (selectedVisualArtThemes) => {
        setVisualArtThemes(selectedVisualArtThemes);
        console.log(selectedVisualArtThemes)
        }
    
    const handleVisualArtMedium = (selectedVisualArtMedium) => {
        setVisualArtMedium(selectedVisualArtMedium);
        console.log(selectedVisualArtMedium)
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
        setVisualArtGenerativeSpace(true)
    }

const mappedVisualArtThemes = data.visualArtThemes
const mappedVisualArtMedium = data.visualArtMedium
const mappedEmotion = data.emotion
const mappedSentiment = data.sentiment
const mappedPromptLength = data.promptLength

const handleStateSet = (key, value) => {
    if (key === "Themes") {
        handleVisualArtThemes(value)
        setActiveElement("themes")
    }
    if (key === "Elements") {
        console.log("key", key)
        console.log("value", value)
        handleElements(value)
        setActiveElement("concepts")
    }
    if (key === "Concepts") {
        handleConcepts(value)
        setActiveElement("emotion")
    }
    if (key === "Emotions") {
        handleEmotionChange(value)
        setActiveElement("promptLength")
    }
    if (key === "Prompt Length") {
        handlePromptLength(value)
    }
}

const keys = ["themes", "elements", "concepts", "emotion", "promptLength"]


return (
<>

<ParameterComponent key={activeElement} data={data[activeElement]} handler={handleStateSet} />

    {/* <h1>VISUAL ART</h1>
    <h2>THEMES</h2>

    <div>
        <h3> Selected Theme: <br></br> {visualArtThemes}</h3>
    </div>
    <div>
    {mappedVisualArtThemes.map((visualArtThemes) => (
    <button key={visualArtThemes} onClick={() => handleVisualArtThemes(visualArtThemes)}>
        {visualArtThemes}
    </button>
    ))}

    </div>    
<br></br>

    <h2>MEDIUM</h2>

        <div>
            <h3> Selected Medium: <br></br> {visualArtMedium}</h3>
        </div>
        <div>
            {mappedVisualArtMedium.map((visualArtMedium) => (
            <button key={visualArtMedium} onClick={() => handleVisualArtMedium(visualArtMedium)}>
                {visualArtMedium}
            </button>
            ))}

            </div>    
        <br></br>

    
    <h2>EMOTION</h2>
    <div>
        <h3>Selected Emotion: <br></br> {emotion}</h3>
    </div>   
    <div>
        {mappedEmotion.map((emotion) => (
            <button key={emotion} onClick={() => hand             leEmotionChange(emotion)}>
                {emotion}
            </button>
        ))}
    </div>
    <br></br>

    <h2>SENTIMENT</h2>
        <div>
            <h3>Selected Sentiment: <br></br> {sentiment}</h3>
        </div>   
        <div>
            {mappedSentiment.map((sentiment) => (
                <button key={sentiment} onClick={() => handleSentimentChange(sentiment)}>
                    {sentiment}
                </button>
            ))}
        </div>
        <br></br>

    <h2>PROMPT LENGTH</h2>
    <div>
        <h3>Selected Prompt Length: <br></br> {promptLength}</h3>
    </div>   
    <div>
        {mappedPromptLength.map((promptLength) => (
            <button key={promptLength} onClick={() => handlePromptLength(promptLength)}>
                {promptLength}
            </button>
        ))}
    </div>
    <br></br> */}

    <button className="generate-button" onClick={handlePost}>
        GENERATE
    </button>    
    <button className="begin-button" onClick={handleClickCreatePage}>
        BEGIN
    </button>   
    
    {postId && <VisualArtPrompt  postId={postId} setOutput={setOutput} output={output} />}
    <button className="begin-button" onClick={handleClickCreatePage}>
        BEGIN
    </button> 
</>
)}

export default VisualArt;