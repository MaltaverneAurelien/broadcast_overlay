import UpdateStateData from "./updateState";

type Data<T = UpdateStateData | any> = {
  data: T;
  event: string;
}

export default Data
