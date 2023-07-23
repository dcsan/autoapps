// // import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// // import type { RootState, AppDispatch } from "./reduxStore";

// // // Use throughout your app instead of plain `useDispatch` and `useSelector`
// // export const useAppDispatch: () => AppDispatch = useDispatch;
// // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import React, { useState } from "react";

// import { useAppSelector, useAppDispatch } from "app/hooks";

// import { decrement, increment } from "./counterSlice";

// export function Counter() {
//   // The `state` arg is correctly typed as `RootState` already
//   const count = useAppSelector((state: any) => state.counter.value);
//   const dispatch = useAppDispatch();

//   // omit rendering logic
// }
