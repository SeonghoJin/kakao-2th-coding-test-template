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
      this.hotels[i] = [[], [], [], []];
      for (let j = 1; j <= this.H; j++) {
        for (let k = 1; k <= this.W; k++) {
          this.hotels[i][j][k] = false;
        }
      }
    }
    /**
     *
     * @type {import("./types").ReservationsInfo[][]}
     */
    this.checkIns = [];
    for (let i = 1; i <= 201; i++) {
      this.checkIns[i] = [];
    }
  }

  run = async () => {
    this.day++;
    const {reservations_info} = await this.apiService.getNewRequests();

    reservations_info.sort((a, b) => {
      return Number(a.check_in_date) - Number(b.check_in_date)
    });

    /**
     * @type {(import("./types").ReservationsInfo & {reply: string})[]}
     */
    const replies = reservations_info.filter((reservation) => {
      const room = this.canApply(reservation);
      if (room === null) {
        return false;
      }
      reservation.room = room;
      this.accept(reservation, room);
      return true;
    }).map((item) => {
      this.checkIns[item.check_in_date].push(item);
      return {
        ...item,
        reply: 'accepted'
      }
    });


    const {day} = await this.apiService.reply(replies.map((reply) => {
      return {
        id: reply.id,
        reply: reply.reply
      }
    }));

    const assignes = this.checkIns[day].map((reply) => {
      return {
        id: reply.id,
        room_number: reply.room[0] * 1000 + reply.room[1],
      }
    });

    const result = await this.apiService.simulate(assignes);

    if (result.day === 201) {
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
