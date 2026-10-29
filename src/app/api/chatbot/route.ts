import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const body = await request.json();
        const {messages} = body;
        if (!messages) {
            return NextResponse.json({messages:null,error:"the messages data is missing or has the wrong format."},{status:400})
        }
        const chatbotResponse = await chatbot(messages);
        if(chatbotResponse.messages){
            return NextResponse.json(chatbotResponse,{status:200})
        }else{
            return NextResponse.json({messages:null,error:chatbotResponse.error},{status:500})
        }

    }catch(error){
        return NextResponse.json({messages:null, error:error},{status:500})
    }
}

const groq = new Groq({apiKey:process.env.GROQ_API_KEY});
async function chatbot(messages:[]){
    let chatCompletion;
    try{
    chatCompletion = await groq.chat.completions.create({
  "messages": messages,
  "model": "openai/gpt-oss-120b",
  "temperature": 0.7,
  "max_completion_tokens": 2048,
  "top_p": 1,
  "stream": false,
  "reasoning_effort": "medium",
  "stop": null
});
    }catch(error){
        return{messages:null,error:error}
    }
    if (chatCompletion?.choices[0].message.content) {
        return{messages:chatCompletion.choices[0].message.content, error:null}
    }else{
        return{messages:null,error:"The chatbot returned no response for this conversation"}
    }
}
