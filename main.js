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

// element for styling and testing
const testHtml = () => {
    let row = document.createElement("div");

    let username = "todd";
    let message = "Hello world";

    row.dataset.userId = '241438845';
    row.dataset.messageId = '1ac1c650-0d02-488c-b3a6-3783bcef0b8d';
    row.className = "row";

    row.innerHTML = `<div>
        <div class="message__container">
            <div class="message__sender">${username}</div>
            <div class="message__body">
                <p class="message__content">${message}</p>
            </div>
        </div>
    </div>`
    display.append(row);
}

testHtml();

// creates an HTML element containing a chat message
const htmlWrapper = (data) => {
    let user = data.message;
    let row = document.createElement("div");

    row.dataset.userId = data.user.id;
    row.dataset.messageId = user.msgId;
    row.className = "row";

    row.innerHTML = `<div>
        <div class="message__container">
            <div class="message__sender">${user.username}</div>
            <div class="message__body">
                <p class="message__content">${user.message}</p>
            </div>
        </div>
    </div>`
    return row;
}

const appendMessage = (htmlElement) => {

}

// event handler for twitch chat messages
client.on('Twitch.ChatMessage', (obj) => {
    const data = obj.data;
    const event = obj.event;

    display.prepend(htmlWrapper(data));
    console.log(obj);
})