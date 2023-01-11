/**
 *  Function that convert seconds to minutes and seconds in the format mm:ss
 */
function convertSeconds(s: number): string {
  const min = Math.floor(s / 60);
  const sec = s % 60;

  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}

export default convertSeconds;
