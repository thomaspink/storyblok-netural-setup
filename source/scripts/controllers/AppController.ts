import { Controller } from '../lib/Controller';

export class AppController extends Controller {

    static selector: string = '.root';

    constructor(element: HTMLElement) {
        super(element);
    }

}