import { Booking } from "./booking.interface";

export interface BookingToServer extends Booking {
    id: number;
}