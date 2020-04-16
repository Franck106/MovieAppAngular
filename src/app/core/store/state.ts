import { Reservation } from "../reservations/reservation";

export interface State {
  reservations: Reservation[];
  reservationsCount: number;
}

export const stateDefaults: Partial<State> = {
  reservationsCount: 0,
};
