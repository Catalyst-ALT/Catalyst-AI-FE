import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const CreativeWritingFolio = () => {
  const [folios, setFolios] = useState([]);
  const [selectedFolio, setSelectedFolio] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [output, setOutput] = useState([]);
  const [note, setNote] = useState([]);
  const [category, setCategory] = useState([]);
  const [somatic, setSomatic] = useState([]);
  const [theme, setTheme] = useState([]);
  const [emotion, setEmotion] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [promptLength, setPromptLength] = useState([]);

  useEffect(() => {
    axios
      .get("https://catalyst-x226.onrender.com/api/write/")
      .then((response) => {
        setFolios(response.data);
        setOutput(response.data[0].output);
        setNote(response.data[0].note);
        setSomatic(response.data[0].somatic);
        setTheme(response.data[0].theme);
        setEmotion(response.data[0].emotion);
        setSentiment(response.data[0].sentiment);
        setPromptLength(response.data[0].promptLength);
        setCategory(response.data[0].category);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDateClick = (date) => {
    if (selectedDate === date) {
      setSelectedDate(null);
      setSelectedFolio(null);
    } else {
      setSelectedDate(date);
      setSelectedFolio(
        folios.find(
          (folio) =>
            dayjs(folio.created_at).format("MM-DD-YYYY HH:mm:ss") === date
        )
      );
    }
  };

  return (
    <div className="text-center items-center">
      {folios
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((folio, index) => (
          <div key={index}>
            <button
              className="border border-slate-400 h-20 w-80  m-2"
              onClick={() =>
                handleDateClick(
                  dayjs(folio.created_at).format("MM-DD-YYYY HH:mm:ss")
                )
              }
            >
              {`${dayjs(folio.created_at).format("MM/DD/YY")} `}
              {folio.output.length > 20 && folio.output.slice(0, 20) + '...'}
            </button>
  
            {selectedDate ===
              dayjs(folio.created_at).format("MM-DD-YYYY HH:mm:ss") && (
              <>
                <div className="border border-slate-400 p-4 m-2 space-y-2">
                  <h3 className="font-bold">Prompt Parameters</h3>
                  <h4>
                    {folio.theme}, {folio.category}, {folio.somatic}
                    {folio.emotion}, {folio.sentiment}, {folio.promptLength}
                  </h4>
                  <h3 className="font-bold">A.I Generated Prompt</h3>
                  <h4>{folio.output}</h4>
  
                  <h3 className="font-bold">Notes</h3>
                  <h4>{folio.note}</h4>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
              }
export default CreativeWritingFolio;
