import { ApiService } from "./ApiService.js";

export class App {
  /**
   *
   * @param {{
   *  apiService: ApiService
   * }} param
   */
  constructor({apiService}) {
    this.apiService = apiService;
    this.hotels = [];
    this.W = 20;
    this.H = 3;
    this.MAX_DAY = 201;
    this.day = 0;
    for (let i = 1; i <= this.MAX_DAY; i++) {
      this.hotels[i] = [];
      for(let j = 0; j <= this.H; j++){
        this.hotels[i][j] = [];
      }
      for (let j = 1; j <= this.H; j++) {
        for (let k = 1; k <= this.W; k++) {
          this.hotels[i][j][k] = false;
        }
      }
    }
    this.reservationsMap = {};
    /**
     *
     * @type {import("./types").ReservationsInfo[][]}
     */
    this.checkIns = [];
    for (let i = 1; i <= this.MAX_DAY; i++) {
      this.checkIns[i] = [];
    }
  }

  run = async () => {
    this.day++;
    const {reservations_info} = await this.apiService.getNewRequests();

    reservations_info.forEach((reservation) => {
      if(this.reservationsMap[reservation.id] === undefined){
        this.reservationsMap[reservation.id] = this.day;
      }
    })

    reservations_info.sort((a, b) => {
      return Number(a.check_in_date) - Number(b.check_in_date)
    });

    console.log(reservations_info);

    /**
     * @type {(import("./types").ReservationsInfo & {reply: string; day: number})[]}
     */
    const replies = reservations_info.map((reservation) => {
      const room = this.canApply(reservation);
      if (room === null) {
        return {
          ...reservation,
          reply: 'refused',
        }
      }
      reservation.room = room;
      this.accept(reservation, room);
      this.checkIns[reservation.check_in_date].push(reservation);
      return {
        ...reservation,
        reply: 'accepted',
      };
    });

    const waits = replies.filter((wait) => wait.reply === 'refused');

    const rejects = waits.filter((wait) => {
      const reserDay = this.reservationsMap[wait.id];
      const checkInDiffDate = wait.check_in_date - this.day;
      const delayedDay = this.day - reserDay;

      console.log(reserDay, checkInDiffDate, delayedDay, wait);

      return delayedDay >= 10;
    });

    console.log(rejects);


    const accepted = replies.filter((reply) => reply.reply === 'accepted');

    const rejectsAndAcceptes = accepted.map((reply) => {
      return {
        id: reply.id,
        reply: reply.reply
      }
    }).concat(rejects.map((reject) => {
      return {
        id: reject.id,
        reply: reject.reply
      }
    }));

    const {day} = await this.apiService.reply(rejectsAndAcceptes);

    const assignes = this.checkIns[day].map((reply) => {
      return {
        id: reply.id,
        room_number: reply.room[0] * 1000 + reply.room[1],
      }
    });

    const result = await this.apiService.simulate(assignes);
    console.log(result);

    if (result.day === this.MAX_DAY) {
      const score = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };

  /**
   * @param {(import("./types").ReservationsInfo)} reply;
   * @param {[number, number]} room;
   */
  accept = (reply, room) => {
    const [y, x] = room;
    const amount = reply.amount;
    for (let i = reply.check_in_date; i < reply.check_out_date; i++) {
      for(let j = 0; j < amount; j++){
        this.hotels[i][y][x + j] = true;
      }
    }
  }

  /**
   * @param {import("./types").ReservationsInfo} reservation
   */
  canApply = (reservation) => {
    for (let i = 1; i <= this.H; i++) {
      for (let j = 1; j <= this.W; j++) {
        let flag = true;

        if (j + reservation.amount - 1 > this.W) {
          break;
        }

        for (let k = reservation.check_in_date; k < reservation.check_out_date; k++) {
          for (let m = 0; m < reservation.amount; m++) {
            if (this.hotels[k][i][j + m]) {
              flag = false;
              break;
            }
            if(flag === false)break;
          }
          if(flag === false)break;
        }
        if(flag){
          return [i, j];
        }
      }
    }

    return null;
  }
}
