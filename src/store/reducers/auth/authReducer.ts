import { notification } from "antd";
import axios from "axios";
import { ActionTypesFromStore, BaseThunkType } from "../..";

export interface UserType {
  username: string;
  password: string;
}
interface init {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: UserType;
}

const initialState: init = {
  isAuth: false,
  isLoading: false,
  user: {} as UserType,
  error: "",
};

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const actions = {
  setAuth: (payload: boolean) => {
    return {
      type: "SET_AUTH",
      payload,
    } as const;
  },
  setUser: (payload: UserType) => {
    return {
      type: "SET_USER",
      payload,
    } as const;
  },
  setLoading: (payload: boolean) => {
    return {
      type: "SET_LOADING",
      payload,
    } as const;
  },
};

export const loginThunk =
  (username: string, password: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.setLoading(true));
      setTimeout(async () => {
        const response = await axios.get<UserType[]>("./users.json");
        const mockUsers = response.data.find(
          (user) => user.username === username && user.password === password
        );
        if (mockUsers) {
          localStorage.setItem("user", mockUsers.username);
          localStorage.setItem("auth", "true");
          dispatch(actions.setUser(mockUsers));
          dispatch(actions.setAuth(true));
        } else {
          notification.error({
            message: "Error",
            description: "Invalid login or password",
          });
          dispatch(actions.setLoading(false));
        }
      }, 2000);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Login error",
      });
    }
  };
export const logoutThunk = (): ThunkType => async (dispatch) => {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  dispatch(actions.setAuth(false));
  dispatch(actions.setUser({} as UserType));
};

type ActionType = ActionTypesFromStore<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;
