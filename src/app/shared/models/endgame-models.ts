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

export class TeamData {
    teamName: string;
    teamMember1email: string;
    teamMember2email: string;
    teamMember3email: string;
    teamMember4email: string;
    teamMember5email: string;
}
