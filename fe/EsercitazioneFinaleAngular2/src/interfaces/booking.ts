import { Room } from "./room";
import { User } from "./user";

export interface Booking {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    room: Room;
    user: User;
    numberOfParticipants: number;
    techNecessities: string;

}
