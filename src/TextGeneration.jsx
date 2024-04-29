import React from 'react'
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
//intialization of Gemini Ai
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

//function for text-generation
async function GenerateText(promptProvided) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "promptProvided"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}
// GenerateText();
const TextGeneration = () => {
    const [prompt, SetPrompt] = useState("");
    const [response,setResponse]=useState("");

    //function for input
    function HandleChange(e) {
        SetPrompt(e.target.value);
    }


    //function for button
    async function HandleSubmit(){
     const generateResponse =  await GenerateText(prompt);
     setResponse(generateResponse);
     console.log(generateResponse);
    }

    return (
        <div className="max_w-screen-xl mx-auto">
            <h1 className='text-center 
        text-4xl text-blue-900'>MyAI: TextGenration</h1>

            <div className="my-10 mx-auto max-w-screen-lg">
                <label className="block my-4"
                    htmlFor="Enter your prompt">
                </label>
                <input type="text" onChange={HandleChange}
                    placeholder='Enter Your Propmt'
                    className="border max-w-6xl rounded
         border-black"/>

                <button onClick={HandleSubmit}
                className='block border rounded-r-lg
 border-black bg-blue-900 text-white px-2 my-4'>Generate</button>
            </div>

        <div className='my-4 max-w-screen-xl'>
            <p>{response}</p>

        </div>
        </div>
    )
}
export default TextGeneration;