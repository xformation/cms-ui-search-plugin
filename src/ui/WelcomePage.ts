import init from '../domain/application/TabApp';

export class WelcomePage {
    static templateUrl = '/partials/welcome.html';
    constructor() {
        init();
    }
}