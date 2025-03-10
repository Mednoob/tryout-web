import { getModelForClass, prop, Severity } from "typegoose";

export class AnswerClass {
    @prop({ required: true })
    public question!: string;

    @prop()
    public answer?: boolean | null;

    @prop({ required: true })
    public correct!: boolean;
}

export class SubmissionClass {
    @prop({ required: true })
    public tryoutId!: string;

    @prop({ required: true })
    public tryoutTitle!: string;

    @prop({ required: true, allowMixed: Severity.ALLOW })
    public answers!: AnswerClass[];

    @prop({ default: Date.now(), required: true })
    public createdAt!: Date;
}

export const SubmissionModel = getModelForClass(SubmissionClass, {
    options: {
        customName: "submission"
    }
});
