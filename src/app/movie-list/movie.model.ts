export class Movie{
    constructor(
        public id: string, 
        public title: string,
        public year: string,
        public runtime: string,
        public genre: string[],
        public director: string){}
}