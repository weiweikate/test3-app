
import HomePage from "./HomePage";
import search from './search'
import product from './product'
import subject from './subject'

export default {
    moduleName: 'home',    //模块名称
    childRoutes: {          //模块内部子路由
        HomePage,
        search,
        product,
        subject
    }
}
