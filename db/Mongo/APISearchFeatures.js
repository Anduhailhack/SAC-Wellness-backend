class APISearchFeatures {
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }
    
    filter(){
        //Exclude sort, filter, limit, page...
        // chanfe gte to $gte  => mongo syntax not included in the coming query
        
        const queryObj = {...this.queryString}
        const exclude = ['sort', 'filter', 'limit', 'page']
        exclude.forEach(el => delete queryObj[el])

        const queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        queryObj = JSON.parse(queryStr)

        this.query = query.find(queryObj)
        
        // queryStr = queryStr.split(',').join(' ')
        return this
    }

    sort(){
        //filter the query
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = query.sort(sortBy)
        } else {
            //this.query = query.sort()                    //default sort type
        }

        return this
    }

    fields(){                                           // search fields returned to the req
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
            return this
        } else {
            this.query = this.query.select('-__v')             //default feilds
            return this
        }
    }

    page(){
        const limit = this.queryString.limit * 1
        const page = this.queryString.page * 1
        const skip = (page-1)*limit
        if(this.queryString.page){
            this.query = this.query.skip(skip).limit(limit)
        } else {
            this.query = this.query.limit(10)
        }
        return this
        
    }
}