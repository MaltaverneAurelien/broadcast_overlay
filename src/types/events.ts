import type Data from ".";

type Events = { [key: string]: (data: Data) => void } & Object;

export default Events;
