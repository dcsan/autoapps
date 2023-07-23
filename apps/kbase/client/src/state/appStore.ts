import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Fusion } from "../api/types";

// add field to window to persist state
export interface CustomWindow extends Window {
  savedStore: any;
}
declare let window: CustomWindow;

export const appStore = create((set) => ({
  // initial values
  ...window.savedStore, // persist state (only for hot reloads)
  user: null,
  bids: [],
  auction: null,
  loading: false,
  // fusion: {},
  setLoading: (val: boolean) => set({ loading: val }),
  setBids: (val: any) =>
    set((state: any) => {
      console.log("updating bids", { val, state });
      return { bids: val };
    }),
  setAuction: (val: any) =>
    set((state: any) => {
      console.log("updating auction", { val, state });
      return { auction: val };
    }),
  logOut: () => set({ user: null }),
}));

// separate store for user to keep between reloads
export const pStore = create(
  persist(
    (set, get) => ({
      user: null,
      reset: () => set({}),
      fusion: {},

      // fusion: () => get().fusion,

      setUser: (user: any) => {
        console.log("userStore.setUser", user);
        set((state: any) => {
          state.user = user;
          return { user };
        });
      },

      setFusion: (fusion: Fusion) => {
        console.log("setFusion", fusion);
        set((state: any) => {
          state.fusion = fusion;
        });
        // return { fusion: fusion };
      },
      // setFusion: (opts: Fusion) =>
      //   // set((state: any) => {
      //   //   fusion: opts;
      //   // }),
      // set((state: any) => {
      //   state.fusion = opts;
      //   return { fusion: opts };
      // });
      // },

      fuseStep: () => {
        set((state: any) => {
          let newStep = "";
          switch (state.fusion.step) {
            case "target":
              newStep = "fodder";
              break;
            case "fodder":
              newStep = "confirm";
              break;
            case "confirm":
              newStep = "target";
              break;
            default:
              newStep = "target";
              break;
          }
          console.log("userStore.fuseStep", {
            now: state.fusion.step,
            newStep,
          });
          state.fusion.step = newStep;
          return { fusion: state.fusion };
        });
      },
      // getUser: () => get().user,
      // addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "pStore", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// appStore.subscribe((state) => {
//   window.savedStore = state;
//   console.log("appStore.subscribe", state);
// });
