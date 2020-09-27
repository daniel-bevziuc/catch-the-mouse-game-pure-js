class game {
    constructor(){
        this.totalScore = 0;
        this.live = 3;
        this.isRunning = false;
        this.isMouse = false;
        this.levelSpeed = 1;
        this.createInterval = 2000;
        this.span = '';
        
        this.sumAnimals = {
            mouse: 5,
            panda: 1,
            bear: 1,
            fox: 1,
            cat: 1,
            cow: 1,
            lion: 1,
            pig: 1,
            koala: 1,
            hare: 1,
            tiger: 1
        };
        this.animals = {
            mouse: '🐭',
            panda: '🐼',
            bear: '🐻',
            fox: '🦊',
            cat: '🐱',
            cow: '🐮',
            lion: '🦁',
            pig: '🐽',
            koala: '🐨',
            hare: '🐰',
            tiger: '🐯'
        };
        this.emojis = [];
        
        this.speed = document.querySelector('.star');
        this.score = document.querySelector('.score');
        this.heart = document.querySelectorAll('.life__heart');
        this.minks = document.querySelectorAll('.game-field__mink');
        this.gameOver = document.querySelector('.game-over');
        this.total = document.querySelector('.main__score');
        this.gameOverBtn = document.querySelector('.game-over__btn');
    }
    createEmojiArr (){
        for (const key in this.sumAnimals) {
            for(let i = this.sumAnimals[key]; i > 0; i--){
                this.emojis.push(this.animals[key]);
            }
        }
    }
    setSpeedLevel () {
        switch(this.totalScore){
            case 0:
                this.speed.classList.add('level-up');
                setTimeout(() => this.speed.innerHTML = this.levelSpeed, 1500);
                setTimeout(() => this.speed.classList.remove('level-up'), 4000);
                break;
            case 50:
                this.levelSpeed = 2;
                this.createInterval = 1500;
                this.speed.classList.add('level-up');
                setTimeout(() => this.speed.innerHTML = this.levelSpeed, 1500);
                setTimeout(() => this.speed.classList.remove('level-up'), 4000);
                break;
            case 100:
                this.speed.classList.remove('level-up');
                this.levelSpeed = 3;
                this.createInterval = 1000;
                this.speed.classList.add('level-up');
                setTimeout(() => this.speed.innerHTML = this.levelSpeed, 1500);
                setTimeout(() => this.speed.classList.remove('level-up'), 4000);
                break;
            case 150:
                this.levelSpeed = 4;
                this.createInterval = 500;
                this.speed.classList.add('level-up');
                setTimeout(() => this.speed.innerHTML = this.levelSpeed, 1500);
                setTimeout(() => this.speed.classList.remove('level-up'), 4000);
                break;
        }
    }
    setLive(){
        this.heart.forEach((item) => item.classList.add('life__heart-active'))
    }
    checkLive() {
        this.heart[this.live].classList.remove('life__heart-active');
    }
    getRandomEmoji () {
        let rand = Math.floor(Math.random() * this.emojis.length);
        if(this.emojis[rand] === '🐭')
            this.isMouse = true;

        return this.emojis[rand];
    }
    getClick(){
        if(this.isMouse){
            this.totalScore += 10;
            this.setSpeedLevel();
        }
        else{        
            this.live--;
            this.checkLive();
        }
        if(this.live === 0){
            clearInterval(this.interval);
            this.endGame();
        }
        this.deleteElement();
        this.setScore();
    };
    setScore(){
        this.score.innerHTML = this.totalScore;
    };
    deleteElement(){
        let mink = document.querySelector('.emoji');
        if(mink)
            mink.remove();
        this.isMouse = false;
    }
    createElement(){
        this.deleteElement();
        this.span = document.createElement('span');
        let rand = Math.floor(Math.random() * this.minks.length);
        this.span.classList.add('emoji');
        this.span.innerHTML = this.getRandomEmoji();
        this.minks[rand].appendChild(this.span);
        this.span.addEventListener('click', () => this.getClick() ,{once: true});
    };
    startGame(){
        this.isRunning = true;
        this.createEmojiArr();
        this.setSpeedLevel();
        this.setScore();
        this.setLive();
        this.interval = setInterval( () => this.createElement(),this.createInterval);
    };
    endGame() {
        this.total.innerHTML = this.totalScore;
        this.gameOverBtn.addEventListener('click', () => {this.gameOver.classList.remove('active')});
        this.gameOver.classList.add('active');

    }
   
   
}
let rules = document.querySelector('.btn__info');
let ruleOk = document.querySelector('.game-rules__btn');
let ruleUp = document.querySelector('.game-rules');

let rule = () => ruleUp.classList.toggle('active');

rules.addEventListener('click', rule);
ruleOk.addEventListener('click', rule);


let start = document.querySelector('.btn__start');
start.addEventListener('click', () => { let newGame = new game();
                                        newGame.startGame();});





