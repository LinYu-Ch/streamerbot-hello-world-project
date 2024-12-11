import { StreamerbotClient } from '@streamerbot/client';
const display = document.getElementById('displayWindow');

/*  global message tracker
    @TODO: important: global message count object
    should not be used for production aimed handlers, use 
    window context and visibility checks instead
*/
let globalMsgCount = 0;

// initiating connection with streamerbot: see https://streamerbot.github.io/client/guide/events
const client = new StreamerbotClient();

// just a test request / response operation to check connections, 
// not relevant to main program
// const response = await client.getActions();
// console.log(`get actions response: ${response}`);

// event subscription event handler method
// client.on();



// creates an HTML element containing a chat message
const twitchWrapper = (data) => {
    let user = data.message;
    let row = document.createElement("div");

    row.dataset.userId = data.user.id;
    row.dataset.messageId = user.msgId;
    row.className = "row";

    row.innerHTML = `<div>
        <div class="message__container">
            <div class="message__sender" style="border-color: ${data.user.color};">Twitch: ${user.username}</div>
            <div class="message__body">
                <p class="message__content">${user.message}</p>
            </div>
        </div>
    </div>`
    return row;
}

const youtubeWrapper = (data) => {
    let row = document.createElement("div");

    row.dataset.userId = data.user.id;
    row.dataset.messageId = data.eventId;
    row.className = "row";

    row.innerHTML = `<div>
        <div class="message__container">
            <div class="message__sender">Youtube: ${data.user.name}</div>
            <div class="message__body">
                <p class="message__content">${data.message}</p>
            </div>
        </div>
    </div>`
    return row;
}

const appendMessage = (htmlElement) => {
    display.prepend(htmlElement);
    globalMsgCount++;

    if (globalMsgCount >= 5) {
        display.removeChild(display.lastChild);
        globalMsgCount--;
    }
}

// event handler for twitch chat messages
client.on('Twitch.ChatMessage', (obj) => {
    const data = obj.data;
    const event = obj.event;

    appendMessage(twitchWrapper(data));
    console.log(obj);
});

client.on('YouTube.Message', (obj) => {
    const data = obj.data;
    const event = obj.event;

    appendMessage(youtubeWrapper(data));
    console.log(obj);
})

// element for styling and testing
const testHtml = () => {
    let row = document.createElement("div");

    let username = "Todd";
    let message = "Hello world";
    let color = "red"

    row.dataset.userId = '241438845';
    row.dataset.messageId = '1ac1c650-0d02-488c-b3a6-3783bcef0b8d';
    row.className = "row";

    row.innerHTML = `<div>
        <div class="message__container">
            <div class="message__sender" style="border-color: ${color};">${username}</div>
            <div class="message__body">
                <p class="message__content">${message}</p>
            </div>
        </div>
    </div>`
    appendMessage(row);
}

testHtml();