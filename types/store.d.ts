
import type { ProjectConfig } from "#/config";


declare global {

    /**
     *  全局类型 store
     */
    interface IStore {
        // appStore: 
    }
    interface AppStore {
        projectConfig: ProjectConfig | null;
    }

}

// declare global {
//     /**
//      * type from mobx-react-router
//      *
//      * @interface RouterStore
//      * @extends {_RouterStore}
//      */
//     interface RouterStore extends _RouterStore {}

//     /**
//      * type for all store
//      *
//      * @interface IStore
//      */
//     interface IStore {
//         authStore: IAuthStore.AuthStore
//         userStore: IUserStore.UserStore
//         globalStore: IGlobalStore.GlobalStore
//         socketStore: ISocketStore.SocketStore
//         routerStore: RouterStore
//     }
// }
