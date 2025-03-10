import { getModelForClass, prop, Severity } from "typegoose";

export class QuestionClass {
    @prop({ required: true })
    public question!: string;

    @prop({ required: true })
    public answer!: boolean;
}

export class TryoutClass {
    @prop({ required: true })
    public title!: string;

    @prop({ default: "" })
    public fullDescription?: string;

    @prop({ default: "" })
    public smallDescription?: string;

    @prop({ default: Date.now(), required: true })
    public createdAt!: Date;

    @prop({ default: [], required: true, allowMixed: Severity.ALLOW })
    public categories!: string[];

    @prop({ default: [], required: true, allowMixed: Severity.ALLOW })
    public questions!: QuestionClass[];
}

export const TryoutModel = getModelForClass(TryoutClass, {
    options: {
        customName: "tryout"
    }
});
