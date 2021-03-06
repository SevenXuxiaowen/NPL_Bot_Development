import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Card from './Card';
import Message from './Message';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();

class Chatbot extends Component {

    messagesEnd;
    talkInput;

    constructor(props) {
        super(props);

        // this._handleQuickRepliePayload = this._handleQuickRepliePayload.bind(this);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        };

        if (cookies.get('userID') === undefined){
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };

        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text, userID: cookies.get('userID')});
        
        for (let msg of res.data.fulfillmentMessages) {

            says = {
                speaks: 'bot',
                msg: msg
            }

            this.setState({ messages: [...this.state.messages, says]});
        }

    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', {event, userID: cookies.get('userID')});

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]})
        }
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth"});
        this.talkInput.focus();
    }

    _handleQuickReplyPayload(payload, text) {
        switch (payload) {
            case 'ordering_masterclass':
                this.df_event_query('MASTER');
                break;
            default:
                this.df_text_query(text);
                break;
        }
    }

    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue}/>);
    }

    renderOneMessage(message, i){
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 270, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }else if (message.msg &&
        message.msg.payload &&
        message.msg.payload.fields &&
        message.msg.payload.fields.quick_replies){
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i} r
                eplyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
        }
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i);
            });
        }else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        return (
            <div style={{ height: 600, width: 400 , position: 'absolute', top: 120, right:50, border: '1px solid lightgrey'}}>
                <nav>
                    <div className="nav-wrapper #212121 grey darken-4" style={{fontFamily: 'Times'}}>
                        <a className="brand-logo"> - Biu Baby -</a>
                    </div>
                </nav>

                <div id="chatbot" style={{ height: 488, width: '100%', overflow: 'auto'}}>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el;}}
                        style={{ float: 'left', clear: "both" }}>
                    </div>
                </div>
                <div className="col s12">
                    <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} placeholder="type a message:" type='text' ref={(input) => {this.talkInput = input} } onKeyPress={this._handleInputKeyPress}/>
                </div>
            </div>
        )
    }
}

export default Chatbot;