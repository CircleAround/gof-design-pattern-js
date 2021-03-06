// 既に動きが決まっていて"このクラスの修正は出来ない"前提です。
class MessageCreator {
  message(dayPeriod) {
    if(dayPeriod.isMorning()) {
      console.log('おはようございます！');
    } else if(dayPeriod.isAfterNoon()) {
      console.log('こんにちは');
    } else if(dayPeriod.isNight()) {
      console.log('こんばんは');
    } else {
      throw new Error('どの時間帯でも無いので挨拶できません')
    }
  }
}

// こちらも既に動きが決まっていて"このクラスの修正は出来ない"前提です。
class Clock {
  #time
  constructor(time = new Date) {
    this.#time = time;
  }1

  getTime() {
    return this.#time;
  }
}

// Clockの持っている時刻に従ってメッセージを作りたいのでAdapterを作ります。
class ClockMessageAdapter {
  #clock
  constructor(clock) {
    this.#clock = clock;
  }

  isMorning() {
    let hours = this.#clock.getTime().getHours();
    return 5 <= hours && hours < 12;
  }

  isAfterNoon() {
    let hours = this.#clock.getTime().getHours();
    return 12 <= hours && hours < 17;
  }

  isNight() {
    let hours = this.#clock.getTime().getHours();
    return (17 <= hours && hours < 24) || (0 <= hours && hours < 5);
  }
}

// 本来一緒に利用するのが難しかった ClockとMessageCreatorを連携させられる
let messageCreator = new MessageCreator;
{
  let clock = new Clock(new Date(2020, 5, 1, 8));
  let adapter = new ClockMessageAdapter(clock);

  messageCreator.message(adapter);
}

{
  let clock = new Clock(new Date(2020, 5, 1, 2));
  let adapter = new ClockMessageAdapter(clock);

  messageCreator.message(adapter);
}


//////////////////////////////////////////////////////////////
// Q1. 下記のTimeByStringクラスの内容がMessageCreatorで利用できるような
// TimeMessageAdapterを作成しましょう。動作確認コードも書いてください
const TIME_STRINGS = ['朝', '昼', '晩'];

class TimeByString {
  #string
  constructor(string) {
    if(!TIME_STRINGS.includes(string)) { throw Error(`${string}は指定できません。`) }
    this.#string = string;
  }

  getString() {
    return this.#string;
  }
}

//////////////////////////////////////////////////////////////
// Q2. Adapterパターンのクラスの構造は、Decoratorパターンとよく似ています。
// どういう点が異なるのか、利用シーンや目的に違いがあるのかを考察しましょう。

//////////////////////////////////////////////////////////////
// Q3. Adapterパターンのクラスの構造は、Strategyパターンとほぼ同じです。
// どういう点が異なるのか、利用シーンや目的に違いがあるのかを考察しましょう。

