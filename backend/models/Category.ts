import { getModelForClass, prop } from "typegoose";

export class CategoryClass {
    @prop()
    public _id!: string;
}

export const CategoryModel = getModelForClass(CategoryClass, {
    options: {
        customName: "category"
    }
});
