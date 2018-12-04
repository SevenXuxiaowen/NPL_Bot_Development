import React from 'react';

const Landing = () => (
    <div className='container' style={{ textAlign: 'left', fontFamily: 'Times'}}>
        <div style={{display: "flex"}}>
            <img src="https://i.pinimg.com/564x/7c/e8/d6/7ce8d6c44b056a3e9eb84d31139f4132.jpg" alt="Smiley face" style={{position: 'relative', top: 30 ,height: 200}}/>
            <div>
                <h1>Talk To <span style={{color: "#e53935", fontWeight: 800}}>BIU</span><br/>Book Table</h1>
                <p  style={{color: "#757575"}}>
                    This chatbot is the demo for <span style={{color: "#e53935"}}>49-744 Design Smart Systems</span>.
                </p>
            </div>
        </div>
        <p style={{width: 550, position: 'relative', left: 40, color: "#757575"}}>
            A Chatbot is a computer program which conducts a conversation via auditory or textual
            methods. Such programs are often designed to convincingly simulate how a human would
            behave as a conversational partner. Some Chatbots use sophisticated natural language processing
            systems, but many simpler systems scan for keywords within the input, then pull
            a reply with the most matching keywords, or the most similar wording pattern, from a
            database.
        </p>

        <img src="https://i.pinimg.com/564x/9b/74/81/9b7481a09c4808851a582626bdd7af06.jpg" alt="Smiley face" style={{position: 'relative', top: 0 ,height: 350}}/>

    </div>
)

export default Landing;