import type Data from "../types";
import type Events from "../types/events";

/**
 * Handles unhandled events
 */
function unhandledEvent(data: Data): void {
  console.log("Unhandled Event: ", data.event);
}

/**
 *  Initializes the WebSocket connection and sets up event handling
 */
function init(events: Events) {
  // create a new WebSocket connection
  const ws = new WebSocket("ws://localhost:49122");

  // attach a message event handler to the WebSocket
  ws.onmessage = (ev) => {
    // parse the data received over the WebSocket
    const data: Data = JSON.parse(ev.data);

    // select the appropriate event handler function
    const eventFunction = events[data.event] || unhandledEvent;

    // call the event handler function with the received data
    eventFunction(data);
  };

  // return the function to close the WebSocket connection
  return ws.close;
}

export default init;
