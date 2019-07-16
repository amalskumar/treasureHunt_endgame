export class Login {
    email: string;
    token: string;
}

export class Points {
    teamName: string;
    points: number;
}

export class Response {
    status: string;
    message: string;
}
export class Question {
    question: string;
    hint: string;
    keyOpen: boolean;
    canAnswer: boolean;
    keyHint: string;
    fileQuestion: boolean;
    url: string;
    country: string;
    showHint: boolean;
}

export class Answer {
    answer: string;
    teamName: string;
}

export class QuestionObject {
    QuestionData: Question;
    countrySelected: string;
}