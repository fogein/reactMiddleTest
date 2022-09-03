import { EventPage } from "../pages/eventPage/eventPage";
import { LoginPage } from "../pages/loginPage/loginPage";

export interface IRoute {
  element: React.FC;
  path: string;
}
export enum RoutesPath {
  LOGIN = '/login',
  EVENT = '/'
}
export const PublicRouter:IRoute[] = [{ path: RoutesPath.LOGIN, element: LoginPage }]
export const PrivateRouter:IRoute[] = [{ path: RoutesPath.EVENT, element: EventPage }]
