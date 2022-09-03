import { notification } from "antd";
import axios from "axios";
import { ActionTypesFromStore, BaseThunkType } from "../..";
import { EventsType } from "../../../components/EventForm";
import { UserType } from "../auth/authReducer";

interface init {
  guests: UserType[];
  events: EventsType[];
}

const initialState: init = {
  guests: [] as UserType[],
  events: [] as EventsType[],
};

export const eventReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "SET_GUESTS":
      return {
        ...state,
        guests: action.payload,
      };
    case "SET_EVENT":
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setGuests: (payload: UserType[]) => {
    return {
      type: "SET_GUESTS",
      payload,
    } as const;
  },
  setEvents: (payload: EventsType[]) => {
    return {
      type: "SET_EVENT",
      payload,
    } as const;
  },
};

export const setGuests = (): ThunkType => async (dispatch) => {
  try {
    const response = await axios.get<UserType[]>("./users.json");
    dispatch(actions.setGuests(response.data));
  } catch (error) {
    notification.error({
      message: "Error",
      description: "Set Guests error",
    });
  }
};
export const setEventThunk =
  (event: EventsType): ThunkType =>
  async (dispatch) => {
    try {
      const events = localStorage.getItem("event") || "[]";
      const json = JSON.parse(events) as EventsType[];
      json.push(event);
      dispatch(actions.setEvents(json));
      localStorage.setItem("event", JSON.stringify(json));
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Set Events error",
      });
    }
  };
export const fetchEvents =
  (username: string): ThunkType =>
  async (dispatch) => {
    const events = localStorage.getItem("event") || "[]";
    const json = JSON.parse(events) as EventsType[];
    dispatch(
      actions.setEvents(
        json.filter((ev) => ev.author === username || ev.guests === username)
      )
    );
  };

type ActionType = ActionTypesFromStore<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;
