import { MyThunkAction, MyThunkDispatch } from "./types";

export function bindThunkAction<R, T extends any[]>(action: (...args: T) => MyThunkAction<R>, dispatch: MyThunkDispatch): (...args: T) => R {
  return (...args) => dispatch(action(...args))
}