/**
 *  Function that convert seconds to minutes and seconds in the format mm:ss
 */
function convertSeconds(s: number): string {
  const min = Math.floor(s / 60);
  const sec = s % 60;

  const pad = (time: any) => time.toString().padStart(2, "0");

  return `${min}:${pad(sec)}`;
}

export default convertSeconds;
