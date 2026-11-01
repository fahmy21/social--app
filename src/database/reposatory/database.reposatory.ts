import { Model } from "mongoose";

export class DatabaseRepository<T> {

    constructor(private model: Model<T>) {
    }

    create(data: T) {
        return this.model.create(data);
    }
////////////////////////////////////////////////////////////

Find_All({
    filter,
    select,
    populate,
    lean
}: {
    filter?: any;
    select?: string;
    populate?: string;
    lean?: boolean;
}) {

    let query: any = this.model.find(filter || {});

    if (select) {
        query = query.select(select);
    }

    if (populate) {
        query = query.populate(populate);
    }

    if (lean) {
        query = query.lean(true);
    }

    return query;
}
////////////////////////////////////////////////////////////
    Find_By_Id({
        id,
        select,
        populate,
        lean
    }: {
        id: string;
        select?: string;
        populate?: string;
        lean?: boolean;
    }) {

        let query: any = this.model.findById(id);

        if (select) {
            query = query.select(select);
        }

        if (populate) {
            query = query.populate(populate);
        }

        if (lean) {
            query = query.lean(true);
        }

        return query;
    }

    Find_One({
        filter,
        select,
        populate,
        lean
    }: {
        filter: any;
        select?: string;
        populate?: string;
        lean?: boolean;
    }) {

        let query: any = this.model.findOne(filter);

        if (select) {
            query = query.select(select);
        }

        if (populate) {
            query = query.populate(populate);
        }

        if (lean) {
            query = query.lean(true);
        }

        return query;
    }

    Updata_one({
        filter,
        data
    }: {
        filter: any;
        data: any;
    }) {

        return this.model.updateOne(filter, data);
    }

    Delete_One({
        filter
    }: {
        filter: any;
    }) {

        return this.model.deleteOne(filter);
    }
}