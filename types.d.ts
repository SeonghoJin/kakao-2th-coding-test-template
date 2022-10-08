export type ReservationsInfo = {
    id: number;
    amount: number;
    check_in_date: number;
    check_out_date: number;
}

export type ReplyRequest = {
    id: number;
    reply: 'accepted' | 'refused';
}

export type RoomAssignRequest = {
    id: number;
    room_number: number;
}

export type D = {

}

export type E = {

}
