import { createSlice } from "@reduxjs/toolkit";
import { Fusion, FusionApi, FusionSteps } from "../../api/types";

const modeList: FusionSteps[] = ["target", "fodder"];
const messageList = [
  "Select a card to level up",
  "Select at least 3 cards to fuse",
];

const initialState: Fusion = {
  status: {
    step: 0,
    mode: modeList[0],
    message: messageList[0],
  },
  user: {
    id: "",
    name: "",
    balance: 0,
    deck: [],
  },
};

export const fusionSlice = createSlice({
  name: "fusion",
  initialState,
  reducers: {
    step: (state, action) => {
      console.log("fusionSlice.step", { state, action });
      state.status.step++;
      if (state.status.step > modeList.length - 1) {
        state.status.step = 0;
      }
      state.status.mode = modeList[state.status.step];
      state.status.message = messageList[state.status.step];
      console.log("fusionSlice.step", { status: state.status });
    },
    setFusion: (state, action) => {
      console.log("rx.setFusion", { payload: action.payload });
      state = action.payload;
      return { ...state }; // TODO - immer
    },
    // modify a card in the deck
    setCard(state, action) {
      const { card, index } = action.payload;
      console.log("rx.setCard", { card, index });
      // @ts-ignore
      state.user.deck[index] = card;
    },
    // modify a card in the deck
    setCardMode(state, action) {
      const { card, index, mode } = action.payload;
      console.log("rx.setCardMode", { card, index, mode });
      const newCard = { ...card, mode };
      // @ts-ignore
      state.user.deck[index] = newCard;
    },
  },
});

export const { step, setFusion, setCard, setCardMode } = fusionSlice.actions;

export const getFusion = (state: any) => state.fusion;

export default fusionSlice.reducer;
